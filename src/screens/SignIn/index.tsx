import React from "react";
import { View, Text, Image, Alert} from "react-native";

import { ButtonIcon } from "../../components/ButtonIcon";
import { styles } from "./styles";
import IllustrationImg from '../../assets/illustration.png'


import { userAuth } from "../../hooks/auth"; 


import { Background } from "../../components/Background";


export function SignIn(){


    const { user, signIn } = userAuth()

    async function handleSignIn(){
        try{
            await signIn();
        } catch (error) {
            Alert.alert('error'); 
        }
    }

    return(
    <Background>

        <View style={styles.container}>
            <Image 
                source={IllustrationImg}
                style={styles.image}
                resizeMode='stretch'
            />

            <View style={styles.content}>
                <Text style={styles.title}>
                  Conecte-se {`\n`}
                  suas jogatinas{`\n`}
                  jogatinas
                </Text>

                <Text style={styles.subtitle}>
                    Crie grupos para jogar seus games{`\n`}
                    favoritos com seus amigos
                </Text>
                <ButtonIcon 
                    title='Entrar com Discord'
                    activeOpacity={0.7}
                    onPress={handleSignIn}
                />
            </View>
        </View>
    </Background>
    
    )
}