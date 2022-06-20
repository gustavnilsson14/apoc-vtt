import express from "express";
import * as http from "http";
import * as WebSocket from "ws";
import { App } from "./src/app";
import { DataStoreHandler, LocalDataStore } from "./src/data";
import { MyLoader } from "./src/loader";
import { EventPipeline } from "../shared/event";
import Timer = NodeJS.Timer;
new EventPipeline();
new DataStoreHandler(new LocalDataStore("./data.json"));
new MyLoader();
const app = express();

const server = http.createServer(app);

const wss = new WebSocket.Server({ server });

const serverApp: App = new App();

wss.on("connection", (ws: WebSocket) => {
  serverApp.addClient(ws);
});

server.listen(8080, () => {
  console.log(`Server started on port: 8080`);
});
