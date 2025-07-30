"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, Image, StatusBar } from "react-native"
import { ChevronRight, Heart, List, Music, Home, Search, Library, Settings } from "lucide-react-native"

const ProfileScreen = ({ navigation }) => {
  const [activeTab, setActiveTab] = useState("library")

  const profileStats = [
    { icon: Heart, label: "My Songs", count: "120", color: "#EF4444" },
    { icon: List, label: "Playlists", count: "12", color: "#3B82F6" },
    { icon: Music, label: "Albums", count: "8", color: "#10B981" },
  ]

  const handleStatPress = (stat) => {
    console.log(`Navigate to ${stat.label}`)
    // navigation.navigate(stat.label);
  }

  const handleSettingsPress = () => {
    navigation.navigate("Settings")
  }

  const renderStatItem = (stat, index) => {
    const IconComponent = stat.icon
    return (
      <TouchableOpacity key={index} style={styles.statItem} onPress={() => handleStatPress(stat)} activeOpacity={0.7}>
        <View style={[styles.statIcon, { backgroundColor: stat.color }]}>
          <IconComponent size={20} color="#FFFFFF" />
        </View>
        <Text style={styles.statCount}>{stat.count}</Text>
        <Text style={styles.statLabel}>{stat.label}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>My Profile</Text>
        <View style={styles.editButton}>
          <Text style={styles.editText}>Edit</Text>
        </View>
      </View>

      {/* Profile Section */}
      <View style={styles.profileSection}>
        <View style={styles.avatarContainer}>
          <Image
            source={{
              uri: "https://images.pexels.com/photos/1105666/pexels-photo-1105666.jpeg?auto=compress&cs=tinysrgb&w=200",
            }}
            style={styles.avatar}
          />
        </View>
        <Text style={styles.userName}>Oheneba</Text>

        {/* User Details */}
        <View style={styles.userDetails}>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Email</Text>
            <Text style={styles.detailValue}>ntijunior724@gmail.com</Text>
          </View>
          <View style={styles.detailItem}>
            <Text style={styles.detailLabel}>Phone Number</Text>
            <Text style={styles.detailValue}>+233 531 296 383</Text>
          </View>
        </View>
      </View>

      {/* Stats Section */}
      <View style={styles.statsSection}>
        <View style={styles.statsContainer}>{profileStats.map(renderStatItem)}</View>
      </View>

      {/* Settings Section */}
      <View style={styles.settingsSection}>
        <TouchableOpacity style={styles.settingsItem} onPress={handleSettingsPress} activeOpacity={0.7}>
          <View style={styles.settingsLeft}>
            <View style={styles.settingsIcon}>
              <Settings size={20} color="#FFFFFF" />
            </View>
            <Text style={styles.settingsText}>Settings</Text>
          </View>
          <ChevronRight size={20} color="#666666" />
        </TouchableOpacity>
      </View>

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("home")}>
          <Home size={24} color="#666666" />
          <Text style={styles.navText}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.navItem} onPress={() => setActiveTab("search")}>
          <Search size={24} color="#666666" />
          <Text style={styles.navText}>Search</Text>
        </TouchableOpacity>

        <TouchableOpacity style={[styles.navItem, styles.activeNavItem]} onPress={() => setActiveTab("library")}>
          <Library size={24} color="#A855F7" />
          <Text style={[styles.navText, styles.activeNavText]}>Your Library</Text>
        </TouchableOpacity>
      </View>
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
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: "#A855F7",
    borderRadius: 20,
  },
  editText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "600",
  },
  profileSection: {
    alignItems: "center",
    paddingVertical: 32,
  },
  avatarContainer: {
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: "#A855F7",
  },
  userName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 24,
  },
  userDetails: {
    width: "100%",
    paddingHorizontal: 20,
  },
  detailItem: {
    marginBottom: 16,
  },
  detailLabel: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 4,
  },
  detailValue: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  statsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#1A1A1A",
    borderRadius: 16,
    paddingVertical: 24,
  },
  statItem: {
    alignItems: "center",
  },
  statIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  statCount: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: "#999999",
  },
  settingsSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  settingsItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderRadius: 12,
  },
  settingsLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  settingsIcon: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: "#A855F7",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 16,
  },
  settingsText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  bottomNav: {
    flexDirection: "row",
    backgroundColor: "#000000",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  navItem: {
    flex: 1,
    alignItems: "center",
    paddingVertical: 8,
  },
  activeNavItem: {},
  navText: {
    fontSize: 12,
    color: "#666666",
    marginTop: 4,
    fontWeight: "500",
  },
  activeNavText: {
    color: "#A855F7",
  },
})

export default ProfileScreen
