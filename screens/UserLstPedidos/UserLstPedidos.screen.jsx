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
import { StyledView, StyledTextoLista, StyledInput } from "../../styles/StyledComp";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import UserVerPedido from "../UserVerPedido";
import i18n from "../../localization/i18n";
import appIcon from "../../media/images/app_ico.png";
import emptyImg from "../../media/images/emptyList.png";
import Icon from "react-native-vector-icons/Ionicons";
import "firebase/storage";

const UserLstPedidosScreen = ({}) => {

  const [listar, setListar] = useState([]);

  useEffect(() => {
    console.log("Listando");

    listarItems();
  }, []);

  // Consultar la informacion
  const listarItems = () => {
    //console.log("listando");
    const todoRef = database.ref("Pedidos");
    todoRef.on("value", (snapshot) => {
      const items = snapshot.val();
      const itemListar = [];
      for (let id in items) {
        itemListar.push({ id, ...items[id] });
      }
      let filterItems = itemListar.filter(item => item.Cliente == auth.currentUser?.uid);
      //console.log(filterItems);
      setListar(filterItems);
      //console.log(itemListar);      
    });
  };

  const [prodVisbles, setProdVisbles] = useState(false);
  const [IdPedido, setIdPedido] = useState("");
  const [totalPedido, setTotalPedido] = useState("");
  const [nomCliente, setNomCliente] = useState("");
  const [matriculaClie, setMatriculaClie] = useState("");
  
  const verDetalles = (idPed, totalPed, clie, mat) => {
    console.log("Manda pedido: "+idPed)
    setIdPedido(idPed);
    console.log("IdPedido="+IdPedido);
    setTotalPedido(totalPed);
    setProdVisbles(true);
    setNomCliente(clie);
    setMatriculaClie(mat);
  };
    
  return (
    prodVisbles ? (
      <UserVerPedido IdPedido={IdPedido} totalPedido={totalPedido} setProdVisbles={setProdVisbles} nomCliente={nomCliente} matricula={matriculaClie}></UserVerPedido>
    ):
    (
    <View style={styles.container}>
      <View style={{width: "100%", backgroundColor:"#4c566a", height: 100, justifyContent: "center", alignItems: "center", flexDirection: "row" }}>
      <View style={{width: "30%", alignItems: "center", alignContent: "center"}}>
          <Image source={appIcon} />
        </View>
        <View style={{width: "70%"}}>
          <Text style={{color: "white"}}>{i18n.t("UserPedidos").Descripcion}</Text>
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
                  <Text>{i18n.t("AdminPedidos").Folio}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 25,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminPedidos").Total}</Text>
                  </View>
                  <View style={{
                    width: "15%",
                    height: 25,
                    justifyContent: "center",
                }}
                >
                  <Text>{i18n.t("AdminPedidos").Detalles}</Text>
                  </View>
    </View>
    <StyledView special1>
      <ScrollView>
        {listar.length === 0 ? (
          <View style={{flex: 1, width: "100%", alignItems: "center", alignContent: "center"}}>
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
                  <Text onPress={()=>verDetalles(lista.id, lista.Total_PrecioPedido, lista.Nombre, lista.Matricula)}>{lista.id}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Text onPress={()=>verDetalles(lista.id, lista.Total_PrecioPedido, lista.Nombre, lista.Matricula)}>{lista.Total_PrecioPedido}</Text>
                </View>
                <View style={{
                    width: "15%",
                    height: 50,
                    justifyContent: "center",
                }}
                >
                  <Icon name="arrow-forward-circle-outline" size={34} color="green" onPress={()=>verDetalles(lista.id, lista.Total_PrecioPedido, lista.Nombre, lista.Matricula)} />
                </View>
            </View>
           
            ))
        )}
      </ScrollView>
    </StyledView>
  </View>
  )
  );
};
export default UserLstPedidosScreen;