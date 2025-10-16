const dotenv = require('dotenv');
const http = require('http');
const app = require('./src/app');
const { connectDB, disconnectDB } = require('./src/config/db');

dotenv.config();

const PORT = process.env.PORT || 5000;

let shuttingDown = false;

async function startServer() {
  try {
    await connectDB();
    const server = http.createServer(app);
    server.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
    const closeConnections = async () => {
      if (shuttingDown) return;
      shuttingDown = true;
      await disconnectDB();
      server.close(() => process.exit(0));
    };
    process.on('SIGINT', closeConnections);
    process.on('SIGTERM', closeConnections);
    process.on('uncaughtException', (error) => {
      console.error('Uncaught exception, shutting down gracefully:', error);
      closeConnections();
    });
  } catch (error) {
    console.error('Failed to start server:', error.message);
    process.exit(1);
  }
}

startServer();