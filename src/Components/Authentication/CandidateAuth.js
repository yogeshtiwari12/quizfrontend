import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import Header from "../Homepage/Header";
import Footer from "../Homepage/Footer";
import { getCandidate, addCandidate } from "../../API/Candidate";
import { useAppContext } from "../../LocalStorage";
import { useNavigate } from "react-router-dom";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { IconButton } from "@mui/material";
import BG2 from "../../Assets/BG2.svg";

function CandidateAuth() {
  const { user, setUser } = useAppContext();
  const navigate = useNavigate();
  useEffect(() => {
    if (user) navigate("/");
  }, [user, navigate]);
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    college: "",
    degree: "",
    collegeRollNo: "",
    branch: "",
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("info");
  const [showPassword, setShowPassword] = useState(false);

  const toggleForm = () => {
    setIsLogin(!isLogin);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    const res = await getCandidate({
      email: formData.email,
      password: formData.password,
    });
    if (res.status === 200) {
      setUser(res.data._doc);
      navigate("/candidate/dashboard");
    } else if (res.status === 203) {
      setSnackbarMessage("User with this email does not exist");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
    } else if (res.status === 201) {
      setSnackbarMessage("Wrong password");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    } else {
      setSnackbarMessage("Could not fetch data");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setSnackbarMessage("Passwords do not match!");
      setSnackbarSeverity("warning");
      setSnackbarOpen(true);
      return;
    }
    const res = await addCandidate({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      college: formData.college,
      degree: formData.degree,
      collegeRollNo: formData.collegeRollNo,
      branch: formData.branch,
    });
    if (res.status === 200) {
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setIsLogin(true);
    } else if (res.status === 201) {
      setSnackbarMessage("User with this email already exist!");
      setSnackbarSeverity("error");
    } else {
      setSnackbarMessage("Registration failed!");
      setSnackbarSeverity("error");
    }
    setSnackbarOpen(true);
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <div
      style={{
        backgroundColor: 'white',
      }}
      className="min-h-screen flex flex-col justify-between items-center"
    >
      {/* <Header /> */}
      <div className="flex flex-col items-center w-full max-w-md p-6 bg-white rounded shadow-md m-20">
        {isLogin ? (
          <>
            <h2 className="text-2xl font-bold mb-4">Candidate Login</h2>
            <form className="w-full" onSubmit={handleLogin}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your email"
                  required
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <div className="flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                    placeholder="Enter your password"
                    required
                  />
                  <IconButton
                    onClick={togglePasswordVisibility}
                    className="ml-2"
                    size="small"
                    aria-label="toggle password visibility"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-500 text-white rounded-md hover:bg-purple-700"
              >
                Login
              </button>
            </form>

            <p className="mt-4">
              Don't have an account?{" "}
              <span
                className="text-purple-900 font-bold cursor-pointer"
                onClick={toggleForm}
              >
                Sign Up
              </span>
            </p>
          </>
        ) : (
          <>
            <h2 className="text-2xl font-bold mb-4">Candidate Sign Up</h2>
            <form className="w-full" onSubmit={handleSignup}>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  First Name
                </label>
                <input
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Last Name
                </label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your password"
                  minLength="6"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Confirm your password"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  College
                </label>
                <input
                  type="text"
                  name="college"
                  value={formData.college}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your college name"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Degree
                </label>
                <input
                  type="text"
                  name="degree"
                  value={formData.degree}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your degree"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  College Roll No
                </label>
                <input
                  type="text"
                  name="collegeRollNo"
                  value={formData.collegeRollNo}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your college roll number"
                  required
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Branch
                </label>
                <input
                  type="text"
                  name="branch"
                  value={formData.branch}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-indigo-100"
                  placeholder="Enter your branch"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full py-2 px-4 bg-purple-700 text-white rounded-md hover:bg-purple-900"
              >
                Sign Up
              </button>
            </form>
            <p className="mt-4">
              Already have an account?{" "}
              <span
                className="text-purple-900 font-bold cursor-pointer"
                onClick={toggleForm}
              >
                Login
              </span>
            </p>
          </>
        )}
      </div>
      {/* <Footer /> */}

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default CandidateAuth;