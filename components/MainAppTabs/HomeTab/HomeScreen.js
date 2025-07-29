"use client"
import { useNavigation } from "@react-navigation/native"
import { Audio } from "expo-av"
import { BlurView } from "expo-blur"
import { Bell, Pause, Play, SkipForward } from "lucide-react-native"
import { useCallback, useEffect, useRef, useState } from "react"
import { FlatList, Image, Modal, ScrollView, StatusBar, Text, TouchableOpacity, View } from "react-native"
import PlayerScreen from "../screens/MiniPlayer"




const queue = [
  {
    id: "1",
    title: "Lomo Lomo",
    artist: "Kidi,Black Sherif",
    image: "https://ghmusicplus.com/wp-content/uploads/2024/08/IMG_2615-750x430.jpg",
    duration: "3:15",
    playing: true,
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
    title: "Humble",
    artist: "Kendrick Lamar",
    image:
      "https://i2-prod.birminghammail.co.uk/incoming/article32110373.ece/ALTERNATES/s810/0_GettyImages-2199018586.jpg",
    duration: "4:01",
  },
  {
    id: "4",
    title: "Zenzele",
    artist: "Uncle waffles",
    image:
      "https://www.okayafrica.com/media-library/uncle-waffles.jpg?id=35792104&width=1200&height=800&quality=80&coordinates=0%2C0%2C0%2C0",
    duration: "3:28",
  },
  {
    id: "5",
    title: "Shake it to the max",
    artist: "Molly",
    image: "https://www.3music.tv/uploads/news/11398655312025.jpeg",
    duration: "3:33",
  },
  {
    id: "6",
    title: "Hot body , Dynamite",
    artist: "Ayra starr, Tyla ft Wizkid",
    image:
      "https://imgix.bustle.com/uploads/image/2024/6/6/e8a94f4a/africanstars.jpg?w=1200&h=1200&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.4875&fp-y=0.1622",
    duration: "3:18",
  },
  {
    id: "7",
    title: "mandown , Beautiful liar",
    artist: "Rihanna, Beyonce ft Shakira",
    image: "https://i.pinimg.com/736x/78/0e/07/780e079bd81d7b1ddf9b43e89fff59e3.jpg",
    duration: "4:12",
  },
]

const recentlyPlayed = [
  {
    id: "1",
    title: "Lomo Lomo",
    artist: "Kidi,Black Sherif",
    image: "https://ghmusicplus.com/wp-content/uploads/2024/08/IMG_2615-750x430.jpg",
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
    title: "Humble",
    artist: "Kendrick Lamar",
    image:
      "https://i2-prod.birminghammail.co.uk/incoming/article32110373.ece/ALTERNATES/s810/0_GettyImages-2199018586.jpg",
    duration: "4:01",
  },
  {
    id: "4",
    title: "Zenzele",
    artist: "Uncle waffles",
    image:
      "https://www.okayafrica.com/media-library/uncle-waffles.jpg?id=35792104&width=1200&height=800&quality=80&coordinates=0%2C0%2C0%2C0",
    duration: "3:28",
  },
]

