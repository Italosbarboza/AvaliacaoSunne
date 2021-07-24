import { sign } from "jsonwebtoken";
import { injectable, inject } from "tsyringe";

import authConfig from "@config/auth";

import AppError from "@shared/errors/AppError";

import IHashProvider from "../providers/HashProvider/models/IHashProvider";
import IProfessoresRepository from "../repositories/IProfessoresRepository";

interface IRequest {
  usuario: string;
  senha: string;
}

@injectable()
class AuthenticateProfessorSerivce {
  constructor(
    @inject("ProfessoresRepository")
    private professoresRepository: IProfessoresRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) {}

  public async execute({ usuario, senha }: IRequest): Promise<any> {
    const usuarioBusca = await this.professoresRepository.findUsuario(usuario);

    if(!usuarioBusca) {
      throw new AppError('Usuário ou senha não existente. Por favor, digite um usuário ou senha válido ');
    }

    const passwordMatched = await this.hashProvider.compareHash(
      senha,
      usuarioBusca.senha,
    );

    if (!passwordMatched) {
      throw new AppError("Usuário ou senha incorreta.", 401);
    }

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: String(usuarioBusca._id),
      expiresIn,
    });

    return {
      usuarioBusca,
      token,
    };
  }
}

export default AuthenticateProfessorSerivce;
