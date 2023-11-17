"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const index_1 = require("../constrollers/index");
const uploadMulter = (0, multer_1.default)({ dest: 'client-purchases' });
const app = (0, express_1.default)();
app.use(uploadMulter.any());
app.use((req, res, next) => {
    try {
        const uploadController = new index_1.UploadController();
        uploadController.uploadFile(app, uploadMulter);
        next();
    }
    catch (err) {
        throw 'Upload file module error';
    }
});
exports.default = app;
