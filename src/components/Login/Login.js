import React, {Component} from "react";
import { Text, View, TextInput, StyleSheet, TouchableOpacity} from "react-native";
import {auth} from '../../firebase/config'


class Login extends Component {
    constructor(){
        super()
        this.state={
            email: '',
            password: '',
            msjError: ''
        }
    }

    loguear(email, password){
        auth.signInWithEmailAndPassword(email, password)
        .then(resp => console.log(resp))
        .catch(e => console.log(e))


    }
    render(){
        return(
            <View>
                <Text> Login </Text>
            <TextInput
                style={Styles.input}
                keyboardType="email-address"
                placeholder= 'Ingresa tu email'
                onChangeText={text => this.setState({email: text})} /*recibo un parametro y despues seteo el estado con las propiedades que necesito setiar, a email le guardo el valor que me trae text*/
                value={this.state.email}
            />
            <TextInput
                
                keyboardType="default"
                placeholder= 'Ingresa tu password'
                onChangeText={text => this.setState({password: text})}
                value={this.state.password}
                secureTextEntry={true}
            />
                <View>
                    <TouchableOpacity onPress={()=> this.loguear(this.state.email, this.state.password)}>
                        <Text> Login </Text>
                    </TouchableOpacity>
                
                </View>
            </View>
        )
    }
}



export default Login