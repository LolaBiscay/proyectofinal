import { Text, View, StyleSheet, TextInput, TouchableOpacity,  FlatList,Image } from 'react-native'
import React, { Component } from 'react'
import { auth, db } from '../../firebase/config'
import { SearchBar } from 'react-native'

class Search extends Component {
    constructor(props){
        super(props)
        this.state={
          data: [],
          id:'', 
          resultados: [],
          users: [], 
          loading: false,
          busqueda: '',
        }
    }

    componentDidMount(){
        db.collection('users')
        .onSnapshot(doc => {
          let resultados = [];
          doc.forEach(doc => {
            resultados.push({
                id: doc.id, 
                data: doc.data()
            })
            
          })
          this.setState(
            {data: resultados}
          )
         
        })
    }

    buscar(text){
    
        let usersFilter = this.state.data.filter(elm =>
        { 
         return elm.data.username.toUpperCase().includes(text.toUpperCase())})
         console.log(usersFilter);
         this.setState({
           users: usersFilter,
           user: text,
        })
    }

   render() {
  
    return( 
        <View style={styles.container}>
            <Image style={styles.image}
            source={require('../../../assets/search.png')}
            resizeMode = 'contain'
            />
            <TextInput style={styles.input}
              onChangeText={ text => this.setState( {busqueda:text} )}
              placeholder='Ingresa tu busqueda'
              value={this.state.busqueda}>
            </TextInput>

            <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
                <Text style={styles.boton}> Buscar</Text>
            </TouchableOpacity>

      
             <FlatList
              data={this.state.users}
              keyExtractor={(item) => item.id}
              renderItem= {({item}) => <View>
                
                <TouchableOpacity onPress={()=> this.props.navigation.navigate('HomeNavigation', {
                  screen: 'ProfileFriends',
                  params:{
                    email: item.data.email
                  }})}>
                  <Text style={styles.textUsuario}>{item.data.username}</Text>
                </TouchableOpacity>  
                
                </View>}
            />


        </View>
    )
  }
}


const styles = StyleSheet.create({
  container:{
    flex: 1,
    marginTop: 10,
    marginRight: 10,
    marginLeft: 10,
  },
  textUsuario:{
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 5
  },
  input:{
    borderColor: '#ccc',
    borderWidth: 2,
    marginBottom: 5,
    padding: 10,
    fontSize: 15,
    borderRadius: 5,
    margin: 10,
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
    fontSize: 17,
    marginTop: 10
},
image:{
  height: 200,
  marginTop: 5,
}
})





export default Search;