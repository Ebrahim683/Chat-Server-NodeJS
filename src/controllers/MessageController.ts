import { Request, Response } from "express";

class MessageController {
  static async getMessages(request: Request, response: Response): Promise<any> {
    const { sender_id, receiver_id } = request.body;
    try {
        
    } catch (error) {
      return response.status(400).json({
        success: false,
        message: "Server did not response, try again",
      });
    }
  }
}

export default MessageController;
