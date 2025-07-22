// import FaceIcon from "@material-ui/icons/Face";
// import LockOpenIcon from "@material-ui/icons/LockOpen";
// import MailOutlineIcon from "@material-ui/icons/MailOutline";
// import { React, useEffect, useRef, useState } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import { clearErrors, login, register } from "../../actions/UserActions";
// import Loader from "../../more/Loader";
// import MetaData from "../../more/MetaData";
// import "./LoginSign.css";
// import logo from "../../Assets/app_logo.png";  // Make sure the path is correct

// const LoginSignup = ({ history, location }) => {
//   const dispatch = useDispatch();

//   const { error, loading, isAuthenticated, user } = useSelector(
//     (state) => state.user
//   );

//   const [loginEmail, setLoginEmail] = useState("");
//   const [loginPassword, setLoginPassword] = useState("");

//   const [userData, setUserData] = useState({
//     name: "",
//     email: "",
//     password: "",
//   });

//   const { name, email, password } = userData;

//   const loginTab = useRef(null);
//   const registerTab = useRef(null);
//   const switcherTab = useRef(null);

//   const [avatar, setAvatar] = useState("/profile.png");
//   const [avatarPreview, setAvatarPreview] = useState("/profile.png");

//   const loginSubmit = (e) => {
//     e.preventDefault();
//     dispatch(login(loginEmail, loginPassword));
//   };

//   const registerSubmit = (e) => {
//     window.location.reload();

//     const myForm = new FormData();

//     myForm.set("name", name);
//     myForm.set("email", email);
//     myForm.set("password", password);
//     myForm.set("avatar", avatar);
//     dispatch(register(myForm));
//   };

//   const registerDataChange = (e) => {
//     if (e.target.name === "avatar") {
//       const reader = new FileReader();

//       reader.onload = () => {
//         if (reader.readyState === 2) {
//           setAvatarPreview(reader.result);
//           setAvatar(reader.result);
//         }
//       };

//       reader.readAsDataURL(e.target.files[0]);
//     } else {
//       setUserData({ ...userData, [e.target.name]: e.target.value });
//     }
//   };

//   const redirect = location.search ? location.search.split("=")[1] : "/";

//   useEffect(() => {
//     if (error) {
//       toast.error(error);
//       dispatch(clearErrors());
//     }

//     if (isAuthenticated) {
//       // Check if the user is an admin
//       if (user && user.role === "admin") {
//         // Redirect to the admin dashboard
//         history.push("dashboard");
//       } else {
//         // Redirect to the user dashboard or home
//         history.push(redirect);
//       }
//     }
//   }, [dispatch, error, history, isAuthenticated, user, redirect]);

//   const switchTabs = (e, tab) => {
//     if (tab === "login") {
//       switcherTab.current.classList.add("shiftToNeutral");
//       switcherTab.current.classList.remove("shiftToRight");

//       registerTab.current.classList.remove("shiftToNeutralForm");
//       loginTab.current.classList.remove("shiftToLeft");
//     }
//     if (tab === "register") {
//       switcherTab.current.classList.add("shiftToRight");
//       switcherTab.current.classList.remove("shiftToNeutral");

//       registerTab.current.classList.add("shiftToNeutralForm");
//       loginTab.current.classList.add("shiftToLeft");
//     }
//   };

//   return (
//     <>
//       {loading ? (
//         <Loader />
//       ) : (
//         <>
//           <MetaData title="Login or Signup" />
//           <div className="LoginSignUpContainer">
//             {/* Logo Centered */}
//             <Link to="/">
//               <div className="logoContainer">
//               <img src={logo} alt="App Logo" className="logo" />
//             </div>
//             </Link>
//             <div className="LoginSignUpBox">
//               <div>
//                 <div className="login_signUp_toggle">
//                   <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
//                   <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
//                 </div>
//                 <button ref={switcherTab}></button>
//               </div>

//               {/* Login Form */}
//               <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
//                 <div className="loginEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     value={loginEmail}
//                     onChange={(e) => setLoginEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="loginPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     value={loginPassword}
//                     onChange={(e) => setLoginPassword(e.target.value)}
//                   />
//                 </div>
//                 <Link to="/password/forgot">
//                   <span>Forget password ?</span>
//                 </Link>
//                 <input type="submit" value="Login" className="loginBtn" />
//                 <Link to="/">
//                   <span>Login as a guest</span>
//                 </Link>
//               </form>

//               {/* Register Form */}
//               <form
//                 className="signUpForm"
//                 ref={registerTab}
//                 encType="multipart/form-data"
//                 onSubmit={registerSubmit}
//               >
//                 <div className="signUpName">
//                   <FaceIcon />
//                   <input
//                     type="text"
//                     placeholder="Name"
//                     required
//                     name="name"
//                     value={name}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpEmail">
//                   <MailOutlineIcon />
//                   <input
//                     type="email"
//                     placeholder="Email"
//                     required
//                     name="email"
//                     value={email}
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <div className="signUpPassword">
//                   <LockOpenIcon />
//                   <input
//                     type="password"
//                     placeholder="Password"
//                     required
//                     name="password"
//                     value={password}
//                     onChange={registerDataChange}
//                   />
//                 </div>

