// import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
// import { useEffect, useState } from "react";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import Homepage from "./pages/Homepage";
import AppLayout from "./pages/AppLayout";
import PageNotFound from "./pages/PageNotFound";
import City from "./components/City";
import CityList from "./components/CityList";
import CountryList from "./components/CountryList";
import Form from "./components/Form";

// const BASE_URL = "http://localhost:3001";

export default function App() {
    // const [cities, setCities] = useState([]);
    // const [isLoading, setIsLoading] = useState(false);

    // useEffect(() => {
    //     async function fetchCities() {
    //         try {
    //             setIsLoading(true);
    //             const res = await fetch(`${BASE_URL}/cities`);
    //             const data = await res.json();
    //             setCities(data);
    //         } catch (error) {
    //             console.error(error);
    //         } finally {
    //             setIsLoading(false);
    //         }
    //     }
    //     fetchCities();
    // }, []);

    return (
        <BrowserRouter>
            <Routes>
                <Route index element={<Homepage />} />
                <Route path="product" element={<Product />} />
                <Route path="pricing" element={<Pricing />} />
                <Route path="login" element={<Login />} />
                <Route path="app" element={<AppLayout />}>
                    <Route index element={<Navigate replace to="cities" />} />
                    <Route
                        path="cities"
                        element={
                            <CityList cities={cities} isLoading={isLoading} />
                        }
                    />
                    <Route path="cities/:id" element={<City />} />
                    <Route
                        path="countries"
                        element={
                            <CountryList
                                cities={cities}
                                isLoading={isLoading}
                            />
                        }
                    />
                    <Route path="form" element={<Form />} />
                </Route>
                <Route path="*" element={<PageNotFound />} />
            </Routes>
        </BrowserRouter>
    );
}
