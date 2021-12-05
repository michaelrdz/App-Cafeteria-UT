import { StyleSheet } from "react-native";
import { COLORS } from "./colors.styles";

export const estilosLogin = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.primaryLight,
        alignItems: "center",
        justifyContent: "center"
    },
    inputContainer: {
        width: "80%",
      },
      input: {
        backgroundColor: "white",
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5,
        borderBottomWidth: 1,
        borderColor: "gray"
      },
      buttonContainer: {
        width: "60%",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 40,
      },
      button: {
        backgroundColor: COLORS.PrincipalPink,
        width: "100%",
        padding: 15,
        borderRadius: 10,
        alignItems: "center",
      },
      buttonOutline: {
        backgroundColor: "white",
        marginTop: 5,
        borderColor: COLORS.PrincipalPink,
        borderWidth: 2,
      },
      buttonText: {
        color: "white",
        fontWeight: "700",
        fontSize: 16,
      },
      buttonOutlineText: {
        color: "#5e81ac",
        fontWeight: "700",
        fontSize: 16,
      },
      logo: {
        width: 220,
        height: 220,
        marginLeft: 40,
        marginBottom: 20,
      },
});