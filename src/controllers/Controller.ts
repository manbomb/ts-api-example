import { Request, Response } from 'express';
import { ZodError, ZodIssue } from 'zod';

import HttpError from './HttpError';

export default abstract class Controller {
    abstract handle(request: Request, response: Response): Promise<void>;

    async secureHandle(request: Request, response: Response): Promise<void> {
        try {
            await this.handle(request, response);
        } catch (error) {
            if (error instanceof HttpError) {
                response.status(error.statusCode).json({
                    message: error.message
                });
                return;
            }
            if (error instanceof ZodError) {
                response.status(400).json({
                    message: `Invalid request: ${this.formatZodIssue(
                        error.errors[0]
                    )}`
                });
                return;
            }
            console.log('error > ', error);
            response.status(500).json({
                message: 'Internal server error'
            });
            return;
        }
    }

    protected getQueryNumber(req: Request, param: string): number | undefined {
        const string = this.getQueryString(req, param);
        const number = Number(string);
        if (isNaN(number)) return undefined;
        return number;
    }

    protected getQueryString(req: Request, param: string): string | undefined {
        return req.query[param] ? String(req.query[param]) : undefined;
    }

    private formatZodIssue(issue: ZodIssue): string {
        return `(code: ${issue.code}) ${issue.fatal ? 'FATAL' : ''} ${
            issue.message
        } path: ${issue.path.join('.')} ${issue['expected'] ? 'expected: '+issue['expected'] : ''} ${issue['received'] ? 'received: '+issue['received'] : ''}`;
    }
}