// import React from 'react'
import { Link } from "react-router-dom";
import PageNav from "../components/PageNav";
import AppNav from "../components/AppNav";

export default function Homepage() {
    return (
        <div>
            <PageNav />
            <AppNav />
            <h1>Worldwise</h1>
            <Link to="/app">Got to the app</Link>

            {/* <a href="/pricing">Pricing</a> */}
            {/* <Link to="/pricing">Pricing</Link> */}
        </div>
    );
}
