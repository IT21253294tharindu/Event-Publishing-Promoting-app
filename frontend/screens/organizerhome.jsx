import { React, useState } from "react";
import {
    View,
    SafeAreaView,
    Dimensions
} from 'react-native';

import { StyleSheet } from "react-native";
import { SegmentedButtons } from 'react-native-paper';
import Myevents from "../components/myEvents";
import Mypastevents from "../components/eventhistory";



const { width, height } = Dimensions.get("window");


const OrganizerHome = () => {

   
    const [value, setValue] = useState('upcomingevents');




    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.segment}>
                <SegmentedButtons
                    value={value}
                    
                    onValueChange={setValue}
                    buttons={[
                        {
                            value: 'upcomingevents',
                            label: 'My upcoming Events',
                        },
                        {
                            value: 'eventhistory',
                            label: 'My Event History',
                        },
                       

                    ]}
                />


            </View>
            {value === 'upcomingevents' && (
                
                <Myevents/> // Render the UserEventCard when the "My upcoming Events" tab is selected
            )}
            {value==='eventhistory'&&(
                <Mypastevents/>
            )}

        </SafeAreaView>

    )
}

export default OrganizerHome;


const styles = StyleSheet.create({
    container: {
        top:height*0.02,
        flex: 1,
        
    },
    segment:{
        Top:width*0.2,
        marginLeft:width*0.01,
        marginRight:width*0.01,
        alignContent:"center",
        alignItems:"center"
    }


})