import {View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import React, {Component} from 'react'
import {auth} from '../../firebase/config'


// //Para implementar el metodo signOut


// class Perfil extends Component (){

//     // signOut(){
//     //     auth.signOut()

//     // }

//     render(){
//         return(
//             <View>
//                 <Text> Mi Perfil </Text>
//                 {/* <TouchableOpacity 
//                 onPress={ ()=> this.signOut()}
//                 style={styles.boton}
//                 > 
//                     <Text> Cerras sesión </Text>

//                 </TouchableOpacity> */}
//             </View>
//         )

//     }

// }
// const styles = StyleSheet.create({
//     boton: {
//         padding: 10,
//         borderColor: 'black',
//         borderWidth: 1
//     }

// })

// export default Perfil


export default function Perfil (){
    return(
        <View>
            <Text> Mi Perfil </Text>
        </View>
    )
}