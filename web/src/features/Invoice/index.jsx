import React from "react";
import { Redirect, Route, Switch, useRouteMatch } from "react-router-dom";
import CreateInvoicePage from "./pages/CreateInvoicePage";
import InvoiceListPage from "./pages/InvoiceListPage";
import ViewInvoiceDetails from "./pages/InvoiceListPage/InvoiceDetails";

InvoiceFeature.propTypes = {};

function InvoiceFeature(props) {
    const match = useRouteMatch();

    return (
        <Switch>
            <Route exact path={`${match.path}/create`} component={CreateInvoicePage} />
            <Route path={`${match.path}/:id`} component={ViewInvoiceDetails}/>
            <Route exact path={`${match.path}`} component={InvoiceListPage} />
            <Route>
                <Redirect to="/404" />
            </Route>
        </Switch>
    );
}

export default InvoiceFeature;
