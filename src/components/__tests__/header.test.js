import React from 'react'
import { configure, mount } from 'enzyme'
import 'jsdom-global/register'
import _ from 'lodash'
import { MemoryRouter } from 'react-router'
import * as redux from 'react-redux'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Header from './../../components/Header'

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
    query: 'newest',
    orderBy: [
      { id: 'test1' },
      { id: 'test2' },
    ]
  }

  it('Header should render correctly and call dispatch when click search icon', () => {
    useSelectorMock.mockReturnValue(mockState)
    const mockCallBack = jest.fn();
    const wrapper = mount(
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    )
    expect(wrapper.exists()).toBe(true)
    wrapper.find('.search-icon').simulate('click')
    expect(useDispatchMock).toHaveBeenCalled()
  })
})