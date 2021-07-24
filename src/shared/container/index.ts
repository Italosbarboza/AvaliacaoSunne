import { container } from "tsyringe";

import IProfessoresRepository from "@modules/professores/repositories/IProfessoresRepository";
import ProfessoresRepository from "@modules/professores/infra/database/repositories/ProfessoresRepository";

import IAlunosRepository from "@modules/alunos/repositories/IAlunosRepository";
import AlunosRepository from "@modules/alunos/infra/database/repositories/AlunosRepository";
import IHashProvider from "@modules/alunos/providers/HashProvider/models/IHashProvider";
import BCryptHashProvider from "@modules/alunos/providers/HashProvider/implementations/BCryptHashProvider";


container.registerSingleton<IHashProvider>(
  "HashProvider",
  BCryptHashProvider,
);


container.registerSingleton<IProfessoresRepository>(
  "ProfessoresRepository",
  ProfessoresRepository,
);

container.registerSingleton<IAlunosRepository>(
  "AlunosRepository",
  AlunosRepository,
);