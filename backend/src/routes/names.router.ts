// External Dependencies
import express, { Request, Response } from "express";
import { ObjectId } from "mongodb";
import { collections } from "../services/database.service";
import Name from "../models/name";
// Global Config
export const namesRouter = express.Router();

namesRouter.use(express.json());
// GET
namesRouter.get("/", async (_req: Request, res: Response) => {
    try {
        const names = (await collections.names.find({}).sort({ $natural: -1 }).limit(20).toArray()) as Object as Name[];

        res.status(200).send(names);
    } catch (error) {
        res.status(500).send(error.message);
    }
});
// POST
namesRouter.post("/", async (req: Request, res: Response) => {
    try {
        const newName = req.body as Name;
        const result = await collections.names.insertOne(newName);

        result
            ? res.status(201).send(`Successfully created a new name with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new name.");
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
});
// DELETE
namesRouter.delete("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const query = { _id: new ObjectId(id) };
        const result = await collections.names.deleteOne(query);

        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed name with id ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove name with id ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Name with id ${id} does not exist`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});