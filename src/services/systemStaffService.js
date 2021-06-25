import axios from "axios";
export default class SystemStaffService {
  update(systemStaff) {
    return axios.post(
      "http://localhost:8080/api/systemStaffs/update",
      systemStaff
    );
  }
  getAll() {
    return axios.get("http://localhost:8080/api/systemStaffs/getAll");
  }
  getById(id) {
    return axios.get("http://localhost:8080/api/systemStaffs/getById?id=" + id);
  }
}
