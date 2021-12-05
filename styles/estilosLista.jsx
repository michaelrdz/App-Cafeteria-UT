import { StyleSheet } from "react-native";
import { COLORS } from "./colors.styles";

export const estilosLista = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
      },
    cabecera: {
        flexDirection: "row",
        backgroundColor: COLORS.AzulUT_dark,
        height: 100,
    },
    cabeceraGrl: {
        flexDirection: "row",
        backgroundColor: COLORS.AzulUT_dark,
        height: 100,
    },
    cabeceraLstPedidos: {
        flexDirection: "row",
        backgroundColor: COLORS.AzulUT_dark,
        width: "100%",
        height: 80,
        alignItems: "center",
        alignContent: "center"
    },
    textoListaVacia: {
        color: COLORS.AzulUT_dark,
        fontWeight: "700",
        fontSize: 18,
        top: 2,
    },
    filaLista: {
        flexDirection: "row",
        flex: 1,
        backgroundColor: COLORS.GisBajito,
        borderColor: "white",
        borderBottomWidth: 0,
        marginTop: 10,
        marginBottom: 10,
    }
});