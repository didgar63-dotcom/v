'use client';

import { useState, useRef } from 'react';
import ReactPlayer from 'react-player';
import {
  PlayIcon,
  PauseIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  ArrowsPointingOutIcon,
} from '@heroicons/react/24/outline';

export default function VideoPlayer() {
  const [playing, setPlaying] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [progress, setProgress] = useState(0);
  const [duration, setDuration] = useState(0);
  const playerRef = useRef<ReactPlayer>(null);

  const handlePlayPause = () => {
    setPlaying(!playing);
  };

  const handleMute = () => {
    setMuted(!muted);
  };

  const handleProgress = (state: { played: number; playedSeconds: number }) => {
    setProgress(state.played);
  };

  const handleDuration = (duration: number) => {
    setDuration(duration);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newProgress = parseFloat(e.target.value);
    setProgress(newProgress);
    if (playerRef.current) {
      playerRef.current.seekTo(newProgress);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="relative bg-black rounded-lg overflow-hidden">
      <ReactPlayer
        ref={playerRef}
        url="https://www.youtube.com/watch?v=dQw4w9WgXcQ" // Mock video URL
        playing={playing}
        muted={muted}
        volume={volume}
        width="100%"
        height="400px"
        onProgress={handleProgress}
        onDuration={handleDuration}
        controls={false}
      />
      
      {/* Custom Controls */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
        {/* Progress Bar */}
        <div className="mb-3">
          <input
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={progress}
            onChange={handleSeek}
            className="w-full h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>
        
        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            {/* Play/Pause */}
            <button
              onClick={handlePlayPause}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {playing ? (
                <PauseIcon className="h-6 w-6" />
              ) : (
                <PlayIcon className="h-6 w-6" />
              )}
            </button>
            
            {/* Time Display */}
            <div className="text-white text-sm font-mono">
              {formatTime(progress * duration)} / {formatTime(duration)}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            {/* Volume */}
            <button
              onClick={handleMute}
              className="text-white hover:text-gray-300 transition-colors"
            >
              {muted ? (
                <SpeakerXMarkIcon className="h-5 w-5" />
              ) : (
                <SpeakerWaveIcon className="h-5 w-5" />
              )}
            </button>
            
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={muted ? 0 : volume}
              onChange={(e) => {
                const newVolume = parseFloat(e.target.value);
                setVolume(newVolume);
                setMuted(newVolume === 0);
              }}
              className="w-20 h-1 bg-gray-600 rounded-lg appearance-none cursor-pointer"
            />
            
            {/* Fullscreen */}
            <button className="text-white hover:text-gray-300 transition-colors">
              <ArrowsPointingOutIcon className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .slider::-webkit-slider-thumb {
          appearance: none;
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
        }
        
        .slider::-moz-range-thumb {
          width: 12px;
          height: 12px;
          border-radius: 50%;
          background: #3b82f6;
          cursor: pointer;
          border: none;
        }
      `}</style>
    </div>
  );
}