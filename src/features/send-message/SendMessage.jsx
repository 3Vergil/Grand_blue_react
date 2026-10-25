import {useContext, useState} from "react"
import { MangaContext } from '../../entities/grandsite'
import useMangaChat from "@/entities/grandsite/module/useMangaChat";

export default (props) => {
    const {chapterId} = props
    const {receivedMessages, sendMessage } = useMangaChat(chapterId)
    const [input, setInput] = useState('')
    const {userData} = useContext(MangaContext)
    return(
        <div >
            <input type="text" placeholder="Type your message..." value={input} onChange= {(event) =>{
                setInput(event.target.value)
            }}/>
            <button onClick={() => sendMessage(input, userData?.name, userData?.id)}>Send</button>
            <div>{receivedMessages.map((message, index)=>{
                return(<h1 key={index}>{message.nickname }:  {message.message}</h1>)
            })}</div>
            
        </div>
    )
}