import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from '../components/DashBoard/DashBoard';
import Events from '../components/Events/Events';

const ContainerNav = () => {
    return(
        <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/Events" component={Events} />
        </Switch>
    )
}

export default ContainerNav;