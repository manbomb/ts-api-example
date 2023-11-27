import { Request, Response } from 'express';

import Controller from './Controller';

export default class HealthController extends Controller {
    constructor() {
        super();
    }

    async handle(request: Request, response: Response): Promise<void> {
        response.sendStatus(200);
    }
}
