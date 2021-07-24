import { Router } from "express";

import alunosRouter from "@modules/alunos/infra/http/routes/alunos.routes";
import sessionsAlunosRouter from "@modules/alunos/infra/http/routes/sessions.routes";
import professoresRouter from "@modules/professores/infra/http/routes/professores.routes";
import sessionsProfessoresRouter from "@modules/professores/infra/http/routes/sessions.routes";


const routes = Router();

routes.use("/api/alunos", alunosRouter);
routes.use("/api/professores", professoresRouter);
routes.use("/api/sessions/alunos", sessionsAlunosRouter);
routes.use("/api/sessions/professores", sessionsProfessoresRouter);

export default routes;
