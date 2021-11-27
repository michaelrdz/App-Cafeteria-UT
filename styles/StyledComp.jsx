import styled from "styled-components/native";

export const StyledView = styled.View`
  background-color: ${({ special, special1 }) =>
    special ? "#ffff" : special1 ? "#ffff" : "#ffff"};
  flex: 1;
  justify-content: center;
  align-items: center;
`;

export const StyledView1 = styled.ImageBackground`
  background-color: black;
  width: 100%;
  justify-content: center;
  align-items: center;
`;

export const StyledText = styled.Text`
  color: black;
  font-size: 32px;
  font-weight: bold;
  text-align: center;
`;

export const StyledInput = styled.TextInput`
  height: 50px;
  width: 95%;
  margin: 12px;
  padding: 10px;
  border: 4px;
  border-color: lavender;
  background-color: white;
  font-size: 20px;
`;

export const StyledTouchableOpacity = styled.TouchableOpacity`
  width: 80%;
  margin: 12px;
  padding: 10px;
  background-color: lightcyan;
  border-radius: 50px;
`;

export const StyledViewLista = styled.View`
  margin-top: 5%;
  flex-direction: row;
  border-color: #ffffff;
  border-bottom-width: 1.5px;
  width: 100%;
  align-items: stretch;
  min-height: 40px;
`;

export const StyledTextoLista = styled.Text`
  padding: 10px;
  margin-Top: 6px;
  font-Size: 17px;
  font-Weight: bold;
  color: black;
`;
