import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
} from "react-native";
import {
  StyledView,
  StyledTextoLista,
  StyledInput,
  StyledTouchableOpacityDrop,
} from "../../styles/StyledComp";

import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import { StyledTouchableOpacity } from "../../styles/StyledComp";
import i18n from "../../localization/i18n";
import Icon from "react-native-vector-icons/Ionicons";
import "firebase/storage";

const UserVerPedidoScreen = ({IdPedido, totalPedido, setProdVisbles, nomCliente, matricula}) => {

  const [listar, setListar] = useState([]);

  useEffect(() => {
    console.log("Listando");
    listarItems();
  }, []);

  // Consultar la informacion
  const listarItems = () => {
    const todoRef = database.ref("Pedidos/"+IdPedido+"/Productos");
    todoRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const itemListar = [];
      for (let id in items) {
        itemListar.push({ id, ...items[id] });
      }
      setListar(itemListar);
      //console.log(itemListar);
    });
  };

  const eliminarPedido = () => {
    console.log("eliminando pedido "+eliminarPedido);
    const todoRef = database.ref("Pedidos").child(IdPedido);
    todoRef.remove();
    setProdVisbles(false);
  };
  
  const regresaPedidosLst = () => {
    setProdVisbles(false);
  };

  return (
    <View style={styles.container}>
      <View style={{width: "100%", backgroundColor:"#4c566a", height: 50, justifyContent: "center", alignItems: "flex-start"}}>
      <View style={{flexDirection: "row", justifyContent: "center", alignItems: "center"}}>
        <TouchableOpacity
            onPress={() => regresaPedidosLst()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Icon name="arrow-back-outline" size={34} color="white" />
          </TouchableOpacity>
          <Text onPress={() => regresaPedidosLst()} style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>{i18n.t("UserPedidos").atras}</Text>
      </View>
      </View>
      <View style={{width: "100%", backgroundColor:"#4c566a", height: 100, justifyContent: "center", alignItems: "center"}}>
        <Text style={{ fontSize: 16, color: "white" }}>Detalles del pedido:</Text>
            <View>
              <Text style={{color: "white"}}>{i18n.t("AdminVerPedido").Orden} {IdPedido}</Text>
            </View>
            <View>
              <Text style={{color: "white"}}>{i18n.t("AdminVerPedido").Nombre} {nomCliente}</Text>
            </View>
            <View>
              <Text style={{color: "white"}}>{i18n.t("AdminVerPedido").Matricula} {matricula}</Text>
            </View>
      </View>
      
      <View style={{
                   flexDirection: "row"
                }}>
      <View style={{
                    width: "70%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminVerPedido").Producto}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminVerPedido").Cantidad}</Text>
                  </View>
                  <View style={{
                    width: "15%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminVerPedido").Totales}</Text>
                  </View>
    </View>
      <StyledView special1>
      <ScrollView>
        {listar.length === 0 ? (
          <Text style={styles.textoListaVacia}>
            {i18n.t("AdminPedidos").NoProductos}
          </Text>
        ) : (
        listar?.map((lista) => (
          <View key={lista.id} style={styles.filaLista}>
            <View style={{
                    width: "70%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text>{lista.Productos}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text>{lista.Cantidad}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text>${lista.Total}</Text>
                </View>
            </View>
            ))
        )}
      </ScrollView>
    </StyledView>
    <View style={{height: "8%"}}>
      <Text style={{ fontSize: 16, color: "#ff8c00", fontWeight: "bold" }}>{i18n.t("AdminVerPedido").Total} ${totalPedido}</Text>
    </View>
  </View>
  );
};
export default UserVerPedidoScreen;
