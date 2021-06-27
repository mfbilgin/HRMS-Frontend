import axios from "axios";
export default class FavoriteService {
    getAll(staffId){
        return axios.get("http://localhost:8080/api/favorites/getAll?staffId="+staffId);
    }
    getById(id){
        return axios.get("http://localhost:8080/api/favorites/getById?id="+id)
    }
    getByJobAdvertisementId(jobAdvertisementId){
        return axios.get("http://localhost:8080/api/favorites/getByJobAdvertisementId?jobAdvertisementId="+jobAdvertisementId)
    }
    add(favorite){
        return axios.post("http://localhost:8080/api/favorites/add",favorite);
    }
    delete(favoriteId){
        return axios.get("http://localhost:8080/api/favorites/delete?id="+favoriteId);
    }
}