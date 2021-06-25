import axios from "axios";
export default class EmployerService {
    getAll(){
        return axios.get("http://localhost:8080/api/employers/getAll");
    }
    getById(id){
        return axios.get("http://localhost:8080/api/employers/getById?id=" +id);
    }
    getByIfHaveJobAdvertisement(){
        return axios.get("http://localhost:8080/api/employers/getByIfHaveJobAdvertisement");
    }
}