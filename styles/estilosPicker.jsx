import { StyleSheet } from "react-native";
import { COLORS } from "./colors.styles";

export const estilosPicker = StyleSheet.create({
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
        width: 150,
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
        marginTop: 10,
      },
      buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: COLORS.PrincipalPink,
        borderWidth: 2,
        marginTop: 10,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      buttonOutlineText: {
        color: "#f18698",
        fontWeight: "700",
        fontSize: 16,
      },
 });