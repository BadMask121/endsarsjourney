"use strict";
import "./config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import logger from "morgan";
import tweetRoute from "./tweet/routes/tweet";

import { corsOption } from "./config-cors";
// import stream from "./tweet/stream";

// stream({ withNotification: true });
const app = express();
app.use(cors(corsOption));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

//[ROUTES]
app.use("/tweets", tweetRoute);

// Start the server
const PORT = process.env.PORT || 8080;

//@ts-ignore
app.use((req: Request, res: Response) => {
  res.status(403).send("Route not found").end();
});

app.listen(PORT, () => {
  console.log(
    `App listening on port ${PORT} for ${process.env.NODE_ENV} environment`
  );
  console.log("Press Ctrl+C to quit.");
});
// [END gae_flex_quickstart]
export default app;
