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
        backgroundColor: COLORS.GrisFuerte,
        height: 200,
    },
    textoListaVacia: {
        color: COLORS.PrincipalPink,
        fontWeight: "700",
        fontSize: 18,
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