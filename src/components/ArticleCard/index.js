import React from 'react'
import { Link } from 'react-router-dom'
import Logo from './../../assets/logo.png'
import './index.scss'

const ArticleCard = ({ size, item, id, detailOnly, borderBottomClass = 'red' }) => {
  let cardClass = 'normal-card'
  if (size === 'big') cardClass = 'big-card'
  if (size === 'small') cardClass = 'small-card'

  const webTitle = _.get(item, 'webTitle', '')
  const blocks = _.get(item, 'blocks', {})
  const main = _.get(item, 'blocks.main', {})
  const elements = _.get(item, 'blocks.main.elements', [])
  const firstElements = _.get(item, 'blocks.main.elements[0]', {})
  const imageTypeData = _.get(item, 'blocks.main.elements[0].imageTypeData', [])
  const altText = imageTypeData ? imageTypeData.alt : ''
  const assets = _.get(item, 'blocks.main.elements[0].assets', [])
  const coverImage = _.get(item, 'blocks.main.elements[0].assets[0].file', '')
  const bodyTextSummary = _.get(item, 'blocks.body[0].bodyTextSummary', '')
  const webPublicationDate = _.get(item, 'webPublicationDate', '')
  const halfCard = detailOnly ? 'show-half-card' : 'hide-half-card'
  return (
    <div className={`article-card ${cardClass} ${halfCard} ${borderBottomClass}`}>
      <Link
        to={{
          pathname: `/article/${id}`,
          state: {
            item,
            id
          }
        }}
      >
        {
          coverImage ?
            (
              <img
                src={coverImage}
                width='auto'
                height='100%'
                alt={altText}
                title={altText}
                className="normal-cover"
              />
            ) : (
              <img src={Logo}
                width='100%'
              />
            )
        }

        <div className="detail">
          <div className="web-title">
            {webTitle}
            {/* {webPublicationDate} */}
          </div>
          {
            !detailOnly &&
            <div className="sub-title">{bodyTextSummary}</div>
          }
        </div>
      </Link>
    </div>
  )
}

export default ArticleCard