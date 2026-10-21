import * as Location from 'expo-location';
import { Share } from 'react-native';

export type LocationPermissionState = 'granted' | 'denied' | 'undetermined';

export async function requestLocationPermission(): Promise<LocationPermissionState> {
  const { status } = await Location.requestForegroundPermissionsAsync();
  return status as LocationPermissionState;
}

export async function getCurrentLocation() {
  return Location.getCurrentPositionAsync({ accuracy: Location.Accuracy.Balanced });
}

export async function shareTrip(destination: string, etaMinutes: string) {
  await Share.share({
    message: `I'm heading to ${destination}. ETA approximately ${etaMinutes}.`,
  });
}
