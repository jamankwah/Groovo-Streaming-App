"use client"

import { useRouter } from "expo-router"
import { useRef, useState, useEffect } from "react"
import { FlatList, Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, StatusBar, Modal } from "react-native"
import { BlurView } from "expo-blur"
import { Bell, Play, Pause, SkipForward } from "lucide-react-native"
import PlayerScreen from "./MiniPlayer"
import { useNavigation } from '@react-navigation/native';

const queue = [
  {
    id: "1",
    title: "Inside Out",
    artist: "The Chainsmokers, Charlee",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/TheChainsmokersInsideOut.jpg/250px-TheChainsmokersInsideOut.jpg",
    duration: "3:15",
    playing: true,
  },
  {
    id: "2",
    title: "Young",
    artist: "The Chainsmokers",
    image: "https://cdn.pixabay.com/photo/2016/08/24/20/39/merry-christmas-1617972_1280.jpg",
    duration: "3:42",
  },
  {
    id: "3",
    title: "Beach House",
    artist: "The Chainsmokers - Sick",
    image: "https://cdn.pixabay.com/photo/2020/10/13/13/28/ameland-5651866_1280.jpg",
    duration: "4:01",
  },
  {
    id: "4",
    title: "Kills You Slowly",
    artist: "The Chainsmokers -",
    image: "https://cdn.pixabay.com/photo/2015/01/28/09/50/death-614644_1280.jpg",
    duration: "3:28",
  },
  {
    id: "5",
    title: "Setting Fires",
    artist: "The Chainsmokers, XYLO -",
    image: "https://cdn.pixabay.com/photo/2022/07/19/20/11/fire-7332965_1280.jpg",
    duration: "3:33",
  },
  {
    id: "6",
    title: "Somebody",
    artist: "The Chainsmokers, Drew",
    image: "https://cdn.pixabay.com/photo/2024/11/20/09/14/christmas-9210799_1280.jpg",
    duration: "3:18",
  },
  {
    id: "7",
    title: "New York City",
    artist: "The Chainsmokers -",
    image: "https://cdn.pixabay.com/photo/2016/10/28/13/09/usa-1777986_1280.jpg",
    duration: "4:12",
  },
]

const recentlyPlayed = [
  {
    id: "1",
    title: "Inside Out",
    artist: "The Chainsmokers, Charlee",
    image:
      "https://upload.wikimedia.org/wikipedia/en/thumb/4/48/TheChainsmokersInsideOut.jpg/250px-TheChainsmokersInsideOut.jpg",
    duration: "3:15",
  },
  {
    id: "2",
    title: "Young",
    artist: "The Chainsmokers",
    image: "https://i1.sndcdn.com/artworks-000241184161-2zadh9-t1080x1080.jpg",
    duration: "3:42",
  },
  {
    id: "3",
    title: "Beach House",
    artist: "The Chainsmokers",
    image: "https://i.scdn.co/image/ab67616d0000b273febb9ba85ac706e51dda9c86",
    duration: "4:01",
  },
  {
    id: "4",
    title: "Kills You Slowly",
    artist: "The Chainsmokers",
    image:
      "https://linkstorage.linkfire.com/medialinks/images/62046946-6826-4abf-839b-8d7166c395bb/artwork-440x440.jpg",
    duration: "3:28",
  },
]

const mixesForYou = [
  {
    id: "5",
    title: "Mix 1",
    artist: "Molly",
    image: "https://www.3music.tv/uploads/news/11398655312025.jpeg",
    duration: "2:45",
  },
  {
    id: "6",
    title: "Mix 2",
    artist: "Afro Beat Mix",
    image:
      "https://imgix.bustle.com/uploads/image/2024/6/6/e8a94f4a/africanstars.jpg?w=1200&h=1200&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.4875&fp-y=0.1622",
    duration: "3:12",
  },
  {
    id: "7",
    title: "Mix 3",
    artist: "Rihanna, Beyonce, Shakira",
    image: "https://i.pinimg.com/736x/78/0e/07/780e079bd81d7b1ddf9b43e89fff59e3.jpg",
    duration: "4:33",
  },
]

