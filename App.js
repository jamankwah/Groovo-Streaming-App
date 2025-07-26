import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Login from './components/Authentication/Login/Login';
import Register from './components/Authentication/Register/Register';
import ForgotPassword from './components/Authentication/ForgotPassword/EnterDetails';
import EnterVerificationCode from './components/Authentication/ForgotPassword/EnterVerificationCode';
import ResetPassword from './components/Authentication/ForgotPassword/ResetPassword';
import Onboarding1 from './components/Onboarding/Info1';
import Onboarding2 from './components/Onboarding/Info2';
import HomeNavigation from './components/Navigation/HomeNavigation';
import Library from './components/MainAppTabs/LibraryTab/Library/Library';
import LibraryLikedSongs from './components/MainAppTabs/LibraryTab/LibraryLikedSongs/LibraryLikedSongs';
import LibraryArtist from './components/MainAppTabs/LibraryTab/LibraryArtist/LibraryArtist';
import LibraryPlaylist from './components/MainAppTabs/LibraryTab/LibraryPlaylist/LibraryPlaylist';
import Download from './components/MainAppTabs/LibraryTab/Download/Download';
import ProfileScreen from './components/MainAppTabs/LibraryTab/ProfileScreen/ProfileScreen';
import SettingsScreen from './components/MainAppTabs/LibraryTab/SettingsScreen/SettingsScreen';
import LanguageSelection from './components/MainAppTabs/LibraryTab/LanguageSelection/LanguageSelection';
import StreamingQuality from './components/MainAppTabs/LibraryTab/StreamingQuality/StreamingQuality';
import LogoutConfirmation from './components/MainAppTabs/LibraryTab/LogoutConfirmation/LogoutConfirmation';
import HomeScreen from './components/MainAppTabs/HomeTab/HomeScreen';
import MiniPlayer from './components/MainAppTabs/HomeTab/MiniPlayer';
import SearchScreen from './components/MainAppTabs/SearchTab/SearchScreen';
import SearchResultsScreen from './components/MainAppTabs/SearchTab/SearchResultsScreen';
import ArtistScreen from './components/MainAppTabs/SearchTab/ArtistScreen';
import AlbumScreen from './components/MainAppTabs/SearchTab/AlbumScreen';
import PlaylistScreen from './components/MainAppTabs/SearchTab/PlaylistScreen';
import OldOnboarding from './components/Onboarding/Onboarding1' 

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="OldOnboarding"
        screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="ForgotPassword" component={ForgotPassword} />
        <Stack.Screen
          name="EnterVerificationCode"
          component={EnterVerificationCode}
        />
        <Stack.Screen name="ResetPassword" component={ResetPassword} />
        <Stack.Screen name="Onboarding1" component={Onboarding1} />
        <Stack.Screen name="Onboarding2" component={Onboarding2} />
        <Stack.Screen name="HomeNavigation" component={HomeNavigation} />
        <Stack.Screen name="Library" component={Library} />
        <Stack.Screen name="LibraryLikedSongs" component={LibraryLikedSongs} />
        <Stack.Screen name="LibraryArtist" component={LibraryArtist} />
        <Stack.Screen name="LibraryPlaylist" component={LibraryPlaylist} />
        <Stack.Screen name="Download" component={Download} />
        <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
        <Stack.Screen name="SettingsScreen" component={SettingsScreen} />
        <Stack.Screen name="LanguageSelection" component={LanguageSelection} />
        <Stack.Screen name="StreamingQuality" component={StreamingQuality} />
        <Stack.Screen
          name="LogoutConfirmation"
          component={LogoutConfirmation}
        />
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="MiniPlayer" component={MiniPlayer} />
        <Stack.Screen name="Search" component={SearchScreen} />
        <Stack.Screen name="SearchResults" component={SearchResultsScreen} />
        <Stack.Screen name="Artist" component={ArtistScreen} />
        <Stack.Screen name="Album" component={AlbumScreen} />
        <Stack.Screen name="Playlist" component={PlaylistScreen} />
        <Stack.Screen name="OldOnboarding" component={OldOnboarding} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
