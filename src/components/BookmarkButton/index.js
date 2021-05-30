import React from 'react'
import BookmarkOff from './../../assets/bookmark-off.svg'
import BookmarkOn from './../../assets/bookmark-on.svg'
import './index.scss'

const BookmarkButton = ({ text = 'VIRW BOOKMARK', ...props }) => {
  return (
    <button className="bookmark-button" {...props}>
      <img src={BookmarkOn} />
      {text}
    </button>
  )
}

export default BookmarkButton