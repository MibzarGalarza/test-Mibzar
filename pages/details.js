import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Pressable } from 'react-native';
import HomeScreen from './home';
import AntDesign from 'react-native-vector-icons/AntDesign';

const DetailScreen = ({ itemId }) => {
    const [postDetails, setPostDetails] = useState(null);
    const [goBack, setGoBack] = useState(false);

    useEffect(() => {
        fetch(`https://notigram.com/wp-json/wp/v2/posts/${itemId}?_embed`)
            .then(response => response.json())
            .then(data => {
                setPostDetails(data);
            })
            .catch(error => {
                console.error('Error fetching post details:', error);
            });
    }, [itemId]);

    const handleBackPress = () => {
        setGoBack(true);
    };

    if (goBack) {
        return <HomeScreen />;
    }

    if (!postDetails) {
        return <Text>Cargando...</Text>;
    }

    const processedContent = postDetails.content.rendered.replace(/<[^>]+>/g, '');

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Pressable style={styles.button} onPress={handleBackPress}>
                    <AntDesign name="arrowleft" style={{ fontSize: 30, color: "#fff", fontWeight: "bold", }} />
                </Pressable>
            </View>
            <Text style={styles.title}>{postDetails.title.rendered}</Text>
            <View style={styles.imageContainer}>
                <Image
                    source={{ uri: postDetails._embedded['wp:featuredmedia'][0].source_url }}
                    style={styles.image}
                />
            </View>
            <Text style={styles.author}>Autor: {postDetails._embedded.author[0].name}</Text>
            <ScrollView style={styles.scrollView}>
                <Text style={styles.content}>{processedContent}</Text>
            </ScrollView>
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
    backButton: {
        position: 'absolute',
        top: 16,
        left: 16,
        marginBottom: "1rem"
    },
    backText: {
        fontSize: 16,
        color: 'blue',
    },
    title: {
        paddingLeft: 20,
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 30,
        textAlign: "center"
    },
    imageContainer: {
        alignItems: "center",
        justifyContent: "center",
        alignContent: "center",
        marginBottom: 10,
    },
    image: {
        width: 355,
        height: 200,
    },
    author: {
        padding: 20,
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    content: {
        padding: 20,
        fontSize: 16,
        textAlign: "left"
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },

});

export default DetailScreen;
