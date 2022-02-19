import 'dotenv/config';
import { launch } from './server';

const main = () => {
  const {
    PROTOCOL = 'http',
    HOST = 'localhost',
    PORT = 8081,
  } = process.env;

  launch({
    protocol: PROTOCOL,
    host: HOST,
    port: PORT,
  });
}

main();
