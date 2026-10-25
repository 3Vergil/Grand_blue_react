
import { useEffect, useState } from 'react'
import styles from './CommentHistoryBlock.module.scss'
import profileApi from '@/shared/api/profile/index'

export default () => {
    const [comements, setComments] = useState(null)
    const getComments = async ()=>{
        const data = await profileApi.getAllCommentsHistory()
        console.log(data)
        setComments(data)
    }
    console.log(comements)
    useEffect(() =>{
        getComments()
    }, [])
    return(
        
<div className={styles.CommentsHistory}>
  <h1>Comment History</h1>

  <div className={styles.CommentsBlock}>
    {comements?.map((message, index) => (
      <div className={styles.CommentItem} key={index}>
        <span className={styles.Chapter}>
          Chapter {message.chapter_id}
        </span>

        <p className={styles.Message}>
          {message.message}
        </p>
      </div>
    ))}
  </div>
</div>

    )
}