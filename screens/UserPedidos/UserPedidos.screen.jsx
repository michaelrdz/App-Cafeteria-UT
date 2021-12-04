import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Button,
  ScrollView,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import usrPic from "../../media/images/usr_profpic.png";
import ImagePickerScreen from "../ImgPicker";
import { estilosUsuario as styles } from "../../styles/estilosUsuario";
import Icon from "react-native-vector-icons/Ionicons";

import { auth, database, firebase } from "../../firebase";
import "firebase/storage";
import { StyledTouchableOpacity } from "../../styles/StyledComp";

const UserPedidosScreen = (props) => {
  
  const perdidosPago = {
    Estatus: "Pendiente",
    Cliente: auth.currentUser?.uid,
    Total_PrecioPedido: ObtnerTotales(),
    Productos: { ...props.PC},
  };

  useEffect(() => {
    console.log(perdidosPago);
  }, []);

  function currencyFormat(num) {
    return parseFloat(num).toFixed(2).replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,");
  }

  const eliminarItem = (id) => {
    props.SetPC(
      props.PC.filter((item) => {
        if (item.id !== id) return true;
      })
    );
  };

  function ObtnerTotales() {
    return currencyFormat(
      props.PC.reduce((totales, suma) => (totales += suma.Total), 0)
    );
  }

  // Cambiar cantidad
  function cambiaCantidad(prdID, precio, cant, op) {
    let eliminaPrd = false;
    console.log("cambiando cantidad");
    let newCantidad
    if(op === "sum"){
      //console.log("sumando");
      newCantidad = cant+1;
    }else {
      console.log("Restando, cantidad: "+cant);
      if(cant=="1"){
        //console.log("Eliminando");
        eliminaPrd = true;
      }
      else {
        newCantidad = cant-1;
      }
    }

    if(eliminaPrd) {
      eliminarItem(prdID);
    }else {
      let newTotal =  parseFloat(newCantidad) * parseFloat(precio);
      console.log("actualiza cant - newTotal: "+newTotal);
      let updatePC = props.PC?.map(item => {
        if(item.id == prdID) {
          return {...item, Cantidad: newCantidad, Total: newTotal}
        }
        return item;
      });
      props.SetPC(updatePC);
      console.log("PC actualizado");
    }
  }

  // Nuevo Item
  const crearItem = () => {
    try {
      if (props.PC.length > 0) {
        const todoRef = database.ref("Pedidos");
        todoRef.push(perdidosPago);
        //console.log(perdidosPago);
        props.SetPC([]);
      } else {
        alert("No hay ventas en el pedido");
      }
    } catch (error) {
      alert("No hay ventas en el pedido");
    }
  };

  return (
    <View>
      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#ffff",
          height: 30,
        }}
      >
        <View
          style={{
            width: "40%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
            Producto
          </Text>
        </View>

        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
            Cant.
          </Text>
        </View>

        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
            Precio
          </Text>
        </View>

        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
            Total
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          height: "75%",
        }}
      >
        <ScrollView>
          {props.PC.length === 0 ? (
            <Text style={styles.textoListaVacia}>
              No hay venta en el pedido
            </Text>
          ) : (
            props.PC?.map((item) => (
              <View
                key={item.id}
                style={{
                  flexDirection: "row",
                  backgroundColor: "#ffffff",
                  height: 30,
                }}
              >
                <View
                  style={{
                    width: "5%",
                    justifyContent: "center",
                  }}
                >
                  <Icon
                    name="trash-outline"
                    size={20}
                    color="red"
                    onPress={() => eliminarItem(item.id)}
                  />
                </View>

                <View
                  style={{
                    width: "35%",
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {item.Productos}
                  </Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "flex-start",
                    flexDirection: "row"
                  }}
                >
                  <Icon name="remove-circle" size={34} color="red" 
                  onPress={()=>cambiaCantidad(item.id, item.Precio, item.Cantidad, "res")} />
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {item.Cantidad}
                  </Text>
                  <Icon name="add-circle" size={34} color="green" 
                  onPress={()=>cambiaCantidad(item.id, item.Precio, item.Cantidad, "sum")} />
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {item.Precio}
                  </Text>
                </View>

                <View
                  style={{
                    width: "20%",
                    justifyContent: "center",
                    alignItems: "flex-end",
                  }}
                >
                  <Text style={{ fontSize: 20, color: "black" }}>
                    {item.Total}
                    {/*currencyFormat(item.Cantidad * item.Precio)*/}
                  </Text>
                </View>
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#fff",
          height: 50,
        }}
      >
        <View
          style={{
            width: "75%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
            Totales
          </Text>
        </View>

        <View
          style={{
            width: "5%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 20, color: "black", fontWeight: "bold" }}>
            $
          </Text>
        </View>

        <View
          style={{
            width: "20%",
            justifyContent: "center",
            alignItems: "flex-end",
          }}
        >
          <Text style={{ fontSize: 20, color: "black" }}>
            {ObtnerTotales()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: "row",
          backgroundColor: "#d4cece",
          height: 100,
        }}
      >
        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledTouchableOpacity
            cambiarSpecial
            onPress={() => props.SetPC([])}
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
                Cancelar
              </Text>
              <Image source={require("../../media/icons/cancelar.png")} />
            </View>
          </StyledTouchableOpacity>
        </View>

        <View
          style={{
            width: "50%",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledTouchableOpacity onPress={crearItem}>
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
                Confirmar
              </Text>
              <Image source={require("../../media/icons/pago.png")} />
            </View>
          </StyledTouchableOpacity>
        </View>
      </View>
    </View>
    // <View>

    //     <Text>Listar Todos los Pedidos solo del usuario activo</Text>
    //     <Text>Mostrar lista de pedidos y al click mostar otro componente
    //       con los detalles del pedido (título de cada producto, cantidad, precio indivisual
    //       y total a pagar)</Text>
    // </View>
  );
};
export default UserPedidosScreen;
