import React, { useEffect, useState } from 'react';
import { Mention, MentionsInput } from 'react-mentions';
import { customAxios } from '../config/customAxios';
import API_URLS from '../config/apiUrls'
import { PostInput } from './PostInput';
import { UserState } from '../redux/slices/authSlice';

const mentionsInputStyle =
{
    control: {
        backgroundColor: '#fff',
        fontSize: 16,
        maxHeight: 70,
        overflow: 'hidden'
    },

    input: {
        overflow: 'auto',
        height: 70,
    },
    div: {
    },
    '&multiLine': {
        control: {
            fontFamily: 'monospace',
            minHeight: 60,
        },
        highlighter: {
            padding: 9,
            border: '1px solid transparent',
        },
        input: {
            padding: 9,
            border: '1px solid silver',
        },
    },

    '&singleLine': {
        display: 'inline-block',
        width: 180,

        highlighter: {
            padding: 1,
            border: '2px inset transparent',
        },
        input: {
            padding: 1,
            border: '2px inset',
        },
    },

    suggestions: {
        list: {
            backgroundColor: 'white',
            border: '1px solid rgba(0,0,0,0.15)',
            fontSize: 16,
        },
        item: {
            padding: '5px 15px',
            borderBottom: '1px solid rgba(0,0,0,0.15)',
            '&focused': {
                backgroundColor: '#cee4e5',
            },
        },
    },
}

const mentionStyle = {
    backgroundColor: "#cee4e5",
}


const MentionInput = ({ setPostInput, postInput }: { setPostInput: React.Dispatch<React.SetStateAction<PostInput>>, postInput: PostInput }) => {
    const [usersData, setUsersData] = useState([])
    const [localTextValue, setLocalTextValue] = useState("")

    useEffect(() => {
        customAxios.get(API_URLS.getAllUsers).then((data) => {
            let users = data.data.data
            users = users.map((user: UserState) => ({ id: user._id, display: user.name }))
            setUsersData(users)
            console.log(users, 'dwdwdwdd')
        })
    }, [])

    useEffect(() => {
        if (postInput.description === "") {
            setLocalTextValue("")
        }
    }, [postInput])


    const handleAddUserId = (e: string) => {
        if (!postInput.tagUserIds.includes(e)) {
            setPostInput({ ...postInput, tagUserIds: [...postInput.tagUserIds, e] })
        }
    }


    return (
        <div className={" w-full h-[70px] mention-input "}>
            <MentionsInput
                style={mentionsInputStyle}
                value={localTextValue}
                onChange={(e) => {
                    setLocalTextValue(e.target.value)
                    setPostInput({ ...postInput, description: e.target.value })
                }} >


                <Mention
                    style={mentionStyle}
                    data={usersData}
                    onAdd={handleAddUserId}
                    trigger={'@'} />
            </MentionsInput>
        </div >
    );
};

export default MentionInput;
