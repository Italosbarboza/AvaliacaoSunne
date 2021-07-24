import IProfessoresRepository from "@modules/professores/repositories/IProfessoresRepository";
import ConexaoMongo from "@shared/infra/connections/mongodb";
import { ObjectId } from "mongodb";
import { container } from "tsyringe";

interface TurmasPorAlunos {
    "tuma": string,
    "codigoTurma": number,
    "alunos": [{
        "nome": string,
        "idade": number,
        "matricula": string
    }]
}

class ProfessoresRepository implements IProfessoresRepository {

    private conexaoMongo: ConexaoMongo;
    private turmas: ConexaoMongo;

    constructor() {
        this.conexaoMongo = container.resolve(ConexaoMongo);
    }

    public async findMatricula(matricula: string): Promise<any> {
        const Buscamatricula = await this.conexaoMongo.setBancoEducaSunn().collection('professor').findOne({"matricula": matricula});
        
        return Buscamatricula;
    };

    public async findCodigoTurma(codigo_turma: number): Promise<any> {
        const turmaCod = await this.conexaoMongo.setBancoEducaSunn().collection('turmas').findOne({"codigoTurma": codigo_turma});
        
        return turmaCod;
    };

    public async findAlunosPorTurma(skip: number, limit: number, keyword: string): Promise<any> {
       
        const take = skip || 0;
        const porPagina = limit || 10;
        // variáveis do filtro
        const bkeyword = keyword || "";

        let turmas: any;

        if(bkeyword !== "") {
            turmas = await this.conexaoMongo.setBancoEducaSunn().collection('turmas').find({"nomeTurma": {'$regex': bkeyword}}).skip(take).limit(Number(porPagina)).toArray();
          } else {
             turmas = await this.conexaoMongo.setBancoEducaSunn().collection('turmas').find().skip(take).limit(Number(porPagina)).toArray();
          }
        return turmas;
    };

    public async findUsuario(usuario: string): Promise<any> {
        const buscaUsuario = await this.conexaoMongo.setBancoEducaSunn().collection('professor').findOne({"usuario": usuario});

        return buscaUsuario;
    };
  
    public async create(nome: string,  idade: number, matricula: string, usuario: string, senhaHash: string): Promise<any> {
        const alunoInserido = await this.conexaoMongo.setBancoEducaSunn().collection('professor').insertOne({
            "nome": nome,
            "idade": idade,
            "matricula": matricula,
            "usuario": usuario,
            "senha": senhaHash
        });

        return alunoInserido.ops[0];
    };

    public async createTurma(codigo_turma: number, nome_turma: string,  professorId: string): Promise<any> {
        const professor = await this.conexaoMongo.setBancoEducaSunn().collection('professor').findOne({ '_id': new ObjectId(professorId) });

        const alunoInserido = await this.conexaoMongo.setBancoEducaSunn().collection('turmas').insertOne({
            "codigoTurma": codigo_turma,
            "nomeTurma": nome_turma,
            "idProfessor": professorId,
            "nome_professor": professor.nome,
            "alunos": []
        });

        return alunoInserido.ops[0];
    };


}
export default ProfessoresRepository;

