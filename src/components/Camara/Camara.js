import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React, { Component } from 'react'
import {Camera} from 'expo-camera'
import {storage} from '../../firebase/config'


class Camara extends Component {
    constructor(){
        super()
        this.metodosCamara = null
        this.state = {
            mostrarCamara:false,
            fotoUri:''
        }
    }

    componentDidMount(){
        Camera.requestCameraPermissionsAsync()
        .then(()=> {
            this.setState({
                mostrarCamara : true
            })
        })
        .catch(err => console.log(err))
    }

    tomarFoto(){
        this.metodosCamara.takePictureAsync()
        .then(foto => this.setState({
            fotoUri: foto.uri,
            mostrarCamara:false
        }))
        .catch(err => console.log(err))
    }

    aceptarImagen(){
        fetch(this.state.fotoUri)
        .then(imagenEnBinario => imagenEnBinario.blob())
        .then(imagen => {
            const ref = storage.ref(`fotos/${Date.now()}.jpg`)
            ref.put(imagen)
            .then(()=> {
                ref.getDownloadURL()
                .then((url)=> this.props.cuandoSubaLaImagen(url))
                .catch(err => console.log(err))
            })

        })
        .catch(err => console.log(err))
    }

    rechazarImagen(){

    }

  render() {
    return (
      <View style={styles.container}>
        {
            this.state.mostrarCamara ?
            <>
                <Camera
                style={styles.camarabody}
                type={Camera.Constants.Type.back}
                ref={metodos => this.metodosCamara = metodos}
                />
                <TouchableOpacity onPress={ () => this.tomarFoto()}>
                    <Text style={styles.boton} > TOMAR FOTO! </Text>
                </TouchableOpacity>
            </>
            : this.state.mostrarCamara === false && this.state.fotoUri != '' ?
            <View>
                <Image
                source={{uri: this.state.fotoUri}}
                style={styles.image}
                />
                <TouchableOpacity onPress={()=> this.aceptarImagen()}>
                    <Text style={styles.boton}> Aceptar imagen </Text>
                </TouchableOpacity>
                <TouchableOpacity  onPress={()=> this.rechazarImagen()}>
                    <Text style={styles.boton}> Rechazar imagen </Text>
                </TouchableOpacity>
            </View>
            : <Text>No me haz dado permisos para mostrar la foto</Text>
        }
      </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    },
    camarabody:{
        height:500
    },
    image:{
        height:200
    },
    boton:{
        textAlign: 'center',
        backgroundColor: '#d8bbf1',
        padding: 5,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        marginBottom: 5,
        fontWeight: 'bold',
        color:'#8e4cc4',
        fontSize: 17
    },
})

export default Camara