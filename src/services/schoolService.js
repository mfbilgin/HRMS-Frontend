import axios from "axios";
export default class SchoolService {
    getByStaffId (staffId) {
        return axios.get("http://localhost:8080/api/schools/getByStaffIdOrderByGraduationYearDesc?staffId="+staffId);
    }
    getById (id) {
        return axios.get("http://localhost:8080/api/schools/getById?id="+id);
    }
    update(school){
        return axios.post("http://localhost:8080/api/schools/update",school)
    }
    delete(schoolId){
        return axios.get("http://localhost:8080/api/schools/delete?schoolId="+schoolId)
    }
}