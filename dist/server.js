"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = __importDefault(require("dotenv"));
const cors_1 = __importDefault(require("cors"));
const index_1 = __importDefault(require("./router/index"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
app.use('/v1/', index_1.default);
const port = process.env.PORT || 3000;
const database = process.env.DATABASE;
app.use(body_parser_1.default.urlencoded({ extended: true }));
if (!database) {
    throw new Error('DATABASE environment variable is not defined');
}
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
mongoose_1.default.connect(database, {}).then(() => {
    console.log('Database connected successfully');
}).catch((error) => {
    console.error('Database connection error:', error);
});
