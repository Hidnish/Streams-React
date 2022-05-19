import React from "react";
import { Router, Route, Switch } from 'react-router-dom';
import StreamCreate from "./streams/StreamCreate";
import StreamEdit from "./streams/StreamEdit";
import StreamDelete from "./streams/StreamDelete";
import StreamList from "./streams/StreamList";
import StreamShow from "./streams/StreamShow";
import Header from "./Header";
import history from '../history';

const App = () => {
    //1 //2
    return (
        <div className="ui container">
            <Router history={history}>
                <Header />
                <Switch>
                    <Route path="/" exact={true} component={StreamList} />
                    <Route path="/streams/new" component={StreamCreate} />
                    <Route path="/streams/edit/:id" component={StreamEdit} />
                    <Route path="/streams/delete/:id" component={StreamDelete} />
                    <Route path="/streams/:id" component={StreamShow} />
                </Switch>
            </Router>
        </div>
    );
};

export default App;

//1 passing history={} attribute overrides default history that <BrowserRouter></BrowserRouter> would otherwise use

// path="/streams/edit/:any" --> to tell Route that we want to still dender path="/streams/edit" regardless of what comes after
// you can put as many ':any/:anyvar/:anything' variables in the URL that will be converted as props.match.params in the component={}

// <Route></Route> passes a bunch of props to the component={} by default

//2 <Switch></Switch> looks at different routes and selects only one