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
import { useAudio } from './AudioContext';

const AlbumScreen = ({ navigation }) => {
  const { currentlyPlaying, playTrack } = useAudio();

  const albumTracks = [
    {
      id: 1,
      title: 'Are You Gone Already',
      duration: '4:30',
      isExplicit: true,
      audioFile: require('../../../assets/audio/areyougonealready.mp3'), // Make sure this file exists
    },
    {
      id: 2,
      title: 'Needle (feat. Drake)',
      duration: '3:55',
      isExplicit: true,
      audioFile: require('../../../assets/audio/needle.mp3'), // Make sure this file exists
    },
    {
      id: 3,
      title: 'FTCU',
      duration: '2:52',
      isExplicit: true,
      audioFile: require('../../../assets/audio/FTCU.mp3'), // Add your audio file here
    },
    {
      id: 4,
      title: 'Bahm Bahm (feat. Lil Wayne)',
      duration: '2:21',
      isExplicit: true,
      audioFile: require('../../../assets/audio/bahmbahm.mp3'), // Add your audio file here
    },
    {
      id: 5,
      title: 'Everybody (feat. Lil Uzi Vert)',
      duration: '3:01',
      isExplicit: true,
      audioFile: require('../../../assets/audio/everybody.mp3'), // Add your audio file here
    },
    {
      id: 6,
      title: 'RNB (feat. Lil Wayne)',
      duration: '3:04',
      isExplicit: true,
      audioFile: require('../../../assets/audio/rnb.mp3'), // Add your audio file here
    },
    {
      id: 7,
      title: 'Pink Birthday',
      duration: '2:08',
      isExplicit: false,
      audioFile: require('../../../assets/audio/pinkbirthday.mp3'), // Add your audio file here
    },
    {
      id: 8,
      title: 'Cowgirl',
      duration: '3:36',
      isExplicit: true,
      audioFile: require('../../../assets/audio/cowgirl.mp3'), // Add your audio file here
    },
    {
      id: 9,
      title: 'Just The Memories',
      duration: '3:55',
      isExplicit: false,
      audioFile: require('../../../assets/audio/justthememories.mp3'), // Add your audio file here
    },
    {
      id: 10,
      title: 'Pink Friday Girls',
      duration: '2:46',
      isExplicit: true,
      audioFile: require('../../../assets/audio/pinkfridaygirls.mp3'), // Add your audio file here
    },
  ];

  const moreAlbums = [
    {
      id: 1,
      title: 'Queen',
      year: '2018',
      image: require('../../../assets/images/album/queen.jpg'),
    },
    {
      id: 2,
      title: 'The Pinkprint',
      year: '2014',
      image: require('../../../assets/images/album/pinkprint.jpg'),
    },
    {
      id: 3,
      title: 'Roman Reloaded',
      year: '2012',
      image: require('../../../assets/images/album/roman.jpg'),
    },
  ];

  const renderTrack = (item, index) => (
    <TouchableOpacity 
      key={item.id} 
      style={styles.trackItem}
      onPress={() => playTrack(item, albumTracks)}
    >
      <View style={styles.trackNumber}>
        {currentlyPlaying === item.id ? (
          <Play size={16} color="#BB86FC" fill="#BB86FC" />
        ) : (
          <Text style={styles.trackNumberText}>{index + 1}</Text>
        )}
      </View>
      <View style={styles.trackInfo}>
        <View style={styles.trackTitleRow}>
          <Text style={[
            styles.trackTitle,
            currentlyPlaying === item.id && styles.playingTrackTitle
          ]}>
            {item.title}
          </Text>
          {item.isExplicit && (
            <View style={styles.explicitBadge}>
              <Text style={styles.explicitText}>E</Text>
            </View>
          )}
        </View>
        <Text style={styles.trackDuration}>{item.duration}</Text>
      </View>
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
            source={require('../../../assets/images/album/pinkfriday2.jpg')}
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
                  source={require('../../../assets/images/album/pinkfriday2.jpg')}
                  style={styles.albumCover}
                />
                <Text style={styles.albumTitle}>Pink Friday 2</Text>
                <Text style={styles.artistName}>Nicki Minaj</Text>
                <Text style={styles.albumInfo}>Album • 2023 • 22 songs</Text>
                <View style={styles.demoNotice}>
                  <Text style={styles.demoText}>🎵 Demo Version - Royalty-free audio for educational purposes</Text>
                </View>
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
            {albumTracks.map(renderTrack)}
          </View>
        </View>

        {/* More by Nicki Minaj */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>More by Nicki Minaj</Text>
          
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.moreAlbumsScrollView}
          >
            {moreAlbums.map(renderMoreAlbum)}
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
  demoNotice: {
    backgroundColor: 'rgba(187, 134, 252, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: 'rgba(187, 134, 252, 0.3)',
  },
  demoText: {
    color: '#BB86FC',
    fontSize: 12,
    textAlign: 'center',
    fontWeight: '500',
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
  trackTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  trackTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginRight: 8,
  },
  playingTrackTitle: {
    color: '#BB86FC',
  },
  explicitBadge: {
    backgroundColor: '#888',
    width: 16,
    height: 16,
    borderRadius: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  explicitText: {
    color: '#000',
    fontSize: 10,
    fontWeight: 'bold',
  },
  trackDuration: {
    color: '#888',
    fontSize: 14,
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

export default AlbumScreen;