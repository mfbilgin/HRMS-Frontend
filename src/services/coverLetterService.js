import axios from "axios";
export default class CoverLetterService {
    update(coverLetter){
        return axios.post("http://localhost:8080/api/coverLetters/update",coverLetter);
    }
    getByStaffId(staffId){
        return axios.get("http://localhost:8080/api/coverLetters/getByStaffId?staffId="+staffId);
    }
    getAll(){}
}