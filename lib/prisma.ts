import { PrismaClient } from "@prisma/client";

const prismaClientSingleton = () => {
  return new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });
};

declare const globalThis: {
  prismaGlobal: ReturnType<typeof prismaClientSingleton>;
} & typeof global;

const prisma = globalThis.prismaGlobal ?? prismaClientSingleton();

// Add build-time database connection handling
export const ensureDatabaseConnection = async () => {
  if (!process.env.DATABASE_URL) {
    console.warn("DATABASE_URL not found, skipping database operations during build");
    return false;
  }

  try {
    await prisma.$connect();
    console.log("Database connected successfully");
    return true;
  } catch (error) {
    console.warn("Failed to connect to database during build:", error);
    return false;
  }
};

// Disconnect function for cleanup
export const disconnectDatabase = async () => {
  try {
    await prisma.$disconnect();
  } catch (error) {
    console.warn("Error disconnecting from database:", error);
  }
};

export default prisma;

if (process.env.NODE_ENV !== "production") globalThis.prismaGlobal = prisma;
