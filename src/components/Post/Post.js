import { Text, View, TouchableOpacity, Image, StyleSheet} from "react-native";
import React, {Component} from "react";
import {FontAwesome} from '@expo/vector-icons'
import {db, auth} from '../../firebase/config'

class Post extends Component {
    constructor(props){
        super(props)
        this.state = {
            likesCount: props.data.likes.length,
            commentCount: props.data.comments.length,
            MiLike: false,
            miPost: [],
            esMiPost: false
        }
    }
    componentDidMount(){
        let miLike = this.props.data.likes.includes(auth.currentUser.email)
        if(miLike){
            this.setState({
                MiLike: true
            })
        }
    }

    componentDidMount(){
        if(this.props.data.owner === auth.currentUser.email){
            this.setState({
                esMiPost: true,
            })
        }
    }


    like(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayUnion(auth.currentUser.email)

        })
        .then(()=>{
            this.setState({
                MiLike: true,
                likesCount: this.setState.likesCount + 1,
                commentCount: this.state.commentCount + 1,

            })
        })
        .catch(e => console.log(e))
    }
    unlike(){
        db
        .collection('posts')
        .doc(this.props.id)
        .update({
            likes: firebase.firestore.FieldValue.arrayRemove(auth.currentUser.email)
        })
        .then(()=> {
            this.setState({
                MiLike: false,
                likesCount: this.state.likesCount - 1,
                commentCount: this.state.commentCount - 1,
            })
        })
        .catch(e => console.log(e))
    }
    borrarPosteo(){
        db.collection('posts')
        .doc(this.props.id)
        .delete()
        .then(()=> {this.props.navigation.navigate('Profile')})
        .catch(err=> console.log(err))
    }




    render() {
        return (
        <View style={styles.container}>
            <View style={styles.card}>
                <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                            'HomeNavigation',{
                                screen: 'ProfileFriends',
                                params: {email:this.props.data.owner}
                            })}>
                        <Text style={styles.textUser}>{this.props.data.owner}</Text>
                </TouchableOpacity>
            </View>

            <View>
            <Image style={styles.image} 
                    source={{uri: this.props.data.foto}}
                    resizeMode='contain'/>
            </View>

        
            <View style={styles.likeycoment}>
                
                    {
                        this.state.isMyLike ?
                            <TouchableOpacity onPress={()=> this.unlike()}>
                                <FontAwesome name='heart' color='red' size={32} />
                            </TouchableOpacity>
                        :
                            <TouchableOpacity onPress={()=> this.like()}>
                                <FontAwesome name='heart-o' color='red' size={32} />
                            </TouchableOpacity>
                    }
            
                    <View style={styles.comment} >
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                            'Comments',
                            {id:this.props.id}
                            )}>
                        <FontAwesome name='comment' size={32} />
            
                    </TouchableOpacity>
                    {/* <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                            'Likes',
                            {id:this.props.id}
                            )}>
                        <Text style={styles.agregar}>Los likes</Text>
            
                    </TouchableOpacity> */}
                    </View>
                
            </View>
            
            <Text style={styles.likesCount}>{this.state.likesCount} Likes</Text>
    
            <View style={styles.container2}>
                <Text style={styles.subtitle}>Descripción: {this.props.data.description}</Text>
            </View>
           
    
               
            
            <View style={styles.coment}>
                {
                    this.state.commentCount >= 1 ?
                    <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                        'Comments',
                        {id:this.props.id}
                        )}>
                    <Text style={styles.comentario}> ver los {this.state.commentCount} comentarios</Text>
        
                </TouchableOpacity> :
    
                <TouchableOpacity onPress={()=> this.props.navigation.navigate (
                    'Comments',
                    {id:this.props.id}
                    )}>
                    <Text style={styles.comentario}> Aun no hay comentarios! </Text>
                </TouchableOpacity>
                }
            </View>
    
            <View>
                {
                    this.state.miPost ?
                    <TouchableOpacity onPress={()=> this.borrarPosteo()}>
                    <Text style={styles.agregar}> Borrar posteo </Text>
                    </TouchableOpacity> : ''
                }
            </View>
        </View>

        )
    }
    }



    const styles = StyleSheet.create({
        container:{
            flexDirection: 'column',
            padding: 40,
            justifyContent:'space-between',
            alignItems:'center',
            margin: 50,
            marginBottom: 10,
            backgroundColor: 'white',
            marginTop: 20,
            flex: 1,
            borderWidth: 3,
            borderRadius: 10,
        },
        container1:{
            justifyContent: 'left',
            backgroundColor: 'white',
            color: 'black',
            marginBottom: 30,
            width: '100%',
            
        },
        container2:{
            flex:3,
            margintop: 60,
            marginBottom: 10,
        },
        subtitle:{
            // fontFamily: 'Open Sans', 
            fontSize: 20,
            marginTop: 20
        },
        image:{
            height: 265,
            width: 100000,
            border: 'black',
            marginBottom: 20,
        },
    
        agregar:{
            color: 'black',
        },
    
        descripcion:{
            color: 'black',
        },
        
        like: {
            flexDirection: 'row',
            marginBottom: 10,
        },
    
        comentario: {
            color: "black",
            // fontFamily: 'Open Sans',
            // fontFamily: 'Copperplate',
        },

        textUser: {
            fontSize: 20,
            fontWeight: 'bold', 
            marginBottom: 10,
            // fontFamily: 'Open Sans',
            
        },

        likesCount:{
            fontSize: 15,
            fontWeight: 'bold'
        },

        likeycoment:{
            marginRight: 8,
            flexDirection: 'row',
            marginBottom: 5
        }
        }
        )

export default Post