import React from 'react';
import { Button, StyleSheet, Text, View } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 50,
        paddingHorizontal: 20,
        backgroundColor: '#f8f9fa'
    },
    title: {
        fontSize: 22,
        fontWeight: 'bold',
        marginBottom: 15,
        textAlign: 'center'
    },
    detailText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 10
    },
    buttonContainer: {
        marginTop: 20
    }
});

const HDBInfo = ({ navigation, route }) => {
    const {
        financial_year,
        town,
        room_type,
        min_selling_price,
        max_selling_price
    } = route.params;

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HDB Details</Text>
            <Text style={styles.detailText}>Financial Year: {financial_year}</Text>
            <Text style={styles.detailText}>Town: {town}</Text>
            <Text style={styles.detailText}>Room Type: {room_type}</Text>
            <Text style={styles.detailText}>Min Selling Price: ${min_selling_price}</Text>
            <Text style={styles.detailText}>Max Selling Price: ${max_selling_price}</Text>

            <View style={styles.buttonContainer}>
                <Button title="Go Back" onPress={() => navigation.goBack()} color="#007bff" />
            </View>
        </View>
    );
};

export default HDBInfo;
