import { UserService } from './user.service';
import { Request, Response } from 'express';

export class UserController {
  private userService: UserService;

  constructor() {
    this.userService = new UserService();
  }

  async getAllUsers(req: Request, res: Response) {
    const users = await this.userService.getAllUsers();
    res.status(200).json({ data: users });
  }
}
