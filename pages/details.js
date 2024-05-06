import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import HomeScreen from './home';

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
            <TouchableOpacity onPress={handleBackPress} style={styles.backButton}>
                <Text style={styles.backText}>Back</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{postDetails.title.rendered}</Text>
            <Image
                source={{ uri: postDetails._embedded['wp:featuredmedia'][0].source_url }}
                style={styles.image}
            />
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
        padding: 20,
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
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 10,
        marginTop: 30,
        textAlign:"center"
    },
    image: {
        width: "100%",
        height: 200,
        marginBottom: 10,
        resizeMode: 'cover',
    },
    author: {
        padding:10,
        fontSize: 16,
        fontWeight:'bold',
        marginBottom: 10,
    },
    content: {
        padding:10,
        fontSize: 16,
       textAlign:"left"
    },
    scrollView: {
        flex: 1,
        width: '100%',
    },

});

export default DetailScreen;
