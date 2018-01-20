import dotenv from 'dotenv';
import logger from 'winston';
import express from 'express';
import http from 'http';

dotenv.config();

logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
  colorize: true,
});
logger.level = 'debug';

const app = express();
app.listen(process.env.PORT, () => {
  logger.info(`Web server listening in port ${process.env.PORT}`);
});

app.get('/', (request, response) => {
  response.sendStatus(200);
});

// Require instead of import to avoid hoisting. We need this to run last
require('./db');
require('./main');

if (process.env.KEEP_AWAKE_URL) {
  setInterval(() => {
    http.get(process.env.KEEP_AWAKE_URL);
  }, 40000);
}
