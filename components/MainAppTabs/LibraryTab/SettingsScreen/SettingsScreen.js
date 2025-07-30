"use client"

import { useState } from "react"
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  Switch,
  StatusBar,
  ScrollView,
  Image,
} from "react-native"
import { ChevronLeft, ChevronRight } from "lucide-react-native"
import { useRouter } from "expo-router"
import '../LogoutConfirmation/LogoutConfirmation'
const PROFILE_IMAGE_URL = "https://cdn.pixabay.com/photo/2025/07/21/19/22/woman-9727004_1280.jpg"

const SettingsScreen = ({navigation}) => {
  const router = useRouter()

const PROFILE_IMAGE_URL = "https://cdn.pixabay.com/photo/2025/07/21/19/22/woman-9727004_1280.jpg"


  const handleBackPress = () => {
    navigation.goBack()

  }

   const handleLanguagePress = () => {
    navigation.navigate("LanguageSelection")
  }

  const handleStreamingQualityPress = () => {
    navigation.navigate("StreamingQuality")
  }

  const handleDownloadQualityPress = () => {
    console.log("DownloadQuality")
  }

  const handleLogoutPress = () => {
    navigation.navigate("LogoutConfirmation")
  }
  const settingsItems = [
    {
      title: "Music Language(s)",
      subtitle: "English, Hindi",
      onPress: handleLanguagePress,
      showArrow: true,
    },
    {
      title: "Streaming Quality",
      subtitle: "HD",
      onPress: handleStreamingQualityPress,
      showArrow: true,
    },
    {
      title: "Download Quality",
      subtitle: "HD",
      onPress: handleDownloadQualityPress,
      showArrow: true,
    },
    {
      title: "Equalizer",
      subtitle: "Adjust audio settings",
      onPress: () => console.log("Equalizer pressed"),
      showArrow: true,
    },
  ]

  const otherItems = [
    {
      title: "Connect to a Device",
      subtitle: "Stream to speakers, TVs, and other devices",
      onPress: () => console.log("Connect device pressed"),
      showArrow: true,
    },
    {
      title: "Help & Support",
      onPress: () => console.log("Help pressed"),
      showArrow: true,
    },
    {
      title: "Logout",
      onPress: handleLogoutPress,
      showArrow: true,
      isDestructive: true,
    },
  ]

  const renderSettingItem = (item, index) => (
    <TouchableOpacity key={index} style={styles.settingItem} onPress={item.onPress} activeOpacity={0.7}>
      <View style={styles.settingLeft}>
        <Text style={[styles.settingTitle, item.isDestructive && styles.destructiveText]}>{item.title}</Text>
        {item.subtitle && <Text style={styles.settingSubtitle}>{item.subtitle}</Text>}
      </View>
      {item.showArrow && <ChevronRight size={20} color="#666666" />}
    </TouchableOpacity>
  )

  const renderToggleItem = (item, index) => (
    <View key={index} style={styles.settingItem}>
      <View style={styles.settingLeft}>
        <Text style={styles.settingTitle}>{item.title}</Text>
      </View>
      <Switch
        value={item.value}
        onValueChange={item.onValueChange}
        trackColor={{ false: "#333333", true: "#A855F7" }}
        thumbColor={item.value ? "#FFFFFF" : "#CCCCCC"}
      />
    </View>
  )

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton} onPress={handleBackPress}>
          <ChevronLeft size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Settings</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Profile Section */}
        <View style={styles.profileSection}>
          <Image source={{ uri: PROFILE_IMAGE_URL }} style={styles.profileImage} />
          <Text style={styles.profileName}>Krystal</Text>
        </View>

        {/* Info Section */}
        <View style={styles.infoSection}>
          <View style={styles.infoItem}>
            <Text style={styles.infoLabel}>Email</Text>
            <Text style={styles.infoValue}>krystal2025@gmail.com</Text>
          </View>
        </View>

        {/* Settings Items */}
        <View style={styles.section}>{settingsItems.map(renderSettingItem)}</View>

        {/* Others Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Others</Text>
          {otherItems.map(renderSettingItem)}
        </View>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 24,
    fontWeight: "bold",
    color: "#FFFFFF",
    textAlign: "center",
    marginRight: 28,
  },
  placeholder: {
    width: 28,
  },
  content: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#FFFFFF",
    marginBottom: 16,
  },
  settingItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  settingLeft: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
    marginBottom: 4,
  },
  settingSubtitle: {
    fontSize: 14,
    color: "#999999",
  },
  destructiveText: {
    color: "#EF4444",
  },
  profileSection: {
    alignItems: "center",
    marginTop: 30,
    paddingHorizontal: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginTop: 15,
  },
  infoSection: {
    paddingHorizontal: 30,
    marginTop: 30,
  },
  infoItem: {
    marginBottom: 20,
  },
  infoLabel: {
    color: "#B3B3B3",
    fontSize: 16,
  },
  infoValue: {
    color: "white",
    fontSize: 18,
    marginTop: 5,
  },
})

export default SettingsScreen