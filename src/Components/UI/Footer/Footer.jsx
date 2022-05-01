import { useTheme } from "../../../Context";
import "./Footer.css";
export const Footer = () => {
  const { darkTheme } = useTheme();

  return (
    <div className="footer-body">
      <h3>
        made with ❤️ by
        <a
          href="https://twitter.com/SaurabhChirde"
          target="_blank"
          className={darkTheme ? "footer-title-dark" : "footer-title-light"}
        >
          Saurabh Chirde
        </a>
      </h3>
      <h3 className="github-icon">
        <a
          href="https://github.com/saurabhchirde/pebble-note-app"
          target="_blank"
          className={darkTheme ? "footer-title-dark" : "footer-title-light"}
        >
          Github
        </a>
      </h3>
    </div>
  );
};
