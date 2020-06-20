import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return(
        <BrowserRouter>
            {/* If the 'exact' property is not used, all the routes will direct to the home page */}
            <Route component={Home} path="/" exact={true} />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
};

export default Routes;
