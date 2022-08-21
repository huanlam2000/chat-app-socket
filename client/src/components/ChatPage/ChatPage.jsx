import React, { useState } from 'react'
import { useRef } from 'react'
import { useEffect } from 'react'

import ChatBar from './ChatBar'
import ChatBody from './ChatBody'
import ChatFooter from './ChatFooter'

export default function ChatPage({ socket }) {
    const [messages, setMessage] = useState([])
    const [typingStatus, setTypingStatus] = useState('')
    const lastMessageRef = useRef(null)

    useEffect(() => {
        socket.on('messageResponse', (data) => setMessage([...messages, data]))
    }, [socket, messages])

    useEffect(() => {
        lastMessageRef.current?.scrollIntoView({ behavior: "smooth" })
    }, [messages])

    useEffect(() => {
        socket.on('typingResponse', (data) => setTypingStatus(data))
    })

    return (
        <div className="chat">
            <ChatBar socket={socket} />
            <div className="chat__main">
                <ChatBody messages={messages} lastMessageRef={lastMessageRef} typingStatus={typingStatus} />
                <ChatFooter socket={socket} />
            </div>
        </div>
    )
}
