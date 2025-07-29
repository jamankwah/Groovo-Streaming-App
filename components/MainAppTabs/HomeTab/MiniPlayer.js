"use client"
import {
  BarChart3,
  Cast,
  ChevronDown,
  ChevronRight,
  Download,
  Heart,
  MoreHorizontal,
  Pause,
  Play,
  Repeat,
  Repeat1,
  Share2,
  Shuffle,
  SkipBack,
  SkipForward,
} from "lucide-react-native"
import { useCallback, useState } from "react"
import { Image, ScrollView, Share, StyleSheet, Text, TouchableOpacity, View } from "react-native"

const queue = [
  {
    id: "1",
    title: "Lomo Lomo ",
    artist: "KiDi, Black Sherif",
    image: "https://ghmusicplus.com/wp-content/uploads/2024/08/IMG_2615.jpg",
    duration: "3:15",
    playing: true,
  },
  {
    id: "2",
    title: "Young",
    artist: "The Chainsmokers",
    image: "https://i1.sndcdn.com/artworks-000241184161-2zadh9-t1080x1080.jpg",
    duration: "3:42",
    playing: true,
  },
  {
    id: "3",
    title: "Humble",
    artist: "Kendrick Lamar",
    image:
      "https://i2-prod.birminghammail.co.uk/incoming/article32110373.ece/ALTERNATES/s810/0_GettyImages-2199018586.jpg",
    duration: "4:01",
    playing: true,
  },
  {
    id: "4",
    title: "Zenzele",
    artist: "Uncle waffles",
    image:
      "https://www.okayafrica.com/media-library/uncle-waffles.jpg?id=35792104&width=1200&height=800&quality=80&coordinates=0%2C0%2C0%2C0",
    duration: "3:28",
    playing: true,
  },
  {
    id: "5",
    title: "Mix 1",
    artist: "Molly",
    image: "https://www.3music.tv/uploads/news/11398655312025.jpeg",
    duration: "2:58",
    playing: true,
  },
  {
    id: "6",
    title: "Mix 2",
    artist: "Ayra star, Tyla ft Wizkid",
    image:
      "https://imgix.bustle.com/uploads/image/2024/6/6/e8a94f4a/africanstars.jpg?w=1200&h=1200&fit=crop&crop=focalpoint&fm=jpg&fp-x=0.4875&fp-y=0.1622",
    duration: "2:40",
    playing: true,
  },
  {
    id: "7",
    title: "Mix 3",
    artist: "Rihanna, Beyonce ft Shakira",
    image: "https://i.pinimg.com/736x/78/0e/07/780e079bd81d7b1ddf9b43e89fff59e3.jpg",
    duration: "4:33",
    playing: true,
  },
]

