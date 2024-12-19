import "express";

declare global {
  namespace Express {
    interface Request {
      user?: AuthUser;
    }
  }
}

interface AuthUser {
  id: int;
  email: string;
}