const featuringToday = [
  {
    id: "8",
    title: "New SONGS",
    artist: "Various Artists",
    image: "https://cdn.classfmonline.com/imagelib/thumbs/88062630.jpg",
    duration: "3:00",
  },
  {
    id: "9",
    title: "Weekly TOP 20",
    artist: "Top Hits",
    image: "https://dailyguidenetwork.com/wp-content/uploads/2022/04/Cina-Soul-and-KiDi.jpg",
    duration: "2:55",
  },
]

const followedArtists = [
  {
    id: "10",
    title: "Super Bowl",
    artist: "Kendrick Lamar, SZA",
    image:
      "https://i2-prod.birminghammail.co.uk/incoming/article32110373.ece/ALTERNATES/s810/0_GettyImages-2199018586.jpg",
    duration: "4:15",
  },
  {
    id: "11",
    title: "Uncle Waffles",
    artist: "Uncle Waffles, Amapiano",
    image:
      "https://imgix.bustle.com/uploads/image/2024/4/30/96b9ed61-6133-4060-ba28-8ccb4519427b-img_7751.jpg?w=1024&h=1024&fit=crop&crop=faces&dpr=2",
    duration: "3:38",
  },
]

const newReleases = [
  {
    id: "12",
    title: "Killing it girl",
    artist: "JHope",
    image: "https://filmfare.wwmindia.com/content/2025/jun/soooj-hopedancepartner1750062051.jpg",
    duration: "3:22",
  },
  {
    id: "13",
    title: "With you",
    artist: "Davido, Omah Lay",
    image:
      "https://images.squarespace-cdn.com/content/v1/5adb300670e8023e613254a6/1717524697267-Z1WLBMVF6E0SLBJ9CB91/ivnktkpTURBXy80Mjc1NzY5NDc1YmE3NjJlMGUxMDVkN2JiN2E2MjEzZC5wbmeSlQMAzEHNBXjNAxSTBc0EsM0Cdg.png?format=2500w",
    duration: "2:58",
  },
  {
    id: "14",
    title: "Manchild",
    artist: "Sabrina Carpenter",
    image:
      "https://images.news18.com/ibnlive/uploads/2025/06/sabrina-carpenter-2025-06-cbbe965e2dd52857f8a4b8e08d465365.jpg?impolicy=website&width=640&height=360",
    duration: "3:45",
  },
]

const topPlaylists = [
  {
    id: "15",
    title: "GYM PHONK: Aggressive Workout",
    artist: "Workout Mix",
    image: "https://cdn.pixabay.com/photo/2017/03/13/20/41/tyre-flipping-2141109_1280.jpg",
    duration: "5:12",
  },
  {
    id: "16",
    title: "SIGMA MALE TIKTOK MUSIC",
    artist: "TikTok Hits",
    image: "https://news.sophos.com/wp-content/uploads/2021/03/Copy-of-Supply-Chain-Sophos-News-banners-2.png",
    duration: "2:33",
  },
]

const PROFILE_IMAGE_URL = "https://cdn.pixabay.com/photo/2025/07/21/19/22/woman-9727004_1280.jpg"

// Create a combined queue from all songs
const createQueue = () => {
  return queue
}

