import React, { useCallback, useEffect, useState, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

// redux
import { orderByNewest, orderByOldest } from './../../redux/OrderBy/actions'

// components
import useComponentVisible from './../../hooks/useComponentVisible'

import './index.scss'

const LIST = {
  NEW: 'Newest first',
  OLD: 'Oldest first'
}

const dropdownList = [LIST.NEW, LIST.OLD]

const mapState = (state) => ({
  orderBy: state.orderBy.orderBy
})

const Sort = ({ handleClick }) => {
  const dispatch = useDispatch()
  const [selected, setSelect] = useState(LIST.NEW)
  const [orderBy, setOrderBy] = useState('newest')
  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);

  const select = (item) => {
    setSelect(item)
    setIsComponentVisible(false)
    if (item === LIST.NEW) {
      setOrderBy('newest')
      dispatch(orderByNewest())
    } else {
      setOrderBy('oldest')
      dispatch(orderByOldest())
    }
  }
  return (
    <div
      className="dropdown-wrapper"
      ref={ref}
    >
      <div className='selected-section'
        onClick={() => setIsComponentVisible(!isComponentVisible)}
      >
        {selected}
        <span className="arrow-icon">{isComponentVisible ? '▲' : '▼'}</span>
      </div>
      {
        isComponentVisible &&
        (
          <div className='list-section'>
            {
              dropdownList.map((item, index) => (
                <div
                  key={index}
                  className='item'
                  onClick={() => select(item)}
                >
                  <div className='item-text'>{item}</div>
                </div>
              ))
            }
          </div>
        )
      }
    </div>
  )
}

export default Sort
