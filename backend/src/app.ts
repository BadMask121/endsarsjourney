"use strict";
import "./config";

import cookieParser from "cookie-parser";
import cors from "cors";
import express, { Request, Response } from "express";
import logger from "morgan";
import timeout from "connect-timeout";

import tweetRoute from "./tweet/routes/tweet";

import { corsOption } from "./config-cors";
import stream from "./tweet/stream";

// stream tweets and store to database only set notification to true if you want data retrived realtime via pusher
stream({ withNotification: false });

const app = express();
app.use(cors(corsOption));
app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(timeout("60s"));

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
