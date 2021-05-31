import 'jsdom-global/register'
import { configure, mount } from 'enzyme'
import React from 'react'
import _ from 'lodash'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Bookmarks from '../Bookmarks'
import * as redux from 'react-redux';
import { MemoryRouter } from 'react-router'

configure({ adapter: new Adapter() })

describe('Bookmarks', () => {
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
    ]
  }

  it('Bookmarks should render correctly and dispatch orderBy action', () => {
    useSelectorMock.mockReturnValue(mockState)
    const wrapper = mount(
      <MemoryRouter>
        <Bookmarks />
      </MemoryRouter>
    )
    expect(wrapper.exists()).toBe(true)
    expect(useDispatchMock).toHaveBeenCalled()
  })
})