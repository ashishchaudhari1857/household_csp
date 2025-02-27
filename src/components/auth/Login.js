import React, { useEffect, useState } from "react";
import {
  Checkbox,
  EmailInput,
  MobileNumberInput,
  NumberInput,
  TextInput,
} from "../../utils/Inputs";
import { FormProvider, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { FcGoogle } from "react-icons/fc";
import { MdDialerSip } from "react-icons/md";
import { FaEnvelope } from "react-icons/fa";

function Login() {
  const [activeTab, setActiveTab] = useState("email"); // Toggle between email, mobile, and Google login
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col p-5 m-5 bg-white rounded-md shadow-lg md:m-0 w-96">
        <div className="flex flex-col font-sans text-center">
          <span className="mt-1 text-3xl font-bold text-black">Hello Amit</span>
          <span className="text-gray-500">
            Welcome Back, you have been missed for a long time!
          </span>
        </div>

        {/* Tab Navigation */}
        {/* <div className="flex justify-around my-4">
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "email" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("email")}
          >
            Email Login
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "mobile" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("mobile")}
          >
            Mobile Login
          </button>
          <button
            className={`px-4 py-2 rounded-md ${activeTab === "google" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
            onClick={() => setActiveTab("google")}
          >
            Google Login
          </button>
        </div> */}

        {/* Render Components Based on Active Tab */}
        {activeTab === "email" && <LoginWithEmail />}
        {activeTab === "mobile" && <LoginWithMobile />}
        {activeTab === "google" && <LoginWithGoogle />}

        <div className="mt-5">
          <span className="flex items-center my-4 text-gray-500">
            <span className="flex-grow h-px bg-gray-300"></span>
            <span className="mx-2 text-sm font-semibold">OR CONTINUE WITH</span>
            <span className="flex-grow h-px bg-gray-300"></span>
          </span>

          <div className="flex items-center justify-center gap-2 m-10">
            {activeTab !== "google" && (
              <FcGoogle
                className="cursor-pointer"
                onClick={() => setActiveTab("google")}
                size={30}
              />
            )}
            {activeTab !== "mobile" && (
              <MdDialerSip
                className="cursor-pointer"
                onClick={() => setActiveTab("mobile")}
                size={30}
              />
            )}
            {activeTab !== "email" && (
              <FaEnvelope
                className="cursor-pointer"
                onClick={() => setActiveTab("email")}
                size={30}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

// Email Login Component
function LoginWithEmail() {
  const methods = useForm();
  return (
    <div>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            console.log("Email Login:", data)
          )}
        >
          <EmailInput name="email" label="Email" required />
          <TextInput name="password" label="Password" required />
          <div className="flex items-center justify-between gap-2">
            <div className="flex items-center justify-center">
              <Checkbox name="rememberMe" />
              <span className="text-sm">Remember me</span>
            </div>
            <div>
              <Link className="text-sm text-blue-800">forget password?</Link>
            </div>
          </div>
          <button className="w-full p-2 mt-3 text-xl text-white bg-blue-800 rounded-md">
            Login
          </button>
          <div className="m-2 text-center">
            <span>
              Don’t have an account?
              <Link className="text-blue-800 "> Sign Up</Link>
            </span>
          </div>
        </form>
      </FormProvider>
    </div>
  );
}

// Mobile Login Component
function LoginWithMobile() {
  const methods = useForm();
  const [sentOtp, setSendOTP] = useState(false);
  const [timerActive, setTimerActive] = useState(false);
  const [timer, setTimer] = useState();

  const startTimer = () => {
    setTimerActive(true);
    setTimer(100);
  };

  useEffect(() => {
    if (timerActive) {
      const intervalId = setInterval(() => {
        setTimer((prev) => {
          if (prev <= 1) {
            clearInterval(intervalId);
            setTimerActive(false);
            return 0;
          }
          return prev - 1;
        });
      }, 1000); // Run every 1 second

      return () => clearInterval(intervalId); // Cleanup on unmount
    }
  }, [timerActive]);

  return (
    <FormProvider {...methods}>
      <form
        onSubmit={methods.handleSubmit((data) => {
          console.log("Mobile Login:", data);
          setSendOTP(true);
          startTimer();
        })}
      >
        <MobileNumberInput name="mobile" label="Mobile Number" required />
        {sentOtp && <NumberInput name="otp" label="Enter OTP" required />}
        {sentOtp && (
          <div className="flex justify-end m-2">
            <button
              className={`rounded-md p-1 text-sm ${
                timerActive
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-600"
              } text-white`}
              disabled={timerActive}
              onClick={() => {
                if (!timerActive) {
                  setTimer(60); // Reset timer (set desired duration)
                  setTimerActive(true);
                }
              }}
            >
              {timerActive
                ? `Resend OTP in ${Math.floor(timer / 60)}:${String(
                    timer % 60
                  ).padStart(2, "0")}`
                : "Resend OTP"}
            </button>
          </div>
        )}
        <button className="w-full p-2 mt-3 text-xl text-white bg-blue-800 rounded-md">
          {sentOtp ? "Verify OTP" : "Send OTP"}
        </button>
      </form>
    </FormProvider>
  );
}

// Google Login Component
function LoginWithGoogle() {
  const handleGoogleLogin = () => {
    console.log("Google Sign-In Triggered");
  };

  return (
    <div className="flex flex-col items-center">
      <button
        className="w-full p-2 mt-3 text-xl text-white bg-red-600 rounded-md"
        onClick={handleGoogleLogin}
      >
        Sign in with Google
      </button>
    </div>
  );
}

export default Login;
