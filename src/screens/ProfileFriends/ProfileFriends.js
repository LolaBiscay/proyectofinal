import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'

class ProfileFriends extends Component {

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
        .where('owner', '==', this.props.route.params.email)
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
            <Text style={styles.text}>nombre de usuario: {this.state.misDatos.username}</Text>
            <Text style={styles.text}>biografia: {this.state.misDatos.biografia}</Text>     
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
    paddingHorizontal: 32,
    backgroundColor: '#E0E4EA',
  },

  publicaciones:{
    flex: 8, 
  },

  usuarioYMail:{
    flexDirection: 'column' 
  },

  text:{
    textAlign: 'left',
    fontSize: 14,
  },

  textPublicaciones:{
    textAlign: 'left',
    fontSize: 14,
    fontWeight: 'bold',
  },

  botton:{
    textAlign: 'center',
    backgroundColor: '#0095F6',
    padding: 5,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 5,
    fontWeight: 'bold',
    color:'#FFFFFF',
    fontSize: 17,
  },

  image:{
    height: "80%",
    width: "25%",
    borderRadius: "40%",
    justifyContent: 'center',
    alignItems: 'center'
  },

  card:{
    flexDirection: 'row',
    alignItems: 'center',
    flex: 2,
  },

  textCard:{
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: "5%",
  }

  
  
  })

export default ProfileFriends;