import "dotenv/config";
import { handler } from "../build-client/handler.js";

import express from "express";
const port = 3000;
const app = express();

let state = 0;

const unless = function (path: any, middleware: any) {
  return function (req: any, res: any, next: any) {
    if (path === req.path) {
      return next();
    } else {
      return middleware(req, res, next);
    }
  };
};

// add a route that lives separately from the SvelteKit app
app.get("/test", (params) => {
  const { res } = params;
  state++;
  res?.send(String(state));
});

// let SvelteKit handle everything else, including serving prerendered pages and static assets
app.use(unless("/test", handler));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
