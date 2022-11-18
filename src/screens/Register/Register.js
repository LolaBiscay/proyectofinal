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
            biografia: ''
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
        .catch(err => console.log(err))      
    }

  render() {
    return (
    <View style={styles.container}>
        <View>
            <Text>Formulario de registro</Text>
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
            <View>
                <TouchableOpacity onPress={()=> this.registrarUsuario(this.state.username, this.state.email, this.state.password,this.state.biografia)}>
                {/* /le paso el estado con la info que el usuario cargo en el formulario*/}
                    <Text>Registrarme</Text>
                </TouchableOpacity>
            </View>
            <View>
                <Text>Ya tienes un cuenta?</Text>
                <TouchableOpacity onPress={ () => this.props.navigation.navigate('Login')}>
                    <Text>Logueate</Text>
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
      paddingHorizontal:24
    },
    input:{
        borderWidth:1
    },
    containerRedirect:{
        marginTop: 32
    }
  })
  

export default Register