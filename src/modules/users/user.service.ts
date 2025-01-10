import { DatabaseService } from '../../services/database.service';
import { RedisService } from '../../services/redis.service';

export class UserService {
  private dbService = DatabaseService.getInstance();
  private redisService = RedisService.getInstance();

  async getAllUsers() {
    const db = this.dbService.getDb();
    const redisClient = this.redisService.getClient();

    // Check if the data is already in the cache
    const cachedData = await redisClient.get('name');
    if (cachedData) {
      return cachedData;
    }
    return await db.collection('users').find().toArray();
  }
}
