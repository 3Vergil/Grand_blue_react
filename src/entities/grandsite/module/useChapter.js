import { useContext, useEffect, useRef} from "react"
import { data, Link, useParams } from "react-router"
import { MangaContext } from "@/entities/grandsite"
import * as pdfjsLib from "pdfjs-dist";
import { useState } from "react"
import chapterApi from "@/shared/api/chapter"

pdfjsLib.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.mjs',
  import.meta.url
).href;

const useChapter = (id, {userData})=> {
       const [chapterPath, setChapterPath] = useState(null)
       const [loading, setLoading] = useState(true)
       const [pdfDoc, setPdfDoc] = useState(null);
       const [totalPages, setTotalPages] = useState([]);
       useEffect(()=> {
          if(!id || id === 'undefined') return;
          chapterApi.getChapterById(id).then((data) =>{
             setChapterPath(data)
             setLoading(false)
          }).catch((error) => {
             console.log(error)
             setLoading(false)
          })
       }, [id])
       useEffect(() => {
       if (!chapterPath || !chapterPath.path) return;
    
       const RenderAllPages = async () => {
          try {
             const fileTargetUrl = `http://127.0.0.1:2014/${chapterPath.path}`;
             const loader = pdfjsLib.getDocument({
                url: fileTargetUrl,
               withCredentials:'include'
             });
             const doc = await loader.promise; 
             setPdfDoc(doc);
    
             const pagesArray = Array.from({ length: doc.numPages }, (_, i) => i + 1);
             setTotalPages(pagesArray);
             setLoading(false);
             if(id === userData?.chapterId){
                setTimeout(() => {
                   const targetPage = document.getElementById(`mangaPage${userData?.Page}`)
                   if(targetPage){
                    
                      targetPage.scrollIntoView({
                         behavior: 'smooth',
                         block: 'start'
                      })
                   }
                },100)
             }
          } catch (err) {
             console.error( err);
             setLoading(false);
          }
       };
       RenderAllPages();
    }, [chapterPath]);
    
    return{chapterPath, pdfDoc, totalPages,loading}
}

export default useChapter