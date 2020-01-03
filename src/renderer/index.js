import React from 'react';
import ReactDOM from 'react-dom';
import {HashRouter as Router, Route, Switch, Redirect} from 'react-router-dom';

import './style/index.scss'
import OneDay from "./components/oneDay";
import Important from "./components/important";
import Plan from "./components/plan";
import Distribute from "./components/distribute";
import Task from "./components/task";
import LeftMenu from "./components/leftMenu";
import ToggleMenu from "./components/toggleMenu";

const App = (props) => {
    return (
        <Router>
            <div className="content">
                <div className="left-area">
                    <LeftMenu/>
                </div>
                <div className="right-area">
                    <ToggleMenu/>
                    <Switch>
                        <Route path="/oneDay" component={OneDay}/>
                        <Route path="/important" component={Important}/>
                        <Route path="/plan" component={Plan}/>
                        <Route path="/distribute" component={Distribute}/>
                        <Route path="/task" component={Task}/>
                        <Redirect to="/oneDay"/>
                    </Switch>
                </div>
            </div>
        </Router>
    )
};

ReactDOM.render(<App/>, document.querySelector('#myApp'));
