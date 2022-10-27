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
        <Text style={styles.titulo}>Hola.</Text>
        <Text style={styles.subtitle}>¡Bienvenido al traductor de voz a Lengua de Señas Colombiana!</Text>
      </View>
      
      <View >
        <Image  style= {styles.avatar} source={require("./assets/lengua/h/hi.jpg")}/>
      </View>
      
      <StatusBar style="auto" />
      {/*<TextInput 
        style= {styles.entrada}
        placeholder= "Introduzca texto"
      />*/}
      
      {!started ? <Button title='Presione para traducir' color= "green" onPress={startSpeechToText} /> : undefined}
      {started ? <Button title='Presione para dejar de hablar' color= "red" onPress={stopSpeechToText} /> : undefined}
      {results.map((result, index) => <Text key={index}>{result}</Text>)}
    </View>
  );
}

//Aqui creo estilos similar al css
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'f1f1f1',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
      paddingTop:100,
      height: 110,
      width: 250,
      resizeMode: 'contain',//sirve para dejar la imagen completa dentro de los parametros
      
      },

  titulo:{
    justifyContent: 'flex-start',
    fontSize: 90, 
    color: '#34434D',
    fontWeight: 'bold', //para que se vea mas grueso
    paddingEnd: 90,
  },
  subtitle:{
    fontSize:20,
    padding: 7,
    fontWeight: 'bold',
    color: 'gray',
  },
  entrada:{
    borderWidth: 1,
    borderColor: 'gray',
    padding: 10,
    paddingStart: 30,
    width: '80%',
    height: 50,
    marginTop: 20,
    borderRadius: 30,
    backgroundColor: 'white',
  },
  avatar:{
    width: 300, 
    height: 300,
  }
});