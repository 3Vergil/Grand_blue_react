const URL = 'http://127.0.0.1:2014/chat'
const header = {
    'Content-Type': 'application/json'
}


const chatApi = {
    saveMessage: async ( userId,message, chapterId) => {
        try{
            const responce = await fetch(`${URL}/postMessage`, {
                method: "POST",
                headers: header,
                body: JSON.stringify({userId: userId, message: message, chapterId: chapterId}),
                credentials: 'include'
            })
            if(!responce.ok){
                throw new Error('Server Error')
            }
            return await responce.json()
        }
        catch(err){
            return err
        }
    },
    getAllMessage: async (chapterId) => {
        try{
            const responce = await fetch(`${URL}/getAllMessage/${chapterId}`, {credentials: "include"})
            if(!responce.ok){
                throw new Error('Server Error')
            }
            return await responce.json()
        }
        catch(err){
            return err
        }
    }
}

export default chatApi