import profileApi from  '@/shared/api/profile/Index';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router';
const useProfile = () => {
    const [userData, setUserData] = useState(null)
    const [isLoading, setIsLoading] = useState(true)

    const UpdateData = async ()=>{
        try{
            const data = await profileApi.getOne()
            console.log(data)
            if(!data ){
                throw new Error('problem with data')
            }
            setUserData(data)
            setIsLoading(false)
        }
        catch(err){
            console.error(err)
            setIsLoading(false)
        }
    }

    const fileInputRef = useRef(null)

    const handleDragOver = (event)=>{
        event.preventDefault()
    }

    const handleDrop = async (event)=>{
        event.preventDefault()
        try{
            setIsLoading(true)
            if(!event.dataTransfer.files || event.dataTransfer.files.length === 0){
            console.error("Файл не выбран");
            return;
            }
            fileInputRef.current.files = event.dataTransfer.files
            await profileApi.UploadAvatar(fileInputRef.current)
            await UpdateData()
        }
        catch(Err){
            console.log(Err)
        }
    }

    const profileRedirect = useNavigate()
    const QuitAccount = async ()=> {
        await profileApi.QuitAccount()
        setUserData(null)
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
                    const data = await profileApi.UpdateName(dataObject);
                    console.log(dataObject)
                    await UpdateData()
                   
                }
                catch(err){
                    console.error(err)
                }
            }
    
    const RemoveCharacter = async (charId) => {
        try{
            await profileApi.deleteCharacterFromDB(charId)
            await UpdateData()
        }
        catch(err){
            console.log(err)
        }
    }
    useEffect( () => {
        UpdateData()
    },[isLoading])

    return {userData, isLoading, fileInputRef, handleDragOver, handleDrop, QuitAccount, UpdateName ,RemoveCharacter}
}

export default useProfile