
import { View, Text, Switch, StyleSheet } from 'react-native';

export default function Filters({ value, onChange }: any){
  return (
    <View style={styles.bar}>
      <View className="item">
        <Text>母婴室</Text>
        <Switch value={value.nursing_room} onValueChange={(v)=>onChange({ ...value, nursing_room: v })} />
      </View>
      <View className="item">
        <Text>推车</Text>
        <Switch value={value.stroller} onValueChange={(v)=>onChange({ ...value, stroller: v })} />
      </View>
      <View className="item">
        <Text>安静</Text>
        <Switch value={value.quiet} onValueChange={(v)=>onChange({ ...value, quiet: v })} />
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  bar:{ flexDirection:'row', justifyContent:'space-between', backgroundColor:'#fff', padding:12, borderRadius:16, marginBottom:12 },
  item:{ alignItems:'center' }
});
