import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button, View, Image, TextInput} from 'react-native';//Componentes que utilizaré
import { useEffect, useState } from 'react'; 
import image from 'speech-to-text-app/assets/UN.png';
import Voice from '@react-native-voice/voice';

export default function App() {
  let [started, setStarted] = useState(false);//variable de estado que me permte saber si estoy grabando
  let [results, setResults] = useState([]);//con esto se veran los resultados en texto como un arreglo

  useEffect(() => {
    Voice.onSpeechError = onSpeechError;
    Voice.onSpeechResults = onSpeechResults;

    return () => {
      Voice.destroy().then(Voice.removeAllListeners);
    }
  }, []);

  const startSpeechToText = async () => {
    await Voice.start("es-CO");
    setStarted(true);
  };

  const stopSpeechToText = async () => {
    await Voice.stop();
    setStarted(false);
  };

  const onSpeechResults = (result) => {
    setResults(result.value);
  };

  const onSpeechError = (error) => {
    console.log(error);
  };

  return (
    <View style={styles.container}>
      <Image source={image} style={styles.image}/>
      <View>
        <Text style={styles.subtitle}>Bienvenido al traductor de voz a Lengua de Señas Colombiana</Text>
      </View>
      
      
      <StatusBar style="auto" />
      <TextInput 
        style= {styles.entrada}
        placeholder= "Aquí aparecerá el texto"
        
      />
      {!started ? <Button title='Presione para traducir' onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Presione para dejar de hablar' onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => <Text key={index}>{result}</Text>)}
    </View>
  );
}

//Aqui creo estilos similar al css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
      paddingTop:100,
      height: 110,
      width: 250,
      resizeMode: 'contain',//sirve para dejar la imagen completa dentro de los parametros
      
      },
  subtitle:{
    fontSize:20,
    padding: 7,
    fontWeight: 'bold',
    color: 'gray',
  },
  entrada:{
    width: 320,
    marginBottom:10,
    borderWidth: 1,
    padding: 20,
    

  }
});