
import { useEffect, useState } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { supabase } from '../lib/supabase';
import PlaceCard from '../components/PlaceCard';
import Filters from '../components/Filters';

export default function Home() {
  const [places, setPlaces] = useState<any[]>([]);
  const [filters, setFilters] = useState({ nursing_room: false, stroller: false, quiet: false });

  useEffect(() => {
    (async () => {
      const { data, error } = await supabase.from('places').select('*').limit(200);
      if (error) {
        console.log('Supabase error:', error.message, error);
        return;
      }
      setPlaces(data ?? []);
    })();
  }, []);

  const filtered = places.filter(p =>
    (!filters.nursing_room || p.nursing_room) &&
    (!filters.stroller || p.stroller_ok !== 'no') &&
    (!filters.quiet || p.noise === 'quiet')
  );

  return (
    <View style={styles.container}>
      <Filters value={filters} onChange={setFilters} />
      <FlatList
        data={filtered}
        keyExtractor={(i) => i.id}
        renderItem={({ item }) => <PlaceCard place={item} />}
        contentContainerStyle={{ paddingBottom: 40 }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 12, backgroundColor: '#f6f6f6' }
});
