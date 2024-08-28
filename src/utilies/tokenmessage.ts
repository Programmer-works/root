import {Response}  from "express";

export function tokenmessage(res: Response, status: number, messg: string,data:any,token:string): void {
    res.status(status).json({
        message: messg,
        datas:data,
        token:token
    });
}