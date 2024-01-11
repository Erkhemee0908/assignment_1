"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.namesRouter = void 0;
// External Dependencies
const express_1 = __importDefault(require("express"));
const mongodb_1 = require("mongodb");
const database_service_1 = require("../services/database.service");
// Global Config
exports.namesRouter = express_1.default.Router();
exports.namesRouter.use(express_1.default.json());
// GET
exports.namesRouter.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const names = (yield database_service_1.collections.names.find({}).sort({ $natural: -1 }).limit(20).toArray());
        res.status(200).send(names);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
// POST
exports.namesRouter.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newName = req.body;
        const result = yield database_service_1.collections.names.insertOne(newName);
        result
            ? res.status(201).send(`Successfully created a new name with id ${result.insertedId}`)
            : res.status(500).send("Failed to create a new name.");
    }
    catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
}));
// DELETE
exports.namesRouter.delete("/:id", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const id = (_a = req === null || req === void 0 ? void 0 : req.params) === null || _a === void 0 ? void 0 : _a.id;
    try {
        const query = { _id: new mongodb_1.ObjectId(id) };
        const result = yield database_service_1.collections.names.deleteOne(query);
        if (result && result.deletedCount) {
            res.status(202).send(`Successfully removed name with id ${id}`);
        }
        else if (!result) {
            res.status(400).send(`Failed to remove name with id ${id}`);
        }
        else if (!result.deletedCount) {
            res.status(404).send(`Name with id ${id} does not exist`);
        }
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
//# sourceMappingURL=names.router.js.map