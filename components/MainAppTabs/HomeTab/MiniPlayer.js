"use client"

import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View, Share } from "react-native"
import { useState, useEffect } from "react"
import {
  ChevronDown,
  MoreHorizontal,
  Cast,
  Heart,
  Download,
  Share2,
  Shuffle,
  SkipBack,
  Play,
  Pause,
  SkipForward,
  Repeat,
  Repeat1,
  ChevronRight,
  BarChart3,
} from "lucide-react-native"

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

export default function PlayerScreen({
  currentSong: initialCurrentSong,
  currentIndex: initialCurrentIndex,
  isPlaying: initialIsPlaying,
  currentTime: initialCurrentTime,
  onClose,
  onUpdateCurrentSong,
  onUpdatePlayingState,
  onUpdateCurrentTime,
}) {
  const [currentSong, setCurrentSong] = useState(initialCurrentSong)
  const [currentIndex, setCurrentIndex] = useState(initialCurrentIndex)
  const [isPlaying, setIsPlaying] = useState(initialIsPlaying)
  const [currentTime, setCurrentTime] = useState(initialCurrentTime || 0)
  const [repeatMode, setRepeatMode] = useState(0) // 0: off, 1: repeat all, 2: repeat one
  const [isShuffled, setIsShuffled] = useState(false)
  const [showQueue, setShowQueue] = useState(false)

  // Update local state when props change
  useEffect(() => {
    setCurrentSong(initialCurrentSong)
    setCurrentIndex(initialCurrentIndex)
    setIsPlaying(initialIsPlaying)
    if (initialCurrentTime !== undefined) {
      setCurrentTime(initialCurrentTime)
    }
  }, [initialCurrentSong, initialCurrentIndex, initialIsPlaying, initialCurrentTime])

  // Progress timer effect - sync with parent
  useEffect(() => {
    let interval = null

    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prevTime) => {
          const newTime = prevTime + 1
          const totalSeconds = durationToSeconds(currentSong.duration)

          // Update parent component
          if (onUpdateCurrentTime) {
            onUpdateCurrentTime(newTime)
          }

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
    if (onUpdateCurrentTime) {
      onUpdateCurrentTime(0)
    }
  }, [currentSong.id])

  // Convert duration string to seconds
  const durationToSeconds = (duration) => {
    const [minutes, seconds] = duration.split(":").map(Number)
    return minutes * 60 + seconds
  }

  // Convert seconds to duration string
  const secondsToDuration = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const totalSeconds = durationToSeconds(currentSong.duration)
  const progress = (currentTime / totalSeconds) * 100

  const updateSong = (song, index) => {
    setCurrentSong(song)
    setCurrentIndex(index)
    onUpdateCurrentSong(song, index)
  }

  const updatePlayState = (playing) => {
    setIsPlaying(playing)
    onUpdatePlayingState(playing)
  }

  const handlePlayPause = () => {
    const newPlayingState = !isPlaying
    updatePlayState(newPlayingState)

    if (newPlayingState) {
      console.log("Playing audio...")
    } else {
      console.log("Pausing audio...")
    }
  }

  const getNextSongIndex = () => {
    if (repeatMode === 2) {
      return currentIndex // Stay on the same song
    }

    if (isShuffled) {
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * queue.length)
      } while (nextIndex === currentIndex && queue.length > 1)
      return nextIndex
    }

    if (currentIndex === queue.length - 1) {
      return repeatMode === 1 ? 0 : currentIndex
    }
    return currentIndex + 1
  }

  const getPreviousSongIndex = () => {
    if (repeatMode === 2) {
      return currentIndex
    }

    if (isShuffled) {
      let prevIndex
      do {
        prevIndex = Math.floor(Math.random() * queue.length)
      } while (prevIndex === currentIndex && queue.length > 1)
      return prevIndex
    }

    if (currentIndex === 0) {
      return repeatMode === 1 ? queue.length - 1 : 0
    }
    return currentIndex - 1
  }

  const handleNext = () => {
    const nextIndex = getNextSongIndex()
    const nextSong = queue[nextIndex]

    updateSong(nextSong, nextIndex)
    setCurrentTime(0) // Reset timer
    if (onUpdateCurrentTime) {
      onUpdateCurrentTime(0)
    }
    updatePlayState(true)
  }

  const handlePrevious = () => {
    if (currentTime > 3) {
      setCurrentTime(0)
      if (onUpdateCurrentTime) {
        onUpdateCurrentTime(0)
      }
    } else {
      const prevIndex = getPreviousSongIndex()
      const prevSong = queue[prevIndex]

      updateSong(prevSong, prevIndex)
      setCurrentTime(0) // Reset timer
      if (onUpdateCurrentTime) {
        onUpdateCurrentTime(0)
      }
      updatePlayState(true)
    }
  }

  const handleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3)
  }

  const handleShuffle = () => {
    setIsShuffled(!isShuffled)
  }

  const handleShare = async () => {
    try {
      await Share.share({
        message: `Check out "${currentSong.title}" by ${currentSong.artist}!`,
        title: currentSong.title,
      })
    } catch (error) {
      console.error("Error sharing:", error)
    }
  }

  const handleQueueSongSelect = (song, index) => {
    updateSong(song, index)
    setCurrentTime(0) // Reset timer
    if (onUpdateCurrentTime) {
      onUpdateCurrentTime(0)
    }
    updatePlayState(true)
    setShowQueue(false)
  }

  const getUpNextSongs = () => {
    const upNext = []
    const maxSongs = Math.min(3, queue.length - 1)

    for (let i = 1; i <= maxSongs; i++) {
      const nextIndex = (currentIndex + i) % queue.length
      if (nextIndex !== currentIndex) {
        upNext.push(queue[nextIndex])
      }
    }

    return upNext
  }

  const renderRepeatIcon = () => {
    switch (repeatMode) {
      case 1:
        return <Repeat size={28} color="#b18aff" />
      case 2:
        return <Repeat1 size={28} color="#b18aff" />
      default:
        return <Repeat size={28} color="white" />
    }
  }

  const renderQueueItem = (item, index) => {
    const isCurrentSong = index === currentIndex
    const isCurrentlyPlaying = isCurrentSong && isPlaying

    return (
      <TouchableOpacity
        key={`${item.id}-${index}`}
        style={[styles.queueRow, isCurrentSong && styles.currentSongRow]}
        onPress={() => handleQueueSongSelect(item, index)}
        activeOpacity={0.7}
      >
        <Text style={styles.dragHandle}>=</Text>
        <Image source={{ uri: item.image }} style={styles.queueImage} />
        <View style={styles.songInfo}>
          <Text style={[styles.queueSongTitle, isCurrentSong && styles.queueTitlePlaying]} numberOfLines={1}>
            {item.title}
          </Text>
          <Text style={styles.queueArtist} numberOfLines={1}>
            {item.artist}
          </Text>
        </View>
        <View style={styles.rightSection}>
          <Text style={styles.duration}>{item.duration}</Text>
          {isCurrentlyPlaying && <BarChart3 size={20} color="#b18aff" style={styles.playingIcon} />}
        </View>
        <TouchableOpacity style={styles.moreButton}>
          <MoreHorizontal size={20} color="#ccc" />
        </TouchableOpacity>
      </TouchableOpacity>
    )
  }

  if (showQueue) {
    return (
      <View style={styles.container}>
        <View style={styles.queueHeader}>
          <TouchableOpacity onPress={() => setShowQueue(false)} style={styles.headerButton}>
            <ChevronDown size={28} color="white" />
          </TouchableOpacity>
          <View style={styles.headerCenter}>
            <Text style={styles.headerTitle}>In Queue</Text>
            <Text style={styles.headerSubtitle}>{queue.length} songs</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.queueInfo}>
          <Text style={styles.nowPlayingLabel}>Now Playing</Text>
          {queue[currentIndex] && (
            <View style={styles.nowPlayingContainer}>
              <Image source={{ uri: queue[currentIndex].image }} style={styles.nowPlayingImage} />
              <View style={styles.nowPlayingInfo}>
                <Text style={styles.nowPlayingTitle} numberOfLines={1}>
                  {queue[currentIndex].title}
                </Text>
                <Text style={styles.nowPlayingArtist} numberOfLines={1}>
                  {queue[currentIndex].artist}
                </Text>
              </View>
              {isPlaying && <BarChart3 size={24} color="#b18aff" />}
            </View>
          )}
        </View>

        <View style={styles.upNextSection}>
          <Text style={styles.upNextLabel}>Up Next</Text>
          <ScrollView style={styles.queueList} showsVerticalScrollIndicator={false}>
            {queue.map((item, index) => {
              if (index === currentIndex) return null
              return renderQueueItem(item, index)
            })}
          </ScrollView>
        </View>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 40 }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={onClose}>
          <ChevronDown size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <MoreHorizontal size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.albumArtContainer}>
        <Image source={{ uri: currentSong.image }} style={styles.albumArt} />
        <Text style={styles.lyrics}>Let me see the dark sides as well as the bright</Text>
      </View>

      <TouchableOpacity style={styles.connectDeviceButton}>
        <Cast size={16} color="white" />
        <Text style={styles.connectDeviceText}>Connect to a device</Text>
      </TouchableOpacity>

      <View style={styles.songInfo}>
        <Text style={styles.songTitle}>{currentSong.title}</Text>
        <Text style={styles.songArtist}>{currentSong.artist}</Text>
      </View>

      <View style={styles.songActions}>
        <TouchableOpacity>
          <Heart size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity>
          <Download size={28} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleShare}>
          <Share2 size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progress, { width: `${progress}%` }]} />
        </View>
        <View style={styles.progressLabels}>
          <Text style={styles.progressText}>{secondsToDuration(currentTime)}</Text>
          <Text style={styles.progressText}>{currentSong.duration}</Text>
        </View>
      </View>

      <View style={styles.controlsContainer}>
        <TouchableOpacity onPress={handleShuffle}>
          <Shuffle size={28} color={isShuffled ? "#b18aff" : "white"} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handlePrevious}>
          <SkipBack size={32} color="white" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.playButton} onPress={handlePlayPause}>
          {isPlaying ? <Pause size={40} color="black" fill="black" /> : <Play size={40} color="black" fill="black" />}
        </TouchableOpacity>

        <TouchableOpacity onPress={handleNext}>
          <SkipForward size={32} color="white" />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleRepeat}>{renderRepeatIcon()}</TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.upNextContainer} onPress={() => setShowQueue(true)}>
        <View style={styles.upNextHeader}>
          <Text style={styles.upNextTitle}>Up Next</Text>
          <View style={styles.queueButton}>
            <Text style={styles.queueButtonText}>Queue</Text>
            <ChevronRight size={16} color="white" />
          </View>
        </View>

        {getUpNextSongs()
          .slice(0, 1)
          .map((nextSong, index) => (
            <View key={`${nextSong.id}-${index}`} style={styles.nextSongContainer}>
              <Image source={{ uri: nextSong.image }} style={styles.nextSongImage} />
              <View style={styles.nextSongInfo}>
                <Text style={styles.nextSongTitle}>{nextSong.title}</Text>
                <Text style={styles.nextSongArtist}>{nextSong.artist}</Text>
              </View>
              <Text style={styles.nextSongDuration}>{nextSong.duration}</Text>
            </View>
          ))}
      </TouchableOpacity>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#130215ff",
    paddingHorizontal: 25,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  albumArtContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  albumArt: {
    width: "100%",
    height: 350,
    borderRadius: 15,
  },
  lyrics: {
    color: "rgba(255,255,255,0.8)",
    marginTop: -40,
    textAlign: "center",
    fontSize: 16,
    fontWeight: "500",
  },
  connectDeviceButton: {
    flexDirection: "row",
    alignSelf: "center",
    alignItems: "center",
    backgroundColor: "#333",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    marginVertical: 15,
  },
  connectDeviceText: {
    color: "white",
    marginLeft: 8,
  },
  songInfo: {
    marginBottom: 20,
  },
  songTitle: {
    color: "white",
    fontSize: 24,
    fontWeight: "bold",
  },
  songArtist: {
    color: "#B3B3B3",
    fontSize: 16,
  },
  songActions: {
    flexDirection: "row",
    gap: 20,
    marginBottom: 30,
  },
  progressContainer: {
    marginBottom: 15,
  },
  progressBar: {
    height: 4,
    backgroundColor: "#404040",
    borderRadius: 2,
  },
  progress: {
    height: 4,
    backgroundColor: "white",
    borderRadius: 2,
  },
  progressLabels: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
  },
  progressText: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  controlsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginBottom: 25,
  },
  playButton: {
    backgroundColor: "white",
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: "center",
    alignItems: "center",
  },
  upNextContainer: {
    marginTop: 20,
  },
  upNextHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  upNextTitle: {
    color: "#fff",
    fontSize: 22,
    fontWeight: "bold",
  },
  queueButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  queueButtonText: {
    color: "white",
    fontSize: 16,
  },
  nextSongContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#282828",
    padding: 12,
    borderRadius: 8,
  },
  nextSongImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  nextSongInfo: {
    flex: 1,
  },
  nextSongTitle: {
    color: "white",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  nextSongArtist: {
    color: "#B3B3B3",
    fontSize: 13,
  },
  nextSongDuration: {
    color: "#B3B3B3",
    fontSize: 12,
  },
  // Queue styles
  queueHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
  headerCenter: {
    alignItems: "center",
  },
  headerTitle: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  headerSubtitle: {
    color: "#B3B3B3",
    fontSize: 12,
    marginTop: 2,
  },
  queueInfo: {
    paddingHorizontal: 0,
    marginBottom: 20,
  },
  nowPlayingLabel: {
    color: "#B3B3B3",
    fontSize: 14,
    marginBottom: 10,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  nowPlayingContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(177, 138, 255, 0.1)",
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: "rgba(177, 138, 255, 0.3)",
  },
  nowPlayingImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 12,
  },
  nowPlayingInfo: {
    flex: 1,
  },
  nowPlayingTitle: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 4,
  },
  nowPlayingArtist: {
    color: "#B3B3B3",
    fontSize: 14,
  },
  upNextSection: {
    flex: 1,
  },
  upNextLabel: {
    color: "#B3B3B3",
    fontSize: 14,
    marginBottom: 15,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  queueList: {
    flex: 1,
  },
  queueRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 8,
    paddingHorizontal: 4,
    borderRadius: 8,
    marginBottom: 4,
  },
  currentSongRow: {
    backgroundColor: "rgba(177, 138, 255, 0.05)",
  },
  dragHandle: {
    color: "#666",
    fontSize: 18,
    marginRight: 12,
    width: 20,
    textAlign: "center",
  },
  queueImage: {
    width: 50,
    height: 50,
    borderRadius: 8,
    marginRight: 12,
  },
  queueSongTitle: {
    color: "#fff",
    fontSize: 15,
    fontWeight: "500",
    marginBottom: 2,
  },
  queueTitlePlaying: {
    color: "#b18aff",
    fontWeight: "bold",
  },
  queueArtist: {
    color: "#B3B3B3",
    fontSize: 13,
  },
  rightSection: {
    alignItems: "flex-end",
    marginRight: 8,
  },
  duration: {
    color: "#B3B3B3",
    fontSize: 12,
    marginBottom: 4,
  },
  playingIcon: {
    marginTop: 2,
  },
  moreButton: {
    padding: 8,
  },
})