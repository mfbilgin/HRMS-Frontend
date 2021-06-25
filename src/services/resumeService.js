import axios from "axios";
export default class ResumeService {
    getAllResume(){
        return axios.get("http://localhost:8080/api/resumes/getAll");
    }
    getByStaffId(staffId){
        return axios.get("http://localhost:8080/api/resumes/getByStaffId?staffId="+staffId);
    }
}