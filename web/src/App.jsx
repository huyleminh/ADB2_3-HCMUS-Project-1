import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import NotFound from "./components/NotFound";
import DashBoard from "./features/Dashboard";

function App() {
    return (
        <Switch>
                <Redirect exact path="/" to={"/manage"} />
            <Route exact path="/404" component={NotFound} />
            <Route path={"/manage"} component={DashBoard} />
            <Route>
                <Redirect to="/404">
                    <NotFound />
                </Redirect>
            </Route>
        </Switch>
    );
}

export default App;
