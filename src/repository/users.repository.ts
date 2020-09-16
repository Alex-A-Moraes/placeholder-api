import DateBase from '../config/database.config';

class UsersRepository {
    private database: DateBase;
    constructor() {
        this.database = new DateBase();
    }

    public insertData(personal, address, contact) {
        return new Promise((resolve, reject) => {
            this.database.connection.beginTransaction((err) => {
                if (err) {
                    return reject(err);
                }
                this.database.connection.query(
                    'INSERT INTO DadosPessoais (name,username) VALUES (?,?)',
                    personal,
                    (err, result) => {
                        if (err) {
                            this.database.connection.rollback(() => {
                                return reject(err);
                            });
                        }

                        let pessoaId = result.insertId;
                        address.unshift(pessoaId);
                        contact.unshift(pessoaId);

                        this.database.connection.query(
                            'INSERT INTO DadosEndereco (pessoaId,street,suite,city,zipcode,lat,lng) VALUES (?,?,?,?,?,?,?)',
                            address,
                            (err, result) => {
                                if (err) {
                                    this.database.connection.rollback(() => {
                                        return reject(err);
                                    });
                                }
                                this.database.connection.query(
                                    'INSERT INTO DadosContato (pessoaId,email,phone,website,companybs,companycatchPhrase,companyname) VALUES (?,?,?,?,?,?,?)',
                                    contact,
                                    (err, result) => {
                                        this.database.connection.commit((err) => {
                                            if (err) {
                                                this.database.connection.rollback(() => {
                                                    return reject(err);
                                                });
                                            }
                                            return resolve(result);
                                        });
                                    },
                                );
                            },
                        );
                    },
                );
            });
        });
    }
}

export default UsersRepository;
