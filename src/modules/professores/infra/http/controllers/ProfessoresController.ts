import { Request, Response } from "express";
import { container } from "tsyringe";

import CreateProfessorService from "@modules/professores/services/CreateProfessorService";
import CreateTurmaService from "@modules/professores/services/CreateTurmaService";
import FindAlunoPorTurmaService from "@modules/professores/services/FindAlunoPorTurmaService";

export default class ProfessoresController {
  
  public async create(request: Request, response: Response): Promise<Response> {
    const { nome, idade, matricula, usuario, senha } = request.body;

    const createProfessor = container.resolve(CreateProfessorService);

    const professor = await createProfessor.execute({
      nome,
      idade,
      matricula,
      usuario,
      senha
    });

    return response.json('Professor criado com sucesso');
  }


  public async createTurma(request: Request, response: Response): Promise<Response> {
    const { codigo_turma, nome_turma } = request.body;

    const professorId = request.user.id;

    const createTurma = container.resolve(CreateTurmaService);

    const turma = await createTurma.execute({
      codigo_turma, 
      nome_turma,
      professorId,
    });

    return response.json('Turma criado com sucesso');
  }

  public async getAlunosPorTurma(request: Request, response: Response): Promise<Response> {
    const { skip, limit, keyword } = request.query;

    const professorId = request.user.id;

    const findAlunoPorTurmaService = container.resolve(FindAlunoPorTurmaService);

    const turmas = await findAlunoPorTurmaService.execute({ skip, limit, keyword });

    return response.json(turmas);
  }

}
