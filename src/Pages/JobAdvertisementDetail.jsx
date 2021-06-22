import React from 'react';
import {useParams} from "react-router";

const JobAdvertisementDetail = () => {
    let { id } = useParams();
    return (
        <div>
            {id}
        </div>
    );
};

export default JobAdvertisementDetail;
