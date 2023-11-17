"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const index_1 = __importDefault(require("./routes/index"));
require('dotenv').config();
const port = process.env.APP_PORT;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(index_1.default);
app.listen(port, () => console.log(`Server running at localhost:${port}`));
