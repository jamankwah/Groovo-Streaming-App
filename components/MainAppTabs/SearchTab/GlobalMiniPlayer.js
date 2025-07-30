import React from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  StyleSheet,
  Animated,
} from 'react-native';
import { Play, Pause, SkipForward, SkipBack } from 'lucide-react-native';
import { useAudio } from './AudioContext';

const GlobalMiniPlayer = () => {
  const {
    currentTrack,
    isPlaying,
    playbackStatus,
    slideAnim,
    pauseResumeTrack,
    playNextTrack,
    playPreviousTrack,
    stopTrack,
    seekToPosition,
    formatTime,
  } = useAudio();

  const handleProgressBarPress = (event) => {
    const { locationX } = event.nativeEvent;
    const { width } = event.nativeEvent.target.measure || { width: 300 };
    
    const progressBarWidth = width;
    const progress = Math.max(0, Math.min(1, locationX / progressBarWidth));
    
    seekToPosition(progress);
  };

  if (!currentTrack) {
    return null;
  }

  // Determine the correct image and artist based on the track
  const getTrackInfo = () => {
    // Iron Boy tracks
    if (['The Victory Song', 'One', 'So it Goes', 'Top of the Morning', 'Body', 'Sacrifice', 'Soma Obi', 'Dreamer', 'Iron Boy', 'Sin City'].includes(currentTrack.title)) {
      return {
        image: require('../../../assets/images/playlists/ironboy.jpg'),
        artist: 'Black Sherif'
      };
    }
    
    // Pink Friday 2 tracks
    if (['Are You Gone Already', 'Needle (feat. Drake)', 'FTCU', 'Bahm Bahm (feat. Lil Wayne)', 'Everybody (feat. Lil Uzi Vert)', 'RNB (feat. Lil Wayne)', 'Pink Birthday', 'Cowgirl', 'Just The Memories', 'Pink Friday Girls'].includes(currentTrack.title)) {
      return {
        image: require('../../../assets/images/album/pinkfriday2.jpg'),
        artist: 'Nicki Minaj'
      };
    }
    
    
    // Maroon 5 tracks - use individual album covers
    const maroon5Tracks = {
      'Misery': require('../../../assets/images/album/misery.jpg'),
      'Payphone': require('../../../assets/images/album/payphone.jpg'),
      'Animals': require('../../../assets/images/album/animals.jpg'),
      'Sugar': require('../../../assets/images/album/sugar.jpg'),
      'The Sun': require('../../../assets/images/album/the-sun.jpg'),
      'What Lovers Do': require('../../../assets/images/album/whatloversdo.jpg'),
    };
    
    if (maroon5Tracks[currentTrack.title]) {
      return {
        image: maroon5Tracks[currentTrack.title],
        artist: 'Maroon 5'
      };
    }
    
    // Default fallback
    
    return {
      image: require('../../../assets/images/songs/lordhuron.jpg'),
      artist: 'Lord Huron'
    };
  };

  const { image, artist } = getTrackInfo();

  return (
    <Animated.View 
      style={[
        styles.miniPlayer,
        {
          transform: [{ translateY: slideAnim }]
        }
      ]}
    >
      {/* Progress Bar */}
      <View style={styles.progressContainer}>
        <TouchableOpacity 
          style={styles.progressBar}
          activeOpacity={1}
          onPress={handleProgressBarPress}
        >
          <View 
            style={[
              styles.progressFill,
              { width: `${playbackStatus.progress * 100}%` }
            ]}
          />
          <View 
            style={[
              styles.progressThumb,
              { 
                left: `${playbackStatus.progress * 100}%`,
                opacity: playbackStatus.progress > 0 ? 1 : 0
              }
            ]}
          />
        </TouchableOpacity>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>
            {formatTime(playbackStatus.position)}
          </Text>
          <Text style={styles.timeText}>
            {formatTime(playbackStatus.duration)}
          </Text>
        </View>
      </View>
      
      {/* Player Content */}
      <View style={styles.miniPlayerContent}>
        <Image 
          source={image}
          style={styles.miniPlayerImage}
        />
        <View style={styles.miniPlayerInfo}>
          <Text style={styles.miniPlayerTitle} numberOfLines={1}>
            {currentTrack.title}
          </Text>
          <Text style={styles.miniPlayerArtist} numberOfLines={1}>
            {artist}
          </Text>
        </View>
        <View style={styles.miniPlayerControls}>
          <TouchableOpacity 
            style={styles.miniPlayerButton}
            onPress={playPreviousTrack}
          >
            <SkipBack size={20} color="#FFFFFF" fill="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.miniPlayerButton}
            onPress={pauseResumeTrack}
          >
            {isPlaying ? (
              <Pause size={24} color="#FFFFFF" fill="#FFFFFF" />
            ) : (
              <Play size={24} color="#FFFFFF" fill="#FFFFFF" />
            )}
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.miniPlayerButton}
            onPress={playNextTrack}
          >
            <SkipForward size={20} color="#FFFFFF" fill="#FFFFFF" />
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.miniPlayerButton}
            onPress={stopTrack}
          >
            <Text style={styles.closeButton}>×</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  miniPlayer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#1E1E1E',
    borderTopWidth: 1,
    borderTopColor: '#333',
    paddingTop: 8,
    paddingHorizontal: 16,
    paddingBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: -2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    zIndex: 1000,
  },
  progressContainer: {
    marginBottom: 12,
  },
  progressBar: {
    height: 3,
    backgroundColor: '#333',
    borderRadius: 1.5,
    marginBottom: 4,
    position: 'relative',
    justifyContent: 'center',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#BB86FC',
    borderRadius: 1.5,
    position: 'absolute',
    left: 0,
    top: 0,
  },
  progressThumb: {
    position: 'absolute',
    top: -4,
    width: 12,
    height: 12,
    backgroundColor: '#BB86FC',
    borderRadius: 6,
    marginLeft: -6,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.3,
    shadowRadius: 2,
    elevation: 3,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  timeText: {
    color: '#888',
    fontSize: 11,
  },
  miniPlayerContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniPlayerImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
  },
  miniPlayerInfo: {
    flex: 1,
    marginLeft: 12,
    marginRight: 12,
  },
  miniPlayerTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 2,
  },
  miniPlayerArtist: {
    color: '#888',
    fontSize: 14,
  },
  miniPlayerControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  miniPlayerButton: {
    padding: 8,
    marginLeft: 8,
  },
  closeButton: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default GlobalMiniPlayer;