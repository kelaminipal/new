import c from "./catalog.module.scss"

import MainLayout from "../layouts/MainLayout";
import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import { getCategories} from "../../features/categories/categoriesSlice";


const Catalog = () => {


    const state = useSelector(state => state.categories)
    const currentRegion = useSelector(state=>state.regions.currentRegion)

    const dispatch = useDispatch()

    useEffect(() => {
        document.title = "SCK Business 💼"
        if (!state.areCategories && currentRegion) {

            dispatch(getCategories())
        }

    }, [dispatch, state.areCategories,currentRegion])



    return (

            <MainLayout>

                <h2 className="component__headline">Categories</h2>
                <ul className={c.catalogCont}>
                    {state.areCategories ?
                        <>
                            {state.categories.map(x=>{
                                return <li key={x._id}>{x.categoryName}</li>
                            })}

                        </>


                        : null}

                </ul>

            </MainLayout>



    )
}
export default Catalog