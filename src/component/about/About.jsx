import { useSelector } from "react-redux";
import Footer from "../../more/Footer";
import Loading from "../../more/Loader";
import MetaData from "../../more/MetaData";
import Header from "../Home/Header";
import "./About.css";

const About = () => {
  const { loading } = useSelector((state) => state.profile);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <MetaData title="About | E-Learning - Learn Smart" />
          <div>
            <Header />
            <div
              style={{
                width: "90%",
                margin: "0px auto",
                marginTop: "50px",
              }}
            >
              <div className="about__page">
                {/* Section: Introduction */}
                <div className="row flex">
                  <div className="col__2">
                    <img
                      src="https://res.cloudinary.com/dig1ixe4q/image/upload/v1753037483/Screenshot_2025-07-21_002932_cwoqw2.png"
                      alt="E-Learning Illustration"
                    />
                  </div>
                  <div className="col__2">
                    <div className="meta">
                      <span
                        style={{
                          fontSize: "40px",
                          fontWeight: "700",
                          lineHeight: "1.2",
                          color: "#376A80",
                        }}
                      >
                        Welcome to E-Learning 
                      </span>
                      <p>
                        <strong>E-Learning </strong> is a cutting-edge e-learning
                        platform built to make education more accessible,
                        personalized, and engaging. Whether you're a student
                        aiming to improve your skills or an educator looking to
                        share knowledge, NE-Learning  provides the tools and
                        environment to thrive in a digital learning space.
                      </p>
                      <p>
                        Designed in 2025, our platform is a result of passion
                        and innovation in the field of web and mobile learning
                        technologies. It offers a responsive user interface,
                        easy navigation, and flexible course structures.
                      </p>
                    </div>
                  </div>
                </div>

                {/* Section: Features */}
                <div className="feature-section">
                  <h2 style={{ marginTop: "40px", color: "#333" }}>
                    🔥 Key Features of <span style={{ color: "#376A80" }}>E-Learning </span>
                  </h2>
                  <ul className="feature-list">
                    <li>
                      ✅ <strong>Personalized Learning:</strong> Learners get tailored course
                      recommendations based on their interests and progress.
                    </li>
                    <li>
                      🎯 <strong>Gamification:</strong> Earn badges, points, and track your
                      course completion milestones to stay motivated.
                    </li>
                    <li>
                      🌙 <strong>Visual Modes:</strong> Choose between Default, Visual Aid,
                      and Dark Mode for comfortable reading anytime.
                    </li>
                    <li>
                      💬 <strong>Real-time Chat Support:</strong> Get help instantly from our
                      support team directly in the app.
                    </li>
                    <li>
                      📱 <strong>Fully Responsive Design:</strong> Works seamlessly across
                      mobile, tablet, and desktop devices.
                    </li>
                    <li>
                      💳 <strong>Secure Payment Integration:</strong> Purchase paid courses
                      safely using eSewa and enjoy lifetime access.
                    </li>
                    <li>
                      🔐 <strong>Protected Routes:</strong> Secure login, user profiles, and
                      course content with authentication.
                    </li>
                    <li>
                      📚 <strong>Free & Paid Courses:</strong> Access a wide variety of free
                      and premium content across multiple categories.
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <Footer />
          </div>
        </>
      )}
    </>
  );
};

export default About;
