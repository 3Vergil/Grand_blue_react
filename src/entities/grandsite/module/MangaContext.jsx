import { createContext, useReducer } from "react"
import useManga from "./useManga"
import useAuth from "./useAuth"
import useProfile from "./useProfile"
import useWiki from "./useWiki"
import useMusic from "./useMusic"
export const MangaContext = createContext()

const userDataReducer = (state, action) => {
    switch(action.type){
        case "SET_ALL": {
            return action.userData.constructor === Object ? action.userData : state
        }
        case "UPDATE_AVATAR": {
            return {
                ...state,
                avatar_path: action.payLoad
            }
        }
        case "UPDATE_NAME": {
            return{
                ...state,
                name: action.payLoad
            }
        }
        case "DELETE_FAVCHAR": {
            return {
                ...state,
                favorite_characters: state.favorite_characters.filter((char) => {
                return char.id !== action.id
            })}
        }
        case "ADD_FAVCHAR": {
            return {
                ...state,
                favorite_characters: [...state.favorite_characters, action.id].sort((a,b) => a-b)
            }
        }
        case "CURRENT_READINGCHAR":{
            return {
                ...state,
                Page: action.PageNum,
                chapterId: action.chapId
            }
        }
        case "QUIT": {
            return {}
        }
        default:{
            return state
        }
    }
}

export const MangaProvider = (props) => {
    const [userData, dispatch] = useReducer(userDataReducer, null)
    const {children} = props
    const {
        mangaData
    } = useManga()
    const { 
    authSwitcher,
    LogInControl, 
    control, 
    handleClick,
    Sumbit,
    error,
    fieldsError
    } = useAuth({dispatch , userData})
    
    const { fileInputRef, handleDragOver, handleDrop, QuitAccount, UpdateName,RemoveCharacter } = useProfile({dispatch , userData})

    const {charactersData,characterSlider, currentIndex, addToFavoriteCharacters} = useWiki()
    const {musicData, MusicSlider, currentMusicIndex, isPlaying, toggleAudio,videoAudioRef, Replay} = useMusic()
    return(
        <MangaContext.Provider
        value={
           { mangaData, 
            LogInControl, 
            control, 
            handleClick,
            Sumbit,
            authSwitcher,
            userData,
            fileInputRef, 
            handleDragOver, 
            handleDrop,
            QuitAccount,
            UpdateName ,
            charactersData,
            characterSlider,
            currentIndex,
            addToFavoriteCharacters,
            RemoveCharacter,
            musicData, 
            MusicSlider, 
            currentMusicIndex,
            isPlaying, 
            toggleAudio,
            videoAudioRef,
            Replay,
            dispatch,
            error,
            fieldsError
           }
        }>
            {children}
        </MangaContext.Provider>
    )
}
