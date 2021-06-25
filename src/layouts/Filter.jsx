import React from 'react';
import {Button, Menu} from "semantic-ui-react";
import CityList from "../Pages/CityList";

const Filter = () => {
    return (
        //TODO Düzenlenecek
        <Menu vertical style={{margin:20}}>
            <Menu.Item>
                <Menu.Header>Filtreler</Menu.Header>
            </Menu.Item>
            <Menu.Item>
                <Menu.Header>Products</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name='enterprise'

                    />
                    <Menu.Item
                        name='consumer'
                    />
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <Menu.Header>CMS Solutions</Menu.Header>

                <Menu.Menu>
                    <Menu.Item
                        name='rails'

                    />
                    <Menu.Item
                        name='python'

                    />
                    <Menu.Item
                        name='php'
                    />
                </Menu.Menu>
            </Menu.Item>

            <Menu.Item>
                <CityList/>
            </Menu.Item>

            <Menu.Item>
                <Button color={"blue"} icon={"location arrow"}labelPosition={"right"} content={"UYGULA"} onClick={() => {
                    console.log("Tıklandı")
                }}/>
            </Menu.Item>
        </Menu>
    );
};

export default Filter;
