import React from 'react';
import './VideoSection.css';
import videoVoluntariado from '../../images/Video_Voluntariado_Testimonio.mp4';

const VideoSection = () => {
  return (
    <section className="standalone-video-section">
      <div className="video-container">
        <video className="video-player" controls shadow="true">
          <source src={videoVoluntariado} type="video/mp4" />
          Tu navegador no soporta el elemento de video.
        </video>
      </div>
    </section>
  );
};

export default VideoSection;
