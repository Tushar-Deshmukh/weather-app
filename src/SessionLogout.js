// import React, { useState } from "react";
// import { useIdleTimer } from "react-idle-timer";
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";

// export default function SessionLogout({ children, location }) {
//   const navigate = useNavigate();
//   const [toastDisplayed, setToastDisplayed] = useState(false);

//   const handleOnIdle = (event) => {
//     window.localStorage.removeItem("token");
//     window.localStorage.removeItem("creatturAccessToken");
//     window.localStorage.clear();
//     const excludedPaths = [
//       "/",
//       "/login",
//       "/register/:inviteCode?",
//       "/signup-otp",
//       "/verify-otp",
//       "/reset-password",
//       "/changePassword",
//       "/forget-password",
//       "/privacy-policy",
//       "/404",
//       "/membership-agreement",
//     ];

//     // Check if the current path is not in the excluded paths and the toast has not been displayed
//     if (
//       !excludedPaths.includes(window.location.pathname) &&
//       !toastDisplayed
//     ) {
//       toast.error("Session has expired.");
//       setToastDisplayed(true);
//      navigate('/login');
//     }
//   };

//   const handleOnActive = (event) => {
//     // Reset the toastDisplayed state when the user becomes active
//     setToastDisplayed(false);
//   };

//   const handleOnAction = (event) => {};

//   const { getRemainingTime, getLastActiveTime } = useIdleTimer({
//     timeout: 1000 * 60 * 30, // 30 min.
//     // timeout: 10000 , // 10 sec.
//     onIdle: handleOnIdle,
//     onActive: handleOnActive,
//     onAction: handleOnAction,
//     debounce: 500,
//   });

//   return <div>{children}</div>;
// }

// import React, { useState,useEffect } from "react";
// import { useNavigate } from 'react-router-dom';
// import { toast } from "react-toastify";

// const SESSION_TIMEOUT_MS = 1000 * 60 * 60; // 60 min.

// export default function SessionLogout({ children, location }) {
//   const navigate = useNavigate();
//   const [toastDisplayed, setToastDisplayed] = useState(false);
//   const [lastActiveTime, setLastActiveTime] = useState(null);

//   const handleUserActivity = () => {
//     setLastActiveTime(new Date());
//   };

//   const handleSessionTimeout = () => {
//     const excludedPaths = [
//       "/",
//       "/login",
//       "/register/:inviteCode?",
//       "/signup-otp",
//       "/verify-otp",
//       "/reset-password",
//       "/changePassword",
//       "/forget-password",
//       "/privacy-policy",
//       "/404",
//       "/membership-agreement",
//     ];

//     // Check if the current path is not in the excluded paths and the toast has not been displayed
//     if (
//       !excludedPaths.includes(window.location.pathname) &&
//       !toastDisplayed
//     ) {
//       navigate('/login');
//       window.localStorage.clear();
//       toast.error("Session has expired.");
//       setToastDisplayed(true);

//     }
//   };

//   useEffect(() => {
//     const interval = setInterval(handleSessionTimeout, SESSION_TIMEOUT_MS);
//     return () => clearInterval(interval);
//   }, [lastActiveTime]);

//   useEffect(() => {
//     handleUserActivity();
//   }, [children]);

//   return <div>{children}</div>;
// }

import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import sessionService from "./SessionService";

export default function SessionLogout({ children }) {
  // const navigate = useNavigate();
  // const [lastActiveTime, setLastActiveTime] = useState(new Date());

  // Add your excluded paths to this array
  const excludedPaths = [
    "/",
    "/login",
    "/register/:inviteCode?",
    "/signup-otp",
    "/verify-otp",
    "/reset-password",
    "/changePassword",
    "/forget-password",
    "/privacy-policy",
    "/404",
    "/membership-agreement",
  ];

  const currentPath = window.location.pathname;
  const isExcludedPath = excludedPaths.includes(currentPath);

  const handleUserActivity = () => {
    // setLastActiveTime(new Date());
    sessionService.clearTimers();
    sessionService.startTimers(handleSessionTimeout, handleIdleTimeout);
  };

  const handleSessionTimeout = () => {
    if (
      !sessionService.sessionExpired &&
      !sessionService.sessionToastDisplayed
    ) {
     
        // sessionService.clearTimers();
        // sessionService.setSessionExpired(true);
        // sessionService.setSessionToastDisplayed(true);
        // toast.error("Session has expired.");
        // window.localStorage.removeItem("token");
        // window.localStorage.removeItem("creatturAccessToken");
        // window.localStorage.clear();
      }

  };

  const handleIdleTimeout = () => {
    if (!sessionService.idleExpired && !sessionService.idleToastDisplayed) {
   
        // sessionService.clearTimers();
        // sessionService.setIdleExpired(true);
        // sessionService.setIdleToastDisplayed(true);
        // toast.error("Session has expired due to inactivity.");
        // window.localStorage.removeItem("token");
        // window.localStorage.removeItem("creatturAccessToken");
        // window.localStorage.clear();
      }
 
  };

  useEffect(() => {
    sessionService.startTimers(handleSessionTimeout, handleIdleTimeout);
    window.addEventListener("mousemove", handleUserActivity);
    window.addEventListener("keydown", handleUserActivity);
    window.addEventListener("click", handleUserActivity);
    return () => {
      sessionService.clearTimers();
      window.removeEventListener("mousemove", handleUserActivity);
      window.removeEventListener("keydown", handleUserActivity);
      window.removeEventListener("click", handleUserActivity);
    };
  }, []);

  useEffect(() => {
    if (!isExcludedPath) {
      handleUserActivity();
    }
  }, [isExcludedPath]);

  if (isExcludedPath) {
    return <div>{children}</div>;
  }

  return <div>{children}</div>;
}
