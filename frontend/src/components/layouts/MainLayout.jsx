

import React, {useEffect} from 'react';
import Navbar from "../navbar/Navbar";
const MainLayout =({children}) =>{
    useEffect(() => {
        document.body.style.cssText = "background: linear-gradient(to left, #0d0d0d, #434343)"
        document.body.classList.remove("bodyDisabled")

    }, []);

    return(
        <>
            <div className="container">
                <Navbar/>
                <main>{children}</main>
            </div>

        </>
    )
}

export default MainLayout;