import React, { createContext, useContext, useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Animated } from 'react-native';

const AudioContext = createContext();

export const useAudio = () => {
  const context = useContext(AudioContext);
  if (!context) {
    throw new Error('useAudio must be used within an AudioProvider');
  }
  return context;
};

export const AudioProvider = ({ children }) => {
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null);
  const [sound, setSound] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrack, setCurrentTrack] = useState(null);
  const [currentPlaylist, setCurrentPlaylist] = useState([]);
  const [playbackStatus, setPlaybackStatus] = useState({
    position: 0,
    duration: 0,
    progress: 0
  });
  const [slideAnim] = useState(new Animated.Value(100));

  // Configure audio mode when component mounts
  useEffect(() => {
    Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
      staysActiveInBackground: true,
      playsInSilentModeIOS: true,
      shouldDuckAndroid: true,
      playThroughEarpieceAndroid: false,
    });

    // Cleanup function
    return () => {
      if (sound) {
        sound.unloadAsync();
      }
    };
  }, [sound]);

  const seekToPosition = async (progress) => {
    if (sound && playbackStatus.duration > 0) {
      const seekPosition = progress * playbackStatus.duration;
      await sound.setPositionAsync(seekPosition);
    }
  };

  const showMiniPlayer = () => {
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const hideMiniPlayer = () => {
    Animated.timing(slideAnim, {
      toValue: 100,
      duration: 300,
      useNativeDriver: true,
    }).start();
  };

  const playTrack = async (track, playlist = []) => {
    try {
      // Stop current sound if playing
      if (sound) {
        await sound.unloadAsync();
        setSound(null);
        setIsPlaying(false);
      }

      // If clicking the same track, just stop
      if (currentlyPlaying === track.id) {
        setCurrentlyPlaying(null);
        setCurrentTrack(null);
        setCurrentPlaylist([]);
        hideMiniPlayer();
        return;
      }

      // Only play if track has audio file
      if (!track.audioFile) {
        console.log('No audio file for this track');
        return;
      }

      // Load and play new sound
      const { sound: newSound } = await Audio.Sound.createAsync(
        track.audioFile,
        { shouldPlay: true }
      );
      
      setSound(newSound);
      setCurrentlyPlaying(track.id);
      setCurrentTrack(track);
      setCurrentPlaylist(playlist);
      setIsPlaying(true);
      showMiniPlayer();

      // Handle when sound finishes playing
      newSound.setOnPlaybackStatusUpdate((status) => {
        // Update playback status for progress bar
        if (status.isLoaded) {
          const position = status.positionMillis || 0;
          const duration = status.durationMillis || 1;
          const progress = duration > 0 ? position / duration : 0;
          
          setPlaybackStatus({
            position,
            duration,
            progress
          });
        }
        
        // Update playing state
        setIsPlaying(status.isPlaying || false);
        
        // Handle song end - auto play next
        if (status.didJustFinish) {
          playNextTrack();
        }
      });
    } catch (error) {
      console.log('Error playing sound:', error);
      // Reset state if there's an error
      setCurrentlyPlaying(null);
      setCurrentTrack(null);
      setCurrentPlaylist([]);
      setIsPlaying(false);
      setSound(null);
      hideMiniPlayer();
    }
  };

  const stopTrack = async () => {
    if (sound) {
      await sound.unloadAsync();
      setSound(null);
    }
    setCurrentlyPlaying(null);
    setCurrentTrack(null);
    setCurrentPlaylist([]);
    setIsPlaying(false);
    setPlaybackStatus({ position: 0, duration: 0, progress: 0 });
    hideMiniPlayer();
  };

  const pauseResumeTrack = async () => {
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
        setIsPlaying(false);
      } else {
        await sound.playAsync();
        setIsPlaying(true);
      }
    }
  };

  const playNextTrack = async () => {
    if (!currentTrack || currentPlaylist.length === 0) return;
    
    const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack.id);
    const nextIndex = (currentIndex + 1) % currentPlaylist.length;
    const nextTrack = currentPlaylist[nextIndex];
    
    await playTrack(nextTrack, currentPlaylist);
  };

  const playPreviousTrack = async () => {
    if (!currentTrack || currentPlaylist.length === 0) return;
    
    const currentIndex = currentPlaylist.findIndex(track => track.id === currentTrack.id);
    const previousIndex = currentIndex === 0 ? currentPlaylist.length - 1 : currentIndex - 1;
    const previousTrack = currentPlaylist[previousIndex];
    
    await playTrack(previousTrack, currentPlaylist);
  };

  // Format time in mm:ss
  const formatTime = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const value = {
    currentlyPlaying,
    sound,
    isPlaying,
    currentTrack,
    currentPlaylist,
    playbackStatus,
    slideAnim,
    playTrack,
    stopTrack,
    pauseResumeTrack,
    playNextTrack,
    playPreviousTrack,
    seekToPosition,
    formatTime,
    showMiniPlayer,
    hideMiniPlayer,
  };

  return (
    <AudioContext.Provider value={value}>
      {children}
    </AudioContext.Provider>
  );
};