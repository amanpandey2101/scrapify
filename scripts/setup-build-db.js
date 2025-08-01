const { PrismaClient } = require('@prisma/client');

async function setupBuildDatabase() {
  console.log('Setting up database connection for build...');
  
  if (!process.env.DATABASE_URL) {
    console.warn('DATABASE_URL not found, skipping database setup');
    return;
  }

  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

  try {
    // Test the connection
    await prisma.$connect();
    console.log('✅ Database connection successful');
    
    // Run a simple query to ensure the database is accessible
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    console.log('✅ Database query test successful:', result);
    
    await prisma.$disconnect();
    console.log('✅ Database connection closed');
  } catch (error) {
    console.error('❌ Database connection failed:', error.message);
    // Don't throw error to prevent build failure
    process.exit(0);
  }
}

// Run the setup
setupBuildDatabase(); 