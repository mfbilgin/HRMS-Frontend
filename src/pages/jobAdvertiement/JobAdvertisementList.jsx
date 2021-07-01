import React, {useEffect, useState} from "react";
import {Button, Dropdown, Grid, Icon, Menu, Table} from "semantic-ui-react";
import JobAdvertisementService from "../../services/jobAdvertisementService";
import {Link} from "react-router-dom";
import FavoriteService from "../../services/favoriteService";
import swal from "sweetalert";
import WorkTimeForFilter from "../workTime/WorkTimeForFilter";
import CityList from "../city/CityList";

const JobAdvertisementList = () => {

    const [jobAdvertisements, setJobAdvertisements] = useState([]);
    const [pages, setPages] = useState([]);
    const [pageSizes, setPageSizes] = useState([]);
    const [pageNo, setPageNo] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [, setWorkTimeId] = useState(0);
    const [, setCityId] = useState(0);
    const [pageCount, setPageCount] = useState(1);
    useEffect(() => {
        let jobAdvertisementService = new JobAdvertisementService();
        jobAdvertisementService.getByStatusIsTrueAndOrderByApplicationDeadlineAsc(1, pageSize).then((result) => setJobAdvertisements(result.data.data));
        let pageSizes = [];
        pageSizes.push(10)
        pageSizes.push(20)
        pageSizes.push(50)
        pageSizes.push(100)
        setPageSizes(pageSizes);


        jobAdvertisementService.getPageCount(pageSize).then(result => {
            setPageCount(result.data.data)
            let pages = []
            for (let index = 1; index <= pageCount; index++) {
                pages.push(index);
            }
            setPages(pages)
        })
    }, [pageCount, pageSize]);

    const pageSizeOption = pageSizes.map((pageSize, index) => ({
        key: index,
        value: pageSize,
        text: pageSize
    }))

    function handleChangePage(pageNo) {
        if (pageNo > 0){
            setPageNo(pageNo)
            let jobAdvertisementService = new JobAdvertisementService()
            jobAdvertisementService.getByStatusIsTrueAndOrderByApplicationDeadlineAsc(pageNo, pageSize).then(result => setJobAdvertisements(result.data.data))
        }

    }

    function handleChangePageSize(pageSize) {
        if (pageSize === "") {
            pageSize = 10;
        }
        setPageSize(pageSize)
    }

    const handlePageCount = () => {
        let pageCount = Math.ceil(jobAdvertisements.length / pageSize);
        let pages = [];
        for (let i = 1;i <= pageCount;i++){
            pages.push(i);
        }
        setPages(pages)
    }
    const favorite = {
        "favoriteId": 0,
        "jobAdvertisement": {
            "id": 0,
            "jobDescription": "",
            "minSalary": 0,
            "maxSalary": 0,
            "emptyPositionCount": 0,
            "applicationDeadline": "2021-06-30",
            "releaseDate": "2021-06-25",
            "status": true,
            "approvedByAdmin": true,
            "city": {
                "id": 0,
                "name": ""
            },
            "jobPosition": {
                "jobPositionId": 0,
                "name": ""
            },
            "employer": {
                "id": 0,
                "email": "",
                "password": "",
                "companyName": "",
                "webAddress": "",
                "phoneNumber": "",
                "activatedBySystemStaff": false,
                "verifiedByEmail": true
            },
            "workType": {
                "id": 0,
                "name": ""
            },
            "workTime": {
                "id": 0,
                "name": ""
            }
        },
        "staff": {
            "id": 1,
            "email": "",
            "password": "",
            "firstName": "",
            "lastName": "",
            "identificationNumber": "",
            "birthYear": "",
            "verifiedByEmail": true
        }
    }
    const handleOnClick = (jobAdvertisementId) => {
        favorite.jobAdvertisement.id = jobAdvertisementId;
        let favoriteService = new FavoriteService();
        favoriteService.add(favorite).then(result => swal(`${result.data.message}`, "", `${result.data.success ? "success" : "error"}`));
    }

    //const [, setJobAdvertisements] = useState([]);
    function handleWorkTimeId(id) {
        setWorkTimeId(id);
    }

    function handleCityId(id) {
        setCityId(id);
    }

    const handleApplyButtonOnClick = () => {
        let jobAdvertisementService = new JobAdvertisementService();
        let cityId = window.localStorage.getItem("cityId")
        let workTimeId = window.localStorage.getItem("workTimeId")
        if (cityId !== "" && workTimeId !== "") {
            jobAdvertisementService.getByStatusIsTrueAndApprovedByAdminIsTrueAndCity_IdAndWorkTime_Id(cityId, workTimeId, 1, pageSize).then(result => setJobAdvertisements(result.data.data));
            handlePageCount();
        } else if (cityId !== "" && workTimeId === "") {
            jobAdvertisementService.getByStatusIsTrueAndApprovedByAdminIsTrueAndCity_Id(cityId, 1, pageSize).then(result => setJobAdvertisements(result.data.data));
            handlePageCount();
        } else if (cityId === "" && workTimeId !== "") {
            jobAdvertisementService.getByStatusIsTrueAndApprovedByAdminIsTrueAndWorkTime_Id(workTimeId, 1, pageSize).then(result => setJobAdvertisements(result.data.data));
            handlePageCount();
        } else {
           window.location.reload();

        }

    }
    return (
        <div style={{margin: 20}}>
            <Grid>
                <Grid.Row>
                    <Grid.Column width={3}>
                        <Menu vertical>
                            <Menu.Item>
                                <Menu.Header>Filtreler</Menu.Header>
                            </Menu.Item>

                            <WorkTimeForFilter setWorkTimeId={handleWorkTimeId}/>


                            <CityList setCityId={handleCityId}/>


                            <Menu.Item>
                                <Button
                                    animated
                                    color={"blue"}
                                    onClick={() => {
                                        handleApplyButtonOnClick();

                                    }}
                                >
                                    <Button.Content visible>UYGULA</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name={"location arrow"}/>
                                    </Button.Content>
                                </Button>
                            </Menu.Item>
                        </Menu>
                    </Grid.Column>
                    <Grid.Column width={13}>
                        <Table celled>
                            <Table.Header style={{textAlign: "center"}}/>
                            <Table.Header>
                                <Table.Row textAlign={"center"}>
                                    <Table.HeaderCell>Şirket Adı</Table.HeaderCell>
                                    <Table.HeaderCell>İş Pozisyonu</Table.HeaderCell>
                                    <Table.HeaderCell>Şehir</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Yeri</Table.HeaderCell>
                                    <Table.HeaderCell>Çalışma Zamanı</Table.HeaderCell>
                                    <Table.HeaderCell>Son Başvuru Tarihi</Table.HeaderCell>
                                    <Table.HeaderCell>
                                        <Dropdown
                                            style={{width: "100%"}}
                                            clearable
                                            item
                                            placeholder="Sayfa Boyutu (10)"
                                            selection
                                            onChange={(event, data) =>
                                                handleChangePageSize(data.value)
                                            }
                                            name="pageSize"
                                            options={pageSizeOption}
                                        />
                                    </Table.HeaderCell>
                                    <Table.HeaderCell/>
                                </Table.Row>
                            </Table.Header>

                            <Table.Body>
                                {jobAdvertisements.map((jobAdvertisement) => (
                                    <Table.Row key={jobAdvertisement.id} textAlign={"center"}>
                                        <Table.Cell>
                                            {jobAdvertisement.employer.companyName}
                                        </Table.Cell>
                                        <Table.Cell>{jobAdvertisement.jobPosition.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.city.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workType.name}</Table.Cell>
                                        <Table.Cell>{jobAdvertisement.workTime?.name}</Table.Cell>
                                        <Table.Cell>
                                            {jobAdvertisement.applicationDeadline.toString()}
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color={"red"}
                                                animated={"fade"}
                                                onClick={() => {
                                                    handleOnClick(jobAdvertisement.id)
                                                }}
                                            >
                                                <Button.Content visible>Favorilere Ekle</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="heart" size={"large"}/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>
                                        <Table.Cell>
                                            <Button
                                                color={"grey"}
                                                animated={"fade"}
                                                as={Link}
                                                to={`/jobAdvertisementDetails/${jobAdvertisement.id}`}
                                            >
                                                <Button.Content visible>Detaylara Git</Button.Content>
                                                <Button.Content hidden>
                                                    <Icon name="arrow alternate circle right outline" color={"olive"}
                                                          size={"large"}/>
                                                </Button.Content>
                                            </Button>
                                        </Table.Cell>


                                    </Table.Row>
                                ))}
                            </Table.Body>
                            <Table.Footer>
                                <Table.Row>
                                    <Table.HeaderCell colSpan='6'>

                                        <Menu floated='right' pagination>
                                            <Menu.Item as='a' icon onClick={ () => {
                                                handleChangePage(pageNo - 1);
                                            }}>
                                                <Icon name='chevron left'/>

                                            </Menu.Item>
                                            {
                                                pages.map(page => (
                                                    <Menu.Item key={page} onClick={() => {
                                                        handleChangePage(page)
                                                    }}>{page}</Menu.Item>
                                                ))
                                            }
                                            <Menu.Item as='a' icon onClick={ () => {
                                                handleChangePage(pageNo + 1);
                                            }}>
                                                <Icon name='chevron right'/>
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                    <Table.HeaderCell colSpan={"3"}>
                                        <Menu floated={"right"}>
                                            <Menu.Item>
                                                {jobAdvertisements.length} adet ilan listelendi
                                            </Menu.Item>
                                        </Menu>
                                    </Table.HeaderCell>
                                </Table.Row>
                            </Table.Footer>
                        </Table>
                    </Grid.Column>
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default JobAdvertisementList;
