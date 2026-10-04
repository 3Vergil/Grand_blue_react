import { useState, useEffect } from "react"
import io from 'socket.io-client'
import chatApi from "../../../shared/api/chat"
const socket = io.connect('http://localhost:3001')




const useMangaChat = (id) => {
    const [receivedMessages, setReceivedMessages] = useState([])
    const [message, setMessage] = useState({
        nickname: null,
        message: "",
        chapterId: null
    })
    const sendMessage = async (input, userName,userId) => {
        const newMessage = {
            userId: userId ?? null,
            nickname: userName ?? 'Anonim',
            message: input,
            chapterId: id
        }
        setMessage(newMessage)
        await chatApi.saveMessage(newMessage.userId, newMessage.message, newMessage.chapterId)
        socket.emit('send_message', newMessage.message,  id )
        setReceivedMessages(prev => [...prev, newMessage])
    }

    useEffect(() => {
        socket.emit('join_room',  id )
        chatApi.getAllMessage(id)
        .then(setReceivedMessages)
        .catch(error => console.error("Ошибка при загрузке:", error));

        const receiveMessage = (message) => {
            setReceivedMessages(prev => [...prev, message])
        }
        socket.on("receive_message", receiveMessage)
        
        return () => {
            socket.off("receive_message", receiveMessage);
            socket.emit('leave_room', id)
        };
    }, [id])

    return { receivedMessages, sendMessage, setMessage}
}

export default useMangaChat