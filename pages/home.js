import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image } from 'react-native';
import App from '../App';
import DetailScreen from './details';

const HomeScreen = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [logOut, setLogOut] = useState(false);
    const [goDetails, setGoDetailss] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);

    useEffect(() => {
        fetchNews();
    }, [page]);


    const handleItemPress = (itemId) => {
        setSelectedItemId(itemId);
        setGoDetailss(true);
    };

    const fetchNews = async () => {
        try {
            const response = await fetch(`https://notigram.com/wp-json/wp/v2/posts?per_page=10&status=publish&page=${page}&_embed`);
            const data = await response.json();
            setNews(prevNews => [...prevNews, ...data]);
        } catch (error) {
            console.error('Error fetching news:', error);
        }
    };

    const handleLogout = () => {
        setLogOut(true)
    };

    if (logOut) {
        return <App />;
    }

    if (goDetails) {
        return <DetailScreen itemId={selectedItemId} />;
    }


    const renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => handleItemPress(item.id)}>
            <View style={styles.newsItem}>
                <Image
                    source={{ uri: item._embedded['wp:featuredmedia'][0].source_url }}
                    style={styles.image}
                />
                <Text style={styles.title}>{item.title.rendered}</Text>
                <Text style={styles.author}>By {item._embedded.author[0].name}</Text>
            </View>
        </TouchableOpacity>
    );

    const renderFooter = () => {
        return <Text style={styles.loading}>Loading...</Text>;
    };

    const handleLoadMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Created by Mibzar</Text>
                <TouchableOpacity onPress={handleLogout}>
                    <Text style={styles.logout}>Log out</Text>
                </TouchableOpacity>
            </View>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString() + index} // Combina el ID con el índice
                ListFooterComponent={renderFooter}
                onEndReached={handleLoadMore}
                onEndReachedThreshold={0.1}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        marginBottom:20
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    loading:{
        textAlign:"center",
        fontSize: 18,
        fontWeight: 'bold',
        padding:15
    },
    logout: {
        fontSize: 16,
        color: 'blue',
    },
    newsItem: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    image: {
        width: '100%',
        height: 200,
        resizeMode: 'cover',
        marginBottom: 10,
    },
    title: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    author: {
        fontSize: 14,
        color: 'gray',
    },
});

export default HomeScreen;
