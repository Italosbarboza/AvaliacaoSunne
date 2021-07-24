import IAlunoDTO from "../dtos/IAlunoDTO";

export default interface IAlunosRepository {
    findMatricula(matricula: string): Promise<any>;
    findUsuario(usuario: string): Promise<any>;
    findTurmas(tumas: number[]): Promise<any>;
    findTurmasAluno(id_aluno: string): Promise<number[] | []>;
    findTurmasAlunoDescricao(turmaAluno: number[]): Promise<any>;
    create(nome: string,  idade: number, matricula: string, usuario: string, turmas: number[], senhaHash: string): Promise<any>;
    createAlunoTurma(objAluno: IAlunoDTO, turmas: number[]): Promise<any>;
}
