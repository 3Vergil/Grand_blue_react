import io from 'socket.io-client'
import {useContext, useEffect, useState} from "react"
import { MangaContext } from '../../entities/grandsite'

export default (props) => {
    const {receivedMessage, sendMessage, setMessage} = props
    const {userData} = useContext(MangaContext)
    const userName = userData?.name ?? "Anonim"
    return(
        <div>
            <input type="text" placeholder="Type your message..." onChange= {(event) =>{
                setMessage(`${userName}: ${event.target.value}`)
            }}/>
            <button onClick={sendMessage}>Send</button>
            <div>{receivedMessage.map((message, index)=>{
                return(<h1 key={index}>{message}</h1>)
            })}</div>
            
        </div>
    )
}