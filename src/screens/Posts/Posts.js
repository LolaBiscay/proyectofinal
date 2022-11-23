import { Text, View, TextInput, TouchableOpacity, StyleSheet } from 'react-native'
import React, { Component } from 'react'
import {auth, db} from '../../firebase/config'
import Camara from '../../components/Camara/Camara'

class Posts extends Component {
    constructor(){
        super()
        this.state={
            description:'',
            mostrarCamara:true,
            fotoUrl:''
        }
        console.log('llega aca')
    }

    enviarPost(description){
        db.collection('posts').add({
            owner:auth.currentUser.email,
            createdAt: Date.now(),
            description: description,
            likes:[],
            comments:[],
            foto: this.state.fotoUrl
        })
        .then(resp => {
            this.props.navigation.navigate('Home')
        })
        .catch(err => console.log(err))

    }

    cuandoSubaLaImagen(url){
        this.setState({
            mostrarCamara:false,
            fotoUrl: url
        })
    }


    render() {
        return (
        <View style = {styles.container}>
            { 
                this.state.mostrarCamara ?
                <Camara
                cuandoSubaLaImagen = {(url)=> this.cuandoSubaLaImagen(url)}
                /> : 
              <View>
                <TextInput style={styles.input}
                    keyboardType='default'
                    onChangeText={text => this.setState({description:text})}
                    value={this.state.description}
                    placeholder='Deja tu descripcion'
                />
                <TouchableOpacity
                onPress={()=> this.enviarPost(this.state.description) }
                >
                    <Text style={styles.boton}>Enviar Post</Text>
                    



                </TouchableOpacity>
              </View>  
           }
        </View>
        )
    }
}

const styles = StyleSheet.create({
    container:{
        flex:1
    }, 
    input:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 5,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        margin: 10,
        textAlign: 'center'
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

export default Posts
