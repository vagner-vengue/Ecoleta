import React, { useState, useEffect } from "react";
import { StyleSheet, View, Image, ImageBackground, Text, KeyboardAvoidingView, Platform, TextInput, Alert } from "react-native";
import { Feather as Icon, Ionicons } from '@expo/vector-icons';
import { RectButton } from "react-native-gesture-handler";  // Botão do react-navigation que se adapta de acordo com a plataforma.
import RNPickerSelect from 'react-native-picker-select';
import axios from 'axios';
import { useNavigation } from "@react-navigation/native";

interface IBGEUFResponse {
  sigla: string;
  nome: string;
}

interface IBGECityResponse {
  nome: string;
}

const Home = () => {

    const [UFs, setUFs] = useState<IBGEUFResponse[]>([]);
    const [cities, setCities] = useState<string[]>([]);
    const [selectedUF, setSelectedUF] = useState('0');
    const [selectedCity, setSelectedCity] = useState('0');

    const navigaton = useNavigation();

    function handleNavigationToPoints() {
      if (!selectedCity || selectedCity === '0') {
        Alert.alert('Ecoleta', 'Ops... Selecione uma UF e uma cidade.');
        return;
      }
      
      navigaton.navigate('Points', { uf: selectedUF, city: selectedCity });
    }

    useEffect(() => {
      axios.get<IBGEUFResponse[]>('https://servicodados.ibge.gov.br/api/v1/localidades/estados').then(response => {
            const ufInitials = response.data.map(uf => (
               { sigla: uf.sigla, nome: uf.nome} )
            );
            setUFs(ufInitials);
        });
    }, []);
    
    // Muda os municípios cada vez que a UF selecionada mudar.
    useEffect(() => {
      if (selectedUF === '0')
          return;

      const URLApi = 'https://servicodados.ibge.gov.br/api/v1/localidades/estados/' + selectedUF + '/municipios';
      axios.get<IBGECityResponse[]>(URLApi).then(response => {
          const cityNames = response.data.map(city => city.nome);
          setCities(cityNames);
      });
  }, [selectedUF]);

  return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior={Platform.OS === 'ios'? 'padding' : undefined }>
        <ImageBackground 
            source={require('../../assets/home-background.png')}
            style={styles.container}  // Estilo da view.
            imageStyle={{ width: 274, height: 368 }}  // Estilo da imagem.
        >
            <View style={styles.main}>
                <Image source={require('../../assets/logo.png')} />
                <View>
                  <Text style={styles.title}>Seu marketplace de coleta de resíduos.</Text>
                  <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>
                </View>
            </View>

            <View style={styles.footer}>

                <RNPickerSelect
                  placeholder={{label: 'Selecione uma UF' }}
                  value={selectedUF}
                  onValueChange={(value) => setSelectedUF(value)}
                  items={
                    UFs.map(uf => (
                      { label: uf.sigla.concat('  - ', uf.nome), value: uf.sigla }
                    ))}
                  useNativeAndroidPickerStyle={false}
                  style={pickerSelectStyles}
                  Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />
                  }}      
                />

                <RNPickerSelect
                  placeholder={{label: 'Selecione uma cidade' }}
                  value={selectedCity}
                  onValueChange={(value) => setSelectedCity(value)}
                  items={
                    cities.map(city => (
                      { label: city, value: city }
                    ))}
                  useNativeAndroidPickerStyle={false}
                  style={pickerSelectStyles}
                  Icon={() => {
                    return <Ionicons name="md-arrow-down" size={24} color="gray" />
                  }}      
                />

                <RectButton style={styles.button} onPress={handleNavigationToPoints}>
                    <View style={styles.buttonIcon}>
                        <Text>
                            <Icon name="arrow-right" color="#FFF" size={24} />  
                        </Text>
                    </View>
                    <Text style={styles.buttonText}>
                        Entrar
                    </Text>
                </RectButton>
            </View>
        </ImageBackground>
      </KeyboardAvoidingView>
  )
};

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 32
    },
  
    main: {
      flex: 1,
      justifyContent: 'center',
    },
  
    title: {
      color: '#322153',
      fontSize: 32,
      fontFamily: 'Ubuntu_700Bold',
      maxWidth: 260,
      marginTop: 64,
    },
  
    description: {
      color: '#6C6C80',
      fontSize: 16,
      marginTop: 16,
      fontFamily: 'Roboto_400Regular',
      maxWidth: 260,
      lineHeight: 24,
    },
  
    footer: {},
  
    input: {
      height: 60,
      backgroundColor: '#FFF',
      borderRadius: 10,
      marginBottom: 8,
      paddingHorizontal: 24,
      fontSize: 16,
    },
  
    button: {
      backgroundColor: '#34CB79',
      height: 60,
      flexDirection: 'row',
      borderRadius: 10,
      overflow: 'hidden',
      alignItems: 'center',
      marginTop: 8,
    },
  
    buttonIcon: {
      height: 60,
      width: 60,
      backgroundColor: 'rgba(0, 0, 0, 0.1)',
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    buttonText: {
      flex: 1,
      justifyContent: 'center',
      textAlign: 'center',
      color: '#FFF',
      fontFamily: 'Roboto_500Medium',
      fontSize: 16,
    }
});

const pickerSelectStyles = StyleSheet.create({
  inputIOS: {
    height: 60,
    backgroundColor: '#FFF',
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    borderWidth: 1,
    borderRadius: 8,
    borderColor: 'purple',
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  inputAndroid: {
    height: 60,
    backgroundColor: '#FFF',
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: 'purple',
    color: 'black',
    paddingRight: 10, // to ensure the text is never behind the icon
  },
  iconContainer: {
    top: 15,
    right: 12,
  }
});

export default Home;
