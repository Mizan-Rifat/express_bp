import { DatabaseService } from '../../services/database.service';
import { RedisService } from '../../services/redis.service';

export class UserService {
  private dbService = DatabaseService.getInstance();
  private redisService = RedisService.getInstance();

  async getAllUsers() {
    const db = this.dbService.getDb();

    return await db.collection('users').find().skip(0).limit(10).toArray();
  }
}
