import {Response}  from "express";

export function successmessage(res: Response, status: number, messg: string,data:any): void {
    res.status(status).json({
        message: messg,
        datas:data
    });
}