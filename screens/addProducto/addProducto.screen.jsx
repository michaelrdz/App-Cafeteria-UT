import React, { useEffect, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, } from "react-native";
import { StyledView, StyledTextoLista, StyledInput } from "../../styles/StyledComp";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import Icon from 'react-native-vector-icons/Ionicons';
import 'firebase/storage';

  const addProductoScreen = ({setProductosVisbles, IdMenu, setIdMenu}) => {
  
    const item = {"Titulo":"", "Precio": ""};
    const [titulo, setTitulo] = useState();
    const [precio, setPrecio] = useState();
    const [listar, setListar] = useState([]);

    useEffect(() => {
      console.log("Listando");
      listarItems();
    }, []);

    // Nuevo Item
  const crearItem = () => {
    try {
      if (titulo.length > 0) {
        const todoRef = database.ref("Menu/"+IdMenu+"/productos");
        item.Titulo = titulo;
        item.Precio = precio;
        todoRef.push(item);
        //console.log(item);
        listarItems();
        setTitulo(null);
      } else {
        alert("Ingresar un título");
      }
    } catch (error) {
      alert("Ingresar un título");
    }
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

  // Eliminar Item
  const eliminarItem = ( ID ) => {
    const todoRef = database.ref("Menu/"+IdMenu+"/productos").child(ID);
    todoRef.remove();
    //listarItems();
  };

  const regresaMenu = () => {
      setProductosVisbles(false);
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
          width: "70%",
          justifyContent: "center",
        }}
      >
        <StyledInput
          placeholder="Ingresar nuevo producto"
          onChangeText={(text) => setTitulo(text)}
          value={titulo}
        />
      </View>
      <View
        style={{
          width: "30%",
          justifyContent: "center",
        }}
      >
        <StyledInput
          placeholder="Precio"
          onChangeText={(text) => setPrecio(text)}
          value={precio}
          keyboardType={'numeric'}
        />
      </View>

      <View
        style={{
          width: "100%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <TouchableOpacity
          onPress={()=> crearItem()}
          style={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Image source={require("../../media/icons/add.png")} />
        </TouchableOpacity>
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
                <Icon name="trash-outline" size={34} color="red" onPress={()=>eliminarItem(item.id)} />
                </View>
            </View>
        )))}
      </ScrollView>
    </StyledView>
  </View>

  );
};
export default addProductoScreen;
