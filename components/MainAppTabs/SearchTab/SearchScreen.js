import React from 'react';
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
import { Search } from 'lucide-react-native';
import { useNavigation } from '@react-navigation/native';

const SearchScreen = () => {
  const navigation = useNavigation();
  
  const trendingArtists = [
    {
      id: 1,
      name: 'Childish Gambino',
      image: require('../../../assets/images/artists/childish.jpg'),
    },
    {
      id: 2,
      name: 'Marvin Gaye',
      image: require('../../../assets/images/artists/marvin.jpg'),
    },
    {
      id: 3,
      name: 'Kanye West',
      image: require('../../../assets/images/artists/kanye.jpg'),
    },
    {
      id: 4,
      name: 'Justin Bieber',
      image: require('../../../assets/images/artists/justin.jpg'),
    },
    {
      id: 5,
      name: 'Chris Brown',
      image: require('../../../assets/images/artists/chrisbrown.jpg'),
    },
  ];

  const browseGenres = [
    { 
      id: 1, 
      title: 'TAMIL', 
      image: require('../../../assets/images/genres/tamil.jpg')
    },
    { 
      id: 2, 
      title: 'INTERNATIONAL', 
      image: require('../../../assets/images/genres/international.jpg')
    },
    { 
      id: 3, 
      title: 'POP', 
      image: require('../../../assets/images/genres/pop.jpg')
    },
    { 
      id: 4, 
      title: 'HIP-HOP', 
      image: require('../../../assets/images/genres/hippop.jpg')
    },
    { 
      id: 5, 
      title: 'DANCE', 
      image: require('../../../assets/images/genres/dance.jpg')
    },
    { 
      id: 6, 
      title: 'COUNTRY', 
      image: require('../../../assets/images/genres/country.jpg')
    },
    { 
      id: 7, 
      title: 'INDIE', 
      image: require('../../../assets/images/genres/indie.jpg')
    },
    { 
      id: 8, 
      title: 'JAZZ', 
      image: require('../../../assets/images/genres/jazz.jpg')
    },
    { 
      id: 9, 
      title: 'PUNK', 
      image: require('../../../assets/images/genres/punk.jpg')
    },
    { 
      id: 10, 
      title: 'R&B', 
      image: require('../../../assets/images/genres/rnb.jpg')
    },
    { 
      id: 11, 
      title: 'DISCO', 
      image: require('../../../assets/images/genres/disco.jpg')
    },
    { 
      id: 12, 
      title: 'ROCK', 
      image: require('../../../assets/images/genres/rock.jpg')
    },
  ];

  const renderArtist = (artist) => (
    <TouchableOpacity key={artist.id} style={styles.artistContainer}>
      <Image source={artist.image} style={styles.artistImage} />
      <Text style={styles.artistName}>{artist.name}</Text>
    </TouchableOpacity>
  );

  const renderGenreCard = (genre) => (
    <TouchableOpacity key={genre.id} style={styles.genreCard}>
      <Image source={genre.image} style={styles.genreImage} />
      <View style={styles.genreOverlay}>
        <Text style={styles.genreTitle}>{genre.title}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <View style={styles.searchContainer}>
          <TouchableOpacity
           style={styles.searchBar}
           onPress={() => navigation.navigate('SearchResults')}>
           <Search size={18} color="#BB86FC"style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search songs, artist, album o..."
              placeholderTextColor="#888"
              editable={false}
              pointerEvents="none"
            />
            </TouchableOpacity>
          </View>
        

        {/* Trending Artists */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Trending artist</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={styles.artistsScrollView}
          >
            {trendingArtists.map(renderArtist)}
          </ScrollView>
        </View>

        {/* Browse Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Browse</Text>
          <View style={styles.genreGrid}>
            {browseGenres.map((genre, index) => {
              if (index < 2) {
                return (
                  <View key={genre.id} style={styles.genreRowLarge}>
                    {renderGenreCard(genre)}
                  </View>
                );
              } else {
                const isEven = (index - 2) % 2 === 0;
                if (isEven) {
                  return (
                    <View key={`row-${index}`} style={styles.genreRow}>
                      {renderGenreCard(genre)}
                      {browseGenres[index + 1] && renderGenreCard(browseGenres[index + 1])}
                    </View>
                  );
                }
                return null;
              }
            })}
          </View>
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
  searchContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 8,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#2A2A2A',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchIcon: {
    fontSize: 18,
    color: '#BB86FC',
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 16,
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
  artistsScrollView: {
    marginHorizontal: -8,
  },
  artistContainer: {
    alignItems: 'center',
    marginHorizontal: 8,
    width: 80,
  },
  artistImage: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#2A2A2A',
  },
  artistName: {
    color: '#FFFFFF',
    fontSize: 12,
    textAlign: 'center',
    marginTop: 8,
    lineHeight: 16,
  },
  genreGrid: {
    gap: 8,
  },
  genreRowLarge: {
    marginBottom: 8,
  },
  genreRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
    gap: 8,
  },
  genreCard: {
    flex: 1,
    height: 100,
    borderRadius: 8,
    overflow: 'hidden',
    position: 'relative',
  },
  genreImage: {
    width: '100%',
    height: '100%',
    backgroundColor: '#2A2A2A',
  },
  genreOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  genreTitle: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default SearchScreen;