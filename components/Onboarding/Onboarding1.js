import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  Animated,
} from 'react-native';

const { width, height } = Dimensions.get('window');

const artists = [
  { id: 1, image: require('../../assets/black.png'), size: 90, top: 480, left: 40 },
  { id: 2, image: require('../../assets/kwesi.png'), size: 90, top: 280, right: 140 },
  { id: 3, image: require('../../assets/gyakie.png'), size: 90, top: 470, right: 50 },
  { id: 4, image: require('../../assets/tems.png'), size: 90, top: 120, left: 160 },
  { id: 5, image: require('../../assets/joe.png'), size: 90, top: 280, right: 30 },
  { id: 6, image: require('../../assets/asap.png'), size: 90, top: 200, left: 220 },
  { id: 7, image: require('../../assets/diana.png'), size: 90, top: 470, left: 150 },
  { id: 8, image: require('../../assets/penta.png'), size: 90, top: 380, left: 6 },
  { id: 9, image: require('../../assets/rihana.png'), size: 90, top: 280, left: 40 },
  { id: 10, image: require('../../assets/stone.png'), size: 90, top: 380, left: 200 },
  { id: 11, image: require('../../assets/sark.png'), size: 90, top: 200, left: 90 },
  { id: 12, image: require('../../assets/team.png'), size: 90, top: 380, left: 300 },
  { id: 13, image: require('../../assets/paluta.png'), size: 90, top: 380, left: 100 },
];

export default function Onboarding({navigation}) {
  const [isAnimating, setIsAnimating] = useState(false);
  const bounces = useRef(artists.map(() => new Animated.Value(0))).current;

 useEffect(() => {
  const animations = bounces.map((bounce, index) =>
    Animated.loop(
      Animated.sequence([
        Animated.delay(index * 150),
        Animated.timing(bounce, {
          toValue: -10,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(bounce, {
          toValue: 0,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    )
  );

  animations.forEach(anim => anim.start());

  return () => {
    animations.forEach(anim => anim.stop());
  };
}, [bounces]);



  const handleContinue = () => {
    setIsAnimating(true);
    setTimeout(() => {
      setIsAnimating(false);
    }, 500);
    navigation.navigate('Onboarding1')
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require('../../assets/bg.png')}
        style={styles.background}
        resizeMode="cover"
      >
        <View style={StyleSheet.absoluteFill}>
          {artists.map((artist, index) => {
            const imageStyle = {
              width: artist.size,
              height: artist.size,
              top: artist.top,
              left: artist.left,
              right: artist.right,
              transform: [{ translateY: bounces[index] }],
            };

            return (
              <Animated.View
                key={artist.id}
                style={[styles.artist, imageStyle]}
              >
                <Image
                  source={artist.image}
                  style={styles.artistImage}
                  resizeMode="cover"
                />
              </Animated.View>
            );
          })}
        </View>

        <View style={styles.overlay}>
          <Text style={styles.title}>Ready to groove on?</Text>
          <Text style={styles.subtitle}>Immerse yourself in the world of music today!</Text>

          <TouchableOpacity
            onPress={handleContinue}
            disabled={isAnimating}
            style={[styles.button, isAnimating && { opacity: 0.5 }]}
          >
            <Text style={styles.buttonText}>
              {isAnimating ? 'Loading...' : 'Continue'}
            </Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    width,
    height,
    position: 'relative',
  },
  artist: {
  position: 'absolute',
  borderRadius: 50,
  overflow: 'hidden',
},

  artistImage: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
  overlay: {
    position: 'absolute',
    bottom: 80,
    width: '100%',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: '#eeeeee',
    textAlign: 'center',
    marginBottom: 30,
  },
  button: {
    backgroundColor: '#a21caf',
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
  },
});
