import { useEffect } from "react";
import note_pencil from "../../Data/Images/Animation/note-pencil.json";
import lottie from "lottie-web";
import { useAnimation } from "../../Context/Animation/AnimationProvider";

const AnimateNotePencil = () => {
  const { setLoader } = useAnimation();

  useEffect(() => {
    lottie.loadAnimation({
      container: document.querySelector("#note-pencil"),
      animationData: note_pencil,
    });
    const animateTime = setTimeout(() => {
      setLoader(false);
    }, 2500);
    return () => {
      clearTimeout(animateTime);
    };
  }, []);

  return (
    <div className="landing-animation">
      <div id="note-pencil" />
    </div>
  );
};

export default AnimateNotePencil;
