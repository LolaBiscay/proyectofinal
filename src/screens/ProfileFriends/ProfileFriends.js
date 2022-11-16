// import { Text, View } from 'react-native'
// import React, { Component } from 'react'
// import {db} from '../../firebase/config'

// export default class ProfileFriends extends Component {
//     constructor(props){
//         super(props)
//         console.log(props)
//         this.state = {
//             mailFriend:props.route.params.email,
//             postsFriend:[]
//         }
//     }

//     componentDidMount(){
//         db
//         .collection('posts')
//         .where('owner', '==', this.state.mailFriend)
//         .onSnapshot(docs => {
//             let posts = []
//             docs.forEach(doc => posts.push({
//                 id:doc.id,
//                 data: doc.data()
//             }))
//             this.setState({
//                 postsFriend: posts
//             }, ()=> console.log(this.state.postsFriend))
//         })
//     }
//   render() {
//     return (
//       <View>
//         <Text>ProfileFriends</Text>
//       </View>
//     )
//   }
// }
import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'

class usersProfile extends Component {

    constructor(props){
        super(props)
        this.state={
          misDatos: {},
          id:'',
          posteos: [],
          loader: true
        }
    }

    componentDidMount(){
        db.collection('users')
        .where('email', '==', this.props.route.params.email) //el email tiene que ser igual al email con el que se registro el usuario
        .onSnapshot(doc => { //recupero los resultados y muestro los datos del usuario
          doc.forEach(doc => this.setState({
            id: doc.id,
            misDatos: doc.data()
          })) 
        })
        db.collection('posts')
        .where('email', '==', this.props.route.params.email)
        .onSnapshot(docs => { // recupero los resultados y dejo un arrray vacio para poder meter los posts de los usuarios
          let posts = []
          docs.forEach(doc => {
              posts.push({ // con el push meto en el array los datos
                  id: doc.id,
                  data: doc.data()
              })
          })
          console.log(posts)
          this.setState({ // actualizar el estado con los nuevos posteos
              posteos: posts,
              loader: false
          })
      })
    }


  render() {
    return (
        this.state.loader ? <Text>Cargandooo</Text> : //si entra al loader que aparezca cargandooo
        <>
        <View style={styles.container}>
          <Text style={styles.text}>{this.state.misDatos.email}</Text>
          <View style={styles.card}>
            <Image style={styles.image}
              source={{uri: this.state.misDatos.foto}} // falta que llamar a la foto de perfil de cada usuario
              resizeMode = 'cover'
            />
            <Text style={styles.textCard}>{this.state.misDatos.username}</Text>
          </View>      
          <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>   
          <Text>Cantidad de posts: {this.state.posteos.length}</Text>
        </View>
  
        <View style={styles.container}>
          <Text>Posteos</Text>
          {this.state.posteos.length >= 1 ? 
          <FlatList 
          data = {this.state.posteos}
          keyExtractor = {(item) => item.id.toString()}
          renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} // preguntar xq item.item (2 veces)
          />
          :
          <Text>Aun no hay publicaciones</Text>
          }
        </View>
        </>
      )
    } 
}

const styles = StyleSheet.create({

    container:{
      flex: 1, 
      justifyContent: 'center',
      paddingHorizontal: 32
    },
  
    text:{
      textAlign: 'center',
      fontSize: 24,
    },
  
    image:{
      height: 130,
      width: 130,
      borderRadius: 1000,
      justifyContent: 'center',
      alignItems: 'center'
    },
  
    card:{
      flexDirection: 'row',
      alignItems: 'center',
    },
  
    textCard:{
      fontSize: 24,
      fontWeight: 'bold',
      color: 'black',
      marginLeft: 20
    }
  
  
  })
  

export default usersProfile;