export default function PlayerScreen({
  currentSong,
  queue: parentQueue,
  currentIndex,
  isPlaying,
  currentTime,
  onClose,
  onUpdateCurrentSong,
  onUpdatePlayingState,
  onUpdateCurrentTime,
  onUpdateQueue,
  onShuffleQueue,
}) {
  const [repeatMode, setRepeatMode] = useState(0) // 0: off, 1: repeat all, 2: repeat one
  const [isShuffled, setIsShuffled] = useState(false)
  const [showQueue, setShowQueue] = useState(false)

  // Use the queue from props or fallback to local queue
  const currentQueue = parentQueue || queue

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

  // ✅ FIXED: Direct state update for play/pause
  const handlePlayPause = useCallback(() => {
    onUpdatePlayingState(!isPlaying)
  }, [onUpdatePlayingState, isPlaying])

  const getNextSongIndex = useCallback(() => {
    if (repeatMode === 2) {
      return currentIndex // Stay on the same song
    }
    if (isShuffled) {
      let nextIndex
      do {
        nextIndex = Math.floor(Math.random() * currentQueue.length)
      } while (nextIndex === currentIndex && currentQueue.length > 1)
      return nextIndex
    }
    if (currentIndex === currentQueue.length - 1) {
      return repeatMode === 1 ? 0 : currentIndex
    }
    return currentIndex + 1
  }, [repeatMode, currentIndex, isShuffled, currentQueue.length])

  const getPreviousSongIndex = useCallback(() => {
    if (repeatMode === 2) {
      return currentIndex
    }
    if (isShuffled) {
      let prevIndex
      do {
        prevIndex = Math.floor(Math.random() * currentQueue.length)
      } while (prevIndex === currentIndex && currentQueue.length > 1)
      return prevIndex
    }
    if (currentIndex === 0) {
      return repeatMode === 1 ? currentQueue.length - 1 : 0
    }
    return currentIndex - 1
  }, [repeatMode, currentIndex, isShuffled, currentQueue.length])

  // ✅ FIXED: Direct implementation for next song
  const handleNext = useCallback(() => {
    const nextIndex = getNextSongIndex()
    const nextSong = currentQueue[nextIndex]
    onUpdateCurrentSong(nextSong, nextIndex)
    onUpdateCurrentTime(0)
    onUpdatePlayingState(true)
  }, [getNextSongIndex, currentQueue, onUpdateCurrentSong, onUpdateCurrentTime, onUpdatePlayingState])

  // ✅ FIXED: Direct implementation for previous song
  const handlePrevious = useCallback(() => {
    if (currentTime > 3) {
      onUpdateCurrentTime(0)
    } else {
      const prevIndex = getPreviousSongIndex()
      const prevSong = currentQueue[prevIndex]
      onUpdateCurrentSong(prevSong, prevIndex)
      onUpdateCurrentTime(0)
      onUpdatePlayingState(true)
    }
  }, [currentTime, getPreviousSongIndex, currentQueue, onUpdateCurrentSong, onUpdateCurrentTime, onUpdatePlayingState])

  const handleRepeat = () => {
    setRepeatMode((prev) => (prev + 1) % 3)
  }

  const handleShuffle = () => {
    const newShuffleState = !isShuffled
    setIsShuffled(newShuffleState)
    if (onShuffleQueue) {
      onShuffleQueue(newShuffleState)
    }
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
    onUpdateCurrentSong(song, index)
    onUpdateCurrentTime(0)
    onUpdatePlayingState(true)
    setShowQueue(false)
  }

  const getUpNextSongs = () => {
    const upNext = []
    const maxSongs = Math.min(3, currentQueue.length - 1)
    for (let i = 1; i <= maxSongs; i++) {
      const nextIndex = (currentIndex + i) % currentQueue.length
      if (nextIndex !== currentIndex) {
        upNext.push(currentQueue[nextIndex])
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
            <Text style={styles.headerSubtitle}>{currentQueue.length} songs</Text>
          </View>
          <TouchableOpacity style={styles.headerButton}>
            <MoreHorizontal size={28} color="white" />
          </TouchableOpacity>
        </View>

        <View style={styles.queueInfo}>
          <Text style={styles.nowPlayingLabel}>Now Playing</Text>
          {currentQueue[currentIndex] && (
            <View style={styles.nowPlayingContainer}>
              <Image source={{ uri: currentQueue[currentIndex].image }} style={styles.nowPlayingImage} />
              <View style={styles.nowPlayingInfo}>
                <Text style={styles.nowPlayingTitle} numberOfLines={1}>
                  {currentQueue[currentIndex].title}
                </Text>
                <Text style={styles.nowPlayingArtist} numberOfLines={1}>
                  {currentQueue[currentIndex].artist}
                </Text>
              </View>
              {isPlaying && <BarChart3 size={24} color="#b18aff" />}
            </View>
          )}
        </View>

        <View style={styles.upNextSection}>
          <Text style={styles.upNextLabel}>Up Next</Text>
          <ScrollView style={styles.queueList} showsVerticalScrollIndicator={false}>
            {currentQueue.map((item, index) => {
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
        <Text style={styles.lyrics}>Play</Text>
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
          <View style={[styles.progress, { width: `${Math.max(0, Math.min(100, progress))}%` }]} />
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

      <TouchableOpacity
        style={styles.upNextContainer}
        onPress={() => {
          // Get the next song and play it
          const nextIndex = getNextSongIndex()
          const nextSong = currentQueue[nextIndex]
          onUpdateCurrentSong(nextSong, nextIndex)
          onUpdateCurrentTime(0)
          onUpdatePlayingState(true)
        }}
      >
        <View style={styles.upNextHeader}>
          <Text style={styles.upNextTitle}>Up Next</Text>
          <TouchableOpacity style={styles.queueButton} onPress={() => setShowQueue(true)}>
            <Text style={styles.queueButtonText}>Queue</Text>
            <ChevronRight size={16} color="white" />
          </TouchableOpacity>
        </View>
        {getUpNextSongs()
          .slice(0, 1)
          .map((nextSong, index) => {
            const actualIndex = (currentIndex + 1) % currentQueue.length
            return (
              <TouchableOpacity
                key={`${nextSong.id}-${index}`}
                style={styles.nextSongContainer}
                onPress={() => {
                  onUpdateCurrentSong(nextSong, actualIndex)
                  onUpdateCurrentTime(0)
                  onUpdatePlayingState(true)
                }}
                activeOpacity={0.7}
              >
                <Image source={{ uri: nextSong.image }} style={styles.nextSongImage} />
                <View style={styles.nextSongInfo}>
                  <Text style={styles.nextSongTitle}>{nextSong.title}</Text>
                  <Text style={styles.nextSongArtist}>{nextSong.artist}</Text>
                </View>
                <Text style={styles.nextSongDuration}>{nextSong.duration}</Text>
              </TouchableOpacity>
            )
          })}
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
