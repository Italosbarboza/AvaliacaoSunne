import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import authMiddleware from "../middlewares/auth";
import AlunosController from "../controllers/AlunosController";

const alunosRouter = Router();
const alunosController = new AlunosController();

alunosRouter.use(authMiddleware);

alunosRouter.get("/turmas", alunosController.findTurmas);

alunosRouter.post(
  "/",
  celebrate({
    [Segments.BODY]: {
      nome: Joi.string().required(),
      idade: Joi.number().required(),
      matricula: Joi.string().required(),
      turmas: Joi.array(),
      usuario: Joi.string().required(),
      senha: Joi.string().required()
    },
  }),
  alunosController.create,
);

export default alunosRouter;
