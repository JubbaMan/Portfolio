import React, { useRef, useState, useEffect } from "react";
import "./Music.css";

const Music = () => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isExpanded, setIsExpanded] = useState(false);
  const [progress, setProgress] = useState(0);

  const playlist = [
    {
      title: "Discovery",
      artist: "AK",
      src: "track1.mp3"
    },
    {
      title: "Fireside Light ",
      artist: "Shwin",
      src: "track2.mp3"
    },
    {
      title: "Exhale",
      artist: "Oscuro",
      src: "track3.mp3"
    }
  ];

  // Handle Audio Events
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => handleNext();
    const handleTimeUpdate = () => {
      const percent = (audio.currentTime / audio.duration) * 100;
      setProgress(percent || 0);
    };

    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    
    return () => {
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
    };
  }, [currentSongIndex]);

  useEffect(() => {
    if (audioRef.current && isPlaying) {
      audioRef.current.play().catch(e => console.log("Autoplay blocked", e));
    }
  }, [currentSongIndex]);

  const togglePlay = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      audio.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
    }
  };

  const handlePrevious = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.currentTime > 3) {
      audio.currentTime = 0;
    } else {
      setCurrentSongIndex(prev => (prev === 0 ? playlist.length - 1 : prev - 1));
    }
  };

  const handleNext = () => {
    setCurrentSongIndex(prev => (prev === playlist.length - 1 ? 0 : prev + 1));
  };

  // SVG Icons
  const IconPlay = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M8 5v14l11-7z"/></svg>
  );
  const IconPause = () => (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor"><path d="M6 19h4V5H6v14zm8-14v14h4V5h-4z"/></svg>
  );
  const IconNext = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 18l8.5-6L6 6v12zM16 6v12h2V6h-2z"/></svg>
  );
  const IconPrev = () => (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M6 6h2v12H6zm3.5 6l8.5 6V6z"/></svg>
  );

  return (
    <div 
      id="ongaku" 
      className={isExpanded ? 'expanded' : ''}
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
    >
      <div id="gaku">
        <div className="player-container">
          {/* Album Art - Using music.png */}
          <img
            src="music.png"
            alt="album art"
            className={`album-art ${isPlaying ? 'playing' : ''}`}
          />
          
          {/* Track Info & Controls */}
          <div className="controls-wrapper">
            <div className="track-info">
              <span className="track-name">{playlist[currentSongIndex].title}</span>
              <span className="track-artist">{playlist[currentSongIndex].artist}</span>
            </div>
            
            <div className="button-group">
              <button className="music-btn" onClick={handlePrevious} title="Previous">
                <IconPrev />
              </button>
              <button className="music-btn play-pause" onClick={togglePlay} title={isPlaying ? "Pause" : "Play"}>
                {isPlaying ? <IconPause /> : <IconPlay />}
              </button>
              <button className="music-btn" onClick={handleNext} title="Next">
                <IconNext />
              </button>
            </div>
          </div>
        </div>
        
        {/* Visual Progress Bar */}
        <div className="progress-container">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>
      </div>
      
      <audio
        ref={audioRef}
        src={playlist[currentSongIndex].src}
        preload="metadata"
      />
    </div>
  );
};

export default Music;