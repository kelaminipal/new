import c from "./catalog.module.scss"

import MainLayout from "../layouts/MainLayout";


const Catalog = () => {





    return (

            <MainLayout>

                <h2 className="component__headline">Categories</h2>
                <ul className={c.catalogCont}>
                    <li>Все для кровли</li>
                    <li>Древесно - плитные материалы</li>
                    <li>Теплозвукоизоляция</li>
                    <li>Гипсокартонные материалы</li>
                    <li>Звукоизоляция и акустика</li>
                    <li>Крепеж</li>
                    <li>Общестроительные материалы</li>
                    <li>Отделочные материалы</li>
                    <li>Металлопрокат</li>
                    <li>Строительные инструменты</li>
                    <li>Дача и сад</li>
                    <li>Товары для дома и офиса</li>
                </ul>

            </MainLayout>



    )
}
export default Catalog