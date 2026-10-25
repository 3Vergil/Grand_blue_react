import { useContext} from "react"
import { MangaContext } from "@/entities/grandsite"
import { ProfileBlock } from "@/entities/grandsite"
import styles from './Profile.module.scss'
import FavoriteCharacterBlock from "@/entities/grandsite/ui/FavoriteCharacterBlock"
import CurrentReadBlock from "../../entities/grandsite/ui/CurrentReadBlock"

export default () =>{
    const {userData} = useContext(MangaContext)
        return(
        <main className= {styles.main}>
        <article className={styles.content}>
            <ProfileBlock />
            <CurrentReadBlock />
            <div className= {`${styles.FavoriteCharacters} posrel`}
            onWheel={(e) => {
                e.currentTarget.scrollLeft += e.deltaY
            }}>
                 <h1>Favorite Characters</h1>
                 <div className={`${styles.FavCharContainer} posrel`}>
                {userData?.favorite_characters?.map((characterId )=> {
                    return <FavoriteCharacterBlock key = {characterId} characterId = {characterId -1}/>
                })}
                </div>
            </div>
        </article>
        </main>
    )
    
}