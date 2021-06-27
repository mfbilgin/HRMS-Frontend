import React, {useEffect, useState} from 'react';
import {Button, Grid, Icon, Table} from "semantic-ui-react";
import Filter from "../Filter";
import {Link} from "react-router-dom";
import FavoriteService from "../../services/favoriteService";
import swal from "sweetalert";

const Favorites = () => {
    let staffId = 1;
    const [favorites, setFavorites] = useState([]);
    useEffect(() => {
        let favoriteService = new FavoriteService();
        favoriteService.getAll(staffId).then(result => setFavorites(result.data.data))
    }, [staffId]);


    const handleOnClick = (favoriteId) => {
        let favoriteService = new FavoriteService();
        favoriteService.delete(favoriteId).then(result => swal(`${result.data.message}`,"",`${result.data.success ? "success" : "error"}`))
        window.location.reload();
    }
    return (
        <div style={{margin: 20}}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={4}>
                        <Filter/>
                    </Grid.Column>
                    <Grid.Column width={12}>
                        <Table celled striped>
                            <Table.Header style={{textAlign: "center"}}/>
                            <Table.Header>
                                <Table.Row textAlign={"center"}>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                                    <Table.HeaderCell>Şehir</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell/>
                                    <Table.HeaderCell/>

                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {favorites.map((favorite) => (
                                    <Table.Row key={favorite.jobAdvertisement?.id} textAlign={"center"}>
                                        <Table.Cell>
                                            {favorite.jobAdvertisement?.employer?.companyName}
                                        </Table.Cell>
                                        <Table.Cell>{favorite.jobAdvertisement?.jobPosition.name}</Table.Cell>
                                        <Table.Cell>{favorite.jobAdvertisement?.city.name}</Table.Cell>
                                        <Table.Cell>{favorite.jobAdvertisement?.workType.name}</Table.Cell>
                                        <Table.Cell>{favorite.jobAdvertisement?.workTime?.name}</Table.Cell>
                                        <Table.Cell>
                                            {favorite.jobAdvertisement?.applicationDeadline.toString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color={"grey"}
                                                animated={"fade"}
                                                as={Link}
                                                to={`/jobAdvertisementDetails/${favorite.jobAdvertisement?.id}`}
                                            >
                                                <Button.Content visible>Detaylara Git</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="arrow alternate circle right outline" color={"olive"}
                                                          size={"large"}/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color={"red"}
                                                animated={"fade"}
                                                onClick={() => {
                                                    handleOnClick(favorite.favoriteId)
                                                }}
                                            >
                                                <Button.Content visible>Favorilerden Kaldır</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="trash alternate" size={"large"}/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>
                                    </Table.Row>
                                ))}
                            </Table.Body>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default Favorites;
