import React from "react";
import "font-awesome/css/font-awesome.min.css";
import Header from "../../components/Header";
import Intro from "./Intro";
import About from "./About";
import Skills from "./Skills";
import Projects from "./Projects";
import Contacts from "./Contacts";
import { useSelector } from "react-redux";

function Index() {
  const { loading, portfolioData } = useSelector((state) => state.root);
  return (
    <div>
      <Header />
      {portfolioData && (
        <div>
          <Intro />
          <About />
          <Skills />
          <Projects />
          <Contacts />
        </div>
      )}
    </div>
  );
}

export default Index;
