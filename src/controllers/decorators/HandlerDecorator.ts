import { Request, Response } from 'express';

import Controller from '../Controller';

export type Handler = (request: Request, response: Response) => Promise<void>;
export type HandlerDecorator = (
    target: Handler,
    context: ClassMethodDecoratorContext<Controller, Handler>
) => Handler;
