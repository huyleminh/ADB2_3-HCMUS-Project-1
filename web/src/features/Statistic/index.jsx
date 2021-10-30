import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import RevenuePage from "./pages/RevenuePage";

StatisticFeature.propTypes = {};

function StatisticFeature(props) {
    const match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={`${match.path}/revenue`} component={RevenuePage} />
                <Route>
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </div>
    );
}

export default StatisticFeature;
