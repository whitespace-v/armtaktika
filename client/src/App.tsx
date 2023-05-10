import React, {useEffect} from 'react';
import {BrowserRouter, Route, Routes} from "react-router-dom";
import Main from "./pages/Main";
import Admin from "./pages/Admin/Admin";
import ItemPage from "./pages/ItemPage";
import UISuccess from "./UIKit/UISuccess";
import {useAppDispatch, useAppSelector} from "./store/redux";
import Basket from "./pages/Basket";
import Policy from "./pages/Policy";
import Auth from "./pages/Auth";
import {check} from "./store/actions/FetchingActions";

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
                    <Route path='item/:id' element={<ItemPage/>}/>
                    <Route path='admin' element={<Admin/>}/>
                    <Route path='basket' element={<Basket/>}/>
                    <Route path='policy' element={<Policy/>}/>
                    <Route path='auth' element={<Auth/>}/>
                    <Route path='*' element={<Main/>}/>
                </Routes>
            </BrowserRouter>
            <UISuccess/>
        </>
    );
};

export default App;