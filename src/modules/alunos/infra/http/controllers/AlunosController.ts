import { Request, Response } from "express";
import { container } from "tsyringe";
import { classToClass } from "class-transformer";

import CreateAlunoService from "@modules/alunos/services/CreateAlunoService";
import FindTurmasService from "@modules/alunos/services/FindTurmasService";

export default class AlunosController {
  
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, idade, matricula, turmas, usuario, senha } = request.body;

    const createAluno = container.resolve(CreateAlunoService);

    const aluno = await createAluno.execute({
      nome,
      idade,
      matricula,
      turmas,
      usuario,
      senha
    });

    return response.json('Aluno criado com sucesso');
  }

  public async findTurmas(request: Request, response: Response): Promise<Response> {
    const id_aluno = request.user.id;
    
    const findTurma = container.resolve(FindTurmasService);

    const turmas = await findTurma.execute({
      id_aluno,
    });


  return response.json(turmas);
  }

}
