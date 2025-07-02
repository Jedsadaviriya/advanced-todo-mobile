import { Text, TouchableOpacity, StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons"

export default function CustomIconButton({icon}){
    return(
        <TouchableOpacity style={styles.button}>
            <Ionicons name={icon} size={20} color="#000" />
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    button:{
        alignItems: "center",
        alignSelf: "center",
        height: 50,
        width: '48%',
        padding: 8,
        paddingLeft: 16,
        paddingRight: 16,
        borderRadius: 8,
        alignItems: 'center',
        flexDirection: 'row'
    },
    onbutton:{
        backgroundColor: "red",
        alignItems: 'flex-end',
    },
    textonbutton: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
})