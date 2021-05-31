import React from 'react'
import { configure, shallow } from 'enzyme'
import 'jsdom-global/register'
import _ from 'lodash'
import * as redux from 'react-redux'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import ArticleCard from './../../components/ArticleCard'

configure({ adapter: new Adapter() })

describe('ArticleCard', () => {
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

  const mockItem = {
    webTitle: 'test',
    blocks: {
      main: {},
      body: [],
    },
    webPublicationDate: 'date'
  }

  it('Big ArticleCard should render correctly', () => {
    const wrapper = shallow(
      <ArticleCard size='big' item={mockItem} id='test' />
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.article-card').length).toBe(1)
    expect(wrapper.find('.big-card').length).toBe(1)
  })

  it('Normal ArticleCard should render correctly', () => {
    const wrapper = shallow(
      <ArticleCard item={mockItem} id='test' />
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.article-card').length).toBe(1)
    expect(wrapper.find('.normal-card').length).toBe(1)
  })

  it('Small ArticleCard should render correctly', () => {
    const wrapper = shallow(
      <ArticleCard size='small' item={mockItem} id='test' />
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.article-card').length).toBe(1)
    expect(wrapper.find('.small-card').length).toBe(1)
  })
})