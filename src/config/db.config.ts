import * as mysql from "mysql";

class DataBase {
  public connection: mysql.Connection;

  constructor() {
    this.connection = mysql.createConnection({
      host: process.env.HOST,
      user: process.env.USER,
      password: process.env.PASSWORD,
      database: process.env.DB,
    });
  }

  createConnection() {
    this.connection.connect();
    this.createDB();
  }

  closeConnection(message: string, callback: any) {
    this.connection.end(() => {
      console.log("Mysql foi desconectado pelo: " + message);
      callback();
    });
  }

  private createDB() {
    let sql = `CREATE DATABASE IF NOT EXISTS my_db;`;
    this.connection.query(sql);

    sql = `CREATE TABLE IF NOT EXISTS DadosPessoais ( 
      id int NOT NULL AUTO_INCREMENT, 
      name varchar(150) NOT NULL,
      username varchar(50),
      PRIMARY KEY (id)
      )`;
    this.connection.query(sql);

    sql = `CREATE TABLE IF NOT EXISTS DadosEndereco (
      id int NOT NULL AUTO_INCREMENT,
      pessoaId int NOT NULL,
      street varchar(150),
      suite varchar(50),
      city varchar(150),
      zipcode varchar(15),
      lat varchar(15),
      lng varchar(15),
      PRIMARY KEY (id),
      CONSTRAINT FK_Pessoais_End_Id FOREIGN KEY (pessoaId) REFERENCES DadosPessoais(id)
      )`;
    this.connection.query(sql);

    sql = `CREATE TABLE IF NOT EXISTS DadosContato (
      id int NOT NULL AUTO_INCREMENT, 
      pessoaId int NOT NULL,
      email varchar(150),
      phone varchar(50),
      website varchar(150),
      companybs varchar(200),
      companycatchPhrase varchar(200),
      companyname varchar(200), 
      PRIMARY KEY (id),
      CONSTRAINT FK_Pessoais_Cont_Id FOREIGN KEY (pessoaId) REFERENCES DadosPessoais(id)
      )`;
    this.connection.query(sql);
  }
}

export default DataBase;
