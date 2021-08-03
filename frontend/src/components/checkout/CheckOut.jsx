import MainLayout from "../layouts/MainLayout";
import c from "./checkOut.module.scss";
import checkOutBoxes from "./checkout-assets/cart.svg";
import {useEffect} from "react";

const CheckOut = ()=>{
    useEffect(()=>{
        document.title = "Check out"
    },[])
    return(
        <MainLayout>
            <section className="emptySection">
            <h2 className="component__headline">Your cart is empty</h2>
            <img className={c.noItems__icon}  src={checkOutBoxes} alt="boxes"/>
            </section>
        </MainLayout>


    )
}
export default CheckOut