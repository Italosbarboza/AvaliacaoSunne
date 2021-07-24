import { injectable, inject } from "tsyringe";

import AppError from "@shared/errors/AppError";
import IAlunosRepository from "../repositories/IAlunosRepository";
import IHashProvider from "../providers/HashProvider/models/IHashProvider";

import IAlunoDTO from "../dtos/IAlunoDTO";

interface IRequest {
  nome: string;
  idade: number;
  matricula: string;
  turmas: number[];
  usuario: string;
  senha: string;
}

@injectable()
class CreateAlunoService {
  constructor(
    @inject("AlunosRepository")
    private alunosRepository: IAlunosRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ nome, idade, matricula, turmas, usuario, senha }: IRequest): Promise<any> {

    const matriculaBusca = await this.alunosRepository.findMatricula(matricula);

    if(matriculaBusca) {
      throw new AppError('Matrícula já existente. Insira uma nova matrícula para cadastro do aluno ');
    }

    const usuarioBusca = await this.alunosRepository.findUsuario(usuario);

    if(usuarioBusca) {
      throw new AppError('Usuário já existente. Insira uma novo usuário para cadastro do aluno ');
    }

    const tumaBusca = await this.alunosRepository.findTurmas(turmas);

    if(tumaBusca) {
      throw new AppError('Insira apenas turmas existentes. ');
    }

    //const cadastroAlunoTurma = await this.alunosRepository.findTurmasAluno(turmas);
    // Por enquanto vamos supor que todas as turmas o aluno não está cadastrado E foi cadastrado no AlunoTurma( Precisa do id do aluno)

    const senhaHash = await this.hashProvider.generateHash(senha);

    const user = await this.alunosRepository.create(
      nome, 
      idade, 
      matricula, 
      usuario,
      turmas,
      senhaHash
    );

    const objAluno: IAlunoDTO = {
      "_id": user._id,
      "nome": user.nome,
      "idade": user.idade,
      "matricula": user.matricula
    }

    const inserirTurmaAluno = await this.alunosRepository.createAlunoTurma(objAluno, turmas);

    return user;
  }
}

export default CreateAlunoService;
