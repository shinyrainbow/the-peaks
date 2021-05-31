import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory, useLocation, useParams } from 'react-router-dom'
import _ from 'lodash'

// redux
import { addBookmark, removeBookmark } from './../../redux/Bookmarks/actions'
import { fetchArticleStart } from './../../redux/News/actions'

// components
import BookmarkButton from './../../components/BookmarkButton'
import Loading from './../../components/Loading'
import BookmarkOn from './../../assets/bookmark-on.svg'
import BookmarkOff from './../../assets/bookmark-off.svg'

import './index.scss'

const mapState = (state) => ({
  bookmarks: state.bookmarks.bookmarks,
  articleData: state.news.article,
  isArticleLoading: state.news.isArticleLoading,
  fetchArticleFail: state.news.fetchArticleFail,
})

const BOOKMARK = {
  ON: 'ADD BOOKMARK',
  OFF: 'REMOVE BOOKMARK'
}

const Article = (props) => {
  const dispatch = useDispatch()
  const location = useLocation()
  const history = useHistory()
  const { bookmarks, articleData, isArticleLoading, fetchArticleFail } = useSelector(mapState)
  const { pathname } = location
  const [showNoti, setShow] = useState(false)
  const [canAddToBookmark, setCanAddToBookmark] = useState()

  useEffect(() => {
    dispatch(fetchArticleStart(pathname.slice(9)))
  }, [])

  useEffect(() => {
    const isAlreadyBookmarked = bookmarks.filter(item => item.id === articleData.id).length > 0
    setCanAddToBookmark(!isAlreadyBookmarked)
  }, [articleData])

  useEffect(() => {
    const isAlreadyBookmarked = bookmarks.filter(item => item.id === articleData.id).length > 0
    if (isAlreadyBookmarked) {
      setCanAddToBookmark(false)
    } else {
      setCanAddToBookmark(true)
    }
  }, [bookmarks])

  const blocks = _.get(articleData, 'blocks', {})
  const webPublicationDate = _.get(articleData, 'webPublicationDate', '')
  const headline = _.get(articleData, 'headline', '')
  const webTitle = _.get(articleData, 'webTitle', '')
  const createdDate = _.get(blocks, 'main.createdDate', '')
  const body = _.get(blocks, 'body', [])
  const bodyTextSummary = _.get(blocks, 'body[0].bodyTextSummary', '')
  const main = _.get(blocks, 'main', {})

  useEffect(() => {
    if (fetchArticleFail) {
      history.push('/404')
    }
  }, [fetchArticleFail])

  const handleAddBookmark = (payload) => {
    if (canAddToBookmark) {
      dispatch(addBookmark(payload))
    } else {
      dispatch(removeBookmark(payload))
    }
    setTimeout(() => {
      setShow(true)
    }, 500)

    setTimeout(() => {
      setShow(false)
    }, 3000)
  }

  const bookmarkText = canAddToBookmark ? BOOKMARK.ON : BOOKMARK.OFF
  const bookmarkNotiClass = canAddToBookmark ? 'added' : 'removed'
  const bookmarkNotiText = canAddToBookmark ? 'REMOVE FROM BOOKMARKS' : 'SAVED TO BOOKMARK'
  const bookmarkIcon = canAddToBookmark ? BookmarkOff : BookmarkOn
  return (
    isArticleLoading ? (
      <Loading />
    ) : (
      <div className="article-page">
        <div className="article">
          <div className='article-header'>
            <div className="header-content">
              <div className="add-bookmark">
                <BookmarkButton
                  text={bookmarkText}
                  onClick={() => handleAddBookmark(articleData)}
                />
              </div>
              <div className="date">{webPublicationDate}</div>
              <div className="title">{webTitle}</div>
              <div className="headline">{headline}</div>
            </div>
            <div className="header-transparent"></div>
          </div>
          <div className="article-wrap">
            <div>
              <div className="reserved-image">
                <div className="image">
                  <div dangerouslySetInnerHTML={{ __html: main.bodyHtml }} />
                </div>
              </div>
              <div className="content">
                {
                  body.map((text, index) => {
                    return (
                      <div key={text.id} dangerouslySetInnerHTML={{ __html: text.bodyHtml }} />
                    )
                  })
                }
              </div>
            </div>
            <div className="image-wrap">
              <div className="image">
                <div dangerouslySetInnerHTML={{ __html: main.bodyHtml }} />
              </div>
            </div>
            {
              showNoti &&
              <div className={`bookmark-notification ${bookmarkNotiClass}`} >
                <span>
                  <img src={bookmarkIcon} />
                  {bookmarkNotiText}
                </span>
              </div>
            }
          </div>
        </div>
      </div>
    )
  )
}

export default Article