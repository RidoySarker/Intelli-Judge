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
                            <Link className={location.pathname === "/course-categories" ? 'nav-link' : 'nav-link-disable'}
                                  to="/course-categories">Course Categories</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/courses" ? 'nav-link' : 'nav-link-disable'} to="/courses">Courses</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/course-content-categories" ? 'nav-link' : 'nav-link-disable'} to="/course-content-categories">Course Chapters</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/course-content" ? 'nav-link' : 'nav-link-disable'} to="/course-content">Chapter Content </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/course-question" ? 'nav-link' : 'nav-link-disable'} to="/course-question">Course Questions</Link>
                        </li>


                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/">Subscribed Course</Link>*/}
                        {/*</li>*/}

                        {/*<li className="nav-item">*/}
                        {/*    <Link className="nav-link" to="/">Course Progress</Link>*/}
                        {/*</li>*/}

                        <li className="nav-item">
                            <Link className={location.pathname === "/coding-challenge-list" ? 'nav-link' : 'nav-link-disable'} to="/coding-challenge-list">Coding Challenge </Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/quizs" ? 'nav-link' : 'nav-link-disable'} to="/quizs">Quiz</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/quiz-questions" ? 'nav-link' : 'nav-link-disable'} to="/quiz-questions">Quiz Questions</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/instructors" ? 'nav-link' : 'nav-link-disable'} to="/instructors">Course Instructor</Link>
                        </li>

                        <li className="nav-item">
                            <Link className={location.pathname === "/sliders" ? 'nav-link' : 'nav-link-disable'} to="/sliders">Sliders</Link>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    );
};

export default Main;