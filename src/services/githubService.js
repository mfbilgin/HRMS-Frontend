import axios from "axios";
export default class GithubService {
    update(github){
        return axios.post("http://localhost:8080/api/githubs/update",github);
    }
    getByStaffId(staffId){
        return axios.get("http://localhost:8080/api/githubs/getByStaffId?staffId="+staffId);
    }
}