import axios from "axios";
export default class WorkService {
    getByStaffId(staffId){
        return axios.get("http://localhost:8080/api/works/getByStaffIdOrderByGraduationYearDesc?staffId="+staffId)
    }
    getById(id){
        return axios.get("http://localhost:8080/api/works/getById?id="+id)
    }
    update(work){
        return axios.post("http://localhost:8080/api/works/update",work)
    }
    delete(workId){
        return axios.get("http://localhost:8080/api/works/delete?workId="+workId)
    }
}