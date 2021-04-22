import { Router, Request, Response } from 'express'
//import { Product } from '../models/product.model'
import prisma from '../config/prisma';


export default class SaleController {
    public path = '/sales';
    public router = Router();

    constructor() {
        this.intializeRoutes();
    }

    public intializeRoutes() {
        this.router.post(this.path, this.create);
        this.router.get(this.path, this.findAll);
        this.router.get(`${this.path}/:id`, this.findOne);
        this.router.put(`${this.path}/:id`, this.update);
        this.router.delete(`${this.path}/:id`, this.delete);
    }

    create = async (req: Request, res: Response) => {
        const id_produto = Number(req.body.id_produto)
        const id_usuario = Number(req.body.id_usuario)
        if (!id_produto) {
            return res.status(400).send({ message: "Sale id_produto can not be empty" });
        }
        if (!id_usuario) {
            return res.status(400).send({ message: "Sale id_usuario nome can not be empty" });
        }

        const product = await prisma.produto.findUnique({ where: { id: id_produto } })
        const user = await prisma.usuario.findUnique({ where: { id: id_usuario } })

        if (!product) return res.status(400).send({ message: "Does this product exist?" });
        if (!user) return res.status(400).send({ message: "Does this user exist?" });

        const newSale = await prisma.venda.create({
            data: {
                id_produto,
                id_usuario
            }
        })
        if (newSale) {
            return res.status(201).json(newSale)
        }
        return res.status(500).json('Something has wrong')
    };

    findAll = async (req: Request, res: Response) => {
        let id_produto = Number(req.query.id_product)
        let id_usuario = Number(req.query.id_user)
        let sales;
        if (!(id_produto || id_usuario)) {
            sales = await prisma.venda.findMany()
        } else {
            id_usuario = !id_usuario ? 0 : id_usuario
            id_produto = !id_produto ? 0 : id_produto
            sales = await prisma.venda.findMany({
                where: {
                    OR: [
                        { id_produto },
                        { id_usuario },
                    ],
                }
            })
        }
        if (sales) { return res.status(200).json(sales) }
        return res.status(500).json('Something has wrong')
    };

    findOne = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (!id) { return res.status(400).send({ message: "Sale id can not be empty" }); }
        try {
            const sale = await prisma.venda.findUnique({ where: { id } })
            if (!sale) {
                return res.status(404).json({ message: "Sale not found with id " + id });
            }
            return res.status(200).json(sale)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving sale with id " + id,
                error: error
            })
        }

    };

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const id_produto = Number(req.body.id_produto)
        const id_usuario = Number(req.body.id_usuario)

        if (!id) {
            return res.status(400).send({ message: "Sale id can not be empty" });
        }
        if (!id_produto) {
            return res.status(400).send({ message: "Sale id_produto can not be empty" });
        }
        if (!id_usuario) {
            return res.status(400).send({ message: "Sale id_usuario nome can not be empty" });
        }

        const product = await prisma.produto.findUnique({ where: { id: id_produto } })
        const user = await prisma.usuario.findUnique({ where: { id: id_usuario } })

        if (!product) return res.status(400).send({ message: "Does this product exist?" });
        if (!user) return res.status(400).send({ message: "Does this user exist?" });

        try {
            const updatedSale = await prisma.venda.update({
                where: { id },
                data: { id_produto, id_usuario }
            })
            if (!updatedSale) {
                return res.status(404).json({ message: "Something has wrong" });
            }
            return res.status(200).json(updatedSale)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving sale with id " + id,
                error: error
            })
        }
    };

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (!id) {
            return res.status(400).send({ message: "Sale id can not be empty" });
        }
        try {
            const deletedSale = await prisma.venda.delete({ where: { id } })
            if (!deletedSale) {
                return res.status(404).json({ message: "Something has wrong" });
            }
            return res.status(200).json(deletedSale)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving sale with id " + id,
                error: error
            })
        }
    };

}