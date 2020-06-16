import React from 'react';
import { Route, BrowserRouter } from 'react-router-dom';

import Home from './pages/Home';
import CreatePoint from './pages/CreatePoint';

const Routes = () => {
    return(
        <BrowserRouter>
            {/* Se não usar a propriedade 'exact', as duas rotas vão para a página principal.  */}
            <Route component={Home} path="/" exact={true} />
            <Route component={CreatePoint} path="/create-point" />
        </BrowserRouter>
    );
};

export default Routes;