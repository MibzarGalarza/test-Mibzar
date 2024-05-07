import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, FlatList, Image, Pressable, Modal } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import App from '../App';
import DetailScreen from './details';

const HomeScreen = () => {
    const [news, setNews] = useState([]);
    const [page, setPage] = useState(1);
    const [logOut, setLogOut] = useState(false);
    const [goDetails, setGoDetailss] = useState(false);
    const [selectedItemId, setSelectedItemId] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedOption, setSelectedOption] = useState(null);

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

    const handleOptionSelect = (option) => {
        setSelectedOption(option);
        setModalVisible(false);
    };
    const toggleModalVisibility = () => {
        setModalVisible(true);
    };

    const closeModalVisibility = () => {
        setModalVisible(false);
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
                <Text style={styles.headerTitle}>News Durango</Text>
                <Pressable style={styles.button} onPress={toggleModalVisibility}>
                    <AntDesign name="menuunfold" style={{ fontSize: 20, color: "#fff", fontWeight: "bold", }} />
                </Pressable>
                <Modal
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={() => {
                        setModalVisible(!modalVisible);
                    }}
                >
                    <View style={styles.modalView}>
                        <AntDesign name="user" style={{ fontSize: 30, color: "#0A3978", fontWeight: "bold" }} />
                        <Text style={styles.modalOptionText}>Mibzar Galarza</Text>
                        <TouchableOpacity style={styles.modalOption} onPress={() => handleOptionSelect("Option 3")}>
                            <Text style={styles.modalOptionText}><AntDesign name="setting" style={{ fontSize: 15, color: "#0A3978", fontWeight: "bold" }} />  Setting</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={handleLogout}>
                            <Text style={styles.modalOptionText}><AntDesign name="logout" style={{ fontSize: 15, color: "#0A3978", fontWeight: "bold" }} />  Log out</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modalOption} onPress={closeModalVisibility}>
                            <Text style={styles.modalOptionText}><AntDesign name="close" style={{ fontSize: 15, color: "#0A3978", fontWeight: "bold" }} /> Close </Text>
                        </TouchableOpacity>
                    </View>
                </Modal>
            </View>
            <FlatList
                data={news}
                renderItem={renderItem}
                keyExtractor={(item, index) => item.id.toString() + index}
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
        backgroundColor: '#E0E0E0'
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingTop: 16,
        paddingBottom: 20,
        backgroundColor: '#0A3978'
    },
    headerTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: "#fff"
    },
    loading: {
        textAlign: "center",
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15
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
    button: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingHorizontal: 10,
        paddingVertical: 5,
        borderRadius: 4,
        elevation: 3,
        backgroundColor: '#0A3978',
    },
    text: {
        fontSize: 14,
        lineHeight: 21,
        fontWeight: 'bold',
        letterSpacing: 0.25,
        color: 'white',
    },
    modalView: {
        position: 'absolute',
        top: 60,
        right: 0,
        width: '300px',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingVertical: 10,
        paddingHorizontal: 20,
        elevation: 5,
        alignItems: 'center',
    },
    modalOption: {
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    modalOptionText: {
        fontSize: 12,
        padding:2
    },
});

export default HomeScreen;
