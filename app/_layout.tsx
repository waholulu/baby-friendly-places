
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
export default function Layout() {
  return (
    <>
      <StatusBar style="auto" />
      <Stack screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="index" options={{ title: 'Nearby (Baby‑Friendly)' }} />
        <Stack.Screen name="map" options={{ title: 'Map' }} />
        <Stack.Screen name="place/[id]" options={{ title: 'Place' }} />
        <Stack.Screen name="submit" options={{ title: 'Submit Checklist' }} />
      </Stack>
    </>
  );
}
