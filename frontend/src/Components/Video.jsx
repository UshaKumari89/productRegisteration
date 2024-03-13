import React from "react";
import PropTypes from "prop-types";
import "./Video.scss"; // Import your SCSS file for styling

function Video({ videoUrl, videotitle, heading }) {
  return (
    <section className="how-to-use">
      <h2>{heading}</h2>
      <div className="video-container">
        <iframe
          width="550"
          height="330"
          src={videoUrl}
          title={videotitle}
          allow="accelerometer; autoplay;"
          allowFullScreen
        ></iframe>
      
      </div>
    </section>
  );
}

Video.propTypes = {
  videoUrl: PropTypes.string.isRequired,
  videotitle: PropTypes.string.isRequired,
  heading: PropTypes.string.isRequired,
};

export default Video;
