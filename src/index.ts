import { Express } from 'express';

import HealthController from './controllers/Health';
export default class Router {
    constructor(
        readonly httpServer: Express,
        private readonly healthController: HealthController
    ) {}

    async init() {
        this.httpServer.all('/', (req, res) =>
            this.healthController.secureHandle(req, res)
        );
    }
}