export default function IndexScreen() {
  const navigation = useNavigation();
  const router = useRouter()
  const scrollViewRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState(createQueue())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(0) // Add current time state

  // Current song state - always visible player
  const [currentSong, setCurrentSong] = useState(queue[0])

  // Progress timer effect for miniplayer
  useEffect(() => {
    let interval = null

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1
          const totalSeconds = durationToSeconds(currentSong.duration)

          // If song is finished, move to next song
          if (newTime >= totalSeconds) {
            handleNext()
            return 0
          }

          return newTime
        })
      }, 1000) // Update every second
    } else {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [isPlaying, currentSong.duration])

  // Reset timer when song changes
  useEffect(() => {
    setCurrentTime(0)
  }, [currentSong.id])

  // Convert duration string to seconds
  const durationToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number)
    return minutes * 60 + seconds
  }

  // Calculate progress percentage
  const totalSeconds = durationToSeconds(currentSong.duration)
  const progress = (currentTime / totalSeconds) * 100

  const handlePlayPause = (e) => {
    e.stopPropagation() // Prevent navigation when clicking play/pause
    setIsPlaying(!isPlaying)
    console.log(isPlaying ? "Pausing audio..." : "Playing audio...")
  }

  const handlePlayerNavigation = () => {
    setShowPlayerModal(true)
  }

  const handleClosePlayer = () => {
    setShowPlayerModal(false)
  }

  const handleProfileNavigation = () => {
    navigation.navigate('SettingsScreen')
  }

  const handleSongSelect = (song) => {
    const songIndex = queue.findIndex((item) => item.id === song.id)
    if (songIndex !== -1) {
      setCurrentIndex(songIndex)
      setCurrentSong(queue[songIndex])
      setCurrentTime(0) // Reset timer
      setIsPlaying(true)
      console.log(`Now playing: ${song.title}`)
    }
  }

  const handleNext = (e) => {
    if (e) e.stopPropagation()
    const nextIndex = (currentIndex + 1) % queue.length
    setCurrentIndex(nextIndex)
    setCurrentSong(queue[nextIndex])
    setCurrentTime(0) // Reset timer
    setIsPlaying(true)
  }

  // Functions to pass to PlayerScreen for state updates
  const updateCurrentSong = (song, index) => {
    setCurrentSong(song)
    setCurrentIndex(index)
    setCurrentTime(0) // Reset timer when song changes from player
  }

  const updatePlayingState = (playing) => {
    setIsPlaying(playing)
  }

  const updateCurrentTime = (time) => {
    setCurrentTime(time)
  }

  const updateQueue = (newQueue) => {
    setQueue(newQueue)
  }

  const handleShuffleQueue = (shuffled) => {
    if (shuffled) {
      // Create shuffled queue while keeping current song at the beginning
      const currentSongItem = queue[currentIndex]
      const otherSongs = queue.filter((_, index) => index !== currentIndex)
      const shuffledOthers = [...otherSongs].sort(() => Math.random() - 0.5)
      const newQueue = [currentSongItem, ...shuffledOthers]

      setQueue(newQueue)
      setCurrentIndex(0) // Current song is now at index 0
    } else {
      // Restore original queue order
      const originalQueue = createQueue()
      setQueue(originalQueue)

      // Find the current song in the original queue
      const originalIndex = originalQueue.findIndex((song) => song.id === currentSong.id)
      setCurrentIndex(originalIndex !== -1 ? originalIndex : 0)
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ScrollView
        ref={scrollViewRef}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 80 }} // Add padding for miniplayer
      >
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>👋 Hi Krystal,</Text>
            <Text style={styles.evening}>Good day</Text>
          </View>
          <View style={styles.headerIcons}>
            <Bell size={24} color="white" style={styles.icon} />
            <TouchableOpacity style={styles.profileContainer} onPress={handleProfileNavigation}>
              <View style={styles.profileCircleButton}>
                <Image source={{ uri: PROFILE_IMAGE_URL }} style={styles.profileCircleImage} />
              </View>
              <Text style={styles.profileText}>Profile</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.chipsContainer}>
          <TouchableOpacity style={[styles.chip, styles.activeChip]}>
            <Text style={[styles.chipText, styles.activeChipText]}>For you</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Relax</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Workout</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.chip}>
            <Text style={styles.chipText}>Travel</Text>
          </TouchableOpacity>
        </ScrollView>

        <Text style={styles.sectionTitle}>Featuring Today</Text>
        <FlatList
          data={featuringToday}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.featuredCard} onPress={() => handleSongSelect(item)}>
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <Text style={styles.featuredText}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={recentlyPlayed}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.songCard} onPress={() => handleSongSelect(item)}>
              <Image source={{ uri: item.image }} style={styles.songImage} />
              <View style={styles.playIconContainer}>
                {currentSong.id === item.id && isPlaying ? (
                  <Pause size={20} color="white" fill="white" />
                ) : (
                  <Play size={20} color="white" fill="white" />
                )}
              </View>
              <Text style={styles.songTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <Text style={styles.sectionTitle}>Mixes for you</Text>
        <FlatList
          data={mixesForYou}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.mixCard} onPress={() => handleSongSelect(item)}>
              <View style={styles.mixImageContainer}>
                <Image source={{ uri: item.image }} style={styles.mixImage} />
                <View style={styles.mixTitleContainer}>
                  <Text style={styles.mixTitle}>{item.title}</Text>
                </View>
              </View>
              <Text style={styles.mixArtists}>{item.artist}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>From Artists You Follow</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={followedArtists}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.artistSectionCard} onPress={() => handleSongSelect(item)}>
              <Image source={{ uri: item.image }} style={styles.artistSectionImage} />
              <Text style={styles.artistSectionTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>New Releases</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={newReleases}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.songCard} onPress={() => handleSongSelect(item)}>
              <Image source={{ uri: item.image }} style={styles.songImage} />
              <View style={styles.playIconContainer}>
                {currentSong.id === item.id && isPlaying ? (
                  <Pause size={20} color="white" fill="white" />
                ) : (
                  <Play size={20} color="white" fill="white" />
                )}
              </View>
              <Text style={styles.songTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Top Playlists</Text>
          <TouchableOpacity>
            <Text style={styles.seeMore}>See more</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={topPlaylists}
          horizontal
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.playlistCard} onPress={() => handleSongSelect(item)}>
              <Image source={{ uri: item.image }} style={styles.playlistImage} />
              <Text style={styles.playlistTitle}>{item.title}</Text>
            </TouchableOpacity>
          )}
          keyExtractor={(item) => item.id}
        />
      </ScrollView>

      {/* Always Visible Miniplayer with BlurView and Progress Bar */}
      <BlurView intensity={80} style={styles.playerContainer}>
        {/* Progress Bar at the top */}
        <View style={styles.miniProgressBar}>
          <View style={[styles.miniProgress, { width: `${progress}%` }]} />
        </View>

        <TouchableOpacity style={styles.playerContent} onPress={handlePlayerNavigation} activeOpacity={0.8}>
          <Image source={{ uri: currentSong.image }} style={styles.playerAlbumArt} />
          <View style={styles.playerInfo}>
            <Text style={styles.playerTitle} numberOfLines={1}>
              {currentSong.title}
            </Text>
            <Text style={styles.playerArtist} numberOfLines={1}>
              {currentSong.artist}
            </Text>
          </View>
          <View style={styles.playerControls}>
            <TouchableOpacity onPress={handlePlayPause} style={styles.controlButton}>
              {isPlaying ? (
                <Pause size={24} color="white" fill="white" />
              ) : (
                <Play size={24} color="white" fill="white" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={handleNext} style={styles.controlButton}>
              <SkipForward size={24} color="white" />
            </TouchableOpacity>
          </View>
        </TouchableOpacity>
      </BlurView>

      {/* Player Modal */}
      <Modal
        visible={showPlayerModal}
        animationType="slide"
        presentationStyle="fullScreen"
        onRequestClose={handleClosePlayer}
      >
        <PlayerScreen
          currentSong={currentSong}
          queue={queue}
          currentIndex={currentIndex}
          isPlaying={isPlaying}
          currentTime={currentTime}
          onClose={handleClosePlayer}
          onUpdateCurrentSong={updateCurrentSong}
          onUpdatePlayingState={updatePlayingState}
          onUpdateCurrentTime={updateCurrentTime}
          onUpdateQueue={updateQueue}
          onShuffleQueue={handleShuffleQueue}
        />
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000000",
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  greeting: {
    color: "#fff",
    fontSize: 18,
  },
  evening: {
    color: "#fff",
    fontSize: 24,
    fontWeight: "bold",
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginHorizontal: 10,
  },
  profileContainer: { alignItems: "center", marginLeft: 15 },
  profileCircleButton: { width: 40, height: 40, borderRadius: 20, overflow: "hidden" },
  profileCircleImage: { width: "100%", height: "100%" },
  profileText: { color: "white", fontSize: 12, marginTop: 4 },
  chipsContainer: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chip: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    marginRight: 10,
    backgroundColor: "#282828",
  },
  activeChip: {
    backgroundColor: "#444",
  },
  chipText: {
    color: "#fff",
  },
  activeChipText: {
    fontWeight: "bold",
  },
  sectionTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  featuredCard: {
    width: 280,
    height: 160,
    marginRight: 15,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
    marginLeft: 20,
  },
  featuredImage: {
    width: "100%",
    height: "100%",
  },
  featuredText: {
    position: "absolute",
    bottom: 10,
    left: 10,
    color: "#fff",
    fontSize: 20,
    fontWeight: "bold",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
    marginTop: 10,
  },
  seeMore: {
    color: "#aaa",
  },
  songCard: {
    width: 120,
    marginRight: 15,
    alignItems: "center",
    position: "relative",
    marginLeft: 20,
  },
  songImage: {
    width: 120,
    height: 120,
    borderRadius: 10,
  },
  playIconContainer: {
    position: "absolute",
    top: 45,
    left: 45,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 20,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
  songTitle: {
    color: "#fff",
    marginTop: 8,
    textAlign: "center",
  },
  mixCard: {
    width: 160,
    marginRight: 15,
    marginLeft: 20,
  },
  mixImageContainer: {
    width: 160,
    height: 160,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  mixImage: {
    width: "100%",
    height: "100%",
  },
  mixTitleContainer: {
    position: "absolute",
    bottom: 8,
    right: 8,
    backgroundColor: "rgba(0,0,0,0.6)",
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 5,
  },
  mixTitle: {
    color: "white",
    fontWeight: "bold",
    fontSize: 14,
  },
  mixArtists: {
    color: "#B3B3B3",
    fontSize: 14,
    marginTop: 8,
    height: 40,
  },
  artistSectionCard: {
    width: 150,
    marginRight: 15,
    marginLeft: 20,
  },
  artistSectionImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  artistSectionTitle: {
    color: "#B3B3B3",
    fontSize: 14,
    marginTop: 8,
    height: 40,
  },
  playlistCard: {
    width: 150,
    marginRight: 15,
    marginLeft: 20,
  },
  playlistImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  playlistTitle: {
    color: "white",
    fontSize: 14,
    marginTop: 8,
  },
  playerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    borderTopWidth: 1,
    borderTopColor: "rgba(255,255,255,0.1)",
    overflow: "hidden",
  },
  miniProgressBar: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.2)",
    width: "100%",
  },
  miniProgress: {
    height: 2,
    backgroundColor: "white",
  },
  playerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
  },
  playerAlbumArt: {
    width: 48,
    height: 48,
    borderRadius: 8,
    marginRight: 12,
  },
  playerInfo: {
    flex: 1,
    marginRight: 12,
  },
  playerTitle: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    marginBottom: 2,
  },
  playerArtist: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  playerControls: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  controlButton: {
    padding: 8,
  },
  highlightedCard: {
    borderColor: "#DDA0DD",
    borderWidth: 2,
    borderRadius: 12,
  },
})
