import "reflect-metadata";
import "dotenv/config";
import { container } from "tsyringe";

import express, { Request, Response, NextFunction } from "express";
import { errors } from "celebrate";
import "express-async-errors";
import cors from "cors";

import ConexaoMongo from "../connections/mongodb/index";

import AppError from "@shared/errors/AppError";
import routes from "./routes";

import "@shared/container";

const app = express();

const conexaoMongo = container.resolve(ConexaoMongo);

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(errors());

app.use((err: Error, request: Request, response: Response, _: NextFunction) => {
  if (err instanceof AppError) {
    return response.status(err.statusCode).json({
      status: "error",
      message: err.message,
    });
  }

  console.error(err);

  return response.status(500).json({
    status: "error",
    message: "Internal server error",
  });
});

app.listen(3333, () => {
  console.log("🚀 Server started on port 3333!");
});
