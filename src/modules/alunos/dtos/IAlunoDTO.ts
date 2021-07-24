import { ObjectId } from "mongodb";

export default interface IAlunoDTO {
  _id: ObjectId;
  nome: string;
  idade: number;
  matricula: string;
}
