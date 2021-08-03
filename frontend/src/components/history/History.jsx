import MainLayout from "../layouts/MainLayout";
import history from "./history-assets/history .svg"
import c from "./history.module.scss"
import {useEffect} from "react";
const History = ()=>{
    useEffect(()=>{
        document.title = "History"
    },[])
    return(
        <MainLayout>
            <section className="emptySection">
            <h2 className="component__headline">No history yet</h2>
            <img className={c.noHistory__icon}  src={history} alt="history"/>
            </section>
        </MainLayout>


    )
}
export default History