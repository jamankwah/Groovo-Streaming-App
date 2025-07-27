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
  FlatList,
  Animated,
  RefreshControl,
  Alert,
  Dimensions,
} from "react-native"
import {
  ChevronLeft,
  Search,
  ArrowUpDown,
  Home,
  Library,
  MoreVertical,
  Download,
  CheckCircle,
  Play,
  Pause,
  Trash2,
  Share,
  Heart,
  Wifi,
  WifiOff,
} from "lucide-react-native"

const { width } = Dimensions.get("window")

const DownloadsScreen = ({ navigation }) => {
  const [searchText, setSearchText] = useState("")
  const [activeTab, setActiveTab] = useState("library")
  const [selectedSongs, setSelectedSongs] = useState([])
  const [isSelectionMode, setIsSelectionMode] = useState(false)
  const [sortBy, setSortBy] = useState("recent") // 'recent', 'alphabetical', 'artist', 'size'
  const [refreshing, setRefreshing] = useState(false)
  const [currentlyPlaying, setCurrentlyPlaying] = useState(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [downloadProgress, setDownloadProgress] = useState({})

  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current
  const slideAnim = useRef(new Animated.Value(30)).current

  const downloadedSongs = [
    {
      id: "1",
      title: "Nobody",
      artist: "Kwesi Arthur, Mr Eazi",
      album: "Kive From Nkrumah Krom",
      image:"https://notjustok.com/wp-content/uploads/2019/04/kwesi-arthur-1.jpg",
      duration: "3:24",
      fileSize: "8.2 MB",
      downloadDate: "2024-01-15",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "2",
      title: "Baby(Is it a Crime)",
      artist: "Rema",
      album: "Memories...Do Not Open",
      image:"https://cdn-images.dzcdn.net/images/cover/3208072ca7af2913cacf001dbb11bbec/500x500-000000-80-0-0.jpg",      
      duration: "3:12",
      fileSize: "7.8 MB",
      downloadDate: "2024-01-14",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "3",
      title: "With You",
      artist: "Davido,Omah Lay",
      album: "Sick Boy",
      image: "https://i.ytimg.com/vi/frH-MD4aWhk/maxresdefault.jpg",
      duration: "3:45",
      fileSize: "9.1 MB",
      downloadDate: "2024-01-13",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "4",
      title: "Drip Too Hard",
      artist: "Lil Baby,Gunna",
      album: "World War Joy",
      image:"https://cdn-images.dzcdn.net/images/cover/4c2daf5fe675a5ac585126889ee8aee3/500x500-000000-80-0-0.jpg",
      duration: "3:18",
      fileSize: "8.0 MB",
      downloadDate: "2024-01-12",
      quality: "320kbps",
      isOfflineAvailable: false,
    },
    {
      id: "5",
      title: "Shoulder",
      artist: "Medikal,Shatta Wale,Beetstrap",
      album: "Collage",
      image:"https://cdn-images.dzcdn.net/images/cover/5caf41605251c5ef9b766973be1ad349/500x500-000000-80-0-0.jpg",
      duration: "3:32",
      fileSize: "8.6 MB",
      downloadDate: "2024-01-11",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "6",
      title: "Baajo",
      artist: "Kwesi Arthur,Joe Boy",
      album: "Sick Boy",
      duration: "2:58",
      image:"https://cdn-images.dzcdn.net/images/cover/b88bf251a08f706dcc631f36b3dcc18c/500x500-000000-80-0-0.jpg",
      fileSize: "7.2 MB",
      downloadDate: "2024-01-10",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "7",
      title: "All the Love",
      artist: "Ayra Star",
      album: "Evolve",
      duration: "3:07",
      image:"https://cdn-images.dzcdn.net/images/cover/d30dbeb4d445f5cc6f7f100b830731c4/500x500-000000-80-0-0.jpg",
      fileSize: "7.5 MB",
      downloadDate: "2024-01-09",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "8",
      title: "Outside",
      artist: "Cardi B",
      album: "High On Life",
      image:"https://cdn-images.dzcdn.net/images/cover/db2631814aa71adc034d534bc40a741e/500x500.jpg",
      duration: "3:28",
      fileSize: "8.4 MB",
      downloadDate: "2024-01-08",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "9",
      title: "Lomo Lomo",
      artist: "Kidi,Black Sherrif",
      album: "FRIENDS",
      image:"https://cdn-images.dzcdn.net/images/cover/b2293fec5dd0786bef0c480cde3222bc/500x500-000000-80-0-0.jpg",
      duration: "3:20",
      fileSize: "8.1 MB",
      downloadDate: "2024-01-07",
      quality: "320kbps",
      isOfflineAvailable: true,
    },
    {
      id: "10",
      title: "Shake it to the max",
      artist: "MOLIY",
      album: "Phoenix",
      image:"https://cdn-images.dzcdn.net/images/cover/6f5c4d512b5115fb101e13e688fc7fd8/500x500-000000-80-0-0.jpg",
      duration: "3:15",
      fileSize: "7.9 MB",
      downloadDate: "2024-01-06",
      quality: "320kbps",
      isOfflineAvailable: false,
    },
  ]

  useEffect(() => {
    // Entrance animation
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 600,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start()
  }, [])

  const handleBackPress = () => {
    if (isSelectionMode) {
      setIsSelectionMode(false)
      setSelectedSongs([])
    } else if (navigation) {
      navigation.goBack()
    }
  }

  const handleSongPress = (song) => {
    if (isSelectionMode) {
      toggleSongSelection(song.id)
    } else {
      handlePlayPause(song)
    }
  }

  const handleLongPress = (song) => {
    if (!isSelectionMode) {
      setIsSelectionMode(true)
      setSelectedSongs([song.id])
    }
  }

  const toggleSongSelection = (songId) => {
    setSelectedSongs((prev) => (prev.includes(songId) ? prev.filter((id) => id !== songId) : [...prev, songId]))
  }

  const handlePlayPause = (song) => {
    if (currentlyPlaying === song.id) {
      setIsPlaying(!isPlaying)
    } else {
      setCurrentlyPlaying(song.id)
      setIsPlaying(true)
    }
    console.log(`${isPlaying ? "Pausing" : "Playing"}: ${song.title}`)
  }

  const handleMorePress = (song) => {
    Alert.alert(
      song.title,
      "Choose an action",
      [
        { text: "Play", onPress: () => handlePlayPause(song) },
        { text: "Share", onPress: () => handleShare(song) },
        { text: "Remove Download", onPress: () => handleRemoveDownload(song), style: "destructive" },
        { text: "Cancel", style: "cancel" },
      ],
      { cancelable: true },
    )
  }

  const handleShare = (song) => {
    console.log(`Sharing: ${song.title}`)
  }

  const handleRemoveDownload = (song) => {
    Alert.alert("Remove Download", `Are you sure you want to remove "${song.title}" from downloads?`, [
      { text: "Cancel", style: "cancel" },
      {
        text: "Remove",
        style: "destructive",
        onPress: () => {
          console.log(`Removing download: ${song.title}`)
          // Here you would remove the song from downloads
        },
      },
    ])
  }

  const handleSort = () => {
    const sortOptions = ["Recent", "Alphabetical", "Artist", "File Size"]
    Alert.alert(
      "Sort by",
      "Choose sorting option",
      sortOptions.map((option, index) => ({
        text: option,
        onPress: () => {
          const sortKeys = ["recent", "alphabetical", "artist", "size"]
          setSortBy(sortKeys[index])
        },
      })),
      { cancelable: true },
    )
  }

  const onRefresh = () => {
    setRefreshing(true)
    setTimeout(() => {
      setRefreshing(false)
    }, 1500)
  }

  const filteredSongs = downloadedSongs.filter(
    (song) =>
      song.title.toLowerCase().includes(searchText.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchText.toLowerCase()),
  )

  const getTotalSize = () => {
    return filteredSongs.reduce((total, song) => total + Number.parseFloat(song.fileSize), 0).toFixed(1)
  }

  const renderSongItem = ({ item, index }) => {
    const isSelected = selectedSongs.includes(item.id)
    const isCurrentlyPlaying = currentlyPlaying === item.id

    const animatedStyle = {
      opacity: fadeAnim,
      transform: [
        {
          translateY: slideAnim.interpolate({
            inputRange: [0, 30],
            outputRange: [0, 30],
          }),
        },
      ],
    }

    return (
      <Animated.View style={[animatedStyle, { marginTop: index * 2 }]}>
        <TouchableOpacity
          style={[styles.songItem, isSelected && styles.selectedSongItem, isCurrentlyPlaying && styles.playingSongItem]}
          onPress={() => handleSongPress(item)}
          onLongPress={() => handleLongPress(item)}
          activeOpacity={0.7}
        >
          <View style={styles.songImageContainer}>
            <Image source={{ uri: item.image }} style={styles.songImage} />
            {isCurrentlyPlaying && (
              <View style={styles.playingOverlay}>
                {isPlaying ? (
                  <Pause size={16} color="#FFFFFF" fill="#FFFFFF" />
                ) : (
                  <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
                )}
              </View>
            )}
            {!item.isOfflineAvailable && (
              <View style={styles.offlineIndicator}>
                <WifiOff size={12} color="#FF6B6B" />
              </View>
            )}
          </View>

          <View style={styles.songDetails}>
            <Text style={[styles.songTitle, isCurrentlyPlaying && styles.playingSongTitle]} numberOfLines={1}>
              {item.title}
            </Text>
            <Text style={styles.songArtist} numberOfLines={1}>
              {item.artist}
            </Text>
            <View style={styles.songMeta}>
              <Text style={styles.metaText}>{item.duration}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{item.fileSize}</Text>
              <Text style={styles.metaDot}>•</Text>
              <Text style={styles.metaText}>{item.quality}</Text>
            </View>
          </View>

          <View style={styles.songActions}>
            {item.isOfflineAvailable ? (
              <CheckCircle size={18} color="#1DB954" />
            ) : (
              <Download size={18} color="#666666" />
            )}
            <TouchableOpacity
              style={styles.moreButton}
              onPress={() => handleMorePress(item)}
              hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
            >
              <MoreVertical size={18} color="#666666" />
            </TouchableOpacity>
          </View>

          {isSelected && <View style={styles.selectionIndicator} />}
        </TouchableOpacity>
      </Animated.View>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <View style={styles.headerContent}>
          <Text style={styles.headerTitle}>Downloads</Text>
        </View>
        {isSelectionMode && (
          <TouchableOpacity
            style={styles.deleteButton}
            onPress={() => {
              Alert.alert("Delete Downloads", `Delete ${selectedSongs.length} selected songs?`, [
                { text: "Cancel", style: "cancel" },
                { text: "Delete", style: "destructive" },
              ])
            }}
          >
            <Trash2 size={20} color="#FF6B6B" />
          </TouchableOpacity>
        )}
      </View>

      {/* Download Stats */}
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>
          {filteredSongs.length} songs downloaded • {getTotalSize()} MB total
        </Text>
        {!isSelectionMode && (
          <View style={styles.offlineStatus}>
            <Wifi size={14} color="#1DB954" />
            <Text style={styles.offlineText}>Available offline</Text>
          </View>
        )}
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Search size={18} color="#666666" style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search downloads"
            placeholderTextColor="#666666"
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
        <TouchableOpacity style={styles.sortButton} onPress={handleSort}>
          <ArrowUpDown size={20} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* Selection Mode Header */}
      {isSelectionMode && (
        <View style={styles.selectionHeader}>
          <Text style={styles.selectionText}>{selectedSongs.length} selected</Text>
          <View style={styles.selectionActions}>
            <TouchableOpacity style={styles.selectionAction}>
              <Play size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectionAction}>
              <Share size={18} color="#FFFFFF" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.selectionAction}>
              <Heart size={18} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      )}

      {/* Songs List */}
      <FlatList
        data={filteredSongs}
        renderItem={renderSongItem}
        keyExtractor={(item) => item.id}
        style={styles.songsList}
        contentContainerStyle={styles.songsListContent}
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
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
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
  deleteButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
  },
  statsContainer: {
    paddingHorizontal: 20,
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  statsText: {
    fontSize: 14,
    color: "#999999",
    fontWeight: "500",
  },
  offlineStatus: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  offlineText: {
    fontSize: 12,
    color: "#1DB954",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
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
  sortButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
  },
  selectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    backgroundColor: "#1A1A1A",
    marginBottom: 8,
  },
  selectionText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "600",
  },
  selectionActions: {
    flexDirection: "row",
    gap: 16,
  },
  selectionAction: {
    padding: 8,
  },
  songsList: {
    flex: 1,
  },
  songsListContent: {
    paddingBottom: 20,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
    position: "relative",
  },
  selectedSongItem: {
    backgroundColor: "#1A1A2E",
  },
  playingSongItem: {
    backgroundColor: "#0F0F23",
    borderLeftWidth: 3,
    borderLeftColor: "#A855F7",
  },
  songImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  songImage: {
    width: 50,
    height: 50,
    borderRadius: 6,
  },
  playingOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(168, 85, 247, 0.8)",
    borderRadius: 6,
    justifyContent: "center",
    alignItems: "center",
  },
  offlineIndicator: {
    position: "absolute",
    top: -2,
    right: -2,
    backgroundColor: "#1A1A1A",
    borderRadius: 8,
    padding: 2,
  },
  songDetails: {
    flex: 1,
    marginRight: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "500",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  playingSongTitle: {
    color: "#A855F7",
  },
  songArtist: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 4,
  },
  songMeta: {
    flexDirection: "row",
    alignItems: "center",
  },
  metaText: {
    fontSize: 12,
    color: "#666666",
  },
  metaDot: {
    fontSize: 12,
    color: "#666666",
    marginHorizontal: 6,
  },
  songActions: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  moreButton: {
    padding: 4,
  },
  selectionIndicator: {
    position: "absolute",
    right: 0,
    top: 0,
    bottom: 0,
    width: 4,
    backgroundColor: "#A855F7",
  },
})

export default DownloadsScreen
