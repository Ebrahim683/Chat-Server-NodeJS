import { Request, Response } from "express";
import prisma from "../config/db.config";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

interface LoginPayloadType {
  email: string;
  password: string;
}

interface RegistrationPayloadType {
  name: string;
  email: string;
  password: string;
  image?: string;
}

class AuthController {
  static async register(request: Request, response: Response): Promise<any> {
    try {
      const body: RegistrationPayloadType = request.body;
      const findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });

      if (!findUser) {
        const SALT_ROUND = 10;
        const hashedPassword = await bcrypt.hash(body.password, SALT_ROUND);
        const result = await prisma.user.create({
          data: {
            name: body.name,
            email: body.email,
            password: hashedPassword,
            image: body.image,
          },
        });

        if (!result) {
          return response.json({
            success: false,
            message: "Registration fail",
          });
        } else {
          return response.json({
            success: true,
            message: "Registration success",
            data: result,
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: "Server not responding",
      });
    }
  }

  static async login(request: Request, response: Response): Promise<any> {
    try {
      const body: LoginPayloadType = request.body;
      const findUser = await prisma.user.findUnique({
        where: {
          email: body.email,
        },
      });
      if (!findUser) {
        return response.json({
          success: false,
          message: "User not found",
        });
      } else {
        const matched = await bcrypt.compare(body.password, findUser.password);
        if (!matched) {
          return response.json({
            success: false,
            message: "Invalid password",
          });
        } else {
          const jwtPayload = {
            email: body.email,
            id: findUser.id,
          };
          const jwtSecrete: string = "GTYF75587%%$$##";
          const token = jwt.sign(jwtPayload, jwtSecrete, {
            expiresIn: "1d",
          });
          return response.json({
            success: true,
            message: "Login success",
            data: {
              access_token: token,
            },
          });
        }
      }
    } catch (error) {
      return response.status(500).json({
        success: false,
        message: "Server not responding",
      });
    }
  }
}

export default AuthController;
