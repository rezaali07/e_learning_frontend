import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Route, BrowserRouter as Router, Switch } from "react-router-dom";
import WebFont from "webfontloader";
import { loadUser } from "./actions/UserActions";
import Store from "./Store";
import AIAssistant from "./more/AIAssistant";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import "./App.css";
import '@fortawesome/fontawesome-free/css/all.min.css';

// Import your FTUE modal component
import FTUETour from "./more/modals/FTUETour"; 
import ArrowGuide from "./more/modals/ArrowGuide"; 

// Pages & Components
import About from "./component/about/About";
import LoginSign from "./component/Authentication/LoginSign";
import CourseDetailPage from "./component/Course/CourseDetailPage";
import CourseLessonView from "./component/Course/CourseLessonView";
import Favorites from "./component/Course/Favorites";
import MyPurchasedCourses from "./component/Course/MyPurchasedCourses";
import Payment from "./component/Course/Payment";
import PaymentSuccess from "./component/Course/PaymentSuccess";
import Home from "./component/Home/Home";
import EditProfile from "./component/user/EditProfile";
import ForgotPassword from "./component/user/ForgotPassword";
import MoreOption from "./component/user/MoreOption";
import Profile from "./component/user/Profile";
import ResetPassword from "./component/user/ResetPassword";
import UpdatePassword from "./component/user/UpdatePassword";

import AccountSettings from "./more/AccountSettings";
import CommingSoon from "./more/CommingSoon";
import Contact from "./more/Contact";
import LikedCourses from "./more/LikedCourses";
import Loading from "./more/Loader";
import Notfound from "./more/Notfound";
import Rules from "./more/Rules";
import Support from "./more/Support";
import UserData from "./more/UserData";

import ProtectedRoute from "./route/ProtectedRoute";

// Admin Pages
import AddCourse from "./component/admin/AddCourse";
import Category from "./component/admin/Category";
import Course from "./component/admin/Course";
import Dashboard from "./component/admin/Dashboard";
import EarningsDashboard from "./component/admin/EarningsDashboard";
import LessonManagement from "./component/admin/LessonManagement";
import QuizManagement from "./component/admin/QuizManagement";
import Users from "./component/admin/Users";
import AdminGlobalSettings from "./component/admin/AdminGlobalSettings";
import CollegeManagement from "./component/admin/manage_college/CollegeManagement";
import AdminNotifications from "./component/admin/Notifications";

// Quiz & User Pages
import Quiz from "./component/Course/Quiz";
import UserNotifications from "./component/notification/UserNotifications";
import ActivityLog from "./more/ActivityLog";
import CourseProgress from "./more/CourseProgress";
import QuizProgress from "./more/QuizProgress";

// College Info
import AddCollege from "./component/admin/manage_college/AddCollege";
import EditCollege from "./component/admin/manage_college/EditCollege";
import CollegeCategoriesPrograms from "./component/admin/manage_college/CollegeCategoriesPrograms";
import Colleges from "./component/information/Colleges";
import ProgramColleges from "./component/information/ProgramColleges";
import CategoryColleges from "./component/information/CategoryColleges";
import CollegeDetail from "./component/information/CollegeDetail";

// Exams
import AdminExamManagement from "./component/admin/exams/AdminExamManagement";
import ExamRoutine from "./component/information/ExamRoutine";

// Course Search
import CourseSearch from "./component/Course/CourseSearch";
import Courses from "./component/Home/Courses";
import AiQuiz from "./component/Course/AiQuiz";

const PaymentFailure = () => <h2>❌ Payment Failed</h2>;

