import React, {useRef, useState, useEffect} from 'react';
import { useHistory } from 'react-router-dom';
import { ChatEngine } from 'react-chat-engine';
import { auth } from 'firebase';

import axios from 'axios';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {

    const history = useHistory();

    const {user} = useAuth();
    const [loading, setLoading] = useState(true);

    const handleLogout = async () =>{
        await auth.signOut();

        history.pushState('/');
    }

    const getFile = async(url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }

    useEffect(() => {
        if(!user){
            history.pushState('/');

            return;
        }
        axios.get('https://api.chatengine.io/users/me',
        {
            headers: {
                "project-id": "ab8e2e9e-4a58-45d3-877c-b8005f04985e",
                "user-name": user.email,
                "user-secret" : user.uid,
            }
        })
    .then(() => {
        setLoading(false);
    })

    .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email);
        formdata.append('secret', user.uid);
        
        getFile(user.photoURL)
            .then((avatar) => {
                formdata.append('avatar', avatar,avatar.name);

                axios.post('https://api.chatengine.io/users',
                    formdata,
                    {headers: {"private-key": "e92b3747-e346-4f1e-8ea5-cb778abd93e8"}}
                )

                .then(() => setLoading(false))
                .catch((err) => console.log(err))
            })
        
    })
}, [user, history]);


    if(!user || loading) return 'Loading...';

    return(
        <div className='chats-page'>
            <div className='nav-bar'>
                <div className='logo-tab'>
                    NOVEL
                </div>
                <div onClick={handleLogout} className='logout-tab'>
                    logout
                </div>
            </div>
            <ChatEngine
                    height ="calc(100vh - 66px)"
                    projectID="ab8e2e9e-4a58-45d3-877c-b8005f04985e"
                    userName={user.email}
                    userSecret={user.uid}
                />
        </div>
    );
}

export default Chats