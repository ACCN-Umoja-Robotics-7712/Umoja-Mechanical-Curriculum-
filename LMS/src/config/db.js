const mongoose = require('mongoose');
const { MongoMemoryServer } = require('mongodb-memory-server');

let memoryServer;

async function connectDB() {
  const mongoUri = process.env.MONGO_URI;

  mongoose.set('strictQuery', true);

  // Try configured MongoDB first, fall back to memory server
  if (mongoUri && mongoUri.trim()) {
    try {
      await mongoose.connect(mongoUri, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 3000,
      });
      console.log('✅ MongoDB connected');
      return;
    } catch (error) {
      console.warn('⚠️  MongoDB connection failed, falling back to in-memory database');
      console.warn(`   Reason: ${error.message}`);
    }
  }

  // Fall back to in-memory MongoDB
  try {
    console.log('🔄 Starting in-memory MongoDB server...');
    memoryServer = await MongoMemoryServer.create();
    const uri = memoryServer.getUri();
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('✅ MongoDB Memory Server connected (data will not persist)');
  } catch (error) {
    console.error('❌ Database connection error:', error.message);
    throw error;
  }
}

async function disconnectDB() {
  await mongoose.disconnect();
  if (memoryServer) {
    await memoryServer.stop();
  }
}

module.exports = {
  connectDB,
  disconnectDB,
};
