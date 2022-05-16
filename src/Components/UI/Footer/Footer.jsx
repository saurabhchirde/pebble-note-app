import "./Footer.css";
export const Footer = () => {
  return (
    <div className="footer-body">
      <h3>
        made with ❤️ by
        <a
          href="https://twitter.com/SaurabhChirde"
          target="_blank"
          className="footer-title"
        >
          Saurabh Chirde
        </a>
      </h3>
      <h3 className="github-icon">
        <a
          href="https://github.com/saurabhchirde/pebble-note-app"
          target="_blank"
          className="footer-title"
        >
          Github
        </a>
      </h3>
    </div>
  );
};
