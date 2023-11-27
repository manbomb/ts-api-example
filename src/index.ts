import express from 'express';

import Router from './router';

import HealthController from './controllers/Health';

(async () => {
    const port = process.env.PORT || 3000;
    const httpServer = express();

    httpServer.use(express.json());
    httpServer.use(express.urlencoded({ extended: true }));

    const healthController = new HealthController();

    const router = new Router(httpServer, healthController);

    router.init();

    httpServer.listen(port, () => {
        console.log(`Listening on port: ${port}`);
    });
})();
