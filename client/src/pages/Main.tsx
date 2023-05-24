import React, {useEffect} from 'react';
import Footer from "../components/Footer";
import Header from "../components/Header";
import Banner from "../components/Banner";
import Compilations from "../components/Compilations";
import CatalogButton from "../components/CatalogButton";
import Popular from "../components/Popular";
import About from "../components/About";
import Contacts from "../components/Contacts";

const Main = () => {
    useEffect(() => {
        window.scroll(0,0)
    }, [])

    return (
        <>
            <Header/>
            <Banner/>
            <Compilations/>
            <CatalogButton/>
            <Popular/>
            <About/>
            <Contacts/>
            <Footer/>
        </>
    );
};

export default Main;