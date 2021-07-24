import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IProfessoresRepository from "../repositories/IProfessoresRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
    codigo_turma: number; 
    nome_turma: string;
    professorId: string;
}

@injectable()
class CreateTurmaService {
  constructor(
    @inject("ProfessoresRepository")
    private professoresRepository: IProfessoresRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({  codigo_turma, nome_turma, professorId }: IRequest): Promise<any> {
    
    const turmaCodigo = await this.professoresRepository.findCodigoTurma(codigo_turma);

    if(turmaCodigo) {
      throw new AppError('Turma com código já existente. Por favor, inserir um novo código ');
    }
    

    const turma = await this.professoresRepository.createTurma(
      codigo_turma,
      nome_turma, 
      professorId
    );

    return turma;
  }
}

export default CreateTurmaService;
