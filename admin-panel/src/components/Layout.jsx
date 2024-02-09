import LeftBarTab from "./layouts/LeftBarTab";
import TopBar from "./layouts/TopBar";
import RightBar from "./layouts/RightBar";
import Footer from "./layouts/Footer";
import Home from "./pages/Home";
import {Route, Routes} from "react-router-dom";
import PrivateComponent from "./PrivateComponent";
import CourseCategory from "./pages/Domain/courseCategory/courseCategory"
import Course from "./pages/Domain/course/course";
import CourseContentCategory from "./pages/Domain/courseContentCategory/courseContentCategory";
import CourseContent from "./pages/Domain/courseContent/courseContent";
import CourseQuestion from "./pages/Domain/courseQuestion/courseQuestion";
import Quiz from "./pages/Domain/Quiz/quiz";
import QuizQuestion from "./pages/Domain/quizQuestion/quizQuestion";
import CourseContentForm from "./pages/Domain/courseContent/courseContentForm";
import CourseQuestionForm from "./pages/Domain/courseQuestion/courseQuestionForm";
import CourseForm from "./pages/Domain/course/courseForm";
import CodingChallengeAdd from "./pages/Domain/codingChallenge/CodingChallengeAdd";
import CodingChallengeList from "./pages/Domain/codingChallenge/CodingChallengeList";
import Instructor from "./pages/Domain/instructor/instructor";
import Slider from "./pages/Domain/slider/slider";

const Layout = () => {
    return (<>
            <div>
                <LeftBarTab/>
                <TopBar/>
                <div className="page-wrapper">
                    <div className="page-content-tab">
                        <div className="container-fluid">
                            <Routes>
                                <Route path="/home" element={<PrivateComponent>
                                    <Home/>
                                </PrivateComponent>}/>
                                <Route path="/course-categories" element={<CourseCategory/>}/>
                                <Route path="/courses" element={<Course/>}/>
                                <Route path="/course-content-categories" element={<CourseContentCategory/>}/>
                                <Route path="/course-content" element={<CourseContent/>}/>
                                <Route path="/course-question" element={<CourseQuestion/>}/>
                                <Route path="/quizs" element={<Quiz/>}/>
                                <Route path="/quiz-questions" element={<QuizQuestion/>}/>
                                <Route path="/new-course-content" element={<CourseContentForm/>}/>
                                <Route path="/new-course-question" element={<CourseQuestionForm/>}/>
                                <Route path="/new-course" element={<CourseForm/>}/>
                                <Route path="/course-categories" element={<CourseCategory/>}/>
                                <Route path="/courses" element={<Course/>}/>
                                <Route path="/course-content-categories" element={<CourseContentCategory/>}/>
                                <Route path="/course-content" element={<CourseContent/>}/>
                                <Route path="/course-question" element={<CourseQuestion/>}/>
                                <Route path="/coding-challenge" element={<CodingChallengeAdd/>}/>
                                <Route path="/coding-challenge-list" element={<CodingChallengeList/>}/>
                                <Route path="/quizs" element={<Quiz/>}/>
                                <Route path="/quiz-questions" element={<QuizQuestion/>}/>
                                <Route path="/new-course-content" element={<CourseContentForm/>}/>
                                <Route path="/new-course-question" element={<CourseQuestionForm/>}/>
                                <Route path="/instructors" element={<Instructor/>}/>
                                <Route path="/sliders" element={<Slider />}/>
                            </Routes>
                        </div>
                        <RightBar/>
                        <Footer/>
                    </div>
                </div>
            </div>
        </>);
}

export default Layout;