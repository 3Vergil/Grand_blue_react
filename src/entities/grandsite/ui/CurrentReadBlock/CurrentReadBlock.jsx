import { MangaContext } from "../../index";
import { useContext } from "react"
import MangaImage from "@/shared/ui/Image"
import ButtonLink from "@/shared/ui/ButtonLink"
import styles from './CurrentReadBlock.module.scss'
export default () => {
    const {userData} = useContext(MangaContext)

    return(
        <div className = {styles.CurrentRead}>
            <MangaImage className = {styles} src ={`http://127.0.0.1:2014/${userData?.Volume}`} />
            <div>
                <h1>Continue to read chapter {userData?.chapterId} <br />
                    From Page {userData?.Page}
                </h1>
                <ButtonLink link = {`/chapter/${userData?.chapterId}`} width = {200}>chapter {userData?.chapterId}</ButtonLink>
            </div>
        </div>
    )
}