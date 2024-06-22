import express, { Application, Request, Response } from "express";
import cors from "cors";
import router from "./app/routes";
import globalErrorHandler from "./app/middlewares/globalErrorHandler";

const app: Application = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

app.get("/", (_req: Request, res: Response) => {
  res.send("Welcome to Car Rental Reservation System Backend!");
});

app.use(globalErrorHandler);

export default app;
