import React, { useEffect, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, } from "react-native";
import { StyledView, StyledTextoLista, StyledInput } from "../../styles/StyledComp";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import Icon from 'react-native-vector-icons/Ionicons';
import 'firebase/storage';

  const UserListaProductosScreen = ({setProdVisbles, IdMenu, setIdMenu}) => {
  
    const [listar, setListar] = useState([]);

    useEffect(() => {
      console.log("Listando");
      listarItems();
    }, []);

    // Nuevo Item
  const agregarCarrito = (ID, Titulo, Monto) => {
    //AGREGAR producto a un objeto Pedido que deberá estar en Home.jsx 
    console.log("producto: "+Titulo);   
  };
  
  // Consultar la informacion
  const listarItems = () => {
    //console.log("listando");
    const todoRef = database.ref("Menu/"+IdMenu+"/productos");
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

  const regresaMenu = () => {
    setProdVisbles(false);
  }
  
  return (
    <View style={styles.container}>
    <View
      
    >
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Nuevo Producto:</Text>
      </View>
      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={()=> regresaMenu()}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
            <Text>Atras</Text>
          {/*<Image source={require("../../media/icons/add.png")} />*/}
        </TouchableOpacity>
      </View>
    </View>
    <StyledView special1>
      <ScrollView>
      {listar.length === 0 ? (<Text style={styles.textoListaVacia}>No hay productos en el menu</Text>) : 
      (
        listar?.map((item) => (
          <View key={item.id}
                style={styles.filaLista}
            >
                <View
                style={{
                    width: "55%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                <StyledTextoLista>{item.Titulo}</StyledTextoLista>
                </View>

                <View
                style={{
                    width: "25%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <StyledTextoLista>$ {item.Precio}</StyledTextoLista>
                
                </View>

                <View
                style={{
                    width: "20%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                <Icon name="trash-outline" size={34} color="red" onPress={()=>agregarCarrito(item.id, item.Titulo, item.Precio)} />
                </View>
            </View>
        )))}
      </ScrollView>
    </StyledView>
  </View>

  );
};
export default UserListaProductosScreen;
