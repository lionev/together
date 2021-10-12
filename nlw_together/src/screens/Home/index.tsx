import React, {useState} from "react";
import { FlatList, View, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { CategorySelect } from "../../components/CategorySelect";
import { ButtonAdd } from "../../components/ButtonAdd";
import { Profile } from "../../components/Profile";
import { styles } from "./styles";
import { ListHeader } from "../../components/ListHeader";
import { Appointment } from "../../components/Appointment";
import { ListDivider } from "../../components/ListDivider";
import { Background } from "../../components/Background";

export function Home(){
    const [category, setCategory] = useState('')

    const appoinments = [
        {
            id: '1',
            guild:{
              id: '1',
              name: 'Lendarios',
              icon: null,
              owner: true  
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: "É Hoje que vamos chega ao challenger sem perder uma partida da md10"
        },
        {
            id: '2',
            guild:{
              id: '1',
              name: 'Lendarios',
              icon: null,
              owner: true  
            },
            category: '1',
            date: '22/06 às 20:40h',
            description: "É Hoje que vamos chega ao challenger sem perder uma partida da md10"
        },
    ]

    const navigation = useNavigation()

    function handleCategorySelected(categoryId: string){
        categoryId === category ? setCategory('') : setCategory(categoryId);
    }

   
    function handleAppointmentDetails(){
        navigation.navigate('AppointmentDetails')
    }

    function handleAppointmentCreate(){
        navigation.navigate('AppointmentCreate')
    }

    return(
    <Background>

        <View style={styles.container}>
            <View style={styles.header}>
                <Profile />
                <ButtonAdd 
                    onPress={handleAppointmentCreate}
                />
            </View>
            
                <CategorySelect
                    categorySelected={category}
                    setCategory={handleCategorySelected}
                    hasCheckBox={true}
                />

                    <ListHeader
                        title="Partidas agendadas"
                        subtitle="Total 6"
                    />

                    <FlatList
                        data={appoinments}
                        keyExtractor={item => item.id}
                        renderItem={({ item }) => (
                            <Appointment 
                                data={item}
                                onPress={handleAppointmentDetails}
                            />
                        )}
                        ItemSeparatorComponent={() => <ListDivider />}
                        contentContainerStyle={{paddingBottom: 69}}
                        style={styles.matches}
                        showsHorizontalScrollIndicator={false}
                    />
        </View>
    </Background>

    );
}