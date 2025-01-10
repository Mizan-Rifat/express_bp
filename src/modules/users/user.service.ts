import { DatabaseService } from '../../services/database.service';

export class UserService {
  private dbService = DatabaseService.getInstance();

  async getAllUsers() {
    const db = this.dbService.getDb();
    return await db.collection('users').find().toArray();
  }
}
