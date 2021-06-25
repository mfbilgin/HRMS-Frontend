import React from 'react';
import {useParams} from "react-router-dom";

const EmployerDetail = () => {
    let {id} = useParams()
    return (
        <div>
            Şirket Detayı {id}
        </div>
    );
};

export default EmployerDetail;
