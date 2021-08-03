import {Link} from "react-router-dom";
import c from "./navbar.module.scss"
import Logo from "../../logo.png"
import {useEffect, useRef} from "react";
import {getRegions} from "../../features/regions/regionsSlice";
import {useDispatch, useSelector} from "react-redux";
import {useDetectOutsideClick} from "../../useDetectOutsideClick";

const Navbar = () => {
    const state = useSelector(state => state.regions)
    const dispatch = useDispatch()
    const accountDropDown = useRef(null);
    const hamburgerDropDown = useRef(null);
    const [isHamburgerDropDown, setHamburgerDropDown] = useDetectOutsideClick(hamburgerDropDown, false);
    const onHamburgerClick = () => {
        setHamburgerDropDown(!isHamburgerDropDown);
        document.body.classList.toggle("bodyDisabled");
    }

    const [isAccountDropDown, setAccountDropDown] = useDetectOutsideClick(accountDropDown, false);
    const onAccountClick = () => setAccountDropDown(!isAccountDropDown);
    useEffect(() => {


        if (!state.areRegions) {

            dispatch(getRegions())

        }


    }, [dispatch, state.areRegions])

    return (
        <nav className={c.nav}>
            <ul className={c.leftSideList}>
                <li className={c.navElement}><Link className={c.navLink} to="/catalog">
                    <img className={c.leftSideList__logo} width="80px" height="80px" src={Logo} alt="Logo"/>

                </Link></li>
                <li className={c.navElementRegionsContainer}>
                    {state.areRegions ?


                        <ul onClick={onAccountClick} ref={accountDropDown}
                            className={isAccountDropDown ? c.regionsNavbar_active : c.regionsNavbar}>
                            <li className={c.regionsNavbar__element}>
                                <span className={c.currentRegion}>{state.currentRegion.title}<i>
                                    <svg fill="white" version="1.1" xmlns="http://www.w3.org/2000/svg" y="0px"
                                         width="12.847px" height="12.847px" viewBox="0 0 451.847 451.847"><g><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751
		c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0
		c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/></g></svg></i></span>
                            </li>
                            {isAccountDropDown ?
                                <ul className={c.listFetchedResults}>


                                    {state.regions.filter(x => x._id !== state.currentRegion._id).map(x => (

                                        <li className={c.regionsNavbar__element} key={x._id}>{x.title}</li>

                                    ))}
                                </ul>

                                : null}


                        </ul>

                        : null}
                </li>
            </ul>

            <ul className={c.navList}>
                <li className={c.navElement}><Link className={c.navLink} to="/catalog">Catalog</Link></li>
                <li className={c.navElement}><Link className={c.navLink} to="/orders">My Orders</Link></li>
                <li className={c.navElement}><Link className={c.navLink} to="/history">History</Link></li>
                <li className={c.navElement}><Link className={c.navLink} to="/promotions">Promotions</Link></li>
            </ul>
            <ul className={c.rightSideList}>
                <li className={c.navElement}><Link className={c.navLink} to="/checkout">
                    <svg width="35px" fill="white" viewBox="0 -31 512.00026 512" xmlns="http://www.w3.org/2000/svg">
                        <path
                            d="m164.960938 300.003906h.023437c.019531 0 .039063-.003906.058594-.003906h271.957031c6.695312 0 12.582031-4.441406 14.421875-10.878906l60-210c1.292969-4.527344.386719-9.394532-2.445313-13.152344-2.835937-3.757812-7.269531-5.96875-11.976562-5.96875h-366.632812l-10.722657-48.253906c-1.527343-6.863282-7.613281-11.746094-14.644531-11.746094h-90c-8.285156 0-15 6.714844-15 15s6.714844 15 15 15h77.96875c1.898438 8.550781 51.3125 230.917969 54.15625 243.710938-15.941406 6.929687-27.125 22.824218-27.125 41.289062 0 24.8125 20.1875 45 45 45h272c8.285156 0 15-6.714844 15-15s-6.714844-15-15-15h-272c-8.269531 0-15-6.730469-15-15 0-8.257812 6.707031-14.976562 14.960938-14.996094zm312.152343-210.003906-51.429687 180h-248.652344l-40-180zm0 0"/>
                        <path
                            d="m150 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
                        <path
                            d="m362 405c0 24.8125 20.1875 45 45 45s45-20.1875 45-45-20.1875-45-45-45-45 20.1875-45 45zm45-15c8.269531 0 15 6.730469 15 15s-6.730469 15-15 15-15-6.730469-15-15 6.730469-15 15-15zm0 0"/>
                    </svg>
                </Link></li>
            </ul>
            <ul className={c.hamburgerMenuCont}>
                   <span
                       className={`${c.hamburgerToggler} ${isHamburgerDropDown ? `${c.hamburgerTogglerActive}` : `${c.hamburgerTogglerInactive || "inactive"}`}`}
                       onClick={onHamburgerClick}>
                                <span className={c.hamburgerTogglerElement}/>
                                <span className={c.hamburgerTogglerElement}/>
                                <span className={c.hamburgerTogglerElement}/>
                            </span>
                {isHamburgerDropDown ?
                    <div className={c.hamburger} ref={hamburgerDropDown}>


                        <Link className={c.hamburgerElement} to="/catalog">Catalog</Link>
                        <Link className={c.hamburgerElement} to="/orders">My Orders</Link>
                        <Link className={c.hamburgerElement} to="/history">History</Link>
                        <Link className={c.hamburgerElement} to="/promotions">Promotions</Link>
                        <Link className={c.hamburgerElement} to="/checkout">
                            Check out
                        </Link>

                    </div>


                    : null}
            </ul>
        </nav>
    )
}
export default Navbar