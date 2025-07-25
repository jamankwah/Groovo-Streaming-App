"use client"

import { useState } from "react"
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, StatusBar, FlatList } from "react-native"
import { X, Check } from "lucide-react-native"

const LanguageSelectionScreen = ({ navigation }) => {
  const [selectedLanguages, setSelectedLanguages] = useState(["English", "Hindi"])

  const languages = [
    "English",
    "Hindi",
    "Arabic",
    "French",
    "Spanish",
    "Bengali",
    "Mandarin Chinese",
    "Portuguese",
    "Russian",
    "Japanese",
    "German",
    "Korean",
  ]

  const handleClose = () => {
    navigation.goBack()
  }

  const handleDone = () => {
    console.log("Selected languages:", selectedLanguages)
    navigation.goBack()
  }

  const toggleLanguage = (language) => {
    setSelectedLanguages((prev) => {
      if (prev.includes(language)) {
        return prev.filter((lang) => lang !== language)
      } else {
        return [...prev, language]
      }
    })
  }

  const renderLanguageItem = ({ item }) => {
    const isSelected = selectedLanguages.includes(item)

    return (
      <TouchableOpacity
        style={[styles.languageItem, isSelected && styles.selectedLanguageItem]}
        onPress={() => toggleLanguage(item)}
        activeOpacity={0.7}
      >
        <Text style={[styles.languageText, isSelected && styles.selectedLanguageText]}>{item}</Text>
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
        <Text style={styles.headerTitle}>Select Language(s)</Text>
        <View style={styles.placeholder} />
      </View>

      {/* Languages List */}
      <FlatList
        data={languages}
        renderItem={renderLanguageItem}
        keyExtractor={(item) => item}
        style={styles.languagesList}
        contentContainerStyle={styles.languagesContent}
        showsVerticalScrollIndicator={false}
      />

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
  languagesList: {
    flex: 1,
  },
  languagesContent: {
    paddingHorizontal: 20,
    paddingVertical: 16,
  },
  languageItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 16,
    paddingHorizontal: 16,
    marginBottom: 8,
    backgroundColor: "#1A1A1A",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: "transparent",
  },
  selectedLanguageItem: {
    borderColor: "#A855F7",
    backgroundColor: "#A855F720",
  },
  languageText: {
    fontSize: 16,
    color: "#FFFFFF",
    fontWeight: "500",
  },
  selectedLanguageText: {
    color: "#A855F7",
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

export default LanguageSelectionScreen
