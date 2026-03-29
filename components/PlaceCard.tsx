
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { calcScore } from '../lib/scoring';
export default function PlaceCard({ place }: any){
  const score = calcScore(place);
  const router = useRouter();
  return (
    <Pressable onPress={()=>router.push(`/place/${place.id}`)}>
      <View style={styles.card}>
        <Text style={styles.title}>{place.name}</Text>
        <Text style={styles.meta}>{place.type} · 分数 {score}</Text>
        <Text style={styles.tags}>
          {place.nursing_room?'母婴室 · ':''}{place.stroller_ok!=='no'?'推车友好 · ':''}{place.noise==='quiet'?'安静':''}
        </Text>
      </View>
    </Pressable>
  );
}
const styles = StyleSheet.create({
  card:{ padding:12, borderRadius:16, backgroundColor:'#fff', marginBottom:12 },
  title:{ fontSize:18, fontWeight:'600' },
  meta:{ color:'#666', marginTop:4 },
  tags:{ color:'#333', marginTop:6 }
});
