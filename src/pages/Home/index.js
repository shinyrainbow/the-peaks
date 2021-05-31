import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'

// redux
import { fetchNewsStart } from './../../redux/News/actions'
import { orderByNewest } from './../../redux/OrderBy/actions'

// components
import Loading from '../../components/Loading'
import Title from '../../components/Title'
import ArticleCard from '../../components/ArticleCard'

import './index.scss'

export const mapState = (state) => ({
  orderBy: state.orderBy.orderBy,
  bookmarks: state.bookmarks.bookmarks,
  data: state.news.data,
  isDataLoading: state.news.isNewsLoading,
})

const Home = props => {
  const dispatch = useDispatch()
  const { orderBy, data, isDataLoading } = useSelector(mapState)

  useEffect(() => {
    dispatch(orderByNewest())
  }, [])

  useEffect(() => {
    dispatch(fetchNewsStart(orderBy))
  }, [orderBy])

  const news = _.get(data, 'news', [])
  const mainNews = _.get(data, 'news[0]', {})
  const subNews = news.length >= 5 ? news.slice(1, 5) : []
  const normalNews = news.length > 5 ? news.slice(5) : []
  const mainNewsId = _.get(data, 'news[0].id', {})
  const culture = _.get(data, 'culture', [])
  const sport = _.get(data, 'sport', [])
  const lifeandstyle = _.get(data, 'lifeandstyle', [])
  return (
    <div className="home-page">
      <Title titleText='Top Stories' isShowViewBookmarkButton />
      {
        isDataLoading ? (<Loading />) : (
          <>
            <div className="top-stories">
              <div className="main">
                <ArticleCard size='big' item={mainNews} id={mainNewsId} />
              </div>
              <div className="sub">
                {
                  subNews.map((card, index) => {
                    const { id } = card
                    const detailOnly = index === 2 || index === 3
                    let borderBottomClass = 'red'
                    if (index === 1) {
                      borderBottomClass = 'yellow'
                    } else if (index === 2) {
                      borderBottomClass = 'blue'
                    } else if (index === 3) {
                      borderBottomClass = 'green'
                    }
                    return (
                      <ArticleCard
                        key={id}
                        size='small'
                        item={card}
                        id={id}
                        detailOnly={detailOnly}
                        borderBottomClass={borderBottomClass}
                      />
                    )
                  })
                }
              </div>
            </div>
            <NewsBySection newsList={culture} newsList={normalNews} />
            <NewsBySection section='Culture' newsList={culture} />
            <NewsBySection section='Sport' newsList={sport} />
            <NewsBySection section='Life and Style' newsList={lifeandstyle} />
          </>
        )
      }
    </div>
  )
}


const NewsBySection = ({ section, newsList }) => {
  return (
    <div className="news-by-section">
      {section && <div className="news-section">{section}</div>}
      <div className="section">
        <div className="section-card">
          {
            newsList.map((card) => {
              const { id } = card
              return (
                <ArticleCard key={id} item={card} id={id} />
              )
            })
          }
        </div>
      </div>
    </div>
  )
}

export default Home