const mixesForYou = [
  {
    id: "5",
    title: "Mix 1",
    artist: "Molly",
    image: "https://www.3music.tv/uploads/news/11398655312025.jpeg",
    duration: "2:58",
  },
  {
    id: "6",
    title: "Mix 2",
    artist: "Ayra star, Tyla ft Wizkid",
    image:
      "https://imgix.bustle.com/uploads/image/2024/6/6/e8a94f4a/africanstars.jpg?w=1200&h=1200&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.4875&fp-y=0.1622",
    duration: "2:40",
  },
  {
    id: "7",
    title: "Mix 3",
    artist: "Rihanna, Beyonce ft Shakira",
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
    title: "Kendrick Lamar, SZA",
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

const audioMap = {
  "1": require("../../assets/audio/lomo.mp3"),
  "2": require("../../assets/audio/young.mp3"),
  "3": require("../../assets/audio/humble.mp3"),
  "4": require("../../assets/audio/zenzele.mp3"),
  "5": require("../../assets/audio/molly.mp3"),
  "6": require("../../assets/audio/hot.mp3"),
  "7": require("../../assets/audio/mandown.mp3"),
}

export default function IndexScreen() {
  const navigation = useNavigation()
  const scrollViewRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [queue, setQueue] = useState(createQueue())
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showPlayerModal, setShowPlayerModal] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const soundRef = useRef(null)
  const [currentSong, setCurrentSong] = useState(queue[0])

  // ✅ NEW: Function to stop and unload current audio
  const stopCurrentAudio = useCallback(async () => {
    if (soundRef.current) {
      try {
        const status = await soundRef.current.getStatusAsync()
        if (status.isLoaded) {
          await soundRef.current.stopAsync()
          await soundRef.current.unloadAsync()
        }
      } catch (error) {
        console.warn("Error stopping audio:", error)
      }
      soundRef.current = null
    }
    setIsPlaying(false)
  }, [])

  // ✅ NEW: Function to load and play new audio
  const loadAndPlayAudio = useCallback(async (songId, shouldPlay = true) => {
    const audioFile = audioMap[songId]
    if (!audioFile) {
      console.warn("Audio file not found for song ID:", songId)
      return false
    }

    try {
      const { sound } = await Audio.Sound.createAsync(audioFile, {
        shouldPlay: shouldPlay,
      })
      soundRef.current = sound
      setIsPlaying(shouldPlay)
      return true
    } catch (error) {
      console.warn("Error loading audio:", error)
      return false
    }
  }, [])

  // ✅ IMPROVED: Enhanced pause/play function
  const handlePlayPause = useCallback(
    async (e) => {
      if (e) e.stopPropagation()

      const sound = soundRef.current
      if (!sound) {
        // If no sound is loaded, try to load and play current song
        await loadAndPlayAudio(currentSong.id, true)
        return
      }

      try {
        const status = await sound.getStatusAsync()
        if (!status.isLoaded) {
          // If sound is not loaded, load and play
          await stopCurrentAudio()
          await loadAndPlayAudio(currentSong.id, true)
          return
        }

        if (isPlaying) {
          await sound.pauseAsync()
          setIsPlaying(false)
        } else {
          await sound.playAsync()
          setIsPlaying(true)
        }
      } catch (error) {
        console.warn("Error in play/pause:", error)
        // Fallback: reload the audio
        await stopCurrentAudio()
        await loadAndPlayAudio(currentSong.id, true)
      }
    },
    [isPlaying, currentSong.id, stopCurrentAudio, loadAndPlayAudio],
  )

  // ✅ IMPROVED: Enhanced song selection function
  const handleSongSelect = useCallback(
    async (song) => {
      const songIndex = queue.findIndex((item) => item.id === song.id)
      if (songIndex === -1) return

      // If it's the same song, just toggle play/pause
      if (currentSong.id === song.id) {
        await handlePlayPause()
        return
      }

      // Stop current audio before switching
      await stopCurrentAudio()

      // Update song state
      setCurrentIndex(songIndex)
      setCurrentSong(queue[songIndex])
      setCurrentTime(0)

      // Load and play new song
      const success = await loadAndPlayAudio(song.id, true)
      if (!success) {
        setIsPlaying(false)
      }
    },
    [queue, currentSong.id, stopCurrentAudio, loadAndPlayAudio, handlePlayPause],
  )

  // ✅ IMPROVED: Enhanced next function
  const handleNext = useCallback(
    async (e) => {
      if (e) e.stopPropagation()

      const nextIndex = (currentIndex + 1) % queue.length
      const nextSong = queue[nextIndex]

      // Stop current audio
      await stopCurrentAudio()

      // Update state
      setCurrentIndex(nextIndex)
      setCurrentSong(nextSong)
      setCurrentTime(0)

      // Load and play next song
      const success = await loadAndPlayAudio(nextSong.id, true)
      if (!success) {
        setIsPlaying(false)
      }
    },
    [currentIndex, queue, stopCurrentAudio, loadAndPlayAudio],
  )

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
  }, [isPlaying, currentSong.duration, handleNext])

  // Cleanup effect
  useEffect(() => {
    return () => {
      stopCurrentAudio()
    }
  }, [stopCurrentAudio])

  // Reset current time when song changes
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

  const handlePlayerNavigation = () => {
    setShowPlayerModal(true)
  }

  const handleClosePlayer = () => {
    setShowPlayerModal(false)
  }

  const handleProfileNavigation = () => {
    navigation.navigate("SettingsScreen")
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

// Add your styles here - you'll need to define the styles object
const styles = {
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
  },
  greeting: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  evening: {
    color: "#888",
    fontSize: 16,
  },
  headerIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  icon: {
    marginRight: 15,
  },
  profileContainer: {
    alignItems: "center",
  },
  profileCircleButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    overflow: "hidden",
  },
  profileCircleImage: {
    width: "100%",
    height: "100%",
  },
  profileText: {
    color: "white",
    fontSize: 12,
    marginTop: 4,
  },
  chipsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  chip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: "#333",
    marginRight: 10,
  },
  activeChip: {
    backgroundColor: "#1DB954",
  },
  chipText: {
    color: "#888",
    fontSize: 14,
  },
  activeChipText: {
    color: "white",
  },
  sectionTitle: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  seeMore: {
    color: "#888",
    fontSize: 14,
  },
  featuredCard: {
    marginLeft: 20,
    width: 200,
  },
  featuredImage: {
    width: 200,
    height: 120,
    borderRadius: 10,
  },
  featuredText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 8,
  },
  songCard: {
    marginLeft: 20,
    width: 150,
    position: "relative",
  },
  songImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  playIconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
    backgroundColor: "rgba(0,0,0,0.7)",
    borderRadius: 15,
    padding: 5,
  },
  songTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  mixCard: {
    marginLeft: 20,
    width: 150,
  },
  mixImageContainer: {
    position: "relative",
  },
  mixImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  mixTitleContainer: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
  },
  mixTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  mixArtists: {
    color: "#888",
    fontSize: 12,
    marginTop: 5,
  },
  artistSectionCard: {
    marginLeft: 20,
    width: 150,
  },
  artistSectionImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  artistSectionTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
    textAlign: "center",
  },
  playlistCard: {
    marginLeft: 20,
    width: 150,
  },
  playlistImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  playlistTitle: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
    marginTop: 8,
  },
  playerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.8)",
  },
  miniProgressBar: {
    height: 2,
    backgroundColor: "rgba(255,255,255,0.3)",
  },
  miniProgress: {
    height: "100%",
    backgroundColor: "#1DB954",
  },
  playerContent: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
  },
  playerAlbumArt: {
    width: 50,
    height: 50,
    borderRadius: 5,
  },
  playerInfo: {
    flex: 1,
    marginLeft: 15,
  },
  playerTitle: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
  playerArtist: {
    color: "#888",
    fontSize: 14,
  },
  playerControls: {
    flexDirection: "row",
    alignItems: "center",
  },
  controlButton: {
    marginLeft: 15,
  },
}
