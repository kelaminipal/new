import * as React from "react"
import {
    BrowserRouter as Router,
    Route,
    Redirect,
    Switch
} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import Catalog from "./components/catalog/Catalog";
import NotFound from "./components/notFound/NotFound";
import {alert} from "./features/alert/alertSlice";
import {insertDataAuth} from "./features/auth/authSlice";
import SignIn from "./components/signIn/SignIn";
import {useEffect} from "react";
import Promotions from "./components/promotions/Promotions";
import Orders from "./components/orders/Orders";
import History from "./components/history/History";
import CheckOut from "./components/checkout/CheckOut";


function PrivateRoute({children, ...rest}) {
    const isInSystem = useSelector(state => state.auth.isInSystem)


    return (

        <Route {...rest} render={({location}) => {

            return !isInSystem === false
                ? children
                : <Redirect to={{
                    pathname: '/signIn',
                    state: {from: location}
                }}/>
        }}/>
    )
}


export default function App() {
    const dispatch = useDispatch()
    const authorized = useSelector(state => state.auth.isInSystem)

    useEffect(() => {

        const checkVerify = () => {


            fetch("/api/user/verify", {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json'

                },


            }).then(async data => {
                let result = await data.json()

                if (result.error) {

                        let refreshToken = localStorage.getItem("refreshToken")

                        await fetch("/api/user/refreshToken", {
                            method: 'POST',
                            headers: {
                                'Content-Type': 'application/json'
                            },
                            body: JSON.stringify({refreshToken})

                        })
                    } else {
                        const {email, name} = result
                        dispatch(insertDataAuth({email, name}))

                    }

            }).catch(e => {
                dispatch(alert({message: `${e}`}))
            })


        }
        if (authorized) {
            checkVerify()
        }


    }, [authorized, dispatch])


    return (
        <Router>
            <Switch>
                <PrivateRoute exact path="/">
                    <Redirect to="/catalog"/>
                </PrivateRoute>
                <PrivateRoute exact path="/catalog">
                    <Catalog/>
                </PrivateRoute>
                <PrivateRoute exact path="/promotions">
                    <Promotions/>
                </PrivateRoute>
                <PrivateRoute exact path="/orders">
                    <Orders/>
                </PrivateRoute>
                <PrivateRoute exact path="/history">
                    <History/>
                </PrivateRoute>
                <PrivateRoute exact path="/checkout">
                    <CheckOut/>
                </PrivateRoute>

                <Route path="/signIn">
                    <SignIn/>
                </Route>
                <Route path="*">
                    <NotFound/>
                </Route>
            </Switch>

        </Router>
    )
}


