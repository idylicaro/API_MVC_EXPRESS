import { Router, Request, Response } from 'express'
//import { Product } from '../models/product.model'
import prisma from '../config/prisma';


export default class ProductController {
    public path = '/products';
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
        const nome  = req.body.nome
        const preco  = Number(req.body.preco)
        if (!nome) {
            return res.status(400).send({ message: "User nome can not be empty" });
        }
        if (!preco) {
            return res.status(400).send({ message: "User nome can not be empty" });
        }

        const newProduct = await prisma.produto.create({
            data: {
                nome,
                preco
            }
        })
        if (newProduct) {
            return res.status(201).json(newProduct)
        }
        return res.status(500).json('Something has wrong')
    };

    findAll = async (_: any, res: Response) => {
        const products = await prisma.produto.findMany()
        if (products) { return res.status(200).json(products) }
        return res.status(500).json('Something has wrong')
    };

    findOne = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (!id) { return res.status(400).send({ message: "User id can not be empty" }); }
        try {
            const product = await prisma.produto.findUnique({ where: { id } })
            if (!product) {
                return res.status(404).json({ message: "Note not found with id " + id });
            }
            return res.status(200).json(product)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving user with id " + id,
                error: error
            })
        }

    };

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const nome  = req.body.nome
        const preco  = Number(req.body.preco)
        if (!id) {
            return res.status(400).send({ message: "User id can not be empty" });
        }
        if (!nome) {
            return res.status(400).send({ message: "User nome can not be empty" });
        }
        if (!preco) {
            return res.status(400).send({ message: "User nome can not be empty" });
        }
        try {
            const updatedProduct = await prisma.produto.update({
                where: { id },
                data: { nome, preco }
            })
            if (!updatedProduct) {
                return res.status(404).json({ message: "Something has wrong" });
            }
            return res.status(200).json(updatedProduct)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving product with id " + id,
                error: error
            })
        }
    };

    delete = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (!id) {
            return res.status(400).send({ message: "User id can not be empty" });
        }
        try {
            const deletedProduct = await prisma.produto.delete({ where: { id } })
            if (!deletedProduct) {
                return res.status(404).json({ message: "Something has wrong" });
            }
            return res.status(200).json(deletedProduct)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving user with id " + id,
                error: error
            })
        }
    };

}