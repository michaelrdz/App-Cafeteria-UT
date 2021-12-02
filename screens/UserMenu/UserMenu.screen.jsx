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
} from "../../styles/StyledComp";
import UserListaProductos from "../UserListaProductos";
import { auth, database } from "../../firebase";
import { estilosLista as styles } from "../../styles/estilosLista";
import Icon from "react-native-vector-icons/Ionicons";
import "firebase/storage";

const UserMenuScreen = (props) => {
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
      const items = snapshot.val();
      const itemListar = [];
      for (let id in items) {
        itemListar.push({ id, ...items[id] });
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
  };

  //////////////////////////////////////////////////////////////////////////////////////
  const agregarCarritos = (prdID, prod, cant, prec, total) => {
    let newPrd = true;
    let updatePC = props.PC?.map(item => {
      if(item.id == prdID) {
        console.log("Producto ya esta en carrito");
        let newCant = item.Cantidad + 1;
        console.log("nueva cantidad: "+newCant);
        console.log(item.Total+"+"+prec+"=")
        let newTotal = parseFloat(item.Total) + parseFloat(prec);
        console.log("nuevo Total: "+newTotal);
        newPrd = false;
        return {...item, Cantidad: newCant, Total: newTotal}
      } else {
        return item;
      }
    });
    console.log(updatePC);

    if(newPrd) {
      console.log("Nuevo producto");
      props.SetPC([
        ...props.PC,
        {
          id: prdID,
          Productos: prod,
          Precio: prec,
          Cantidad: parseFloat(cant),
          Total: parseFloat(total),
        },
      ]);
    }else {
      console.log("Actualizando productos editados");
      props.SetPC(updatePC);
      console.log(props.PC);
    }
  };

  return prodVisbles ? (
    <UserListaProductos
      setProdVisbles={setProdVisbles}
      IdMenu={IdMenu}
      setIdMenu={setIdMenu}
      AC={agregarCarritos}
    ></UserListaProductos>
  ) : (
    <View style={styles.container}>
      <StyledView special1>
        <ScrollView>
          {listar.length === 0 ? (
            <Text style={styles.textoListaVacia}>
              No hay menús para mostrar
            </Text>
          ) : (
            listar?.map((item) => (
              <View key={item.id} style={styles.filaLista}>
                <View
                  style={{
                    width: "60%",
                    height: 50,
                    justifyContent: "center",
                  }}
                >
                  <StyledTextoLista onPress={() => elegirProductos(item.id)}>
                    {item.Titulo}
                  </StyledTextoLista>
                </View>

                <View
                  style={{
                    width: "40%",
                    height: 50,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <TouchableOpacity
                    onPress={() => elegirProductos(item.id)}
                  >
                    <Text>Ver mas Producto</Text>
                    {/*<Image
                source={{ uri: pickedImagePath }}
                style={styles.usrPic}
                  />*/}
                  </TouchableOpacity>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </StyledView>
    </View>
  );
};
export default UserMenuScreen;
