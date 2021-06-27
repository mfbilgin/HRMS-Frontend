import React, {useEffect, useState} from 'react';
import Favorites from "./Favorites";
import FavoriteService from "../../services/favoriteService";
import FavoriteNotFound from "./FavoriteNotFound";
const FavoriteList = () => {
    let staffId = 1;
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        let favoriteService = new FavoriteService();
        favoriteService.getAll(staffId).then(result => setFavorites(result.data.data))
    }, [staffId]);
    return (
        favorites.length > 0 ? <Favorites/> : <FavoriteNotFound/>
    );
};

export default FavoriteList;
