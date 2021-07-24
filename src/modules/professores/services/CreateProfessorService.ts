import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IProfessoresRepository from "../repositories/IProfessoresRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

interface IRequest {
  nome: string;
  idade: number;
  matricula: string;
  usuario: string;
  senha: string;
}

@injectable()
class CreateProfessorService {
  constructor(
    @inject("ProfessoresRepository")
    private professoresRepository: IProfessoresRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ nome, idade, matricula, usuario, senha }: IRequest): Promise<any> {

    const matriculaBusca = await this.professoresRepository.findMatricula(matricula);

    if(matriculaBusca) {
      throw new AppError('Matrícula já existente. Insira uma nova matrícula para cadastro do aluno ');
    }

    const senhaHash = await this.hashProvider.generateHash(senha);

    const user = await this.professoresRepository.create(
      nome, 
      idade, 
      matricula, 
      usuario,
      senhaHash
    );

    return user;
  }
}

export default CreateProfessorService;
