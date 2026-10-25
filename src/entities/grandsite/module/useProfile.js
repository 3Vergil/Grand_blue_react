import profileApi from  '@/shared/api/profile/Index';
import { useEffect, useReducer, useRef, useState } from 'react';
import { useNavigate } from 'react-router';



const useProfile = ({ dispatch, userData }) => {
    const UpdateData = async ()=>{
        try{
            const data = await profileApi.getOne()
            if(!data ){
                throw new Error('problem with data')
            }
            dispatch({type: "SET_ALL", userData: data})
        }
        catch(err){
            console.error(err)
        }
}
    useEffect( () => {
        UpdateData()
    },[])

    const fileInputRef = useRef(null)
    const handleDragOver = (event)=>{
        event.preventDefault()
    }
    const handleDrop = async (event)=>{
        event.preventDefault()
        try{
            if(!event.dataTransfer.files || event.dataTransfer.files.length === 0){
            console.error("Файл не выбран");
            return;
            }
            fileInputRef.current.files = event.dataTransfer.files
            const data = await profileApi.UploadAvatar(fileInputRef.current)
            dispatch({type: 'UPDATE_AVATAR', payLoad: data.avatar_path})
            UpdateData()
        }
        catch(Err){
            console.log(Err)
        }
    }

    const profileRedirect = useNavigate()
    const QuitAccount = async ()=> {
        dispatch({type: "QUIT"})
        await profileApi.QuitAccount()
        profileRedirect('/Auth', {replace: true})
    }
    const UpdateName = async (event) =>{
                event.preventDefault()
                try{
                    const formData = new FormData(event.target)
                    const dataObject = Object.fromEntries(formData)
                    if(!dataObject.NewName){
                        throw new Error('Fill all blank')
                    }
                    console.log(dataObject)
                    dispatch({type: "UPDATE_NAME", payLoad:  dataObject.NewName})
                    await profileApi.UpdateName(dataObject);
                   
                }
                catch(err){
                    console.error(err)
                }
            }
    
    const RemoveCharacter = async (charId) => {
        try{
            const data = await profileApi.deleteCharacterFromDB(charId)
            if(data){
                dispatch({type: "DELETE_FAVCHAR", id: charId})
            }
        }
        catch(err){
            console.log(err)
        }
    }

    return { fileInputRef, handleDragOver, handleDrop, QuitAccount, UpdateName ,RemoveCharacter}
}

export default useProfile