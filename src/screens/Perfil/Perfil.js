import {View, Text, TouchableOpacity, StyleSheet, Image, FlatList } from 'react-native'
import React, {Component} from 'react'
import {auth,db} from '../../firebase/config'
import Post from '../../components/Post/Post'

class Perfil extends Component {
   
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
        .where('owner', '==', auth.currentUser.email)
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
 

    signOut(){
        auth.signOut()
        this.props.navigation.navigate('Login')
    }
    render(){
        return(
            <View>
                  <>
      <View >
        <View >
          <Image 
            source={{uri: this.state.misDatos.foto}} 
            resizeMode = 'cover'
          />
          <Text style={styles.text}>Username: {this.state.misDatos.username}</Text>
          <Text style={styles.text}>Email: {this.state.misDatos.email}</Text>
        </View>      
       {<Text style={styles.text}>Biografia: {this.state.misDatos.biografia}</Text>    }
        <Text style={styles.text}>Cantidad de posts: {this.state.posteos.length}</Text>
        <Text style={styles.text}>Publicaciones:</Text>
        {this.state.posteos.length >= 1 ? 
        <View >
          <FlatList 
        data = {this.state.posteos}
        keyExtractor = {(item) => item.id.toString()}
        renderItem = {(item) => <Post data={item.item.data} id={item.item.id} />} // preguntar xq item.item (2 veces)
        />
        </View>
        :
        <Text style={styles.letra}>Aun no hay publicaciones</Text>
        }
      </View>
      </>

                <TouchableOpacity 
                onPress={ ()=> this.signOut()}
                style={styles.boton}
                > 
                    <Text> Cerras sesión </Text>

                </TouchableOpacity>
            </View>
        )
    }
}



const styles = StyleSheet.create({
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
    fontSize: 17,
  },
  letra:{
    
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
      color:'#8e4cc4',
  },
  text:{
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  }
})
export default Perfil

