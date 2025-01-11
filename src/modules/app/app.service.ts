import { DatabaseService } from '../../services/database.service';

export class AppService {
  private dbService = DatabaseService.getInstance();

  async getData(query: any) {
    const {
      rating,
      text,
      startBirthDate,
      endBirthDate,
      education_ranking,
      page = '1',
      limit = '10'
    } = query;
    const db = this.dbService.getDb();
    const collection = db.collection('resumes');

    try {
      const filters: any = {};

      if (rating) {
        filters.randomRating = { $gte: parseFloat(rating as string) };
      }

      if (text) {
        filters.TextSearchString = { $regex: text, $options: 'i' };
      }

      if (startBirthDate || endBirthDate) {
        filters.dateOfBirth = {};
        if (startBirthDate) {
          filters.dateOfBirth.$gte = new Date(startBirthDate as string);
        }
        if (endBirthDate) {
          filters.dateOfBirth.$lte = new Date(endBirthDate as string);
        }
      }

      if (education_ranking) {
        filters['education'] = {
          $elemMatch: {
            ranking: { $gt: parseInt(education_ranking as string, 10) }
          }
        };
      }

      // const filter = {
      //   education: { $elemMatch: { ranking: { $gt: parseInt(education_ranking as string, 10) } } }
      // };

      const pageNumber = parseInt(page as string, 10);
      const pageSize = parseInt(limit as string, 10);
      const skip = (pageNumber - 1) * pageSize;

      console.log({ skip, pageSize, filters });

      const results = await collection.find(filters).skip(skip).limit(pageSize).toArray();

      // const total = await collection.countDocuments(filters);

      return {
        data: results,
        pagination: {
          // total,
          page: pageNumber,
          limit: pageSize
          // totalPages: Math.ceil(total / pageSize)
        }
      };
    } catch (error) {
      console.log({ error });
    }
  }
}
