import axios from 'axios';
export default class StaffService{
    getStaffs(){
        return axios.get("http://localhost:8080/api/staffs/getAll");
    }
    getStaffById(id){
            return axios.get("http://localhost:8080/api/staffs/getById?id="+id);
    }

}