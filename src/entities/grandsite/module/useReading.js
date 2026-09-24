import { useCallback, useState } from "react";
import chapterApi from "@/shared/api/chapter"

const useReading = (id, {dispatch, userData}) => {
    const [activePage, setActivePage] = useState(1);
    const PageVisibiltyChange = useCallback( async (pageNum) => {
          if(pageNum === activePage) return;
          setActivePage(pageNum)
          if(userData?.id){
            dispatch({type: "CURRENT_READINGCHAR", PageNum: pageNum, chapId: id})
             await chapterApi.CurrentReadingChapter(pageNum, id)
          }
       }, [])
    return { activePage, PageVisibiltyChange}
}

export default useReading