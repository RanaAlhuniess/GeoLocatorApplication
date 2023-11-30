import 'dotenv/config';
import 'reflect-metadata';
import {container, Logger, serverConfig, serverErrorConfig} from "./config";
import {InversifyExpressServer} from "inversify-express-utils";
import './controllers/address.controller';

const port = process.env.PORT ? parseInt(process.env.PORT) : 8000;


// process.on("SIGTERM", function () {
//   console.log(`SIGTERM signal received: closing HTTP server.`);
//   process.exit();
// });
//
// process.on("SIGINT", function () {
//   console.log(`SIGINT signal received: closing HTTP server.`);
//   process.exit();
// });


export async function Bootstrap() {
    const server = new InversifyExpressServer(container);
    server.setConfig(serverConfig);
    server.setErrorConfig(serverErrorConfig);

    const app = server.build();
    app.listen(port, () =>
        new Logger().info(`Express Server initiated listening on port ${port}`)
    );
}

Bootstrap();