//                 <div id="registerImage">
//                   <img src={avatarPreview} alt="Avatar Preview" />
//                   <input
//                     type="file"
//                     name="avatar"
//                     accept="image/*"
//                     onChange={registerDataChange}
//                   />
//                 </div>
//                 <input type="submit" value="Register" className="signUpBtn" />
//               </form>
//             </div>
//           </div>
//           <ToastContainer
//             position="bottom-center"
//             autoClose={5000}
//             hideProgressBar={false}
//             newestOnTop={false}
//             closeOnClick
//             rtl={false}
//             pauseOnFocusLoss
//             draggable
//             pauseOnHover
//           />
//         </>
//       )}
//     </>
//   );
// };

// export default LoginSignup;


import FaceIcon from "@material-ui/icons/Face";
import LockOpenIcon from "@material-ui/icons/LockOpen";
import MailOutlineIcon from "@material-ui/icons/MailOutline";
import { React, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { clearErrors, login, register } from "../../actions/UserActions";
import Loader from "../../more/Loader";
import MetaData from "../../more/MetaData";
import "./LoginSign.css";
import logo from "../../Assets/wallpaper/live_logo.gif";
import video from "../../Assets/wallpaper/login_wall.mp4";

const LoginSignup = ({ history, location }) => {
  const dispatch = useDispatch();

  const { error, loading, isAuthenticated, user } = useSelector(
    (state) => state.user
  );

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = userData;

  const loginTab = useRef(null);
  const registerTab = useRef(null);
  const switcherTab = useRef(null);

  const [avatar, setAvatar] = useState("/profile.png");
  const [avatarPreview, setAvatarPreview] = useState("/profile.png");

  const loginSubmit = (e) => {
    e.preventDefault();
    dispatch(login(loginEmail, loginPassword));
  };

  const registerSubmit = (e) => {
    window.location.reload();

    const myForm = new FormData();

    myForm.set("name", name);
    myForm.set("email", email);
    myForm.set("password", password);
    myForm.set("avatar", avatar);
    dispatch(register(myForm));
  };

  const registerDataChange = (e) => {
    if (e.target.name === "avatar") {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setAvatarPreview(reader.result);
          setAvatar(reader.result);
        }
      };

      reader.readAsDataURL(e.target.files[0]);
    } else {
      setUserData({ ...userData, [e.target.name]: e.target.value });
    }
  };

  const redirect = location.search ? location.search.split("=")[1] : "/";

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(clearErrors());
    }

    if (isAuthenticated) {
      // Check if the user is an admin
      if (user && user.role === "admin") {
        // Redirect to the admin dashboard
        history.push("/admin/dashboard");
      } else {
        // Redirect to the user dashboard or home
        history.push(redirect);
      }
    }
  }, [dispatch, error, history, isAuthenticated, user, redirect]);

  const switchTabs = (e, tab) => {
    if (tab === "login") {
      switcherTab.current.classList.add("shiftToNeutral");
      switcherTab.current.classList.remove("shiftToRight");

      registerTab.current.classList.remove("shiftToNeutralForm");
      loginTab.current.classList.remove("shiftToLeft");
    }
    if (tab === "register") {
      switcherTab.current.classList.add("shiftToRight");
      switcherTab.current.classList.remove("shiftToNeutral");

      registerTab.current.classList.add("shiftToNeutralForm");
      loginTab.current.classList.add("shiftToLeft");
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <>
          <MetaData title="Login or Signup" />
          <div className="LoginSignUpContainer">
            <video autoPlay loop muted className="background-video">
              <source src={video} type="video/mp4" />
            </video>
            <img src={logo} alt="Logo" className="logo-gif" />
            <div className="LoginSignUpBox">
              <div>
                <div className="login_signUp_toggle">
                  <p onClick={(e) => switchTabs(e, "login")}>LOGIN</p>
                  <p onClick={(e) => switchTabs(e, "register")}>REGISTER</p>
                </div>
                <button ref={switcherTab}></button>
              </div>

              {/* Login Form */}
              <form className="loginForm" ref={loginTab} onSubmit={loginSubmit}>
                <div className="loginEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    value={loginEmail}
                    onChange={(e) => setLoginEmail(e.target.value)}
                  />
                </div>
                <div className="loginPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    value={loginPassword}
                    onChange={(e) => setLoginPassword(e.target.value)}
                  />
                </div>
                <Link to="/password/forgot">
                  <span>Forget password ?</span>
                </Link>
                <input type="submit" value="Login" className="loginBtn" />
                <Link to="/">
                  <span>Login as a guest</span>
                </Link>
              </form>

              {/* Register Form */}
              <form
                className="signUpForm"
                ref={registerTab}
                encType="multipart/form-data"
                onSubmit={registerSubmit}
              >
                <div className="signUpName">
                  <FaceIcon />
                  <input
                    type="text"
                    placeholder="Name"
                    required
                    name="name"
                    value={name}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpEmail">
                  <MailOutlineIcon />
                  <input
                    type="email"
                    placeholder="Email"
                    required
                    name="email"
                    value={email}
                    onChange={registerDataChange}
                  />
                </div>
                <div className="signUpPassword">
                  <LockOpenIcon />
                  <input
                    type="password"
                    placeholder="Password"
                    required
                    name="password"
                    value={password}
                    onChange={registerDataChange}
                  />
                </div>

                <div id="registerImage">
                  <img src={avatarPreview} alt="Avatar Preview" />
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    onChange={registerDataChange}
                  />
                </div>
                <input type="submit" value="Register" className="signUpBtn" />
              </form>
            </div>
          </div>
          <ToastContainer
            position="bottom-center"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
          />
        </>
      )}
    </>
  );
};

export default LoginSignup;