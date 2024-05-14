// import logo from './logo.svg';
// import './App.css';
import Home from "./Pages/Home";
import {  Routes, Route } from 'react-router-dom'
import About from "./Pages/About";
import Course from "./Pages/Course";
import CourseDetails from "./Component/Course/CourseDetails";
import Register from "./Pages/Register";
import Login from "./Pages/Login";
import ContentReading from "./Component/Course/ContentReading";
import Quiz from "./Pages/Quiz";
import QuizQuestion from "./Component/quiz/QuizQuestion";
import MyProfile from "./Pages/MyProfile";
import StudyPlan from "./Component/Home/StudyPlan";
import SolveProblem from "./Pages/SolveProblem";
import SolveProblemDetails from "./Pages/SolveProblemDetails";
import MySubmissions from "./Pages/MySubmissions";
import UserReferralList from "./Pages/UserReferralList";


function App() {
  return (
    <div className="main-wrapper">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/about" element={<About />}/>
          <Route path="/course" element={<Course />}/>
          <Route path="/course-details/:id" element={<CourseDetails />}/>
          <Route path="/course-content-reading/:courseId/:id" element={<ContentReading />}/>
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path='/quiz' element={<Quiz />} />
          <Route path='/solve-problem' element={<SolveProblem />} />
          <Route path='/my-submissions' element={<MySubmissions />} />
          <Route path='/solve-problem/:question_id' element={<SolveProblemDetails />} />
          <Route path='/quiz-question/:quiz_id' element={<QuizQuestion />} />
          <Route path='/my-profile' element={<MyProfile />} />
          <Route path="/register/:id" element={<Register />} />
          <Route path="/study-plan" element={<StudyPlan />} />
          <Route path="/referral-users" element={<UserReferralList />} />
        </Routes>
    </div>
  );
}

export default App;
