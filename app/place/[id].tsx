
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { View, Text, Linking, Button, StyleSheet } from 'react-native';
import { supabase } from '../../lib/supabase';

export default function Detail(){
  const { id } = useLocalSearchParams<{ id: string }>();
  const [p, setP] = useState<any>(null);
  useEffect(()=>{ (async()=>{
    const { data } = await supabase.from('places').select('*').eq('id', id).single();
    setP(data);
  })(); },[id]);
  if(!p) return null;
  const mapsUrl = `https://www.google.com/maps?q=${p.lat},${p.lng}`;
  return (
    <View style={styles.wrap}>
      <Text style={styles.title}>{p.name}</Text>
      <Text style={styles.addr}>{p.address}</Text>
      <Text>设施：母婴室 {p.nursing_room?'✓':'×'}｜换台 {p.changing_table?'✓':'×'}｜亲子厕 {p.family_restroom?'✓':'×'}</Text>
      <Text>可达：推车 {p.stroller_ok}｜电梯 {p.elevator?'✓':'×'}｜坡道 {p.ramp?'✓':'×'}</Text>
      <Text>环境：噪音 {p.noise}｜遮阴 {p.shade}</Text>
      <Button title="打开地图导航" onPress={()=>Linking.openURL(mapsUrl)} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ padding:16 },
  title:{ fontSize:22, fontWeight:'700' },
  addr:{ color:'#666', marginBottom:8 }
});
