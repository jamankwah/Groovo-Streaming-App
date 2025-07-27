"use client"

import { useState, useEffect, useRef } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Image,
  StatusBar,
  Dimensions,
  Animated,
  FlatList,
  RefreshControl,
  Alert,
} from "react-native"
import { ChevronLeft, Search, Filter, Home, Library, Plus, MoreVertical } from "lucide-react-native"

const { width, height } = Dimensions.get("window")
const ITEM_WIDTH = (width - 80) / 3

const ArtistsFollowingScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("")
  const [activeTab, setActiveTab] = useState("library")
  const [refreshing, setRefreshing] = useState(false)
  const [selectedArtist, setSelectedArtist] = useState(null)
  const [showFilter, setShowFilter] = useState(false)
  const [filterBy, setFilterBy] = useState("all") // 'all', 'recent', 'alphabetical'

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current
  const scaleAnim = useRef(new Animated.Value(0.9)).current

  const followingArtists = [
    {
      id: "1",
      name: "The Chainsmokers",
      image: "https://artafinance.com/static/9dd60346ea96a60c67d14eded5d77353/e3084/insider-angels-01-chainsmokers-billboard.webp",
      followers: "15.2M",
      isVerified: true,
      genre: "Electronic",
      followedDate: "2024-01-15",
      isPlaying: false,
      topSong: "Closer",
    },
    {
      id: "2",
      name: "Ariana Grande",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_9RV36uovdWkNPRrXnKDtrv16xN2p0FAfBw&s",
      followers: "89.5M",
      isVerified: true,
      genre: "Pop",
      followedDate: "2024-01-10",
      isPlaying: true,
      topSong: "positions",
    },
    {
      id: "3",
      name: "Travis Scott",
      image:"https://thefader-res.cloudinary.com/images/w_1440,c_limit,f_auto,q_auto:eco/plgc63jlgyhhosmo1vgc/travis-scott.jpg",
      followers: "52.1M",
      isVerified: true,
      genre: "Hip-Hop",
      followedDate: "2024-01-08",
      isPlaying: false,
      topSong: "SICKO MODE",
    },
    {
      id: "4",
      name: "Shatta Wale",
      image: "https://ghanamusic.com/wp-content/uploads/2024/12/shatta-wale.jpg",
      followers: "67.8M",
      isVerified: true,
      genre: "Alternative",
      followedDate: "2024-01-05",
      isPlaying: false,
      topSong: "bad guy",
    },
    {
      id: "5",
      name: "Kwesi Arthur",
      image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlq_NUNTwgauOOk3Yx5e8P11BoIK-LOJCU4A&s",
      followers: "45.3M",
      isVerified: true,
      genre: "Hip-Hop",
      followedDate: "2024-01-03",
      isPlaying: false,
      topSong: "Circles",
    },
    {
      id: "6",
      name: "Taylor Swift",
      image: "https://m.media-amazon.com/images/M/MV5BYWYwYzYzMjUtNWE0MS00NmJlLTljNGMtNzliYjg5NzQ1OWY5XkEyXkFqcGc@._V1_FMjpg_UX1000_.jpg",
      followers: "91.2M",
      isVerified: true,
      genre: "Pop",
      followedDate: "2024-01-01",
      isPlaying: false,
      topSong: "Anti-Hero",
    },
    {
      id: "7",
      name: "Mr Eazi",
      image: "https://techpoint.africa/wp-content/uploads/2021/11/Mr-Eazi-2-e1637248848287.jpg",
      followers: "73.4M",
      isVerified: true,
      genre: "R&B",
      followedDate: "2023-12-25",
      isPlaying: false,
      topSong: "Blinding Lights",
    },
    {
      id: "9",
      name: "Sarkodie",
      image: "https://dailyguidenetwork.com/wp-content/uploads/2023/01/sarkodie-700x406.jpg",
      followers: "29.1M",
      isVerified: true,
      genre: "Pop",
      followedDate: "2023-12-20",
      isPlaying: true,
      topSong: "drivers license",
    },
  ]

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(scaleAnim, {
        toValue: 1,
        duration: 700,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleBackPress = () => {
    if (navigation) {
      navigation.goBack()
    }
  }

  const handleArtistPress = (artist) => {
    setSelectedArtist(artist.id)
    console.log(`Opening artist: ${artist.name}`)
    // Navigate to artist detail screen
    // navigation.navigate('ArtistDetail', { artist });
  }

  const handlePlayArtist = (artist) => {
    console.log(`Playing top songs by: ${artist.name}`)
  }

  const handleUnfollow = (artist) => {
    Alert.alert("Unfollow Artist", `Stop following ${artist.name}?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Unfollow",
        style: "destructive",
        onPress: () => console.log(`Unfollowed: ${artist.name}`),
      },
    ])
  }

  const handleMorePress = (artist) => {
    Alert.alert(
      artist.name,
      "Choose an action",
      [
        { text: "Play", onPress: () => handlePlayArtist(artist) },
        { text: "Go to Artist", onPress: () => handleArtistPress(artist) },
        { text: "Share", onPress: () => console.log("Sharing artist...") },
        { text: "Unfollow", onPress: () => handleUnfollow(artist), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    )
  }

  const handleAddMore = () => {
    console.log("Navigate to discover artists")
    // navigation.navigate('DiscoverArtists');
  }

  const handleFilterPress = () => {
    Alert.alert(
      "Filter Artists",
      "Choose filter option",
      [
        { text: "All Artists", onPress: () => setFilterBy("all") },
        { text: "Recently Followed", onPress: () => setFilterBy("recent") },
        { text: "Alphabetical", onPress: () => setFilterBy("alphabetical") },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    )
  }

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const filteredArtists = followingArtists.filter((artist) =>
    artist.name.toLowerCase().includes(searchText.toLowerCase()),
  )

  const renderArtistItem = ({ item, index }) => {
    const animatedStyle = {
      opacity: fadeAnim,
      transform: [
        {
          translateY: slideAnim.interpolate({
            inputRange: [0, 30],
            outputRange: [0, 30],
          }),
        },
        { scale: scaleAnim },
      ],
    }

    return (
      <Animated.View style={[animatedStyle, styles.artistContainer]}>
        <TouchableOpacity style={styles.artistItem} onPress={() => handleArtistPress(item)} activeOpacity={0.8}>
          <View style={styles.artistImageContainer}>
            <Image source={{ uri: item.image }} style={styles.artistImage} />
            {item.isPlaying && (
              <View style={styles.playingIndicator}>
                <View style={styles.playingDot} />
              </View>
            )}
            {item.isVerified && <View style={styles.verifiedBadge} />}

            {/* More Button */}
            <TouchableOpacity
              style={styles.artistMoreButton}
              onPress={() => handleMorePress(item)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
            </TouchableOpacity>
          </View>

          <Text style={styles.artistName} numberOfLines={1}>
            {item.name}
          </Text>
          <Text style={styles.artistFollowers} numberOfLines={1}>
            {item.followers} followers
          </Text>
        </TouchableOpacity>
      </Animated.View>
    )
  }

  const renderAddMore = () => (
    <View style={styles.artistContainer}>
      <TouchableOpacity style={styles.addMoreItem} onPress={handleAddMore} activeOpacity={0.8}>
        <View style={styles.addMoreImageContainer}>
          <View style={styles.addMoreIcon}>
            <Plus size={24} color="#A855F7" />
          </View>
        </View>
        <Text style={styles.addMoreText}>Add More</Text>
      </TouchableOpacity>
    </View>
  )

  const renderItem = ({ item, index }) => {
    if (item.id === "add_more") {
      return renderAddMore()
    }
    return renderArtistItem({ item, index })
  }

  // Add "Add More" item to the end of the list
  const dataWithAddMore = [...filteredArtists, { id: "add_more", isAddMore: true }]

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Artists Following</Text>
        </View>
      </View>

      {/* Artist Count */}
      <View style={styles.countContainer}>
        <Text style={styles.countText}>{filteredArtists.length} artists following</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search"
            placeholderTextColor="#666666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.filterButton} onPress={handleFilterPress}>
          <Filter size={18} color="#A855F7" />
        </TouchableOpacity>
      </View>

      {/* Artists Grid */}
      <FlatList
        data={dataWithAddMore}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={3}
        style={styles.artistsList}
        contentContainerStyle={styles.artistsContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#FFFFFF" colors={["#A855F7"]} />
        }
      />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
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
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  countContainer: {
    paddingHorizontal: 20,
    paddingVertical: 8,
  },
  countText: {
    fontSize: 14,
    color: "#999999",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#2A2A2A",
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginRight: 12,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    color: "#FFFFFF",
    fontSize: 16,
  },
  filterButton: {
    padding: 12,
    borderRadius: 25,
    backgroundColor: "#1A1A1A",
    borderWidth: 1,
    borderColor: "#A855F7",
  },
  artistsList: {
    flex: 1,
  },
  artistsContent: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  artistContainer: {
    width: ITEM_WIDTH,
    marginRight: 20,
    marginBottom: 24,
  },
  artistItem: {
    alignItems: "center",
  },
  artistImageContainer: {
    position: "relative",
    marginBottom: 12,
  },
  artistImage: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH / 2,
    borderWidth: 2,
    borderColor: "#333333",
  },
  playingIndicator: {
    position: "absolute",
    bottom: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1DB954",
    justifyContent: "center",
    alignItems: "center",
  },
  playingDot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#FFFFFF",
  },
  verifiedBadge: {
    position: "absolute",
    top: 4,
    right: 4,
    width: 16,
    height: 16,
    borderRadius: 8,
    backgroundColor: "#1DA1F2",
  },
  artistMoreButton: {
    position: "absolute",
    top: 4,
    left: 4,
    padding: 6,
    borderRadius: 12,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
  },
  artistName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginBottom: 4,
  },
  artistFollowers: {
    fontSize: 12,
    color: "#999999",
    textAlign: "center",
  },
  addMoreItem: {
    alignItems: "center",
  },
  addMoreImageContainer: {
    marginBottom: 12,
  },
  addMoreIcon: {
    width: ITEM_WIDTH,
    height: ITEM_WIDTH,
    borderRadius: ITEM_WIDTH / 2,
    backgroundColor: "#1A1A1A",
    borderWidth: 2,
    borderColor: "#A855F7",
    borderStyle: "dashed",
    justifyContent: "center",
    alignItems: "center",
  },
  addMoreText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#A855F7",
    textAlign: "center",
  },
})

export default ArtistsFollowingScreen
