import React, {useEffect, useState} from 'react';
import {Dropdown, Image, MenuItem} from "semantic-ui-react";
import ImageService from "../Services/imageService";

const SignedIn = ({signOut}) => {
    let id = 2;
    const [image, setImage] = useState({});
    useEffect(() => {
        let imageService = new ImageService();
        imageService.getImageByStaffId(id).then(result => setImage(result.data.data))
    }, [id]);


    return (
        <div>
            <MenuItem>
                <Image avatar spaced={"left"} src={image == null ? "https://res.cloudinary.com/mfbilgin/image/upload/v1624274588/user_30px_ilz0fp.png" : image.imagePath  } />
                <Dropdown pointing={"top right"}>
                    <Dropdown.Menu>
                        <Dropdown.Item text={"Bilgilerim"} icon={"info"}/>
                        <Dropdown.Item text={"Çıkış Yap"} icon={"sign-out"} onClick={signOut}/>
                    </Dropdown.Menu>
                </Dropdown>
            </MenuItem>
        </div>
    );
};

export default SignedIn;
