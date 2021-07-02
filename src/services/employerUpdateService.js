import axios from "axios";
export default class EmployerUpdateService {
  getAll() {
    return axios.get("http://localhost:8080/api/employerUpdate/getAll");
  }
  getByEmployerId(employerId) {
    return axios.get(
      "http://localhost:8080/api/employerUpdate/getByEmployerId?employerId=" +
        employerId
    );
  }
  delete(id) {
    return axios.get(
      "http://localhost:8080/api/employerUpdate/delete?id=" + id
    );
  }
}
