import React, { useState, useEffect } from 'react';
import {StatusBar, TouchableOpacity, FlatList, StyleSheet, Text, View, TextInput} from 'react-native';

const styles = StyleSheet.create({
    container: {
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa',
        flex: 1
    },
    searchContainer: {
        marginBottom: 15
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
        padding: 10,
        fontSize: 16,
        backgroundColor: 'white'
    },
    listItem: {
        borderWidth: 1,
        borderColor: '#ddd',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        backgroundColor: '#fff'
    },
    itemText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 5
    },
    boldText: {
        fontWeight: 'bold'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 20,
        justifyContent: "center",
        alignSelf: "center",
        paddingBottom: 20
    }
});

let originalData = [];

const Home = ({ navigation }) => {
    const [myData, setMyData] = useState([]);

    useEffect(() => {
        fetch("https://data.gov.sg/api/action/datastore_search?resource_id=d_2d493bdcc1d9a44828b6e71cb095b88d")
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    originalData = myJson.result.records || [];
                    setMyData(originalData);
                }
            })
    }, []);

    const FilterData = (text) => {
        const searchWords = text.trim().toLowerCase().split(/\s+/);

        if (searchWords.length !== 0) {
            let myFilteredData = originalData.filter((item) =>
                searchWords.every((word) =>
                    (item.town && item.town.toLowerCase().includes(word)) ||
                    (item.room_type && item.room_type.toLowerCase().includes(word)) ||
                    (item.financial_year && item.financial_year.toString().toLowerCase().includes(word))
                )
            );

            setMyData(myFilteredData);
        } else {
            setMyData(originalData);
        }
    };

    const renderItem = ({ item, index }) => {
        return (
            <TouchableOpacity
                style={styles.listItem}
                onPress={() => {
                    navigation.navigate("HDBInfo", {
                        index,
                        key: item.id,
                        town: item.town,
                        financial_year: item.financial_year,
                        room_type: item.room_type,
                        min_selling_price: item.min_selling_price,
                        max_selling_price: item.max_selling_price
                    });
                }}
            >
                <Text style={[styles.itemText, styles.boldText]}>Financial Year: {item.financial_year}</Text>
                <Text style={styles.itemText}>Town: {item.town}</Text>
                <Text style={styles.itemText}>Room Type: {item.room_type}</Text>
            </TouchableOpacity>
        );
    };

    return (
        <View style={styles.container}>
            <StatusBar hidden={true} />
            <View style={styles.searchContainer}>
                <Text style={styles.title}>Price Range of HDB Flats Offered</Text>
                <Text>Search:</Text>
                <TextInput
                    style={styles.searchInput}
                    placeholder="Enter town, year, or room type..."
                    onChangeText={(text) => FilterData(text)}
                />
            </View>
            <FlatList data={myData} renderItem={renderItem} keyExtractor={(item, index) => index.toString()} />
        </View>
    );
};

export default Home;
