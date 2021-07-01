import axios from "axios";
export default class LanguageService {
  getById(id) {
    return axios.get("http://localhost:8080/api/languages/getById?id=" + id);
  }
  getByStaffId(staffId) {
    return axios.get(
      "http://localhost:8080/api/languages/getByStaffId?staffId=" + staffId
    );
  }
  delete(id) {
    return axios.get(
      "http://localhost:8080/api/languages/delete?languageId=" + id
    );
  }
  update(language) {
    return axios.post("http://localhost:8080/api/languages/update", language);
  }
}
