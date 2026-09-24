import { memo, useContext} from "react"
import {  Link, useParams } from "react-router"
import useChapter from "../../entities/grandsite/module/useChapter"
import useReading from "../../entities/grandsite/module/useReading"
import PdfLoader from "../../features/pdf-loader";
import styles from './ChapterBlock.module.scss'
import { MangaContext } from "../../entities/grandsite";
import SendMessage from "../../features/send-message";

const ChapterBlock = ()=> {
   let {id} = useParams()
   const {dispatch, userData} = useContext(MangaContext)
   const {chapterPath, pdfDoc, totalPages, loading} = useChapter(id, {userData})
   const {activePage, PageVisibiltyChange} = useReading(id, {dispatch, userData})
   console.log("CHAPTER RENDER");
   if(loading){
      return (<div>Loading chapter content...</div>)
   }
   return(
      <>
        <div className={`${styles.container} posrel mt`}>
            <h1>Now you Reading chapter{id}</h1>
            {id == 1 ? '' : 
            <Link to={`/chapter/${Number(id) -1 }`}>
            <button className= {`${styles.NavArrow} posab ${styles.left}`}>
                &#10094;
            </button>
            </Link>
            }
            <div className= {styles.Chapter}>
               {totalPages.map((pageNumber) => {
                  return(
                     <PdfLoader 
                     key={pageNumber}
                     pdfDoc = {pdfDoc}
                     pageNum = {pageNumber}
                     onVisible = {PageVisibiltyChange}
                  />
                  )
               })}
            </div>
           
            <Link to={`/chapter/${Number(id) +1 }`}>
            <button className={`${styles.NavArrow} posab ${styles.right}`}>
                &#10095;
            </button>  
            </Link>
                
         </div>
         <div>
            <SendMessage 
               chapterId = {id}
            />
         </div>
            </>
      )
}

export default memo(ChapterBlock)