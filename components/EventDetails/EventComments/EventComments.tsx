import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { Avatar, Icon, Input, Button } from 'antd';
import './EventComments.less';
const noop = () => {};

class EventComments extends React.Component<any, any> {
  static propTypes = {
    /**
     * 评论数据
     * 默认：-
     */
    comments: PropTypes.array.isRequired,

    /**
     * 点击评论时的回调
     * 默认：-
     */
    onComment: PropTypes.func,
  };

  static defaultProps = {
    onComment: noop,
  };

  constructor(props) {
    super(props);
    this.state = {
      value: '',
    };
  }

  handleComment = () => {
    this.props.onComment(this.state.value, this.handleAflterComment);
  };

  handleAflterComment = isSuccess => {
    isSuccess && this.setState({ value: '' });
  };

  handleChange = e => {
    this.setState({ value: e.target.value });
  };

  render() {
    const { comments } = this.props;
    const { value } = this.state;
    return (
      <div className="ic-event-comments">
        <div className="ic-event-comments__action">
          <h2>评论</h2>
          <a href="#ic-event-comments__text-area">
            <Icon type="plus-circle" className="ic-event-details__images-action-btn" />
            添加评论
          </a>
        </div>
        <div className="ic-event-comments__content">
          {comments.map(commentsItem => (
            <div className="ic-event-comments__content-item" key={commentsItem.commentId}>
              <div className="ic-event-comments__userinfo">
                <Avatar src={commentsItem.userInfo.avatarUrl} alt="avatar" />
                <span className="ic-event-comments__userinfo-name">{commentsItem.userInfo.name}</span>
              </div>
              <div className="ic-event-comments__comment">{commentsItem.comment}</div>
            </div>
          ))}
        </div>
        <div className="ic-event-comments__input-wrapper" id="ic-event-comments__text-area">
          <Input.TextArea
            placeholder="请输入评论"
            className="ic-event-comments__input"
            value={value}
            onChange={this.handleChange}
          />
          <Button type="primary" onClick={this.handleComment} className="ic-event-comments__btn">
            评论
          </Button>
        </div>
      </div>
    );
  }
}

export default EventComments;
