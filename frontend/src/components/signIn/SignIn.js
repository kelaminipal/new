
import c from "./signIn.module.scss"

import * as React from "react";
import {Redirect} from "react-router-dom";
import {useEffect, useState} from "react";

import {useDispatch, useSelector} from "react-redux";
import { letInSystem} from "../../features/auth/authSlice";
import {alert} from "../../features/alert/alertSlice";
import formWelcoming from "./signIn-assets/formWelcoming.svg"
import Logo from "../../logo.png"

export default function SignIn() {
    useEffect(()=>{
        document.title = "Sign in 👋"
        document.body.style.cssText = "background-image: linear-gradient(155deg, #2d3436 0%, #0c0c0c 74%);"
    },[])
    const store = useSelector(state=> state.auth)
    const dispatch = useDispatch()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const submitHandler = (e) => {

        e.preventDefault()
        fetch("/api/user/signIn", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },


            body: JSON.stringify({email, password}),

        })

            .then(async data => {
                let result = await data.json()
                 if(result.error){
                     dispatch(alert({message: `${result.error}`}))
                 }
                 else{
                     localStorage.setItem("refreshToken", result.refreshToken)
                     dispatch(letInSystem(true))
                 }




            })
            .catch(e => {

                dispatch(alert({message: `${e}`}))
            })


    }

    if(store.isInSystem){
        return (
            <Redirect to="/catalog"/>
        )
    }

    return (
            <>
                <div className={c.localContainer}>
                    <img width="90px" height="90px" className={c.logo}  src={Logo} alt="Logo"/>

                    <form className={c.form__authorization} onSubmit={(e) => submitHandler(e)}>
                        <h4 className={c.formGreetingHeadline}>Вход в личный кабинет для корпоративных клиентов</h4>
                        <h4 className={c.formGreetingHeadline__big}>Log In your Account</h4>
                        <img className={c.formWelcoming__img} src={formWelcoming} alt="form greeting"/>
                        <label htmlFor="email">
                            <input  required value={email} onChange={(e) => setEmail(e.target.value)} id="email" name="email" type="email"
                                    placeholder="email"/>

                        </label>
                        <label htmlFor="password">
                            <input  required value={password} onChange={(e) => setPassword(e.target.value)} type="password" minLength="6" id="password" name="password"
                                    placeholder="password"/>

                        </label>

                        <button className={c.btn__submit}  type="submit">Continue</button>

                    </form>
                </div>




            </>

    )
}
