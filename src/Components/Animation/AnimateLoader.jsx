import { useEffect } from "react";
import loader from "Data/Images/Animation/loader.json";
import lottie from "lottie-web";
import "./Animation.css";

const AnimateLoader = () => {
  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#loader-animation"),
      animationData: loader,
    });
  }, []);

  return (
    <div className="loader-animation">
      <div id="loader-animation" />
    </div>
  );
};

export default AnimateLoader;
