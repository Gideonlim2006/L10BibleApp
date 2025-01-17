import React, { useState, useEffect } from 'react';
import { FlatList, StatusBar, Text, TextInput, View, StyleSheet, ScrollView } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        padding: 20,
        backgroundColor: '#932d2d',
        alignItems: 'center',
    },
    headerText: {
        fontSize: 24,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    searchContainer: {
        padding: 15,
        backgroundColor: '#ffffff',
        marginBottom: 10,

    },
    searchLabel: {
        fontSize: 18,
        fontWeight: '500',
        marginBottom: 5,
    },
    searchInput: {
        borderWidth: 1,
        borderColor: '#cccccc',
        borderRadius: 10,
        padding: 10,
        fontSize: 16,
        backgroundColor: '#ffffff',
        color: '#000000',
    },

    sectionTitle: {
        fontSize: 20,
        fontWeight: '600',
        color: '#932d2d',
        marginLeft: 15,
        marginBottom: 10,
    },
    listContent: {
        padding: 15,
    },
    verseContainer: {
        marginBottom: 15,
        padding: 15,
        backgroundColor: '#ffffff',
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#cccccc',
    },
    verseHeader: {
        fontSize: 16,
        fontWeight: '700',
        marginBottom: 5,
        color: '#932d2d',
    },
    verseText: {
        fontSize: 16,
        fontWeight: '400',
    },
});

let originalData = [];

const App = () => {
    const [mydata, setMydata] = useState([]);

    useEffect(() => {
        fetch(
            'https://mysafeinfo.com/api/data?list=bible-kjv-oldtestament-songofsolomon&format=json&case=default'
        )
            .then((response) => response.json())
            .then((myJson) => {
                if (originalData.length < 1) {
                    setMydata(myJson);
                    originalData = myJson;
                }
            });
    }, []);

    const FilterData = (text) => {
        if (text !== '') {
            const myFilteredData = originalData.filter((item) =>
                item.Verse.includes(text)
            );
            setMydata(myFilteredData);
        } else {
            setMydata(originalData);
        }
    };

    const renderItem = ({ item }) => {
        return (
            <View style={styles.verseContainer}>
                <Text style={styles.verseHeader}>
                    {item.Book} {item.Chapter}:{item.VerseNbr} ({item.VersionCode})
                </Text>
                <Text style={styles.verseText}>{item.Verse}</Text>
            </View>
        );
    };

    return (
        <View style={[styles.container, {paddingTop: 40, marginBottom: 40}]}>
            <StatusBar hidden={true} />
            <View style={styles.header}>
                <Text style={styles.headerText}>Bible App</Text>
            </View>
            <View style={styles.searchContainer}>
                <Text style={styles.searchLabel}>Search:</Text>
                <TextInput
                    style={styles.searchInput}
                    onChangeText={(text) => {
                        FilterData(text);
                    }}
                />
            </View>
            <Text style={styles.sectionTitle}>Songs of Solomon</Text>
            <FlatList
                data={mydata}
                renderItem={renderItem}
                style={styles.listContent}
            />
        </View>
    );
};


export default App;
