import { useEffect, useState } from "react"
import wikiApi from "@/shared/api/wiki"




const useWiki = ({ dispatch, userData }) => {
    const [charactersData, setCharactersData] = useState(null)
    const [currentIndex, setCurrentIndex] = useState(0);
    const GetDataCharacters = async () => {
            const data = await wikiApi.getAllCharacters()
            setCharactersData(data)
    }

    const characterSlider =  (index) => {
        if (!charactersData?.length) return
        setCurrentIndex((index + charactersData.length) % charactersData.length)
    }
    const addToFavoriteCharacters = async () => {
        const id = currentIndex + 1
        const data = await wikiApi.addFavoriteCharacter(id)
        if(data){
            dispatch({type: 'ADD_FAVCHAR', id: id })
        }
    }
    useEffect(()=> {    
        GetDataCharacters()
    }, [])
    return{charactersData, characterSlider, currentIndex, addToFavoriteCharacters}
}

export default useWiki