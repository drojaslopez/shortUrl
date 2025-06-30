import express from "express";

import urlRoute from "../module/url/router";
const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/url", urlRoute);
export default app;
