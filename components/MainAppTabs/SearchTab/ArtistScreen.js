import React from 'react';
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
  ImageBackground,
} from 'react-native';
import { ArrowLeft, Play, MoveVertical as MoreVertical } from 'lucide-react-native';
import { useAudio } from './AudioContext';

const ArtistScreen = ({ navigation }) => {
  const { currentlyPlaying, playTrack } = useAudio();

  const popularReleases = [
    {
      id: 1,
      title: 'Misery',
      album: 'Maroon 5 - Misery',
      image: require('../../../assets/images/album/misery.jpg'),
      audioFile: require('../../../assets/audio/misery.mp3'),
      duration: '3:36',
    },
    {
      id: 2,
      title: 'Payphone',
      album: 'Maroon 5 - Overexposed',
      image: require('../../../assets/images/album/payphone.jpg'),
      audioFile: require('../../../assets/audio/payphone.mp3'),
      duration: '3:51',
    },
    {
      id: 3,
      title: 'Animals',
      album: 'Maroon 5 - V',
      image: require('../../../assets/images/album/animals.jpg'),
      audioFile: require('../../../assets/audio/animals.mp3'),
      duration: '3:51',
    },
    {
      id: 4,
      title: 'Sugar',
      album: 'Maroon 5 - Singles',
      image: require('../../../assets/images/album/sugar.jpg'),
      audioFile: require('../../../assets/audio/sugar.mp3'),
      duration: '3:55',
    },
    {
      id: 5,
      title: 'The Sun',
      album: 'Maroon 5 - Songs About Jane',
      image: require('../../../assets/images/album/the-sun.jpg'),
      audioFile: require('../../../assets/audio/thesun.mp3'),
      duration: '4:11',
    },
    {
      id: 6,
      title: 'What Lovers Do',
      album: 'Maroon 5 - Red Pill Blues Deluxe',
      image: require('../../../assets/images/album/whatloversdo.jpg'),
      audioFile: require('../../../assets/audio/whatloversdo.mp3'),
      duration: '3:20',
    },
  ];

  const artistPlaylists = [
    {
      id: 1,
      title: 'Maroon 5: Best of the best',
      image: require('../../../assets/images/playlists/maroon5-best.jpg'),
    },
    {
      id: 2,
      title: 'This is Maroon 5',
      image: require('../../../assets/images/playlists/this-ismaroon5.jpg'),
    },
    {
      id: 3,
      title: 'Maroon 5 Mix',
      image: require('../../../assets/images/playlists/maroon5-mix.jpg'),
    },
  ];

  const similarArtists = [
    {
      id: 1,
      name: 'One Republic',
      image: require('../../../assets/images/artists/onerepublic.jpg'),
    },
    {
      id: 2,
      name: 'Coldplay',
      image: require('../../../assets/images/artists/coldplay.jpg'),
    },
    {
      id: 3,
      name: 'The Chainsmokers',
      image: require('../../../assets/images/artists/chainsmokers.jpg'),
    },
    {
      id: 4,
      name: 'Shawn Mendes',
      image: require('../../../assets/images/artists/shawnmendes.jpg'),
    },
  ];

  const renderPopularRelease = (item) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.releaseItem}
      onPress={() => playTrack(item, popularReleases)}
    >
      <Image source={item.image} style={styles.releaseImage} />
      <View style={styles.releaseInfo}>
        <Text style={[
          styles.releaseTitle,
          currentlyPlaying === item.id && styles.playingTrackTitle
        ]}>
          {item.title}
        </Text>
        <Text style={styles.releaseAlbum}>{item.album}</Text>
      </View>
      {currentlyPlaying === item.id && (
        <Play size={16} color="#BB86FC" fill="#BB86FC" style={styles.playingIcon} />
      )}
      <TouchableOpacity style={styles.moreButton}>
        <MoreVertical size={20} color="#888" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderPlaylist = (item) => (
    <TouchableOpacity key={item.id} style={styles.playlistItem}>
      <Image source={item.image} style={styles.playlistImage} />
      <Text style={styles.playlistTitle}>{item.title}</Text>
    </TouchableOpacity>
  );

  const renderSimilarArtist = (item) => (
    <TouchableOpacity key={item.id} style={styles.similarArtistItem}>
      <Image source={item.image} style={styles.similarArtistImage} />
      <Text style={styles.similarArtistName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={require('../../../assets/images/artists/maroon-5-hero.jpg')}
            style={styles.heroBackground}
            imageStyle={styles.heroImage}
          >
            <View style={styles.heroOverlay}>
              <TouchableOpacity 
                style={styles.backButton}
                onPress={() => navigation.goBack()}
              >
                <ArrowLeft size={24} color="#BB86FC" />
              </TouchableOpacity>
              
              <View style={styles.heroContent}>
                <Text style={styles.artistName}>MAROON 5</Text>
                <Text style={styles.artistType}>Artist</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Stats and Actions */}
        <View style={styles.statsSection}>
          <Text style={styles.monthlyListeners}>2.3M monthly listeners</Text>
          
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followButtonText}>Follow</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.playButton}>
              <Play size={24} color="#000000" fill="#BB86FC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Popular Releases */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Popular releases</Text>
            <TouchableOpacity>
              <Text style={styles.seeMoreText}>See more</Text>
            </TouchableOpacity>
          </View>
          
          <View style={styles.releasesList}>
            {popularReleases.map(renderPopularRelease)}
          </View>
        </View>

        {/* Artist Playlists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Artist Playlists</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.playlistsScrollView}
          >
            {artistPlaylists.map(renderPlaylist)}
          </ScrollView>
        </View>

        {/* Similar Artists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Similar artists</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.similarArtistsScrollView}
          >
            {similarArtists.map(renderSimilarArtist)}
          </ScrollView>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  scrollView: {
    flex: 1,
  },
  heroSection: {
    height: 300,
    position: 'relative',
  },
  heroBackground: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  heroImage: {
    resizeMode: 'cover',
  },
  heroOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 24,
  },
  backButton: {
    alignSelf: 'flex-start',
    padding: 8,
  },
  heroContent: {
    alignSelf: 'flex-start',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  artistType: {
    color: '#FFFFFF',
    fontSize: 16,
    opacity: 0.8,
  },
  statsSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  monthlyListeners: {
    color: '#888',
    fontSize: 14,
    marginBottom: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  followButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: '#888',
  },
  followButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
  },
  playButton: {
    backgroundColor: '#BB86FC',
    width: 56,
    height: 56,
    borderRadius: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
  },
  seeMoreText: {
    color: '#888',
    fontSize: 14,
  },
  releasesList: {
    gap: 12,
  },
  releaseItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  releaseImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    marginRight: 12,
  },
  releaseInfo: {
    flex: 1,
  },
  releaseTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playingTrackTitle: {
    color: '#BB86FC',
  },
  playingIcon: {
    marginRight: 8,
  },
  releaseAlbum: {
    color: '#888',
    fontSize: 14,
  },
  moreButton: {
    padding: 8,
  },
  playlistsScrollView: {
    marginHorizontal: -8,
  },
  playlistItem: {
    marginHorizontal: 8,
    width: 160,
  },
  playlistImage: {
    width: 160,
    height: 160,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    marginBottom: 8,
  },
  playlistTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    textAlign: 'left',
    lineHeight: 18,
  },
  similarArtistsScrollView: {
    marginHorizontal: -8,
  },
  similarArtistItem: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 100,
  },
  similarArtistImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#2A2A2A',
    marginBottom: 8,
  },
  similarArtistName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default ArtistScreen;