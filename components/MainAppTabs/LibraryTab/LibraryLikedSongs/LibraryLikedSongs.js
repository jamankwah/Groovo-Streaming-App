import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Image,
  StatusBar,
  FlatList,
} from 'react-native';
import {
  ChevronLeft,
  Search,
  ArrowUpDown,
  Home,
  Library,
  MoreVertical,
  Download,
  CheckCircle,
} from 'lucide-react-native';

const LikedSongsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');
  const [activeTab, setActiveTab] = useState('library');
  const [selectedSong, setSelectedSong] = useState('1'); // First song selected

  const likedSongs = [
     {
      id: "1",
      title: "Certified Lover Boy",
      subtitle: "Playlist.Myself",
      image:"https://cdn-images.dzcdn.net/images/cover/ea8f80f2edb20885ac8aed8751716794/500x500-000000-80-0-0.jpg",
      songCount: 21,
      duration: "1h 32m",
      lastPlayed: "2 days ago",
      isOwned: true,
      color: "#4ECDC4",
    },
    {
      id: "2",
      title: "IRON BOY",
      subtitle: "Playlist",
      image: "https://cdn-images.dzcdn.net/images/cover/cf0264a44cc4848e4e538d52a0b6fc83/500x500-000000-80-0-0.jpg",
      songCount: "15",
      duration: "1h 18m",
      lastPlayed: "5 days ago",
      isOwned: false,
      color: "#EC4899",
    },
    {
      id: "3",
      title: "5th Dimension",
      subtitle: "Playlist • Myself",
      image: "https://cdn-images.dzcdn.net/images/cover/bcef11c708031f35bfa030aa64c6566d/500x500-000000-80-0-0.jpg",
      songCount: 31,
      duration: "2h 12m",
      lastPlayed: "1 day ago",
      isOwned: true,
      color: "#F59E0B",
    },
    {
      id: "4",
      title: "11:11",
      subtitle: "Playlist • Myself",
      image: "https://cdn-images.dzcdn.net/images/cover/86a3e89cfe9f242019cf5e551883a180/500x500-000000-80-0-0.jpg",
      songCount: 11,
      duration: "44m",
      lastPlayed: "6 days ago",
      isOwned: true,
      color: "#8B5CF6",
    },
    {
      id: "5",
      title: "Live From Nkrumah Krom EP",
      subtitle: "Playlist • Myself",
      image: "https://cdn-images.dzcdn.net/images/cover/01b6c85939f30cc6a4f40fb22a8aa9c1/500x500-000000-80-0-0.jpg",
      songCount: "5",
      duration: "16m",
      lastPlayed: "Today",
      isOwned: true,
      color: "#8B5CF6",
    },
    {
      id: "6",
      title: "PSYCHODRAMA",
      subtitle: "Playlist • Myself",
      image: "https://cdn-images.dzcdn.net/images/cover/f447bf9aa81c3937299a68dc577978aa/500x500-000000-80-0-0.jpg",
      songCount: 11,
      duration: "44m",
      lastPlayed: "6 days ago",
      isOwned: true,
      color: "#8B5CF6",
    },
   
  ];

  const handleSongPress = (song) => {
    setSelectedSong(song.id);
    console.log(`Playing: ${song.title}`);
  };

  const handleBackPress = () => {
    navigation.goBack()
  };

  const handleMorePress = (song) => {
    console.log(`More options for: ${song.title}`);
  };

  const renderSongItem = ({ item }) => {
    const isSelected = selectedSong === item.id;
    
    return (
      <TouchableOpacity
        style={[
          styles.songItem,
          isSelected && styles.selectedSongItem
        ]}
        onPress={() => handleSongPress(item)}
        activeOpacity={0.7}
      >
        <Image source={{ uri: item.image }} style={styles.songImage} />
        
        <View style={styles.songDetails}>
          <Text style={styles.songTitle} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.songArtist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
        
        <View style={styles.songActions}>
          <TouchableOpacity style={styles.downloadButton}>
            {item.isDownloaded ? (
              <CheckCircle size={20} color="#1DB954" />
            ) : (
              <Download size={20} color="#666666" />
            )}
          </TouchableOpacity>
          
          <TouchableOpacity
            style={styles.moreButton}
            onPress={() => handleMorePress(item)}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <MoreVertical size={20} color="#666666" />
          </TouchableOpacity>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={handleBackPress}
        >
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Liked Songs</Text>
        </View>
      </View>

      {/* Song Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>120 liked songs</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={20} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.sortButton}>
          <ArrowUpDown size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Songs List */}
      <FlatList
        data={likedSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        style={styles.songsList}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.songsListContent}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000000',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
    marginRight: 16,
  },
  headerContent: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  countContainer: {
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  countText: {
    fontSize: 14,
    color: '#999999',
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
  },
  sortButton: {
    padding: 8,
  },
  songsList: {
    flex: 1,
  },
  songsListContent: {
    paddingBottom: 20,
  },
  songItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#1A1A1A',
  },
  selectedSongItem: {
    backgroundColor: '#1A1A2E',
    borderLeftWidth: 3,
    borderLeftColor: '#0EA5E9',
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 4,
    marginRight: 16,
  },
  songDetails: {
    flex: 1,
    marginRight: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: '#999999',
  },
  songActions: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  downloadButton: {
    padding: 8,
    marginRight: 8,
  },
  moreButton: {
    padding: 8,
  },
});

export default LikedSongsScreen;