import React from "react";
import {
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    TextInput,
    Image,
    ScrollView,
  } from "react-native";
import { StyledView, StyledTextoLista, StyledInput } from "../../styles/StyledComp";
import { auth, database } from "../../firebase";
import Icon from 'react-native-vector-icons/Ionicons';

export const ShowToDoScreen = (props) => {
  return (
    <StyledView special1>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#000000",
          borderWidth: 2,
          borderColor: "white",
          height: 50,
        }}
      >
        <View
          style={{
            width: "60%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color:"white" }}>Título</Text>
        </View>

        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
            borderLeftWidth: 2,
            borderRightWidth: 2,
            borderColor: "white",
          }}
        >
          <Text style={{ fontSize: 15, color:"white" }}>Estado</Text>
        </View>

        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 15, color:"white" }}>Eliminar</Text>
        </View>
      </View>
      <ScrollView>
        {props.listas.map((cuadro) => (
          /*<ListarCuadro
            titulo={cuadro.Titulo}
            estado={cuadro.Estado}
            eliminar={() => props.eliminarID(cuadro.id)}
          />*/
          <View key={cuadro.id}
                style={{
                flexDirection: "row",
                flex: 1,
                backgroundColor: "#c7cac8",
                borderColor: "white",
                borderBottomWidth: 2,
                marginTop: 10,
                }}
            >
                <View
                style={{
                    width: "60%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                <StyledTextoLista>{cuadro.Titulo}</StyledTextoLista>
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
                 cuadro.Estado == "Activar"
                 ? (
                    <TouchableOpacity onPress={props.modificaEstado(cuadro.id, "desactivar")}>
                        <Image source={require("../../media/icons/tick.png")} />
                    </TouchableOpacity>
                 ) : 
                 (
                    <TouchableOpacity onPress={props.modificaEstado(cuadro.id, "activar")}>
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
                <Icon name="trash-2" size={40} color="red" onPress={props.eliminar(cuadro.id)} />
                </View>
            </View>
        ))}
      </ScrollView>
    </StyledView>
  );
};

export default ShowToDoScreen;
