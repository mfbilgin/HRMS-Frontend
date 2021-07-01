import axios from 'axios';
export default class ImageService{
    getImageByStaffId(staffId){
        return axios.get("http://localhost:8080/api/images/getByStaffId?staff_id="+staffId);
    }
    update(photo,staffId){
        return axios.post("http://localhost:8080/api/images/photoUpdate",  {
            photo: photo,
            staffId : staffId
        })
    }
}