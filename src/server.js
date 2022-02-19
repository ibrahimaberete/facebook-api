import express from 'express';
import DefaultRouter from './routes';

export const launch = ({ protocol, host, port }) => {
  const application = express();

  application.use(express.json());
  application.use(DefaultRouter);

  application.listen(
    port,
    () => console.log(`Server started at ${protocol}://${host}:${port}`),
  );
}
