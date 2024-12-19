import { Router } from "express";
import UsersController from "../controllers/UsersController";
import authMiddleware from "../middleware/AuthMiddleware";

const router = Router();

router.get("/users", authMiddleware, UsersController.getUsers);

export default router;
