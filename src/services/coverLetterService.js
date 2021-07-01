import axios from "axios";
export default class CoverLetter{
    update(coverLetter){
        axios.post("http://localhost:8080/api/coverLetters/update",coverLetter);
    }
}