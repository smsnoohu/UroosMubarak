import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from '../components/DashBoard/DashBoard';
import Events from '../components/Events/Events';
import Dua from '../components/Dua/Dua';
import DuaDetail from '../components/Dua/DuaDetail';

const ContainerNav = () => {
    return(
        <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/Events" component={Events} />
            <Route exact path="/Dua" component={Dua} />
            <Route exact path="/DuaDetail" component={DuaDetail} />
        </Switch>
    )
}

export default ContainerNav;