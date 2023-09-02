import { Request, Response, NextFunction } from "express"

const bigPromise = (func: any) => (req: Request, res: Response, next: NextFunction) =>
    Promise.resolve(func(req, res, next)).catch(next);



export default bigPromise