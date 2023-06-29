import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Vibration, TouchableOpacity, TextInput } from 'react-native';

export default function App() {
  return (
    <View style={styles.container}>
      <StatusBar style="auto" />
      <TextInput
      style={styles.input}
      placeholder="이름을 입력해주세요."
      placeholderTextColor="#9f9f9f"
    />
    <Text style={styles.text}>
      동해물과 백두산이 마르고 닳도록 하느님이 보우하사 우리 나라 만세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세. 남산 위에 저 소나무 철갑을 두른 듯 바람서리 불변함은 우리 기상일세 무궁화 삼천리 화려강산 대한사람 대한으로 길이 보전하세. 가을 하늘 공활한데 높고 구름 없이 
    </Text>
      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>로그인</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button2}>
        <Text style={styles.button2Text}>회원가입</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 16,
    lineHeight: 25
  },
  text2: {
    margin: 5,
    fontSize: 20
  },
  button: {
    margin: 10,
    backgroundColor: '#73BBFB',
    borderRadius: 15,
    padding: 10,
    width: '100%', // 원하는 가로 크기
    height: 52, // 원하는 세로 크기
    justifyContent: 'center',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: 'white',
    textAlign: 'center',
  },
  button2: {
    margin: 10,
    backgroundColor: 'white',
    borderColor: '#73BBFB',
    borderWidth: 1,
    borderRadius: 15,
    padding: 10,
    width: '100%',
    height: 52, // 원하는 세로 크기
    justifyContent: 'center',
    alignItems: 'center'
  },
  button2Text: {
    fontSize: 18,
    color: '#73BBFB',
    textAlign: 'center',
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 15,
    borderWidth: 1,
    borderColor: '#73BBFB',
    padding: 10,
    margin: 10,
    width: '100%',
    height: 52,
    fontSize: 18,
  },
});
