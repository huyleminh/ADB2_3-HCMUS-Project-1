import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import InvoiceListPage from "./pages/InvoiceListPage";

InvoiceFeature.propTypes = {};

function InvoiceFeature(props) {
    const match = useRouteMatch();

    return (
        <div>
            <Switch>
                <Route exact path={`${match.path}/create`} component={CreateInvoicePage} />
                <Route exact path={`${match.path}`} component={InvoiceListPage} />
                <Route>
                    <Redirect to="/404" />
                </Route>
            </Switch>
        </div>
    );
}

export default InvoiceFeature;
