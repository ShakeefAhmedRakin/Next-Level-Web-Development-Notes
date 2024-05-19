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
const express_1 = __importDefault(require("express"));
const app = (0, express_1.default)();
// Parser
app.use(express_1.default.json());
// MiddleWare
const logger = (req, res, next) => {
    console.log(req.url, "\n", req.method, "\n", req.ip);
    next();
};
// Router
const userRouter = express_1.default.Router();
const courseRouter = express_1.default.Router();
app.use("/api/v1/user", userRouter);
app.use("/api/v1/course", courseRouter);
userRouter.post("/create-user", logger, (req, res) => {
    const user = req.body;
    console.log(user);
    res.json({
        succuss: true,
        data: user,
    });
});
courseRouter.post("/create-course", logger, (req, res) => {
    const course = req.body;
    console.log(course);
    res.json({
        succuss: true,
        data: course,
    });
});
app.get("/", logger, (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send("Server is working");
    }
    catch (error) {
        next(error);
    }
}));
app.post("/", logger, (req, res) => {
    console.log(req.body);
    res.json({
        message: "Data Received",
    });
});
app.all("*", (req, res) => {
    res.status(400).json({
        success: false,
        message: "Not Found.",
    });
});
// Global Error Handler
app.use((error, req, res, next) => {
    if (error) {
        res.status(400).json({
            success: false,
            message: "Something went wrong.",
        });
    }
});
exports.default = app;
