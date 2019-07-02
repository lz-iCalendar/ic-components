import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { Avatar } from 'antd';

class EventComments extends React.Component<any, any> {
  static propTypes = {
    /**
     * 评论数据
     * 默认：-
     */
    comments: PropTypes.array.isRequired,
  };

  static defaultProps = {};

  render() {
    const { comments } = this.props;
    return (
      <div className="ic-event-comments">
        <div className="ic-event-comments__action">
          <h2>评论</h2>
          <span>添加评论</span>
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
      </div>
    );
  }
}

export default EventComments;
