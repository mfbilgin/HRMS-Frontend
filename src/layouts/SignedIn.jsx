import React, {useEffect, useState} from 'react';
import {Dropdown, Image, MenuItem} from "semantic-ui-react";
import ImageService from "../services/imageService";
import {Link} from "react-router-dom";

const SignedIn = ({signOut}) => {
    let id = 1;
    const [image, setImage] = useState({});
    useEffect(() => {
        let imageService = new ImageService();
        imageService.getImageByStaffId(id).then(result => setImage(result.data.data))
    }, [id]);
    return (
        <div>
            <MenuItem>
                <Image avatar spaced={"right"} src={image == null ? "https://res.cloudinary.com/mfbilgin/image/upload/v1624274588/user_30px_ilz0fp.png" : image.imagePath  } />

                <Dropdown pointing={"top right"} text={image.staff?.firstName + " " + image.staff?.lastName.toUpperCase()}>
                    <Dropdown.Menu>
                        <Dropdown.Item text={"Favorilerim"} icon={"heart"} as={Link} to={"/favorilerim"}/>
                        <Dropdown.Item text={"Bilgilerim"} icon={"info"}/>
                        <Dropdown.Item text={"Çıkış Yap"} icon={"sign-out"} onClick={signOut}/>
                    </Dropdown.Menu>
                </Dropdown>
            </MenuItem>
        </div>
    );
};

export default SignedIn;
