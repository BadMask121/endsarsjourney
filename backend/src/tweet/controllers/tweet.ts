import { Request, Response } from "express";
import { query, validationResult } from "express-validator";

import { catchError, succesRes } from "../../errors";
import * as tweetService from "../services/tweet";

export const getTweets = async (req: Request, res: Response) => {
  try {
    await query("tag").isString().optional().run(req);

    const result = validationResult(req);
    if (!result.isEmpty()) {
      catchError(result.array(), res);
      return;
    }
    const tag = req.query?.tag as string;
    const tweetsResults = await tweetService.getAllTweets(tag);
    succesRes("success", res, tweetsResults);
    return;
  } catch (error) {
    console.error(error);
    catchError(error.message, res);
    return;
  }
};
