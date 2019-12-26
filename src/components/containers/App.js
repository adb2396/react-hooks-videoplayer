import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import AdbPlayer from './AdbPlayer';
import GlobalStyle from '../styles/GlobalStyle';

const App = () => {
    return (
        <BrowserRouter>
            <>
                <Switch>
                    <Route exact path="/" component={AdbPlayer} />
                    <Route exact path="/:activeVideo" component={AdbPlayer} />
                </Switch>
                <GlobalStyle />
            </>
        </BrowserRouter>
    );
};

export default App;