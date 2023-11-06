import React, { useState,useEffect } from "react";
import {
    SafeAreaView,
    Text,
    View,
    TouchableOpacity,
    Dimensions,
    FlatList,
    StyleSheet,
    ScrollView,
    TextInput,
    Image,

} from 'react-native';
import Pasteventcard from "./pasteventcard";
import { useNavigation } from "@react-navigation/native";
import { useFocusEffect } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";





const { width, height } = Dimensions.get("window");


const Mypastevents = () => {

    const navigation=useNavigation();

    const [searchQuery, setSearchQuery] = useState("");


    const [pastevents, setpastevents] = useState([
      {/*}  {
            eventid: 1,
            eventname: "wiramaya",
            eventtype: "concert",
            date: "2024-aug-25",
            time: "5.00pm",
            venue: "SLIIT malabe campus",
            eventtype: "concert",
            soldTickets: "500",
            alltickets: "3000",
            images: [
                require('../assets/images/event1.jpg'),
                require('../assets/images/event2.jpg'),
            ],
            description:"the main concert in the SLIIT campus"
        
        },
        {
            eventid: 2,
            eventname: "Thalaya",
            eventtype: "concert",
            date: "2023-DEC-10",
            time: "6.00pm",
            venue: "Epitome Kurunegala",
            eventtype: "indoor concert",
            soldTickets: "500",
            alltickets: "3000",
            images: [
                require('../assets/images/event1.jpg'),
                require('../assets/images/event2.jpg'),
            ],
            description:"the main concert in the SLIIT campus"
        
        },
        {
            eventid: 3,
            eventname: "wiramaya",
            eventtype: "concert",
            date: "2024-aug-25",
            time: "5.00pm",
            venue: "SLIIT malabe campus",
            eventtype: "concert",
            soldTickets: "800",
            alltickets: "3000",
            images: [
                require('../assets/images/event1.jpg'),
                require('../assets/images/event2.jpg'),
            ],
            description:"the main concert in the SLIIT campus"
        
        }*/}

    ]);
    

   

  const handleSearch = () => {
    const filtered = pastevents.filter((item) =>
      item.eventname.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredeventhistory(filtered);
  };




    useEffect(() => {
        getAllEvents();
      }, []);

    useFocusEffect(
        React.useCallback(() => {
          getAllEvents();
        }, [])
      );
    
      const getAllEvents = async () => {
        const AuthToken = await AsyncStorage.getItem("token");
    
        const apiConfig = {
          headers: {
            Authorization: `Bearer ${AuthToken}`,
            "Content-Type": "application/json",
          },
        };
    
        axios
          .get("/event/all/my/past", apiConfig)
          .then((response) => {
            setpastevents(response.data);
            
          })
          .catch((e) => {
            console.log(e);
          });
      };
    
      function handleCardPress(event) {
        console.log("card pressed:", event);
        navigation.navigate("PastEventDetails", { pastevent: event });

    }
     




    return (
        <SafeAreaView style={styles.container}>

            <ScrollView>
                <View style={styles.topContainer}>
                    <View style={styles.searchContainer}>
                        <View style={styles.searchWrapper}>
                            <TextInput
                                style={styles.searchInput}
                                placeholder="Search events"
                                onChangeText={(text)=>setSearchQuery(text)}
                                value={searchQuery}
                            />
                        </View>
                        <TouchableOpacity style={styles.searchBtn} onPress={handleSearch}>
                            <Image
                                source={require("../assets/images/search.png")}
                                style={styles.searchBtnImage}
                                resizeMode="contain"
                            />
                        </TouchableOpacity>
                    </View>
                </View>


            </ScrollView>

            <View style={styles.eventcontainer}>



                <FlatList
                    data={pastevents}
                    renderItem={({ item }) => (
                        <Pasteventcard

                            item={item}
                            handleCardPress={() => handleCardPress(item)}
                        />)}

                    keyExtractor={(item) => item._id}
                    horizontal={false}
                    contentContainerStyle={styles.flatListContent}



                />







            </View>





        </SafeAreaView >
    )
}
export default Mypastevents;



const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: "#FFFFFF"
    },
    topContainer: {
        flex: 1

    },
    searchContainer: {
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "row",
        marginTop: height * 0.035,
        height: height * 0.08,
    },
    searchWrapper: {
        flex: 1,
        backgroundColor: "#F3F4F8",
        marginRight: width * 0.02,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: height * 0.04,
        height: "80%",
    },
    searchInput: {
        width: "100%",
        height: "80%",
        paddingHorizontal: width * 0.04,
        marginLeft: width * 0.02,
        borderRadius: height * 0.04,
    },
    searchBtn: {
        width: width * 0.11,
        height: "70%",
        backgroundColor: "#9CC5FF",
        borderRadius: height * 0.013,
        justifyContent: "center",
        alignItems: "center",
        marginRight: width * 0.02,
    },
    searchBtnImage: {
        width: "35%",
        height: "30%",
        tintColor: "white"
    },
    addiconimage: {
        width: "50%",
        height: "50%",



    },
    fitericonimage: {
        width: width * 0.08,
        height: height * 0.1
    },
    filtericon: {
        top: height * 0.01,
        marginRight: width * 0.02

    },
    iconcontainer: {

        flexDirection: "row",
        justifyContent: "space-between"
    },

    addicon: {
        justifyContent: "center",
        borderRadius: width * 0.5,
        width: width * 0.2,
        height: height * 0.1,
        marginLeft: width * 0.013,
        alignContent: "center",
        alignItems: "center",
        top: height * 0.01,
        right: width * 0.01

    },
    bottomContainer: {
        flex: 6,
        shadowColor: "#000",
        marginHorizontal: width * 0.02,
        borderRadius: height * 0.04,
        marginBottom: height * 0.02,
    },
    flatListContent: {
        paddingHorizontal: width * 0.01,
    },

    eventcontainer: {
        marginTop: height * 0.0001,
        flex: 50,
        shadowColor: "#000",
        marginHorizontal: width * 0.02,
        borderRadius: height * 0.04,
        marginBottom: height * 0.02,



    },
    title: {
        fontSize: 24,
        fontFamily: "DMMedium",
        alignContent: "center",
        alignItems: "center",
        fontWeight: "100",
    },
    titlecontainer: {

        alignItems: "center",
        marginBottom: height * 0.03

    }




})
