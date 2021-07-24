import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IAlunosRepository from "../repositories/IAlunosRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  id_aluno: string;
}

@injectable()
class FindTurmasService {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ id_aluno }: IRequest): Promise<any> {

    const turmaAluno = await this.alunosRepository.findTurmasAluno(id_aluno);

    if(!turmaAluno) {
      throw new AppError('O aluno não está matriculado em nenhuma turma ');
    }

    const turmaBusca = await this.alunosRepository.findTurmasAlunoDescricao(turmaAluno);

    return turmaBusca;
  }
}

export default FindTurmasService;
