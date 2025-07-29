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
import { ArrowLeft, Play, MoveVertical as MoreVertical, Download, Heart } from 'lucide-react-native';
import { useAudio } from '../AudioContext';

const PlaylistScreen = ({ navigation }) => {
  const { currentlyPlaying, playTrack } = useAudio();

  const playlistTracks = [
    {
      id: 1,
      title: 'The Victory Song',
      artist: 'Black Sherif',
      duration: '3:01',
      isExplicit: false,
      audioFile: require('../../../assets/audio/victorysong.mp3'),
    },
    {
      id: 2,
      title: 'One',
      artist: 'Black Sherif',
      duration: '3:19',
      isExplicit: false,
      audioFile: require('../../../assets/audio/one.mp3'),
    },
    {
      id: 3,
      title: 'So it Goes',
      artist: 'Black Sherif,Fireboy DML',
      duration: '3:46',
      isExplicit: false,
      audioFile: require('../../../assets/audio/soitgoes.mp3'),
    },
    {
      id: 4,
      title: 'Top of the Morning',
      artist: 'Black Sherif',
      duration: '2:23',
      isExplicit: false,
      audioFile: require('../../../assets/audio/topofthemorning.mp3'),
    },
    {
      id: 5,
      title: 'Body',
      artist: 'Black Sherif',
      duration: '2:53',
      isExplicit: false,
      audioFile: require('../../../assets/audio/body.mp3'),
    },
    {
      id: 6,
      title: 'Sacrifice',
      artist: 'Black Sherif',
      duration: '2:40',
      isExplicit: false,
      audioFile: require('../../../assets/audio/sacrifice.mp3'),
    },
    {
      id: 7,
      title: 'Soma Obi',
      artist: 'Black Sherif',
      duration: '2:48',
      isExplicit: false,
      audioFile: require('../../../assets/audio/somaobi.mp3'),
    },
    {
      id: 8,
      title: 'Dreamer',
      artist: 'Black Sherif',
      duration: '2:27',
      isExplicit: false,
      audioFile: require('../../../assets/audio/dreamer.mp3'),
    },
    {
      id: 9,
      title: 'Iron Boy',
      artist: 'Black Sherif',
      duration: '3:23',
      isExplicit: false,
      audioFile: require('../../../assets/audio/ironboy.mp3'),
    },
    {
      id: 10,
      title: 'Sin City',
      artist: 'Black Sherif,Seyi Vibez',
      duration: '2:50',
      isExplicit: false,
      audioFile: require('../../../assets/audio/sincity.mp3'),
    },
  ];

  const relatedPlaylists = [
    {
      id: 1,
      title: 'The Villain I Never Was',
      year: '2022',
      image: require('../../../assets/images/album/villain.jpg'),
    },
    {
      id: 2,
      title: 'African Giant',
      year: '2021',
      image: require('../../../assets/images/album/giant.jpg'),
    },
    {
      id: 3,
      title: 'Afrobeats Essentials',
      year: '2020',
      image: require('../../../assets/images/playlists/afrobeats.jpg'),
    },
  ];

  const renderTrack = (item, index) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.trackItem}
      onPress={() => playTrack(item, playlistTracks)}
    >
      <View style={styles.trackNumber}>
        {currentlyPlaying === item.id ? (
          <Play size={16} color="#BB86FC" fill="#BB86FC" />
        ) : (
          <Text style={styles.trackNumberText}>{index + 1}</Text>
        )}
      </View>
      <View style={styles.trackInfo}>
        <Text style={[
          styles.trackTitle,
          currentlyPlaying === item.id && styles.playingTrackTitle
        ]}>
          {item.title}
        </Text>
        <Text style={styles.trackArtist}>{item.artist}</Text>
      </View>
      <Text style={styles.trackDuration}>{item.duration}</Text>
      <TouchableOpacity style={styles.trackMoreButton}>
        <MoreVertical size={20} color="#888" />
      </TouchableOpacity>
    </TouchableOpacity>
  );

  const renderMoreAlbum = (item) => (
    <TouchableOpacity key={item.id} style={styles.moreAlbumItem}>
      <Image source={item.image} style={styles.moreAlbumImage} />
      <Text style={styles.moreAlbumTitle}>{item.title}</Text>
      <Text style={styles.moreAlbumYear}>{item.year}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Hero Section */}
        <View style={styles.heroSection}>
          <ImageBackground
            source={require('../assets/images/playlists/ironboy.jpg')}
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
                <Image 
                  source={require('../assets/images/playlists/ironboy.jpg')}
                  style={styles.albumCover}
                />
                <Text style={styles.albumTitle}>Iron Boy</Text>
                <Text style={styles.artistName}>Black Sherif</Text>
                <Text style={styles.albumInfo}>Album • 2023 • 10 songs</Text>
              </View>
            </View>
          </ImageBackground>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionSection}>
          <View style={styles.actionButtons}>
            <TouchableOpacity style={styles.downloadButton}>
              <Download size={20} color="#888" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.heartButton}>
              <Heart size={20} color="#888" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.moreActionsButton}>
              <MoreVertical size={20} color="#888" />
            </TouchableOpacity>

            <TouchableOpacity style={styles.playButton}>
              <Play size={28} color="#000000" fill="#BB86FC" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Track List */}
        <View style={styles.section}>
          <View style={styles.tracksList}>
            {playlistTracks.map(renderTrack)}
          </View>
        </View>

        {/* Related Playlists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More like Black Sherif</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.moreAlbumsScrollView}
          >
            {relatedPlaylists.map(renderMoreAlbum)}
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
    height: 400,
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
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
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
    alignItems: 'center',
  },
  albumCover: {
    width: 200,
    height: 200,
    borderRadius: 8,
    marginBottom: 16,
    backgroundColor: '#2A2A2A',
  },
  albumTitle: {
    color: '#FFFFFF',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 4,
    textAlign: 'center',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 16,
    marginBottom: 8,
    textAlign: 'center',
  },
  albumInfo: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
  },
  actionSection: {
    paddingHorizontal: 16,
    paddingVertical: 20,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  downloadButton: {
    padding: 12,
  },
  heartButton: {
    padding: 12,
  },
  moreActionsButton: {
    padding: 12,
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
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  tracksList: {
    gap: 8,
  },
  trackItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
  },
  trackNumber: {
    width: 30,
    alignItems: 'center',
  },
  trackNumberText: {
    color: '#888',
    fontSize: 16,
  },
  trackInfo: {
    flex: 1,
    marginLeft: 12,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  playingTrackTitle: {
    color: '#BB86FC',
  },
  trackArtist: {
    color: '#888',
    fontSize: 14,
  },
  trackDuration: {
    color: '#888',
    fontSize: 14,
    marginRight: 12,
  },
  trackMoreButton: {
    padding: 8,
  },
  moreAlbumsScrollView: {
    marginHorizontal: -8,
  },
  moreAlbumItem: {
    marginHorizontal: 8,
    width: 140,
  },
  moreAlbumImage: {
    width: 140,
    height: 140,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    marginBottom: 8,
  },
  moreAlbumTitle: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '500',
    marginBottom: 4,
  },
  moreAlbumYear: {
    color: '#888',
    fontSize: 12,
  },
});

export default PlaylistScreen;