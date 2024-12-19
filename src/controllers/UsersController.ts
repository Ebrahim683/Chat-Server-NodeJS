import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import prisma from "../config/db.config";

interface LoginModel {
  id: string;
  email: string;
}

class UsersController {
  static async getUsers(request: Request, response: Response): Promise<any> {
    try {
      const users = await prisma.user.findMany();
      return response.json({
        success: true,
        message: "User fetched successfully",
        data: users,
      });
    } catch (error) {
      console.log(error);
      return response.status(400).json({
        success: false,
        message: "Server not responding",
      });
    }
  }
}

export default UsersController;
