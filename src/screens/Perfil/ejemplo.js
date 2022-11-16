import { Text, View, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, { Component } from 'react'
import {db, auth} from '../../firebase/config'
import Post from '../../components/Post/Post'

class Profile extends Component {
  
  constructor(){
    super()
    this.state={
      misDatos: {},
      id:'',
      posteos: [],
    }
  }

  componentDidMount(){
    db.collection('users')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(doc => {
      doc.forEach(doc => this.setState({
        id: doc.id,
        misDatos: doc.data()
      })) 
    })
    db.collection('posts')
    .where('email', '==', auth.currentUser.email)
    .onSnapshot(docs => {
      let posts = []
      docs.forEach(doc => {
          posts.push({
              id: doc.id,
              data: doc.data()
          })
      })
      this.setState({
          posteos: posts
      })
  })
  }

  cerrarSesion(){
    auth.signOut()
    .then( resp => this.props.navigation.navigate('Login'))
    .catch(err => console.log(err))
  } 

  borrarPosteo(){
    auth.currentUser.delete()
        .then( () => {
            this.props.navigation.navigate("Portada")
      } )

  }



  render() {
    console.log(this.state.misDatos)
    return (
      <>
      <View style={styles.containerDatos}>
        <View style={styles.card}>
          <Image style={styles.image}
            source={{uri: this.state.misDatos.foto}} 
            resizeMode = 'cover'
          />
          <Text style={styles.textCard}>Username: {this.state.misDatos.usuario}</Text>
          <Text style={styles.textCard}>Email: {this.state.misDatos.email}</Text>
        </View>      
        <Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>   
        <Text style={styles.text}>Cantidad de posts: {this.state.posteos.length}</Text>
        <TouchableOpacity onPress={()=> this.cerrarSesion()}>
          <Text style={styles.botton}>Cerrar sesión</Text>
        </TouchableOpacity>

        <Text style={styles.textPublicaciones}>Publicaciones:</Text>
        {this.state.posteos.length >= 1 ? 
        <View style={styles.publicaciones}>
          <FlatList 
        data = {this.state.posteos}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} // preguntar xq item.item (2 veces)
        />
        </View>
        :
        <Text>Aun no hay publicaciones</Text>
        }
      </View>
      </>
    )
  } 
}

const styles = StyleSheet.create({

  containerDatos:{
    flex: 1, 
    justifyContent: 'center',
    paddingHorizontal: 32,
    backgroundColor: '#E0E4EA',
  },

  publicaciones:{
    flex: 1, 
  },


  text:{
    textAlign: 'left',
    fontSize: 18,
  },

  textPublicaciones:{
    textAlign: 'left',
    fontSize: 18,
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
    height: 200,
    width: 200,
    borderRadius: 1000,
    justifyContent: 'center',
    alignItems: 'center'
  },

  card:{
    flexDirection: 'column',
    alignItems: 'center',
  },

  textCard:{
    fontSize: 22,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 25,
  }


})


export default Profile