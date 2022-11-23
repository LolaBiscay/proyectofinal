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

  componentDidMount(){
    db.collection('posts')
    .orderBy('createdAt', 'desc')
    .limit(3)
    .onSnapshot(docs => {
      let publicaciones = []
      docs.forEach(doc => {
        publicaciones.push({
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
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
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

