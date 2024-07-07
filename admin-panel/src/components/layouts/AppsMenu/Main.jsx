import {Link, useLocation} from "react-router-dom";

const Main = () => {

    const location = useLocation();
    console.log(location.pathname);

    return (
        <>
            <div style={{marginLeft: '37px'}}>
                <div className="main-icon-menu-pane tab-pane">
                    <div className="title-box">
                        <h6 className="menu-title">Dashboard</h6>
                    </div>
                    <ul className="nav flex-column">

                        <li className="nav-item">
                            <Link
                                className={location.pathname === "/coding-challenge-list" ? 'nav-link' : 'nav-link-disable'}
                                to="/coding-challenge-list">Coding Challenge </Link>
                        </li>

                        <li className="nav-item">
                            <Link
                                className={location.pathname === "/user-contribute-list" ? 'nav-link' : 'nav-link-disable'}
                                to="/user-contribute-list">User Contribute </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/submissions" ? 'nav-link' : 'nav-link-disable'}
                                  to="/submissions">Coding Submission</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/contest" ? 'nav-link' : 'nav-link-disable'}
                                  to="/contest">Coding Contest</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/sliders" ? 'nav-link' : 'nav-link-disable'}
                                  to="/sliders">Sliders</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
};

export default Main;