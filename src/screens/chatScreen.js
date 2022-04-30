/* eslint-disable no-empty-pattern */
import React, {
    useEffect, useCallback, useState, useLayoutEffect
} from 'react';
import {
    StyleSheet, View, Text, TouchableOpacity, Button
} from 'react-native';
import { Avatar } from 'react-native-elements';
import { white, black } from '../utils/globalStyles';
import { signOut } from 'firebase/auth';
import { GiftedChat } from 'react-native-gifted-chat';
import { useNavigation } from '@react-navigation/native';
import { auth, db } from '../../firebase';

function Chat({ }) {
    const navigation = useNavigation();
    const [messages, setMessages] = useState([]);
    const signOutNow = () => {
        signOut(auth).then(() => {
            // Sign-out successful.
            navigation.replace('Login');
        }).catch((error) => {
            // An error happened.
        });
    };
    useLayoutEffect(() => {
        navigation.setOptions({
            // eslint-disable-next-line react/no-unstable-nested-components
            headerLeft: () => (
                // eslint-disable-next-line react-native/no-inline-styles
                <View style={{ marginLeft: 20 }}>
                    <Avatar
                        rounded
                        source={{
                            uri: auth?.currentUser?.photoURL,
                        }}
                    />
                </View>
            ),
            // eslint-disable-next-line react/no-unstable-nested-components
            headerRight: () => (
                <TouchableOpacity
                    // eslint-disable-next-line react-native/no-inline-styles
                    style={{
                        marginRight: 10
                    }}
                    onPress={signOutNow}
                >
                    <Text>logout</Text>
                </TouchableOpacity>
            )
        });
    }, [navigation]);

    useEffect(() => {
        setMessages([
            {
                _id: 1,
                text: 'Hello',
                createdAt: new Date(),
                user: {
                    _id: 2,
                    name: 'React Native',
                    avatar: 'https://placeimg.com/140/140/any',
                },
            },
        ]);
    }, []);
    const onSend = useCallback((messages = []) => {
        setMessages((previousMessages) => GiftedChat.append(previousMessages, messages));
    }, []);
    return (
        <GiftedChat
            messages={messages}
            showAvatarForEveryMessage
            onSend={(messages) => onSend(messages)}
            user={{
                _id: auth?.currentUser?.email,
                name: auth?.currentUser?.displayName,
                avatar: auth?.currentUser?.photoURL
            }}
        />
    );
}

export default Chat;
const styles = StyleSheet.create({
    backButtonWrapper: {
        margin: 5,
        width: 200,
        backgroundColor: black
    },
});
