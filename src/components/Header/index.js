import React, { useEffect, useState, useCallback, useRef, useReducer } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { Link, useHistory, useLocation } from 'react-router-dom'
import _ from 'lodash'
import useComponentVisible from './../../hooks/useComponentVisible'

// redux 
import { newSearchStart, clearSearchResult } from './../../redux/SearchResult/actions'

// components
import Logo from './../../assets/logo.png'
import Search from './../../assets/search.svg'
import './index.scss'

const mapState = (state) => {
  return {
    query: state.searchResult.query,
    orderBy: state.orderBy.orderBy
  }
}
export const useMountEffect = (fun) => useEffect(fun, []);

const Header = props => {
  const history = useHistory()


  const { query, orderBy } = useSelector(mapState);

  const [input, setInput] = useState('')
  const {
    ref,
    hasInputValue,
    setHasInputValue,
    isComponentVisible,
    setIsComponentVisible
  } = useComponentVisible(input ? true : false, input ? true : false);

  const dispatch = useDispatch()
  const { pathname } = location
  useEffect(() => {

    if (pathname !== '/search') {
      setHasInputValue(false)
      setIsComponentVisible(false)
      setInput('')
      dispatch(clearSearchResult())
    }
  }, [pathname])

  const expandSearch = () => {
    if (!input) {
      setIsComponentVisible(!isComponentVisible)
    }
  }

  useEffect(() => {
    if (isComponentVisible) {
      const inputElement = document.getElementById("search-input")
      if (inputElement) {
        setTimeout(() => inputElement.focus(), 300)
      }
    }
  }, [isComponentVisible])

  const search = (input) => {
    dispatch(clearSearchResult())
    if (input) {
      const payload = { query: input, page: 1, orderBy: orderBy }
      dispatch(newSearchStart(payload))
      history.push({ pathname: '/search', })
    }
  }

  const debounceLoadData = useCallback(_.debounce(search, 1000), [])  // [] ??

  useEffect(() => {
    if (!input) {
      setHasInputValue(false)
      dispatch(clearSearchResult())
      debounceLoadData(input)
    }
    if (input) {
      setHasInputValue(true)
      debounceLoadData(input)
    }
  }, [input])

  return (
    <header className="header">
      <div className="wrap">
        <div className="logo">
          <Link to='/'><img src={Logo} /></Link>
        </div>
        <div
          className={`search ${isComponentVisible ? 'show-bg' : 'hide-bg'}`}
          ref={ref}
        >
          {
            isComponentVisible &&
            <input
              placeholder='Search all news'
              // ref={happy}
              id="search-input"
              value={input}
              autoFocus={true}
              className={isComponentVisible ? 'show-input' : 'hide-input'}
              onInput={e => setInput(e.target.value)}
            />
          }
          <img src={Search} className="search-icon" onClick={expandSearch} height='17.5px' />
        </div>
      </div>
    </header>
  )
}

export default Header