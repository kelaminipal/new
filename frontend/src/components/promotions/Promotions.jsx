import MainLayout from "../layouts/MainLayout";
import c from "./promotions.module.scss";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {getPromotions} from "../../features/promotions/promotionsSlice";
const Promotions = ()=>{

    const state = useSelector(state => state.promotions)
    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "Promotions"
        if (!state.arePromotions) {

            dispatch(getPromotions())
        }

    }, [dispatch, state.arePromotions])

    return(
        <MainLayout>

            <h1 className="component__headline">Promotions</h1>





                    {state.arePromotions ?
                        <div className={c.promotions}>

                            {state.promotions.map(x => (

                            <a key={x._id} className={c.promotions__element} href={x.linkToBuy}>
                                <img  className={c.promotions__image} src={x.path}    alt="promotion"/>

                            </a>
                        ))}
                        </div>
                        : null}



        </MainLayout>

    )
}
export default Promotions