import DateBase from "../config/db.config";

class UsersRepository {
  private database: DateBase;
  constructor() {
    this.database = new DateBase();
  }

  public insertData(personal, address, contact) {
    this.database.connection.beginTransaction((err) => {
      if (err) {
        throw err;
      }
      this.database.connection.query(
        "INSERT INTO DadosPessoais (name,username) VALUES (?,?)",
        personal,
        (err, result) => {
          if (err) {
            this.database.connection.rollback(() => {
              throw err;
            });
          }

          let pessoaId = result.insertId;
          address.unshift(pessoaId);
          contact.unshift(pessoaId);

          this.database.connection.query(
            "INSERT INTO DadosEndereco (pessoaId,street,suite,city,zipcode,lat,lng) VALUES (?,?,?,?,?,?,?)",
            address,
            (err, result) => {
              if (err) {
                this.database.connection.rollback(() => {
                  throw err;
                });
              }
              this.database.connection.query(
                "INSERT INTO DadosContato (pessoaId,email,phone,website,companybs,companycatchPhrase,companyname) VALUES (?,?,?,?,?,?,?)",
                contact,
                (err, result) => {
                  this.database.connection.commit((err) => {
                    if (err) {
                      this.database.connection.rollback(() => {
                        throw err;
                      });
                    }
                  });
                }
              );
            }
          );
        }
      );
    });
  }
}

export default UsersRepository;
