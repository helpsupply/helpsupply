import BackendInterface from "./backend_interface"

class FirebaseBackend extends BackendInterface {
  constructor(firebase) {
    this.firebase = firebase;
  }

  listDropSites(zipcode, radius) {
    // Todo: implement
    throw "Unimplemented";
  }
}

export default FirebaseBackend;
