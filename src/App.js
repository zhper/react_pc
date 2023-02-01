
import React, { useState, useEffect, useRef, createContext, useContext } from "react"
import { BrowserRouter, Routes, Route } from "react-router-dom"

import { Button } from "antd"
import './App.css'

import { unstable_HistoryRouter as HistoryRouter } from "react-router-dom"
import { history } from "./utils/history"
import { lazy, Suspense } from "react"
import { observer } from "mobx-react-lite"
import AuthComponent from "./components/AuthComponent"


const Login = lazy(() => import('./pages/Login'))
const Layout = lazy(() => import('./pages/Layout'))
const Home = lazy(() => import('./pages/Home'))
const Article = lazy(() => import('./pages/Article'))
const Publish = lazy(() => import('./pages/Publish'))

function App () {

    return (

        <HistoryRouter history={history}>
            <Suspense
                fallback={
                    <div
                        style={{
                            textAlign: 'center',
                            marginTop: 200
                        }}
                    >
                        loading...
                    </div>
                }
            >
                <div className="App">
                    <Routes>
                        <Route path='/login' element={<Login />}></Route>
                        <Route path='/' element={
                            <AuthComponent>
                                <Layout />
                            </AuthComponent>
                        }>
                            <Route index element={<Home />}></Route>
                            <Route path='article' element={<Article />}></Route>
                            <Route path='publish' element={<Publish />}></Route>
                        </Route>
                    </Routes>
                </div>
            </Suspense>
        </HistoryRouter>



    )
}






export default observer(App)  
