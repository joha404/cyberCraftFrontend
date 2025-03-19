import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Logout from "./views/logout/Logout";
import Layout from "./components/Layout";
import Signin from "./views/signin/Signin";
import Signup from "./views/signup/Signup";
import Contact from "./views/contact/Contact";
import Message from "./views/message/Message";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/dashboard" element={<Layout />} />
          <Route path="/signin" element={<Signin />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/" element={<Contact />} />
          <Route path="/logout" element={<Logout />} />
          <Route path="/message" element={<Message />} />
          {/* <Route path="*" element={<NotFound />} /> */}
        </Routes>
      </Router>
    </>
  );
}

export default App;
