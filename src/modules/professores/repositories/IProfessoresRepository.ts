export default interface IProfessoresRepository {
    findMatricula(matricula: string): Promise<any>;
    findCodigoTurma(codigo_turma: number): Promise<any>;
    findUsuario(usuario: string): Promise<any>;
    create(nome: string,  idade: number, matricula: string, usuario: string, senhaHash: string): Promise<any>;
    createTurma(codigo_turma: number,nome_turma: string,  professorId: string): Promise<any>;
    findAlunosPorTurma(skip: number, limit: number, keyword: string): Promise<any>;
}
