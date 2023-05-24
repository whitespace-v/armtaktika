import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import ItemPage from "./pages/ItemPage";
import UISuccess from "./UIKit/UISuccess";
import {useAppDispatch, useAppSelector} from "./store/redux";
import Basket from "./pages/Basket";
import Policy from "./pages/Policy";
import Auth from "./pages/Auth";
import {check} from "./store/actions/FetchingActions";
import ReAdmin from "./pages/reAdmin/ReAdmin";
import Compilation from "./pages/Compilation";
import Shop from "./components/Shop";

const App = () => {
    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.userReducer)

    useEffect(() => {
        dispatch(check())
    }, [user])

    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path='/' element={<Main/>}/>
                    <Route path='/shop' element={<Shop/>}/>
                    <Route path='item/:id' element={<ItemPage/>}/>
                    <Route path='admin' element={<ReAdmin/>}/>
                    <Route path='basket' element={<Basket/>}/>
                    <Route path='policy' element={<Policy/>}/>
                    <Route path='auth' element={<Auth/>}/>
                    <Route path='compilation/:id' element={<Compilation/>}/>
                    <Route path='*' element={<Main/>}/>
                </Routes>
            </BrowserRouter>
            <UISuccess/>
        </>
    );
};

export default App;