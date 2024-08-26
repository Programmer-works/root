
import {Response}  from "express";

export function errormessage(res: Response, status: number, messg: string): void {
    res.status(status).json({
        message: messg
    });
}