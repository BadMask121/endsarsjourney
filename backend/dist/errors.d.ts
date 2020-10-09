import { Response } from "express";
export default function (error: any): {
    status: string;
    code: number;
    error: any;
    message: string;
    data: unknown;
};
export declare const catchError: (err: any, res: Response, code?: number) => number;
export declare const succesRes: (message: string, res: Response, data?: object, meta?: any) => Response;
