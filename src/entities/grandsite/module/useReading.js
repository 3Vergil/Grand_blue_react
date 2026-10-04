import { useCallback, useMemo, useRef, useState } from "react";
import chapterApi from "@/shared/api/chapter"


const useReading = (id, {dispatch, userData}) => {
    const [activePage, setActivePage] = useState(1);
    let timer = useRef(null)
    const debounce = (func, delay) => {
      return (...args) => {
         clearTimeout(timer.current)
      
         timer.current = setTimeout(()=> {
             console.log("TIMER сработал, page:", args[0]);
            func(...args)

         }, delay)
      }
    }
    const PageVisibiltyChange = useCallback( async (pageNum) => {
          if(pageNum === activePage) return;
          setActivePage(pageNum)
          if(userData?.id){
            dispatch({type: "CURRENT_READINGCHAR", PageNum: pageNum, chapId: id})
             await chapterApi.CurrentReadingChapter(pageNum, id)
          }
       }, [activePage, id, dispatch, userData])
   const debouncedPageChange = useCallback((pageNum) => {
      
      debounce(() => {PageVisibiltyChange(pageNum)}, 1500)(pageNum)}
      , [PageVisibiltyChange])
    return { activePage, debouncedPageChange}
}

export default useReading