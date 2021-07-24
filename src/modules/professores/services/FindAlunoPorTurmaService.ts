import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IProfessoresRepository from "../repositories/IProfessoresRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  skip: number;
  limit: number;
  keyword: string;
}

@injectable()
class FindAlunoPorTurmaService {
  constructor(
    @inject("ProfessoresRepository")
    private professoresRepository: IProfessoresRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ skip, limit, keyword }: IRequest): Promise<any> {

    const turmasPorAlunos = await this.professoresRepository.findAlunosPorTurma(skip, limit, keyword);

    return turmasPorAlunos;
  }

}

export default FindAlunoPorTurmaService;
