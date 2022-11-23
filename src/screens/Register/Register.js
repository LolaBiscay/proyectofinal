import React, { Component } from 'react'
import { Text, View, TextInput, StyleSheet, TouchableOpacity } from 'react-native'
import {auth, db} from '../../firebase/config'

class Register extends Component {
    constructor(){ //Constructor guarda el estado inicial del componente y administra props
        super()
        this.state ={
            username:'',
            email:'',
            password:'',
            biografia: '',
            error: ''
        }
    }

    registrarUsuario(username, email, password, biografia){
        auth.createUserWithEmailAndPassword(email, password)
        .then(()=> {
            return(
                db.collection('users').add({
                    email:email,
                    username:username,
                    biografia: biografia,
                    createdAt:Date.now()
                })
            )
        })
        .then(resp => this.props.navigation.navigate('Home'))
        .catch(err => this.setState({error: `Error: ${err.message}`}))      
    }

  render() {
    return (
    <View style={styles.container}>
        <Text> {this.state.error}</Text>
        <View>
            <Text style={styles.registro}>Formulario de registro</Text>
            <TextInput
                style={styles.input}
                placeholder='Escribe tu nombre de usuario'
                keyboardType='default'
                onChangeText={text => this.setState({username: text})} //guarda en el estado el cambio del input
                value={this.state.username}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu email'
                keyboardType='email-address'
                onChangeText={text => this.setState({email: text})}
                value={this.state.email}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu password'
                keyboardType='default'
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
            />
            <TextInput
                style={styles.input}
                placeholder='Escribe tu biografia'
                keyboardType='default'
                onChangeText={text => this.setState({biografia: text})}
                value={this.state.biografia}
            />

            {
                this.state.username == "" || this.state.email == "" || this.state.password == "" ? 
                <TouchableOpacity>
                    <Text style={styles.boton} >Registrarme</Text>
                </TouchableOpacity>    
                :
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password,this.state.biografia)}>
                {/* /le paso el estado con la info que el usuario cargo en el formulario*/}
                    <Text style={styles.boton} >Registrarme</Text>
                </TouchableOpacity>
            </View>

            }
            <View>
                <Text style={styles.texto}>Ya tienes un cuenta?</Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text style={styles.boton}> LOGUEATE!  </Text>
                </TouchableOpacity>
            </View>
        </View>
    </View>
    )
  }
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        paddingHorizontal:32
    },

    input:{
        borderColor: '#ccc',
        borderWidth: 2,
        marginBottom: 10,
        padding: 10,
        fontSize: 15,
        borderRadius: 5,
        textAlign: 'center'
    },

    registro:{
        textAlign: 'center',
        fontSize: 24,
        marginBottom: 15,
        fontWeight: 'bold',
        color: '#8e4cc4',
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

    entrar:{
        color: '#8e4cc4',
        fontWeight: 'bold'
    },
    texto: {
        textAlign: 'center',
        marginTop:20,
        marginBottom: 20
      
      }
})

export default Register