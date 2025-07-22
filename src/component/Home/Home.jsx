import React, { useEffect, useState } from "react";
import "./Home.css";
import { useSelector, useDispatch } from "react-redux";
import { getCourses } from "../../actions/CourseActions";
import Header from "./Header";
import MetaData from "../../more/MetaData";
import Footer from "../../more/Footer";
import BottomTab from "../../more/BottomTab";
import { ToastContainer } from "react-toastify";
import CustomCarousel from "../../component/Home/Carousel";
import ChatSupport from "../../component/Home/chat_support";
import StudentReviewCarousel from "../../component/Home/StudentReviewCarousel";
import CourseSlider from "../../component/Home/CourseSlider";

const Home = () => {
  const dispatch = useDispatch();
  const { courses, loading, error } = useSelector((state) => state.courses);

  const [trendingCourses, setTrendingCourses] = useState([]);
  const [forYouCourses, setForYouCourses] = useState([]);
  const [mustLearnCourses, setMustLearnCourses] = useState([]);

  useEffect(() => {
    dispatch(getCourses());
  }, [dispatch]);

  useEffect(() => {
    if (courses?.length > 0) {
      const shuffled = [...courses].sort(() => 0.5 - Math.random());

      const trending = [];
      const forYou = [];
      const mustLearn = [];

      shuffled.forEach((course, index) => {
        const bucket = index % 3;
        if (bucket === 0) trending.push(course);
        else if (bucket === 1) forYou.push(course);
        else mustLearn.push(course);
      });

      setTrendingCourses(trending);
      setForYouCourses(forYou);
      setMustLearnCourses(mustLearn);
    }
  }, [courses]);

  return (
    <>
      <MetaData title="E-Learning" />
      <Header />
      <CustomCarousel />

      {loading ? (
        <div>Loading courses...</div>
      ) : error ? (
        <div style={{ color: "red" }}>Error: {error}</div>
      ) : (
        <>
          <CourseSlider title="🔥 Trending Courses" courses={trendingCourses} />
          <CourseSlider title="🎯 For You" courses={forYouCourses} />
          <CourseSlider title="📘 Must Learn" courses={mustLearnCourses} />
          <StudentReviewCarousel />
        </>
      )}

      <ToastContainer position="bottom-center" autoClose={5000} />
      <Footer />
      <BottomTab />
      <ChatSupport />
    </>
  );
};

export default Home;
