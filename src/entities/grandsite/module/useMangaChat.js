import { useState, useEffect } from "react"
import io from 'socket.io-client'
const socket = io.connect('http://localhost:3001')




const useMangaChat = (id) => {
    const [receivedMessages, setReceivedMessages] = useState([])
    const [message, setMessage] = useState([])
    const sendMessage = () => {
        socket.emit('send_message', message,  id )
        setReceivedMessages(prev => [...prev, message])
    }

    useEffect(() => {
        socket.emit('join_room',  id )

        const receiveMessage = (message) => {
            setReceivedMessages(prev => [...prev, message])
        }
        socket.on("receive_message", receiveMessage)

        return () => {
            socket.off("receive_message", receiveMessage);
        };
    }, [id])

    return { receivedMessages, sendMessage, setMessage}
}

export default useMangaChat