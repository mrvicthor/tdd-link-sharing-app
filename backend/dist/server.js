"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
const router_1 = __importDefault(require("./router"));
const app = (0, express_1.default)();
const port = 8080;
dotenv_1.default.config();
app.use((0, cors_1.default)({
    credentials: true,
}));
app.use((0, compression_1.default)());
app.use((0, cookie_parser_1.default)());
app.use(body_parser_1.default.json());
app.use(express_1.default.json());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "login.html"));
});
app.get("/", (req, res) => {
    res.sendFile(path_1.default.join(__dirname, "public", "signup.html"));
});
const server = http_1.default.createServer(app);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.post("/", (req, res) => {
    res.json({ message: "Link created successfully", data: req.body });
});
if (process.env.NODE_ENV !== "test") {
    server.listen(port, () => {
        console.log(`Server is running on port ${port}`);
    });
}
exports.default = app;
mongoose_1.default.Promise = Promise;
mongoose_1.default
    .connect(process.env.MONGO_URI)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.error(`MongoDB connection error: ${err}`));
app.use("/", (0, router_1.default)());
//# sourceMappingURL=server.js.map