



import React from 'react'
import {Link} from 'react-router-dom'
import BookmarkButton from '../BookmarkButton'
import Sort from '../Sort'
import './index.scss'

const Title = ({ titleText, 
  isShowViewBookmarkButton
  //  path 
  }) => {
  return (
    <div className="title-bar">
      <div className="title-bar-text">{titleText}</div>

      <div className="custom">

        {
          isShowViewBookmarkButton &&
          <Link to='/bookmarks'>
            <BookmarkButton />
          </Link>
        }
        <div><Sort /></div>
      </div>
    </div>
  )
}

export default Title