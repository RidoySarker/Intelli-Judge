import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {login, logout} from "../slices/authSlice";


export default function Header() {
    const dispatch = useDispatch();
    let navigate = useNavigate();
    const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
    const handleLogOut = () => {
        dispatch(logout());
        navigate('/', {replace: true});
    }
    return (<>
        <div id="header" className="header section">
            <div className="container">

                {/* Header Wrapper Start */}
                <div className="header-wrapper">

                    {/* Header Menu Start */}
                    <div className="header-menu d-none d-lg-block">
                        <ul className="main-menu">
                            {/*style={{ marginLeft:'-40px' }}*/}
                            <li>
                                <a href="/">
                                    <img src="/assets/images/logo.png" alt=""/>
                                </a>
                                <Link to="/"><h3><b> Interview With Me</b></h3></Link>
                            </li>
                            <li style={{marginTop: '6px'}}>
                                <Link to="/">Home</Link>
                                {/* < href="..">Home</a> */}
                            </li>
                            {/*<li>*/}
                            {/*    <Link to="/about"> <i className='fa fa-'></i> About</Link>*/}
                            {/*</li>*/}
                            <li style={{marginTop: '6px'}}>
                                <Link to="/course">Course</Link>
                            </li>
                            {isLoggedIn && (
                                <li style={{marginTop: '6px'}}>
                                    <Link to="/quiz">Quiz</Link>
                                </li>)}
                            {isLoggedIn && (
                                <li style={{marginTop: '6px'}}>
                                    <Link to="/solve-problem">Solve Problem</Link>
                                </li>)}
                            {isLoggedIn && (
                                <li style={{marginTop: '6px'}}>
                                    <Link to="/study-plan"> Study Plan</Link>
                                </li>)}

                        </ul>
                    </div>
                    {/* Header Menu End */}

                    {/* Header Meta Start */}
                    <div className="header-meta">

                        <div className="header-search d-none d-lg-block" style={{marginRight: '24px'}}>
                            <form action="#">
                                <input type="text" placeholder="Search Courses"/>
                                <button><i className="flaticon-loupe"></i></button>
                            </form>
                        </div>

                        {!isLoggedIn ? <div className="header-login d-none d-lg-flex">
                            <Link to="/login"><i className="fa fa-key"></i> Login/</Link>
                            <Link to="/register">Register</Link>
                        </div> : <div className="header-login d-none d-lg-flex">

                            <Link to="/my-profile"><i className="fa fa-user"></i> My Profile / </Link>
                            <a onClick={handleLogOut} style={{marginLeft: '8px'}}>
                                <i className="fa fa-sign-out"></i> Logout
                            </a>
                        </div>}
                    </div>
                </div>
            </div>
        </div>
    </>)
}
