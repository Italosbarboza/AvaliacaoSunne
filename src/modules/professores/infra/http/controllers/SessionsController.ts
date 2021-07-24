import { Request, Response } from "express";
import { container } from "tsyringe";

import AuthenticateProfessorSerivce from "@modules/professores/services/AuthenticateProfessorSerivce";

export default class SessionsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { usuario, senha } = request.body;

    const authenticateProfessorSerivce = container.resolve(AuthenticateProfessorSerivce);
    
    const { usuarioBusca, token } = await authenticateProfessorSerivce.execute({
      usuario,
      senha,
    });

    delete usuarioBusca.senha;

    return response.json({ usuarioLogado: usuarioBusca, token });
  }
}
