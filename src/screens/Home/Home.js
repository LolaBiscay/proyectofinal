

import { View, Text, StyleSheet, Image, FlatList,ActivityIndicator,TouchableOpacity} from 'react-native'
import React, {Component} from 'react'
import Contador from '../../components/Contador/Contador'
import {info} from '../../api/data'
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
      <>
      <Image style={styles.logo}
          source={require('../../../assets/logo.png')}
          resizeMode = 'contain'
        />
      
        <View style={styles.container3}>
          <FlatList
            data={this.state.allPosts}
            keyExtractor={item => item.id.toString()}
            renderItem={({item}) => <Post navigation={this.props.navigation} id={item.id} data={item.data} />}
          />
        </View>
      </>
    )
  }
}

const styles = StyleSheet.create({
  container1:{
    flex:1,
    justifyContent:'center',
    alignItems:'center'
  },
  container2:{
    flex:3
  },
  container3:{
    flex:5
  },
  image:{
    height:300
  },
  logo: {
    height: 100,
    marginTop: 5,
    marginBottom: 10
  },
  text:{
    fontSize: 20, 
    textAlign: 'center',
    fontWeight: 'bold'
  }
})

export default Home