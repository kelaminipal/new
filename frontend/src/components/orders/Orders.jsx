import MainLayout from "../layouts/MainLayout";
import c from "./orders.module.scss";
import box from "./orders-assets/box.svg";
import {useEffect} from "react";

const Orders = ()=>{
    useEffect(()=>{
        document.title = "Orders"
    },[])
    return(
        <MainLayout>
            <section className="emptySection">
            <h2 className="component__headline">No orders</h2>
            <img className={c.noOrders__icon}  src={box} alt="box"/>
            </section>

        </MainLayout>


    )
}
export default Orders