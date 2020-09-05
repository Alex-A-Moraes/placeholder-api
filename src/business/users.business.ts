import LogSystem from "../log/LogSystem";

class UsersBusiness {
  private data: any;

  constructor(data: any) {
    if (!data || data.length < 1) {
      LogSystem.Error("Erro: Objeto vazio!");
      throw new Error("Erro: Objeto vazio!");
    }
    this.data = data;
  }

  get() {
    return this.data;
  }

  filterSuite() {
    this.data = this.data.filter(
      (d: any) => d.address.suite.toUpperCase().indexOf("SUITE") > -1
    );
  }

  getPersonal(user: any) {
    return [user.name, user.username];
  }

  getAddress(user: any) {
    return [
      user.address.street,
      user.address.suite,
      user.address.city,
      user.address.zipcode,
      user.address.geo.lat,
      user.address.geo.lng,
    ];
  }

  getContact(user: any) {
    return [
      user.email,
      user.phone,
      user.website,
      user.company.bs,
      user.company.catchPhrase,
      user.company.name,
    ];
  }
}

export default UsersBusiness;
