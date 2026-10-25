import MangaImage from "@/shared/ui/Image/MangaImage"
import styles from "./FavoriteCharacterBlock.module.scss"
import { useContext } from "react"
import { MangaContext } from "../../index";
import Button from "@/shared/ui/Button/Button"

export default (props) => {
    const {characterId} = props
    const {charactersData, RemoveCharacter} = useContext(MangaContext)
    if(!charactersData){
        return(<><h1>Loading Data</h1></>)
    }

    return (
        <div className={`${styles.CharacterBody} `}>
            <MangaImage className = {styles} src = {charactersData[characterId]?.character_img}/>
            <h2 className="posab">{charactersData[characterId]?.surname} {charactersData[characterId]?.name}</h2>
            <div className= {`${styles.ButtonBody} posab`}>
                <Button onClick={() => RemoveCharacter(characterId+1)}>Delete</Button>
            </div>
        </div>
    )
}