function App() {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [showTour, setShowTour] = useState(false);

  // Arrow guide multiple steps state
  const arrows = [
    { targetId: "nav-dashboard-btn", label: "Go to Dashboard" },
    { targetId: "nav-courses-btn", label: "Start here" },
    { targetId: "nav-notifications-btn", label: "Check notifications" },
    { targetId: "nav-favorites-btn", label: "View your favorite courses" },
    { targetId: "nav-colleges-btn", label: "Browse colleges" },
    { targetId: "nav-routines-btn", label: "See exam routines" },
    { targetId: "nav-search-btn", label: "Search courses" },
    { targetId: "nav-theme-btn", label: "Switch theme mode" },
    { targetId: "nav-user-btn", label: "User profile & login" },
  ];

  const [currentArrowIndex, setCurrentArrowIndex] = useState(0);
  const [showArrow, setShowArrow] = useState(false);

  useEffect(() => {
    WebFont.load({
      google: { families: ["Roboto", "Droid Sans", "Chilanka"] },
    });
    Store.dispatch(loadUser());
  }, []);

  useEffect(() => {
    const ftueCompleted = localStorage.getItem("ftueCompleted");

    if (user && !user.isFirstTimeUser) {
      localStorage.removeItem("ftueCompleted");
      setShowTour(false);
      return;
    }

    if (isAuthenticated && user?.isFirstTimeUser && !ftueCompleted) {
      setShowTour(true);
    } else {
      setShowTour(false);
    }
  }, [isAuthenticated, user]);

  const updateTourStatus = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.put("/api/v2/update-tour-status", {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      localStorage.setItem("ftueCompleted", "true");
    } catch (error) {
      console.error("Failed to update tour status on backend:", error);
    }
  };

  const handleTourFinish = async () => {
    await updateTourStatus();
    setShowTour(false);
    setShowArrow(true);
    setCurrentArrowIndex(0);
  };

  const handleTourSkip = async () => {
    await updateTourStatus();
    setShowTour(false);
    setShowArrow(true);
    setCurrentArrowIndex(0);
  };

  // When the arrow guide hides, show next arrow or stop
  const handleArrowHide = () => {
    if (currentArrowIndex < arrows.length - 1) {
      setCurrentArrowIndex(currentArrowIndex + 1);
    } else {
      setShowArrow(false);
    }
  };

  return (
    <Router>
      {isAuthenticated && <UserData user={user} />}
      {showTour && <FTUETour onFinish={handleTourFinish} onSkip={handleTourSkip} />}

      {showArrow && (
        <ArrowGuide
          targetId={arrows[currentArrowIndex].targetId}
          label={arrows[currentArrowIndex].label}
          onHide={handleArrowHide}
        />
      )}

      {/* ✅ Floating AI Assistant */}
      <AIAssistant />

      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/load" component={Loading} />
        <Route exact path="/login" component={LoginSign} />
        <Route exact path="/about" component={About} />
        <Route exact path="/support" component={Support} />
        <Route exact path="/more" component={MoreOption} />
        <Route exact path="/contact" component={Contact} />
        <Route exact path="/faq" component={Rules} />
        <Route exact path="/creator" component={CommingSoon} />
        <Route exact path="/colleges" component={Colleges} />
        <Route exact path="/college-category/:slug" component={CategoryColleges} />
        <Route exact path="/college-program/:slug" component={ProgramColleges} />
        <Route exact path="/college/:slug" component={CollegeDetail} />
        <Route exact path="/exam-routines" component={ExamRoutine} />
        <Route exact path="/search" component={CourseSearch} />
        <Route exact path="/courses" component={Courses} />

        <Route exact path="/payment/:id" component={Payment} />
        <Route exact path="/payment/success/:transactionId" component={PaymentSuccess} />
        <Route exact path="/payment/failure" component={PaymentFailure} />

        <Route exact path="/notifications" component={UserNotifications} />

        <Route exact path="/course/:id" component={CourseDetailPage} />
        <ProtectedRoute exact path="/course/:id/learn" component={CourseLessonView} />

        <ProtectedRoute exact path="/course/:id/quiz" component={Quiz} />
        <ProtectedRoute exact path="/me/quiz-progress" component={QuizProgress} />
        <ProtectedRoute exact path="/me/course-progress" component={CourseProgress} />
        <ProtectedRoute exact path="/activity" component={ActivityLog} />

        <ProtectedRoute exact path="/ai-quiz/:lessonId" component={AiQuiz} />




        <Route exact path="/password/forgot" component={ForgotPassword} />
        <Route exact path="/password/reset/:token" component={ResetPassword} />
        <ProtectedRoute exact path="/me" component={Profile} />
        <ProtectedRoute exact path="/me/update" component={UpdatePassword} />
        <ProtectedRoute exact path="/me/update/profile" component={EditProfile} />
        <ProtectedRoute exact path="/settings" component={AccountSettings} />
        <ProtectedRoute exact path="/favorites" component={Favorites} />
        <ProtectedRoute exact path="/me/liked" component={LikedCourses} />
        <ProtectedRoute exact path="/me/purchased" component={MyPurchasedCourses} />

        <ProtectedRoute exact path="/admin/dashboard" component={Dashboard} isAdmin={true} />
        <ProtectedRoute exact path="/admin/users" component={Users} isAdmin={true} />
        <ProtectedRoute exact path="/admin/categories" component={Category} isAdmin={true} />
        <ProtectedRoute exact path="/admin/courses" component={Course} isAdmin={true} />
        <ProtectedRoute exact path="/admin/addCourse" component={AddCourse} isAdmin={true} />
        <ProtectedRoute exact path="/admin/lessonManagement" component={LessonManagement} isAdmin={true} />
        <ProtectedRoute exact path="/admin/quizManagement" component={QuizManagement} isAdmin={true} />
        <ProtectedRoute exact path="/admin/earnings" component={EarningsDashboard} isAdmin={true} />
        <ProtectedRoute exact path="/admin/offerSettings" component={AdminGlobalSettings} isAdmin={true} />
        <ProtectedRoute exact path="/admin/notifications" component={AdminNotifications} isAdmin={true} />
        <ProtectedRoute exact path="/admin/collegeManagement" component={CollegeManagement} isAdmin={true} />
        <ProtectedRoute exact path="/admin/addCollege" component={AddCollege} isAdmin={true} />
        <ProtectedRoute exact path="/admin/editCollege" component={EditCollege} isAdmin={true} />
        <ProtectedRoute exact path="/admin/collegeCategoriesPrograms" component={CollegeCategoriesPrograms} isAdmin={true} />
        <ProtectedRoute exact path="/admin/adminExamManagement" component={AdminExamManagement} isAdmin={true} />

        <Route component={Notfound} />
      </Switch>
    </Router>
  );
}

export default App; 

