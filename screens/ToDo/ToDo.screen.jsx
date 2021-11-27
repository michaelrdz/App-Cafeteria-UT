import React, { useEffect, useState } from "react";
import {StyleSheet, Text, TouchableOpacity, View, TextInput, Image, ScrollView, } from "react-native";
import { StyledView, StyledTextoLista, StyledInput } from "../../styles/StyledComp";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import Icon from 'react-native-vector-icons/Ionicons';
  
const ToDoScreen = ({}) => {

  const item = {"Titulo":"", "Estado":"Desactivar"};
  const [titulo, setTitulo] = useState();
  const [listar, setListar] = useState([]);

  useEffect(() => {
    listarItems();
  }, []);

  // Nuevo Item
  const crearItem = () => {
    try {
      if (titulo.length > 0) {
        const todoRef = database.ref("Usuarios/"+auth.currentUser?.uid+"/Items");
        item.Titulo = titulo;
        todoRef.push(item);
        console.log(item);
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
    console.log("listando");
    const todoRef = database.ref("Usuarios/"+auth.currentUser?.uid+"/Items");
    todoRef.on("value", (snapshot) => {
      const items= snapshot.val();
      const itemListar= [];
      for (let id in items) {
          itemListar.push({id, ...items[id] });
      }
      setListar(itemListar);
      console.log(itemListar);
    } );
  };

    // Modificar Item
    const modificarItem = ( ID, estado ) => {
      console.log("Modificando a "+ID);
      console.log("Modificando estado por "+estado);
      const todoRef = database.ref("/Usuarios/"+auth.currentUser?.uid+"/Items").child(ID);
      todoRef.update({
        Estado: estado,
      }).then(()=> listarItems());
    };

  // Eliminar Item
  const eliminarItem = ( ID ) => {
    const todoRef = database.ref("Usuarios/"+auth.currentUser?.uid+"/Items").child(ID);
    todoRef.remove();
    listarItems();
  };

  return (
    <View style={styles.container}>
    <View
      style={styles.cabecera}
    >
      <View
        style={{
          width: "15%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 20, color: "white" }}>Tarea:</Text>
      </View>

      <View
        style={{
          width: "75%",
          justifyContent: "center",
        }}
      >
        <StyledInput
          placeholder="Ingresar tarea nueva"
          onChangeText={(text) => setTitulo(text)}
          value={titulo}
        />
      </View>

      <View
        style={{
          width: "10%",
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
      </View>
    </View>
    <StyledView special1>
      <ScrollView>
      {listar.length === 0 ? (<Text style={styles.textoListaVacia}>No hay tareas pendientes</Text>) : 
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
                <StyledTextoLista>{item.Titulo}</StyledTextoLista>
                </View>

                <View
                style={{
                    width: "20%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                }}
                >
                {
                 item.Estado === "activar"
                 ? (
                    <TouchableOpacity onPress={()=>modificarItem(item.id, "desactivar")}>
                        <Image source={require("../../media/icons/tick.png")} />
                    </TouchableOpacity>
                 ) : 
                 (
                    <TouchableOpacity onPress={()=>modificarItem(item.id, "activar")}>
                        <Image source={require("../../media/icons/cruz.png")} />
                    </TouchableOpacity>
                 )
                }
                
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
export default ToDoScreen;
