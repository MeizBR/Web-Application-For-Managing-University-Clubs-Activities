import React from 'react';
import './Video.css';

function SynthesiaVideoPlayer() {
  return (
    <div className ="video-container" style={{ position: 'relative', overflow: 'hidden',  }}>
      <iframe  src="https://share.synthesia.io/embeds/videos/90cc4598-74d5-4fab-aa1c-e4fbd52f0852" loading="eager" title="Synthesia video player - Your AI video" allow="encrypted-media; fullscreen;" style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none', padding: 0, margin: 0, overflow: 'hidden' }}></iframe>
    </div>
  ); 
  
}


export default SynthesiaVideoPlayer;