import React, {useEffect} from 'react';
import Header from "../components/Header";
import MinifiedContacts from "../components/MinifiedContacts";
import Banner from "../components/Banner";
import Shop from "../components/Shop";
import Footer from "../components/Footer";

const Main = () => {
    useEffect(() => {
        window.scroll(0,0)
    }, [])
    return (
        <>
            <Header/>
            <MinifiedContacts/>
            {/*<Banner/>*/}
            <Shop/>
            <Footer/>
        </>
    );
};

export default Main;