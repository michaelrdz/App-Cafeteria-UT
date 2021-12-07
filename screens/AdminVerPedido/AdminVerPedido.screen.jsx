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
  StyledTouchableOpacityDrop
} from "../../styles/StyledComp";

import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import { StyledTouchableOpacity } from "../../styles/StyledComp";
import i18n from "../../localization/i18n";
import Icon from "react-native-vector-icons/Ionicons";
import emptyImg from "../../media/images/emptyList.png";
import "firebase/storage";

const AdminVerPedidoScreen = ({IdPedido, totalPedido, setProdVisbles, nomCliente, matricula}) => {

  const [listar, setListar] = useState([]);
  //const [isMounted, setIsMounted] = useState(true);

  useEffect(() => {
    console.log("Listando");
    listarItems();
  }, [setProdVisbles]);

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
      <View style={styles.cabeceraGrl}>
        <View style={{
          width: "12%",
          justifyContent: "center",
          alignItems: "center",}} >
        <TouchableOpacity
            onPress={() => regresaPedidosLst()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Icon name="arrow-back-outline" size={34} color="white" />
          </TouchableOpacity>
        </View>
        <View View style={{
          width: "88%",
          justifyContent: "center",
          alignItems: "center",}} >
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
      </View>
      
      <View style={{
                   flexDirection: "row"
                }}>
      <View style={{
                    width: "70%",
                    height: 25,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminVerPedido").Producto}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 25,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminVerPedido").Cantidad}</Text>
                  </View>
                  <View style={{
                    width: "15%",
                    height: 25,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminVerPedido").Totales}</Text>
                  </View>
    </View>
      <StyledView special1>
      <ScrollView>
        {listar.length === 0 ? (
          <View style={{flex: 1, alignItems: "center", alignContent: "center"}}>
          <Image source={emptyImg} style={{width: "100%"}} />
          <Text style={{fontSize: 20}}>{i18n.t("AdminPedidos").NoProductos}</Text>
        </View>
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
                  <Text>{lista.Total}</Text>
                </View>
            </View>
            ))
        )}
      </ScrollView>
    </StyledView>
    <View style={{height: 40}}>
      <Text style={{ fontSize: 22, color: "black", fontWeight: "bold" }}>{i18n.t("AdminVerPedido").Total} {totalPedido}</Text>
    </View>
    <View style={{
          flexDirection: "row",
          backgroundColor: "#d4cece",
          height: 100,
        }}>
    <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledTouchableOpacityDrop
            cambiarSpecial
            onPress={()=>eliminarPedido()}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "#000000",
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingRight: "15%",
                }}
              >
                {i18n.t("AdminVerPedido").btnEliminar}
              </Text>
              <Image source={require("../../media/icons/cancelar.png")} />
            </View>
          </StyledTouchableOpacityDrop>
        </View>

        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledTouchableOpacity onPress={()=>eliminarPedido()}>
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text
                style={{
                  color: "white",
                  fontSize: 20,
                  fontWeight: "bold",
                  paddingRight: "15%",
                }}
              >
                {i18n.t("AdminVerPedido").btnAtender}
              </Text>
              <Image source={require("../../media/icons/pago.png")} />
            </View>
          </StyledTouchableOpacity>
        </View>
    </View>
  </View>
  );
};
export default AdminVerPedidoScreen;
