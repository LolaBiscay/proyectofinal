import { Text, View, StyleSheet, TouchableOpacity, TextInput } from 'react-native'
import React, { Component } from 'react'
import { auth } from '../../firebase/config'

class LoginScreen extends Component {
    constructor(props){
        super(props)
        this.state = {
            email:'',
            password:''
        }
    }

    componentDidMount(){ //recibimos a user
      auth.onAuthStateChanged(user => { 
        if(user !== null){ //Si user es distinto de null me redirige
          this.props.navigation.navigate('TabNavigation')
        }
      })
      
    }


    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => {
            this.props.navigation.navigate('TabNavigation')
        })
        .catch( err => console.log(err))
    }
  render() {
    return (
      <View style={styles.container}>
        <View>

          <Text style={styles.title}> Iniciar sesión </Text>
          <TextInput
              style={styles.input}
              keyboardType='email-address'
              placeholder='Ingresa tu email'
              onChangeText={text => this.setState({email: text})}
              value={this.state.email}
          />
          <TextInput
              style={styles.input}
              keyboardType='default'
              placeholder='Ingresa tu Password'
              onChangeText={text => this.setState({password: text})}
              value={this.state.password}
              secureTextEntry={true}
          />
          <View>
              <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                  <Text style={styles.boton}> Ingresá! </Text>
              </TouchableOpacity>
          </View>

          <View>
            <Text style={styles.texto}> ¿Aun no tienes una cuenta?: </Text>
            <TouchableOpacity onPress={()=> this.props.navigation.navigate('Register')}> {/* le paso como parametro donde quiero ir */}
              <Text style={styles.boton}> Registrate</Text>
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
  title:{
    textAlign: 'center',
    fontSize: 25,
    marginBottom: 15,
    fontWeight: 'bold',
    color: '#8e4cc4',
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
texto: {
  textAlign: 'center',
  marginTop:20,
  marginBottom: 20

}
})

export default LoginScreen