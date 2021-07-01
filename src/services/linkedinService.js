import axios from "axios";
export default class LinkedinService {
    update(linkedin){
        return axios.post("http://localhost:8080/api/linkedins/update",linkedin)
    }
    getByStaffId(staffId){
        return axios.get("http://localhost:8080/api/linkedins/getByStaffId?staffId="+staffId)
    }
}