import { useState } from "react";
import chapterApi from "@/shared/api/chapter"

const useReading = (id, {dispatch, userData}) => {
    const [activePage, setActivePage] = useState(1);
    const PageVisibiltyChange = async (pageNum) => {
          if(pageNum === activePage) return;
          setActivePage(pageNum)
          dispatch({type: "CURRENT_READINGCHAR", PageNum: pageNum, chapId: id})
          await chapterApi.CurrentReadingChapter(pageNum, id)
       }
    return { activePage, PageVisibiltyChange}
}

export default useReading