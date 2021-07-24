import { string } from "@hapi/joi";
import IAlunoDTO from "@modules/alunos/dtos/IAlunoDTO";
import IAlunosRepository from "@modules/alunos/repositories/IAlunosRepository";
import ConexaoMongo from "@shared/infra/connections/mongodb";
import { ObjectId } from "mongodb";
import { container } from "tsyringe";

interface Obj {
    "codigo_turma": string;
    "nome_turma": string;
    "professor"?: string | null;
}



class AlunosRepository implements IAlunosRepository {

    private conexaoMongo: ConexaoMongo;
    private turmasAlunoComProfessor: Array<Obj> = [];


    constructor() {
        this.conexaoMongo = container.resolve(ConexaoMongo);
    }

    public async findMatricula(matricula: string): Promise<any> {
        const Buscamatricula = await this.conexaoMongo.setBancoEducaSunn().collection('aluno').findOne({"matricula": matricula});
        
        return Buscamatricula;
    };

    public async findTurmasAluno(id_aluno: string): Promise<number[] | []> {
        const turmasPorAluno = await this.conexaoMongo.setBancoEducaSunn().collection('alunoTurma').find({"id_usuario": new ObjectId(id_aluno)}).toArray();

        return turmasPorAluno;
    };

    public async findUsuario(usuario: string): Promise<any> {
        const buscaUsuario = await this.conexaoMongo.setBancoEducaSunn().collection('aluno').findOne({"usuario": usuario});

        return buscaUsuario;
    };

    public async findTurmas(turmas: number[]): Promise<any> {
        const turmasBanco = await this.conexaoMongo.setBancoEducaSunn().collection('aluno').find().toArray();

        let turmaRepetida: Boolean = false;

        turmas.forEach(t => { turmasBanco.forEach(tur => { if(tur.codigoTurma === t) { turmaRepetida = true } })});
        
        return turmaRepetida;
    };
    

    public async findTurmasAlunoDescricao(turmas: number[]): Promise<any> {
        let turmasDoAluno: Array<any> = [];

        const idTurmas: number[] = [];

        const turmasSearch = await this.conexaoMongo.setBancoEducaSunn().collection('turmas').find().toArray();
        
        turmas.forEach(t => { turmasSearch.forEach(tur => { if(tur.codigoTurma === t.codigo_turma) { 
            const obj = {
                "codigo_turma": tur.codigoTurma,
                "nome_turma": tur.nomeTurma,
                "id_professor": tur.idProfessor,
                "nome_professor": null
            }
            
        turmasDoAluno.push(obj) } })});

        const professor = await this.conexaoMongo.setBancoEducaSunn().collection('professor').find().toArray();

        turmasDoAluno.forEach(t => { 
            professor.forEach(a => { if(t.id_professor == a._id) { 

            t.nome_professor = a.nome } }) });

        return turmasDoAluno;
  
    };

    public async create(nome: string,  idade: number, matricula: string, usuario: string, turmas: number[] , senhaHash: string): Promise<any> {
        const alunoInserido = await this.conexaoMongo.setBancoEducaSunn().collection('aluno').insertOne({
            "nome": nome,
            "idade": idade,
            "matricula": matricula,
            "usuario": usuario,
            "turmas": turmas,
            "senha": senhaHash
        });

        return alunoInserido.ops[0];
    };

    public async createAlunoTurma(objAluno: IAlunoDTO, turmas: number[]): Promise<any> {

        turmas.forEach(async t => { await this.conexaoMongo.setBancoEducaSunn().collection('alunoTurma').insertOne({
                "id_usuario": objAluno._id,
                "codigo_turma": t,
            }) });

            
             
        turmas.forEach(async t => { await this.conexaoMongo.setBancoEducaSunn().collection('turmas').update(
           {"codigoTurma": t},
           {"$push" : { "alunos":  objAluno }}
        )})
        
        
        return true;
    }
}

export default AlunosRepository;
