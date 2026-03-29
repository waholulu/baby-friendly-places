
import { useState } from 'react';
import { View, Text, Button, Alert, StyleSheet, TextInput } from 'react-native';
import { supabase } from '../lib/supabase';

export default function Submit(){
  const [placeId, setPlaceId] = useState('');
  const [payload, setPayload] = useState<any>({
    nursing_room:false, changing_table:false, stroller_ok:'yes',
    elevator:false, ramp:true, noise:'quiet', shade:'some', family_restroom:false, visited_at: null
  });

  const submit = async () => {
    if (!placeId) { Alert.alert('请选择或输入 place_id'); return; }
    const { error } = await supabase.from('submissions').insert({ place_id: placeId, ...payload });
    if (error) Alert.alert('提交失败', error.message); else Alert.alert('已提交，感谢！');
  };

  return (
    <View style={styles.wrap}>
      <Text style={styles.h1}>提交清单（临时简单 UI）</Text>
      <TextInput placeholder="place_id" style={styles.input} value={placeId} onChangeText={setPlaceId} />
      <Button title="提交" onPress={submit} />
    </View>
  );
}

const styles = StyleSheet.create({
  wrap:{ padding:16 },
  h1:{ fontSize:18, fontWeight:'600', marginBottom:12 },
  input:{ borderWidth:1, borderColor:'#ddd', borderRadius:8, padding:10, marginBottom:12 }
});
