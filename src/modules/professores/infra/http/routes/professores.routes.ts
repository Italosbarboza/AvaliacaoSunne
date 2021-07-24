import { Router } from "express";
import { celebrate, Segments, Joi } from "celebrate";

import authMiddleware from "../middlewares/auth";

import ProfessoresController from "../controllers/ProfessoresController";

const professoresRouter = Router();
const professoresController = new ProfessoresController();

professoresRouter.use(authMiddleware);

professoresRouter.get( "/", professoresController.getAlunosPorTurma);

professoresRouter.post(
    "/",
    celebrate({
      [Segments.BODY]: {
        nome: Joi.string().required(),
        idade: Joi.number().required(),
        matricula: Joi.string().required(),
        usuario: Joi.string().required(),
        senha: Joi.string().required()
      },
    }),
    professoresController.create,
);


professoresRouter.post(
  "/turma",
  celebrate({
    [Segments.BODY]: {
      codigo_turma: Joi.number().required(),
      nome_turma: Joi.string().required()
    },
  }),
  professoresController.createTurma,
);

export default professoresRouter;
