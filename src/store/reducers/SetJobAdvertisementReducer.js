import {SET_JOB_ADVERTISEMENT} from "../actions/jobAdvertisementActions";
import {jobAdvertisements} from "../initialValues/JobAdvertisements";

const initialState = {
    jobAdvertisements : jobAdvertisements
};
export default function setJobAdvertisementReducer(state = initialState,{type,payload}) {
    switch (type){
        case SET_JOB_ADVERTISEMENT:
            let jobAdvertisements  = state.jobAdvertisements.find(j => j.jobAdvertisements.id === payload.id);

    }
    
}