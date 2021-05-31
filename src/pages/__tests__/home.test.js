import React from 'react'
import { configure, mount } from 'enzyme'
import 'jsdom-global/register'
import _ from 'lodash'
import { MemoryRouter } from 'react-router'
import * as redux from 'react-redux'

import Home from './../../pages/Home'
import Loading from './../../components/Loading'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
// https://medium.com/@szpytfire/react-redux-testing-mocking-useselector-and-usedispatch-e004c3f2b2e0

configure({ adapter: new Adapter() })

describe('Home', () => {
  let useSelectorMock = jest.spyOn(redux, 'useSelector')
  let useDispatchMock = jest.spyOn(redux, 'useDispatch')

  const dummyDispatch = jest.fn()
  beforeEach(() => {
    useDispatchMock.mockReturnValue(dummyDispatch)
  })

  afterEach(() => {
    useSelectorMock.mockClear()
    useDispatchMock.mockClear()
  })

  const mockState = {
    orderBy: 'newest',
    bookmarks: [
      { id: 'test1' },
      { id: 'test2' },
    ],
    data: {
      news: [],
      sport: [],
      culture: [],
      lifeandstyle: [],
    },
    isDataLoading: false
  }

  const mockStateLoading = {
    isDataLoading: true
  }

  it('Home should render correctly and show loader when loading data', () => {
    useSelectorMock.mockReturnValue(mockStateLoading)
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.contains(<Loading />)).toBe(true)
    expect(wrapper.find('.top-stories').length).toBe(0)
  })

  it('Bookmarks should render correctly when news data are loaded', () => {
    useSelectorMock.mockReturnValue(mockState)
    const wrapper = mount(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.contains(<Loading />)).toBe(false)
    expect(wrapper.find('.top-stories').length).toBe(1)
  })
})