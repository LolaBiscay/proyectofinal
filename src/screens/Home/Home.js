import { View, StyleSheet, Image, FlatList} from 'react-native'
import React, {Component} from 'react'

import Post from '../../components/Post/Post'
import {db} from '../../firebase/config'

class Home extends Component {
  constructor(){
    super()
    this.state={
      allPosts:[]
    }
  }

  componentDidMount(){ //onSnapshot va en el component did monunt para q funcione en el primer renderizado
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(3)
    .onSnapshot(docs => { //onSnapshot tiene un callback
      let publicaciones = []
      docs.forEach(doc => { //forEach es de firebase. doc es el parametro del forEach
        publicaciones.push({ //le mando por cada uno de los documentos que devuelve onSpanshot, un id y una data
          id:doc.id,
          data:doc.data()
        })
      })

    this.setState({
      allPosts: publicaciones
    })

    })
  }
  
  render(){
    return (
      <View style={styles.container}>
      <Image style={styles.image}
          source={require('../../../assets/logo.png')}
          resizeMode = 'contain'
        />
      
        <View style={styles.otroContainer}>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()} //key para cada item del array
            renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />} //Renderiza por cada item un componente Post, atraves de la prop data le pasamos toda la info que se guarda en cada uno de los items en su prpiedad data (data viene del push)
          />
        </View>
      </ View>
    )
  }
}

const styles = StyleSheet.create({
  container:{
    flex: 1
  },
  otroContainer:{
    flex:5
  },
  image:{
    height: 120,
    marginTop: 5,
    marginBottom: 5
  }
})

export default Home

