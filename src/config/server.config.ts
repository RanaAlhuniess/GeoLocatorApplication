import {Application, json, NextFunction, Request, Response, urlencoded} from "express";
import {BaseException, InternalServerException} from "./exception.config";

export async function serverConfig(app: Application) {
    app.use(urlencoded({
        extended: true,
    }));
    app.use(json());
}


export function serverErrorConfig(app: Application) {
    app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
        if (err && err instanceof BaseException) {
            return res.status(err.statusCode).json(err);
        }

        if (err) {
            return res.status(500).json(new InternalServerException(err.message));
        }

        next();
    });
}
