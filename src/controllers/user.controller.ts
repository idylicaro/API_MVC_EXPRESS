import { Router, Request, Response } from 'express'
import { User } from '../models/user.model'
import prisma from '../config/prisma';


export default class UserController {
    public path = '/users';
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
        if (!nome) {
            return res.status(400).send({ message: "User nome can not be empty" });
        }

        const newUser = await prisma.usuario.create({
            data: {
                nome
            }
        })
        if (newUser) {
            return res.status(201).json(newUser)
        }
        return res.status(500).json('Something has wrong')
    };

    findAll = async (_: any, res: Response) => {
        const users = await prisma.usuario.findMany()
        if (users) { return res.status(200).json(users) }
        return res.status(500).json('Something has wrong')
    };

    findOne = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        if (!id) { return res.status(400).send({ message: "User id can not be empty" }); }
        try {
            const user = await prisma.usuario.findUnique({ where: { id } })
            if (!user) {
                return res.status(404).json({ message: "Note not found with id " + id });
            }
            return res.status(200).json(user)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving user with id " + id,
                error: error
            })
        }

    };

    update = async (req: Request, res: Response) => {
        const id = Number(req.params.id)
        const { nome } = req.body
        if (!id) {
            return res.status(400).send({ message: "User id can not be empty" });
        }
        if (!nome) {
            return res.status(400).send({ message: "User nome can not be empty" });
        }
        try {
            const updatedUser = await prisma.usuario.update({
                where: { id },
                data: { nome }
            })
            if (!updatedUser) {
                return res.status(404).json({ message: "Something has wrong" });
            }
            return res.status(200).json(updatedUser)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving user with id " + id,
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
            const deletedUser = await prisma.usuario.delete({ where: { id } })
            if (!deletedUser) {
                return res.status(404).json({ message: "Something has wrong" });
            }
            return res.status(200).json(deletedUser)
        } catch (error) {
            return res.status(500).json({
                message: "Error retrieving user with id " + id,
                error: error
            })
        }
    };

}