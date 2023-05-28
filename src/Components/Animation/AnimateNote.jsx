import { useEffect } from "react";
import loader from "Data/Images/Animation/loader.json";
import lottie from "lottie-web";
import { useAnimation } from "Context/Animation/AnimationProvider";
import "./Animation.css";

const AnimateNote = () => {
  const { setLoginAnimate } = useAnimation();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#note-animation"),
      animationData: loader,
    });
    const animateTime = setTimeout(() => {
      setLoginAnimate(false);
    }, 2500);
    return () => {
      clearTimeout(animateTime);
    };
  }, [setLoginAnimate]);

  return (
    <div className="loader-animation">
      <div id="note-animation" />
    </div>
  );
};

export default AnimateNote;
