import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import { sortDateNewest, sortDateOldest } from './../../helper'

// redux
import { orderByNewest } from './../../redux/OrderBy/actions'

// components
import ArticleCard from './../../components/ArticleCard'
import Title from './../../components/Title'

import './index.scss'

const mapState = (state) => ({
  bookmarks: state.bookmarks.bookmarks,
  orderBy: state.orderBy.orderBy
})

const Bookmarks = () => {
  const dispatch = useDispatch()
  const { bookmarks, orderBy } = useSelector(mapState)
  let ch = [...bookmarks]
  const [sorted, setSort] = useState(ch)

  useEffect(() => {
    dispatch(orderByNewest())
  }, [])

  useEffect(() => {
    if (orderBy === 'oldest') {
      setSort(sortDateOldest(ch))
    } else {
      setSort(sortDateNewest(ch))
    }
  }, [orderBy])

  return (
    <div className="bookmark-page">
      <Title
        titleText='All Bookmarks'
        isShowViewBookmarkButton={false}
      />
      <div className="bookmark-result">
        {
          sorted.map((result, index) => {
            const { id } = result
            return (
              <ArticleCard key={index} item={result} id={id} />
            )
          })
        }
      </div>
    </div>
  )
}

export default Bookmarks
