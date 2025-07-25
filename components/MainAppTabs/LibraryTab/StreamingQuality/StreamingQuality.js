"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar } from "react-native"
import { X, Check } from "lucide-react-native"

const StreamingQualityScreen = ({ navigation }) => {
  const [selectedQuality, setSelectedQuality] = useState("HD")

  const qualityOptions = [
    {
      id: "Auto",
      title: "Auto",
      subtitle: "Recommended",
      description: "Adjusts based on network speed",
    },
    {
      id: "HD",
      title: "HD",
      subtitle: "High Definition",
      description: "320 kbps",
    },
    {
      id: "High",
      title: "High",
      subtitle: "Good Quality",
      description: "256 kbps",
    },
    {
      id: "Medium",
      title: "Medium",
      subtitle: "Data Saver",
      description: "128 kbps",
    },
  ]

  const handleClose = () => {
    navigation.goBack()
  }

  const handleDone = () => {
    console.log("Selected quality:", selectedQuality)
    navigation.goBack()
  }

  const selectQuality = (qualityId) => {
    setSelectedQuality(qualityId)
  }

  const renderQualityOption = (option) => {
    const isSelected = selectedQuality === option.id

    return (
      <TouchableOpacity
        key={option.id}
        style={[styles.qualityItem, isSelected && styles.selectedQualityItem]}
        onPress={() => selectQuality(option.id)}
        activeOpacity={0.7}
      >
        <View style={styles.qualityLeft}>
          <Text style={[styles.qualityTitle, isSelected && styles.selectedQualityText]}>{option.title}</Text>
          <Text style={styles.qualitySubtitle}>{option.subtitle}</Text>
          <Text style={styles.qualityDescription}>{option.description}</Text>
        </View>
        {isSelected && <Check size={20} color="#A855F7" />}
      </TouchableOpacity>
    )
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#000000" />

      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.closeButton} onPress={handleClose}>
          <X size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Streaming Quality</Text>
        <View style={styles.placeholder} />
      </View>

      <Text style={styles.subtitle}>Select Streaming Quality</Text>

      {/* Quality Options */}
      <View style={styles.qualityList}>{qualityOptions.map(renderQualityOption)}</View>

      {/* Done Button */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.doneButton} onPress={handleDone} activeOpacity={0.8}>
          <Text style={styles.doneButtonText}>Done</Text>
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
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#1A1A1A",
  },
  closeButton: {
    padding: 4,
  },
  headerTitle: {
    flex: 1,
    fontSize: 20,
    fontWeight: "600",
    color: "#FFFFFF",
    textAlign: "center",
    marginRight: 28,
  },
  placeholder: {
    width: 28,
  },
  subtitle: {
    fontSize: 16,
    color: "#999999",
    textAlign: "center",
    marginVertical: 20,
  },
  qualityList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  qualityItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    paddingHorizontal: 16,
    marginBottom: 12,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedQualityItem: {
    borderColor: "#A855F7",
    backgroundColor: "#A855F720",
  },
  qualityLeft: {
    flex: 1,
  },
  qualityTitle: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "600",
    marginBottom: 4,
  },
  selectedQualityText: {
    color: "#A855F7",
  },
  qualitySubtitle: {
    fontSize: 14,
    color: "#999999",
    marginBottom: 2,
  },
  qualityDescription: {
    fontSize: 12,
    color: "#666666",
  },
  footer: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderTopWidth: 1,
    borderTopColor: "#1A1A1A",
  },
  doneButton: {
    backgroundColor: "#A855F7",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  doneButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "600",
  },
})

export default StreamingQualityScreen
