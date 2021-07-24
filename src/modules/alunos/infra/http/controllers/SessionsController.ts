import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import AuthenticateAlunoSerivce from "@modules/alunos/services/AuthenticateAlunoSerivce";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usuario, senha } = request.body;


    const authenticateAlunoSerivce = container.resolve(AuthenticateAlunoSerivce);
    
    const { usuarioBusca, token } = await authenticateAlunoSerivce.execute({
      usuario,
      senha,
    });

    delete usuarioBusca.senha;

    return response.json({ usuarioLogado: usuarioBusca, token });
  }
}
