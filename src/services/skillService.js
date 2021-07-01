import axios from "axios";
export default class SkillService {
    getById(id){
        return axios.get("http://localhost:8080/api/skills/getById?id="+id)
    }
    getByStaffId(staffId){
        return axios.get("http://localhost:8080/api/skills/getByStaffId?staffId="+staffId)
    }
    update(skill){
        return axios.post("http://localhost:8080/api/skills/update",skill)
    }

    delete(id){
        return axios.get("http://localhost:8080/api/skills/delete?skillId="+id)
    }

}