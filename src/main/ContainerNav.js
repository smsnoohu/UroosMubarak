import React from 'react';
import { Switch, Route } from 'react-router-dom';
import DashBoard from '../components/DashBoard/DashBoard';
import Events from '../components/Events/Events';
import Dua from '../components/Dua/Dua';
import DuaList from '../components/Dua/DuaList';
import DuaDetail from '../components/Dua/DuaDetail';
import More from '../components/More/More';

const ContainerNav = () => {
    return(
        <Switch>
            <Route exact path="/" component={DashBoard} />
            <Route exact path="/Events" component={Events} />
            <Route exact path="/Dua" component={Dua} />
            <Route exact path="/DuaList" component={DuaList} />
            <Route exact path="/DuaDetail" component={DuaDetail} />
            <Route exact path="/More" component={More} />
        </Switch>
    )
}

export default ContainerNav;