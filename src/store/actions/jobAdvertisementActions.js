export const SET_JOB_ADVERTISEMENT = "SET_JOB_ADVERTISEMENT";

export function setJobAdvertisement(jobAdvertisements){
    return{
        type:SET_JOB_ADVERTISEMENT,
        payload:jobAdvertisements
    }
}