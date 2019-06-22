import React from 'react';
import memoizeOne from 'memoize-one';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import moment from 'moment';
import Avatar from '../../Avatar';
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
    return (
      <div className="ic-event-details">
        <div className="ic-event-details__header">
          <span style={{ background: color }} className="ic-event-details__header-bar" />
          <h1 className="ic-event-details__title">{title}</h1>
          <Icon type="close" className="ic-event-details__close" size={14} />
        </div>
        <div className="ic-event-details__content">
          <div className="ic-event-details__content-item">
            <div className="ic-event-details__content-item-left">
              <p>
                <time className="ic-event-details__start-time">{startTime}</time>
                <span> ~ </span>
                <time className="ic-event-details__start-time">{endTime}</time>
              </p>
              <p className="ic-event-details__content-position">{position}</p>
            </div>
            <div className="ic-event-details__content-item-right">
              <Avatar src={avatarUrl} size={46} />
              <span style={{ color }}>{111}</span>
            </div>
          </div>
          <div className="ic-event-details__content-desc">
            <p>{desc}</p>
          </div>
        </div>
      </div>
    );
  }
}
