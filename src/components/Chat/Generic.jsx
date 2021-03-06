/**
 * 文本聊天窗口
 * 
 *
 * Authors:
 *  Richard <xiaowei.hsueh@gmail.com> (https://www.gistop.com)
 */

import React from 'react'
import CustomIcon from '../../components/CustomIcon'
import DetailContainer from '../../components/DetailContainer'

import MessageList from './MessageList'
import ChatInput from './ChatInput'

import './index.less'

export default class Component extends React.Component {
  constructor(props) {
    super(props)
    this.state = {}
    this.onSend = this.onSend.bind(this)
  }

  componentDidMount() {
    const { dispatch, contact } = this.props
    const { phone: currentConversation } = contact
    dispatch({
      type: 'wechat/readConversationMessage',
      payload: {
        currentConversation
      }
    }) 
  }

  onSend(content) {
    const { dispatch, info, contact } = this.props
    const { phone: to } = contact
    const { phone: from } = info
    const now = new Date()
    const timestamp = now.getTime()
    const action = {
      type: 'wechat/saveMessage',
      payload: {
        to,
        from,
        content,
        timestamp
      }
    }
    dispatch(action)
    window.sendMessage(JSON.stringify(action))
  }

  componentDidUpdate(prevProps) {
    if (this.listView) {
      if (prevProps.items !== this.props.items) {
        const { scrollProperties } = this.listView
        if (scrollProperties) {
          const { contentLength, visibleLength } = scrollProperties
          if (contentLength && visibleLength) {
            const offset = contentLength - visibleLength
            if (offset > 0) {
              this.listView.scrollTo(0, offset)
            }
          }
        }
      }
    }
  }

  componentWillUnmount() {
    const { dispatch } = this.props
    dispatch({
      type: 'wechat/save',
      payload: {
        currentConversation: ''
      }
    })
  }

  render() {
    const { props } = this
    const { info, contact, items, history } = props
    const { nick, phone } = contact
    return (<DetailContainer
      leftTitle={nick}
      rightContent={<div><CustomIcon size="lg" type="contact-fill" onClick={() => { history.push(`/contact/${phone}`) }}  /></div>}
    >
      <MessageList
        className="main chat-list"
        items={items}
        info={info}
        contact={contact}
        ref={listView => {
          if (listView) {
            this.listView = listView
          }
        }}
      />
      <ChatInput
        className="foot"
        onSend={this.onSend}
      />
    </DetailContainer>)
  }
}
