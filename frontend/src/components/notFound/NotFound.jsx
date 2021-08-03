import {useEffect} from "react";


const NotFound = ()=>{
    useEffect(()=>{
        document.title = "Not found"
    },[])

    return(
        <>
           <h2>
               Not found
           </h2>
        </>

    )
}
export default NotFound