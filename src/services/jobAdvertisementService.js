import axios from "axios";
export default class JobAdvertisementService {
  getAdvertByStatusIsTrue() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getByStatusIsTrue"
    );
  }
  getByStatusIsTrueAndOrderByApplicationDeadlineAsc(pageNo,pageSize) {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndOrderByApplicationDeadlineAsc?pageNo="+pageNo+"&pageSize="+pageSize
    );
  }
  getById(id) {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getById?id=" + id
    );
  }

  getPageCount(pageSize){
    return axios.get("http://localhost:8080/api/jobAdvertisement/getPageCount?pageSize=" + pageSize)
  }
  approveJobAdvertisement(id) {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/approveJobAdvertisement?jobAdvertisementId=" +
        id
    );
  }

  delete(jobAdvertisement) {
    return axios.post("http://localhost:8080/api/jobAdvertisement/delete", jobAdvertisement);
  }

  getByStatusIsTrueAndApprovedByAdminIsFalse() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndApprovedByAdminIsFalse"
    );
  }

  add(value) {
    return axios.post("http://localhost:8080/api/jobAdvertisement/add", value);
  }


  getByStatusIsTrueAndApprovedByAdminIsTrueAndCity_Id(cityId,pageNo,pageSize){
    return axios.get("http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndApprovedByAdminIsTrueAndCity_Id?pageNo="+pageNo+"&pageSize="+pageSize+"&cityId="+cityId);
  }
  getByStatusIsTrueAndApprovedByAdminIsTrueAndCity_IdAndWorkTime_Id(cityId,workTimeId,pageNo,pageSize){
    return axios.get("http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndApprovedByAdminIsTrueAndCity_IdAndWorkTime_Id?pageNo="+pageNo+"&pageSize="+pageSize+"&cityId=" +cityId+"&workTimeId="+workTimeId);
  }
  getByStatusIsTrueAndApprovedByAdminIsTrueAndWorkTime_Id(workTimeId,pageNo,pageSize){
    return axios.get("http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndApprovedByAdminIsTrueAndWorkTime_Id?pageNo="+pageNo+"&pageSize="+pageSize+"&workTimeId="+workTimeId);
  }
}
