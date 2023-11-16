import React from 'react'
import {
    BrowserRouter,
    Route,
    Routes as Switch,
} from "react-router-dom";
import DashboardPage from '../views/dashboard';

const Routes = () => {
    return (
        <BrowserRouter>
            <Switch>
                <Route path="/" element={<DashboardPage />} />
                <Route path="/accounts" element={<DashboardPage />} />
                <Route path="/payroll" element={<DashboardPage />} />
                <Route path="/reports" element={<DashboardPage />} />
                <Route path="/advisor" element={<DashboardPage />} />
                <Route path="/contacts" element={<DashboardPage />} />
            </Switch>
        </BrowserRouter>
    )
}

export default Routes