import React, { useState, useRef, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { sortDateNewest, sortDateOldest } from './../../helper'
// redux
import { newSearchStart } from '../../redux/SearchResult/actions'

// redux
import { orderByNewest } from './../../redux/OrderBy/actions'

// components
import Loading from './../../components/Loading'
import ArticleCard from '../../components/ArticleCard'
import Title from './../../components/Title'

import './index.scss'

const mapState = (state) => {
  return {
    searchResult: state.searchResult.results,
    isSearchLoading: state.searchResult.isSearchLoading,
    hasMore: state.searchResult.hasMore,
    page: state.searchResult.page,
    query: state.searchResult.query,
    orderBy: state.orderBy.orderBy
  }
}

export default function Search() {
  const dispatch = useDispatch()
  const observer = useRef()
  const { searchResult, isSearchLoading, hasMore, page, query, orderBy } = useSelector(mapState);

  const lastBookElementRef = useCallback(node => {
    if (isSearchLoading) return
    if (observer.current) observer.current.disconnect()

    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && hasMore) {
        dispatch(newSearchStart({ query, page: page + 1, orderBy: orderBy }))
      }
    })
    if (node) observer.current.observe(node)
  }, [searchResult])

  const [sorted, setSort] = useState(searchResult)
  let ch = [...searchResult]

  useEffect(() => {
    dispatch(orderByNewest())
  }, [])


  useEffect(() => {
    if (orderBy === 'oldest') {
      setSort(sortDateOldest(ch))
    } else {
      setSort(sortDateNewest(ch))
    }
  }, [orderBy, searchResult])

  return (
    <div className="search-result-page">
      <Title titleText='Search Result' isShowViewBookmarkButton />
      <div className="search-result">
        {
          sorted.map((news, index) => {
            const { id } = news
            if (sorted.length === index + 1) {
              return (
                <span
                  key={index}
                  ref={lastBookElementRef}
                >
                  <ArticleCard item={news} id={id} />
                </span>
              )
            } else {
              return (
                <span key={index}>
                  <ArticleCard item={news} id={id} />
                </span>
              )
            }
          })}
      </div>

      <div className="search-page-loader">
        { isSearchLoading && <Loading />}
      </div>
    </div>
  )
}
