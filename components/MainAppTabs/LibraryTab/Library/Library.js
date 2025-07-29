"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Image,
  StatusBar,
  Dimensions,
} from "react-native"
import { Heart, Download, List, Users, Settings, MoreVertical, Play } from "lucide-react-native"
import { useNavigation } from '@react-navigation/native';

const { width } = Dimensions.get("window")

const LibraryScreen = () => {
  const navigation = useNavigation();

  const libraryItems = [
    {
      id: "1",
      title: "Liked Songs",
      count: "10 songs",
      icon: Heart,
      color: "#EF4444",
      bgGradient: ["#EF4444", "#DC2626"],
      screen: "LibraryLikedSongs", // Added screen name for navigation
    },
    {
      id: "2",
      title: "Downloads",
      count: "210 songs",
      icon: Download,
      color: "#10B981",
      bgGradient: ["#10B981", "#059669"],
      screen: "Download", // Added screen name for navigation
    },
    {
      id: "3",
      title: "Playlists",
      count: "12 playlists",
      icon: List,
      color: "#3B82F6",
      bgGradient: ["#3B82F6", "#2563EB"],
      screen: "LibraryPlaylist", // Added screen name for navigation
    },
    {
      id: "4",
      title: "Artists",
      count: "9 artists",
      icon: Users,
      color: "#F59E0B",
      bgGradient: ["#F59E0B", "#D97706"],
      screen: "LibraryArtist", // Added screen name for navigation
    },
  ]

  const recentlyPlayed = [
     {
      id: "1",
      title: "Live From Nkrumah Krom",
      artist: "Kwesi Arthur",
      image: "https://cdn-images.dzcdn.net/images/cover/01b6c85939f30cc6a4f40fb22a8aa9c1/500x500-000000-80-0-0.jpg",
      duration: "3:12",
    },
    {
      id: "2",
      title: "Are You Gone Already",
      artist: "Nicki Minaj - Pink Friday 2",
      image: "https://cdn-images.dzcdn.net/images/cover/f52402e7b6ee9122b5e758a2f51a64c9/500x500.jpg",
      duration: "2:58",
    },
    {
      id: "3",
      title: "Certified Lover Boy",
      artist: "Drake",
      image: "https://cdn-images.dzcdn.net/images/cover/ea8f80f2edb20885ac8aed8751716794/500x500-000000-80-0-0.jpg",
      duration: "3:45",
    },
    {
      id: "4",
      title: "Pick up the phone",
      artist: "Travis Scott",
      image: "https://cdn-images.dzcdn.net/images/cover/bdc55cf166f1be51964f8c0cf58643ac/500x500-000000-80-0-0.jpg",
      duration: "4:02",
    },
    {
      id: "6",
      title: "Somebody",
      artist: "The Chainsmokers",
      image: "https://cdn-images.dzcdn.net/images/cover/d4c2f0a30382a7f62ccdde4a2d96d5fe/500x500.jpg",
      duration: "3:18",
    },
  ]

  const handleLibraryItemPress = (item) => {
    if (item.screen && navigation) {
      navigation.navigate(item.screen)
    } else {
      console.log("Option Press")
    }
  }




  const renderLibraryItem = (item) => {
    const IconComponent = item.icon
    return (
      <TouchableOpacity
        key={item.id}
        style={[styles.libraryCard, { backgroundColor: item.color + "20" }]}
        onPress={() => handleLibraryItemPress(item)}
        activeOpacity={0.8}
      >
        <View style={[styles.iconContainer, { backgroundColor: item.color }]}>
          <IconComponent size={24} color="#FFFFFF" />
        </View>
        <View style={styles.libraryCardContent}>
          <Text style={styles.libraryCardTitle}>{item.title}</Text>
          <Text style={styles.libraryCardCount}>{item.count}</Text>
        </View>
      </TouchableOpacity>
    )
  }

  const renderSongItem = (song) => (
 

    <TouchableOpacity key={song.id} style={styles.songItem} activeOpacity={0.7}>
      <View style={styles.songImageContainer}>
        <Image source={{ uri: song.image }} style={styles.songImage} />
        <View style={styles.playOverlay}>
          <Play size={16} color="#FFFFFF" fill="#FFFFFF" />
        </View>
      </View>

      <View style={styles.songDetails}>
        <Text style={styles.songTitle} numberOfLines={1}>
          {song.title}
        </Text>
        <Text style={styles.songArtist} numberOfLines={1}>
          {song.artist}
        </Text>
      </View>

      <View style={styles.songMeta}>
        <Text style={styles.songDuration}>{song.duration}</Text>
      </View>
    </TouchableOpacity>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Your Library</Text>
        <TouchableOpacity style={styles.settingsButton} onPress={() => navigation.navigate("SettingsScreen")}>
          <Settings size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>
      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Library Items Grid */}
        <View style={styles.libraryGrid}>{libraryItems.map(renderLibraryItem)}</View>
        {/* Recently Played Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recently Played</Text>
        </View>
        {/* Recently Played List */}
        <View style={styles.songsList}>{recentlyPlayed.map(renderSongItem)}</View>
      </ScrollView>
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
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  settingsButton: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: "#1A1A1A",
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  libraryGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    paddingHorizontal: 19,
    paddingTop: 20,
    marginBottom: 32,
  },
  libraryCard: {
    width: (width - 60) / 2,
    height: 120,
    borderRadius: 16,
    padding: 16,
    marginBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  libraryCardContent: {
    flex: 1,
  },
  libraryCardTitle: {
    fontSize: 13,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  libraryCardCount: {
    fontSize: 12,
    color: "#999999",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  seeMoreText: {
    fontSize: 14,
    color: "#999999",
    fontWeight: "500",
  },
  songsList: {
    paddingHorizontal: 20,
  },
  songItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    borderRadius: 12,
    marginBottom: 8,
  },
  songImageContainer: {
    position: "relative",
    marginRight: 16,
  },
  songImage: {
    width: 56,
    height: 56,
    borderRadius: 8,
  },
  playOverlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    opacity: 0, // Hidden by default, you might want to show on hover/press
  },
  songDetails: {
    flex: 1,
    marginRight: 12,
  },
  songTitle: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  songArtist: {
    fontSize: 14,
    color: "#999999",
  },
  songMeta: {
    alignItems: "flex-end",
  },
  songDuration: {
    fontSize: 12,
    color: "#666666",
    marginBottom: 8,
  },
  moreButton: {
    padding: 4,
  },

})

export default LibraryScreen