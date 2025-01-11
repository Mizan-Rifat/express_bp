import { AppService } from './app.service';
import { Request, Response } from 'express';

export class AppController {
  private appService: AppService;

  constructor() {
    this.appService = new AppService();
  }

  async find(req: Request, res: Response) {
    console.log({ q: req.query });

    const apps = await this.appService.getData(req.query);
    res.status(200).json({ data: apps });
  }
}
