import prisma, { ensureDatabaseConnection } from './prisma';

// Build-time database connection wrapper
export class BuildTimeDatabase {
  private static isConnected = false;

  static async connect() {
    if (process.env.NODE_ENV === 'production' && process.env.VERCEL) {
      // During Vercel build, ensure we have a database connection
      this.isConnected = await ensureDatabaseConnection();
    } else {
      // In development or other environments, assume connection is available
      this.isConnected = true;
    }
    return this.isConnected;
  }

  static async query<T>(
    queryFn: () => Promise<T>,
    fallback: T
  ): Promise<T> {
    if (!this.isConnected) {
      await this.connect();
    }

    try {
      return await queryFn();
    } catch (error) {
      console.warn('Database query failed during build, using fallback:', error);
      return fallback;
    }
  }

  static async findUnique<T>(
    model: any,
    where: any,
    fallback: T | null = null
  ): Promise<T | null> {
    return this.query(
      () => model.findUnique({ where }),
      fallback
    );
  }

  static async findMany<T>(
    model: any,
    options: any = {},
    fallback: T[] = []
  ): Promise<T[]> {
    return this.query(
      () => model.findMany(options),
      fallback
    );
  }

  static async aggregate<T>(
    model: any,
    options: any,
    fallback: T
  ): Promise<T> {
    return this.query(
      () => model.aggregate(options),
      fallback
    );
  }
}

// Export a convenience function for common database operations
export const buildSafeQuery = async <T>(
  queryFn: () => Promise<T>,
  fallback: T
): Promise<T> => {
  return BuildTimeDatabase.query(queryFn, fallback);
}; 