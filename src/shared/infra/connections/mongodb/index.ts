import { Collection, Db, MongoClient, MongoClientCommonOption } from 'mongodb';

let collect: Collection<any>[];

const uri = 'mongodb+srv://sunneUser:NReqZPKQEpFvG1FJ@clusterdesafiosunne.fvsiy.mongodb.net/myFirstDatabase?authSource=admin&replicaSet=atlas-2qo9t4-shard-0&w=majority&readPreference=primary&appname=MongoDB%20Compass&retryWrites=true&ssl=true';

let bancoEducaSunn: Db;

export default class ConexaoMongo {

  constructor() {
    this.connect();
  }

  public async connect(): Promise<void> {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
      
      await client.connect();

      bancoEducaSunn = client.db("EducaSunn");

    } catch(ex) {
      console.log('Conexão recusada');
    }
  }

  public setBancoEducaSunn(): Db {
    return bancoEducaSunn;
  }
}


