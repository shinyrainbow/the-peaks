import React from 'react'
import { configure, shallow, mount } from 'enzyme'
import 'jsdom-global/register'
import Adapter from '@wojtekmaj/enzyme-adapter-react-17'
import Title from './../../components/Title'
import BookmarkButton from '../BookmarkButton'

configure({ adapter: new Adapter() })

describe('Title', () => {
  it('Title should render correctly', () => {
    const wrapper = shallow(
      <Title titleText='test' isShowViewBookmarkButton />
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.find('.title-bar').length).toBe(1)
    expect(wrapper.contains(<BookmarkButton />)).toBe(true)
  })

  it('Title should render correctly', () => {
    const wrapper = shallow(
      <Title titleText='test' isShowViewBookmarkButton={false} />
    )
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.contains(<BookmarkButton />)).toBe(false)
  })
})