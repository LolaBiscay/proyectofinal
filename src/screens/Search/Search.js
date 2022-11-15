import { Text, View, StyleSheet, TextInput, TouchableOpacity,  FlatList, } from 'react-native'
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
        <View>
            <Text>Search</Text>
            <TextInput  
              onChangeText={ text => this.setState( {busqueda:text} )}
              placeholder='Ingresa tu busqueda'
              value={this.state.busqueda}>
            </TextInput>

            <TouchableOpacity onPress={()=> this.buscar(this.state.busqueda)}>
                <Text> Buscar</Text>
            </TouchableOpacity>

            <FlatList /*recorro el array*/
              data={this.state.users}
              keyExtractor={(item) => item.id}
              renderItem= {({item}) => <Text>{item.data.username}</Text>}
    
             />
        
             
        </View>
    )
  }
}

export default Search;