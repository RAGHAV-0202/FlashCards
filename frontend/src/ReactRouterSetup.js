import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom"
import CardPage from "./Pages/Card.pages";
import AdminPage from "./Pages/Admin.pages";


const ReactRouterSetup = ()=>{
    return(
        <Router>
            <Routes>
                <Route path="/" element={<CardPage/>}/>
                <Route path="/Admin" element={<AdminPage/>}/>
            </Routes>
        </Router>
    )
}

export default ReactRouterSetup
