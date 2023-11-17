"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const upload = require('../helpers/upload');
const app = (0, express_1.default)();
app.get('/upload', upload.single('file'), (req, res) => {
    try {
        res.status(201).json({ message: 'clients file was sucessfully uploaded', file: req.file });
    }
    catch (err) {
        res.status(500).json('Upload failed error');
    }
});
exports.default = app;
