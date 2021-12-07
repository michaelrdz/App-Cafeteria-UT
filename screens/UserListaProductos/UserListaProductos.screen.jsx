import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import {
  StyledView,
  StyledTextoLista,
  StyledInput,
} from "../../styles/StyledComp";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import UserPedidosScreen from "../UserPedidos";
import cartImg from "../../media/images/ico_cart.png";
import Icon from "react-native-vector-icons/Ionicons";
import i18n from "../../localization/i18n";
import "firebase/storage";

const UserListaProductosScreen = ({
  setProdVisbles,
  IdMenu,
  setIdMenu,
  AC,
  miCarrito,
  setMiCarrito,
  PC,
  SetPC,
}) => {
  const [listar, setListar] = useState([]);
  //const [cantidad, setCantidad] = useState();

  useEffect(() => {
    console.log("Listando");
    listarItems();
  }, [verCarrito]);

  // Nuevo Item
  const agregarCarrito = (id, pd, c, pr, t) => {
    //AGREGAR producto a un objeto Pedido que deberá estar en Home.jsx
    AC(id, pd, c, pr, t);
    //setCantidad(0);
    //console.log("producto: " + pd);
  };

  // Consultar la informacion
  const listarItems = () => {
    //console.log("listando");
    const todoRef = database.ref("Menu/" + IdMenu + "/productos");
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

  //Ver carrito
  const[verCarrito, setVerCarrito] = useState(false);

  const abrirCarrito = () => {
    setVerCarrito(true);
  };


  const regresaMenu = () => {
    setProdVisbles(false);
  };

  return (
    verCarrito ? (
      <UserPedidosScreen PC={PC} SetPC={SetPC} setVerCarrito={setVerCarrito} miCarrito={miCarrito} setMiCarrito={setMiCarrito} />
    ) : (
      <View style={styles.container}>
        <View style={{width: "100%", backgroundColor:"#4c566a", height: 100, justifyContent: "flex-end", alignItems: "center", flexDirection: "row" }}>
        <View style={{width: "130%", height: 100, alignItems:"center", justifyContent: "center", flexDirection: "row"}}>
          <TouchableOpacity
            onPress={() => regresaMenu()}
            style={{
              alignItems: "flex-start",
              justifyContent: "flex-start",
            }}
          >
            <Icon name="arrow-back-outline" size={34} color="white" />
          </TouchableOpacity>
          <Text style={{ fontSize: 16, color: "white", fontWeight: "bold" }}>{i18n.t("UserPedidos").atras}</Text>
        </View>
        <View style={{width: 70,}}>
        <TouchableOpacity onPress={() => abrirCarrito()} style={{width: 64, height: 64, position: 'relative'}}>
        <ImageBackground
            source={cartImg}
            style={{
              height: 64,
              width: 64,
              position: 'absolute',
            }}
          />
          <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
          <Text style={{ fontSize: 34, color: "black", fontWeight: "bold" }}>{miCarrito}</Text></View>
        </TouchableOpacity>
        <Text style={{ fontSize: 14, color: "white" }} onPress={() => abrirCarrito()}>
        {i18n.t("UserCarrito").verCarrito}</Text>
        </View>
      </View>
      
      <StyledView special1>
        <ScrollView>
          {listar.length === 0 ? (
            <Text style={styles.textoListaVacia}>
              {i18n.t("AdminPedidos").NoProductos}
            </Text>
          ) : (
            listar?.map((item) => (
              <View key={item.id} style={styles.filaLista}>
                <View
                  style={{
                    width: "40%",
                    height: 120,
                    justifyContent: "center",
                  }}
                >
                    <Image
                      source={{ uri: item.imgUri }}
                      style={{
                        width:"100%",
                        height: 120
                    }}
                      />
                </View>
                <View
                  style={{
                    width: "48%",
                    height: 120,
                    justifyContent: "center",
                  }}
                >
                  <View>
                  <StyledTextoLista>{item.Titulo}</StyledTextoLista>
                  </View>
                  <View>
                  <StyledTextoLista>$ {item.Precio}</StyledTextoLista>
                  </View>
                </View>
                <View
                  style={{
                    width: "12%",
                    height: 120,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Icon
                    name="add-circle-outline"
                    size={34}
                    color="green"
                    onPress={() =>
                      agregarCarrito(
                        item.id,
                        item.Titulo,
                        1,
                        item.Precio,
                        item.Precio
                      )
                    }
                  />
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
export default UserListaProductosScreen;
