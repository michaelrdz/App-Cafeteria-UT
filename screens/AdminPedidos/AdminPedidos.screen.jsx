import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Button } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import usrPic from "../../media/images/usr_profpic.png";
import ImagePickerScreen from "../ImgPicker";
import { estilosUsuario as styles } from "../../styles/estilosUsuario";

import { auth, database, firebase } from "../../firebase";
import 'firebase/storage';

const addMenuScreen = ({}) => {
    
  return (
      <View>
          <Text>Listar Pedidos "ACTIVOS"</Text>
      </View>
  );
};
export default addMenuScreen;
