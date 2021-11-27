import { StyleSheet } from "react-native";
import { COLORS } from "./colors.styles";

export const estilosUsuario = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonContainer: {
        width: 400,
        flexDirection: 'row',
        justifyContent: 'space-around'
      },
      imageContainer: {
        padding: 30
      },
      image: {
        width: 400,
        height: 300,
        resizeMode: 'cover'
      },
      button: {
        backgroundColor: COLORS.PrincipalPink,
        width: "60%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 40,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      usrPic: {
        width: 160,
        height: 160,
        resizeMode: 'cover',
        borderRadius: 80,
      },
      textoUsuario: {
        color: COLORS.PrincipalPink,
        fontWeight: "700",
        fontSize: 18,
        marginTop: 20,
      },
      textoCorreo: {
        color: COLORS.GrisFuerte,
        fontWeight: "700",
        fontSize: 14,
        marginTop: 2,
      }
 });