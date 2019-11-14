import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import moment from 'moment';
// import Avatar from '../../Avatar';
import {Avatar} from 'antd';
import '../../style/reset.less';

/**
 * 事件详情组件
 */
export default class EventDetails extends React.PureComponent<any, any> {
  static propTypes = {
    /**
     * 事件数据
     * 默认：-
     */
    eventData: PropTypes.object,

    /**
     * 事件详情被点击的回调
     * 默认：noop
     */
    onEventDetailsClick: PropTypes.func,
  };

  static defaultProps = {};

  handleClick = () => {
    this.props.onEventDetailsClick(this.props.eventData);
  };

  render() {
    const { eventData } = this.props;
    let {
      event_title: title,
      occur_begin: startTime,
      occur_end: endTime,
      event_short: position,
      event_hostheadurl: avatarUrl,
      event_desc: desc,
      category_color: color,
    } = eventData;
    startTime = moment(startTime).format('HH:mm');
    endTime = moment(endTime).format('HH:mm');
    console.log({ aaa: this.props.onEventDetailsClick });
    return (
      <div className="ic-event-details-modal" onClick={this.handleClick}>
        <div className="ic-event-details-modal__header">
          <span style={{ background: color }} className="ic-event-details-modal__header-bar" />
          <h1 className="ic-event-details-modal__title">{title}</h1>
          {/* <Icon type="close" className="ic-event-details-modal__close" size={14} /> */}
        </div>
        <div className="ic-event-details-modal__content">
          <div className="ic-event-details-modal__content-item">
            <div className="ic-event-details-modal__content-item-left">
              <p>
                <time className="ic-event-details-modal__start-time">{startTime}</time>
                <span> ~ </span>
                <time className="ic-event-details-modal__start-time">{endTime}</time>
              </p>
              <p className="ic-event-details-modal__content-position">{position}</p>
            </div>
            <div className="ic-event-details-modal__content-item-right">
            {avatarUrl? <Avatar src={avatarUrl} size={32} />
             : <Avatar icon="user" size={32} />} 

              {/* <span style={{ color }}>{111}</span> */}
            </div>
          </div>
          <div className="ic-event-details-modal__content-desc">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    );
  }
}
