import axios from "axios";
export default class JobAdvertisementService {
  getAdvertByStatusIsTrue() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getByStatusIsTrue"
    );
  }
  getByStatusIsTrueAndOrderByApplicationDeadlineAsc() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndOrderByApplicationDeadlineAsc"
    );
  }
  getById(id) {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getById?id=" + id
    );
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

  getByStatusIsTrueAndEmployer_IdAndCity_IdOrderByApplicationDeadlineAsc(
    employerId,
    cityId
  ) {
    return axios.get("");
  }
  getByStatusIsTrueAndApprovedByAdminIsFalse() {
    return axios.get(
      "http://localhost:8080/api/jobAdvertisement/getByStatusIsTrueAndApprovedByAdminIsFalse"
    );
  }

  add(value) {
    return axios.post("http://localhost:8080/api/jobAdvertisement/add", value);
  }
}
