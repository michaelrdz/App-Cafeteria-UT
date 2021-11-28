import React, { useEffect, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, } from "react-native";
import { StyledView, StyledTextoLista, StyledInput } from "../../styles/StyledComp";
import UserListaProductos from "../UserListaProductos";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import Icon from 'react-native-vector-icons/Ionicons';
import 'firebase/storage';

  const UserMenuScreen = ({}) => {
  
    const [listar, setListar] = useState([]);

    useEffect(() => {
      console.log("Listando");
      listarItems();
    }, []);

  // Consultar la informacion
  const listarItems = () => {
    //console.log("listando");
    const todoRef = database.ref("Menu");
    todoRef.on("value", (snapshot) => {
      const items= snapshot.val();
      const itemListar= [];
      for (let id in items) {
          itemListar.push({id, ...items[id] });
      }
      setListar(itemListar);
      //console.log(itemListar);
    });
  };

  const [prodVisbles, setProdVisbles] = useState(false);
  const [IdMenu, setIdMenu] = useState("");

  const elegirProductos = (idMenu) => {
    setProdVisbles(true);
    setIdMenu(idMenu);
  }

  
  return (
    prodVisbles ? (
        <UserListaProductos setProdVisbles={setProdVisbles} IdMenu={IdMenu} setIdMenu={setIdMenu}></UserListaProductos>
    ) : (
      <View style={styles.container}>
    
    <StyledView special1>
      <ScrollView>
      {listar.length === 0 ? (<Text style={styles.textoListaVacia}>No hay menús para mostrar</Text>) : 
      (
        listar?.map((item) => (
          <View key={item.id}
                style={styles.filaLista}
            >
                <View
                style={{
                    width: "60%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                <StyledTextoLista onPress={()=>elegirProductos(item.id)}>{item.Titulo}</StyledTextoLista>
                </View>

                <View
                style={{
                    width: "40%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <TouchableOpacity onPress={()=>elegirProductos(item.id)}>
                  <Text>Ver mas Producto</Text>
                  {/*<Image
                source={{ uri: pickedImagePath }}
                style={styles.usrPic}
                  />*/}
                  </TouchableOpacity>
                
                </View>
            </View>
        )))}
      </ScrollView>
    </StyledView>
  </View>
    )
    
  );
};
export default UserMenuScreen;
