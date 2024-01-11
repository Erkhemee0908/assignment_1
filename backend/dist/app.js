"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_service_1 = require("./services/database.service");
const names_router_1 = require("./routes/names.router");
const app = (0, express_1.default)();
(0, database_service_1.connectToDatabase)()
    .then(() => {
    app.use("/names", names_router_1.namesRouter);
});
exports.default = app;
//# sourceMappingURL=app.js.map