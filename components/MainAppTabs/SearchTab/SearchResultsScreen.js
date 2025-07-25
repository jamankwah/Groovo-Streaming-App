import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Image,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { ArrowLeft, X } from 'lucide-react-native';

const SearchResultsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState('');
  
  const [recentSearches, setRecentSearches] = useState([
    {
      id: 1,
      title: 'You (feat. Travis Scott)',
      subtitle: 'Song • Don Toliver',
      type: 'song',
      image: require('../../../assets/images/songs/traviscott.jpg'), // You'll need to add this image
    },
    {
      id: 2,
      title: 'Pink Friday 2',
      subtitle: 'Album • Nicki Minaj',
      type: 'album',
      image: require('../../../assets/images/album/pinkfriday2.jpg'), // You'll need to add this image
    },
    {
      id: 3,
      title: 'Maroon 5',
      subtitle: 'Artist',
      type: 'artist',
      image: require('../../../assets/images/artists/maroon5.jpg'), // You'll need to add this image
    },
    {
      id: 4,
      title: 'IRON BOY',
      subtitle: 'Playlist',
      type: 'playlist',
      image: require('../../../assets/images/playlists/iron-boy.jpg'), // You'll need to add this image
    },
  ]);

  const removeSearch = (id) => {
    setRecentSearches(recentSearches.filter(item => item.id !== id));
  };

  const clearHistory = () => {
    setRecentSearches([]);
  };

  const renderSearchItem = (item) => (
    <TouchableOpacity key={item.id} style={styles.searchItem}
     onPress={() => {
        if (item.type === 'artist' && item.title === 'Maroon 5') {
          navigation.navigate('Artist');
        } else if (item.type === 'album' && item.title === 'Pink Friday 2') {
          navigation.navigate('Album');
        }else if (item.type === 'playlist' && item.title === 'IRON BOY') {
          navigation.navigate('Playlist');
        }
      
      }}
    >
      <Image source={item.image} style={styles.itemImage} />
      <View style={styles.itemInfo}>
        <Text style={styles.itemTitle}>{item.title}</Text>
        <Text style={styles.itemSubtitle}>{item.subtitle}</Text>
      </View>
      <TouchableOpacity 
        style={styles.removeButton}
        onPress={() => removeSearch(item.id)}
      >
        <Text style={styles.removeIcon}>✕</Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header with Search Bar */}
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => navigation.goBack()}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <View style={styles.searchBar}>
          <TextInput
            style={styles.searchInput}
            placeholder="Search songs, artist, album or pla..."
            placeholderTextColor="#888"
            value={searchText}
            onChangeText={setSearchText}
            autoFocus={true}
          />
        </View>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Recent Searches */}
        {recentSearches.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Recent searches</Text>
            {recentSearches.map(renderSearchItem)}
            
            {/* Clear History Button */}
            <TouchableOpacity 
              style={styles.clearButton}
              onPress={clearHistory}
            >
              <Text style={styles.clearButtonText}>Clear history</Text>
            </TouchableOpacity>
          </View>
        )}

        {/* Empty State */}
        {recentSearches.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No recent searches</Text>
            <Text style={styles.emptySubtext}>Start typing to search for songs, artists, albums, or playlists</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  backButton: {
    marginRight: 12,
    padding: 8,
  },
  backIcon: {
    color: '#FFFFFF',
    fontSize: 20,
  },
  searchBar: {
    flex: 1,
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    color: '#FFFFFF',
    fontSize: 16,
  },
  scrollView: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  sectionTitle: {
    color: '#FFFFFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    marginBottom: 8,
  },
  itemImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    backgroundColor: '#2A2A2A',
    marginRight: 12,
  },
  itemInfo: {
    flex: 1,
  },
  itemTitle: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '500',
    marginBottom: 4,
  },
  itemSubtitle: {
    color: '#888',
    fontSize: 14,
  },
  removeButton: {
    padding: 8,
  },
  removeIcon: {
    color: '#888',
    fontSize: 18,
  },
  clearButton: {
    alignSelf: 'flex-end',
    marginTop: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  clearButtonText: {
    color: '#BB86FC',
    fontSize: 16,
    fontWeight: '500',
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
    paddingTop: 100,
  },
  emptyText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 8,
  },
  emptySubtext: {
    color: '#888',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
});

export default SearchResultsScreen;