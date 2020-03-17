import React from 'react';
import PropTypes from 'prop-types';
import Icon from '../../Icon';
import moment from 'moment';
// import Avatar from '../../Avatar';
import { Avatar, Button } from 'antd';
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

    /**
     * 本次事件按钮被点击的回调
     * 默认：noop
     */
    onCurrentEventClick: PropTypes.func,
    /**
     * 未来事件被点击的回调
     * 默认：noop
     */
    onFutureEventClick: PropTypes.func,
    /**
     * 所有事件（整个系列）被点击的回调
     * 默认：noop
     */
    onAllEventClick: PropTypes.func,
  };

  static defaultProps = {};

  handleClick = () => {
    this.props.onEventDetailsClick(this.props.eventData);
  };

  render() {
    const { eventData } = this.props;
    const {
      onCurrentEventClick,
      onFutureEventClick,
      onAllEventClick,
    } = this.props;
    let {
      event_title: title,
      occur_begin: startTime,
      occur_end: endTime,
      event_short: position,
      event_hostheadurl: avatarUrl,
      event_desc: desc,
      category_color: color,
      formdata,
      occur_event_id,
    } = eventData;
    startTime = moment(startTime).format('HH:mm');
    endTime = moment(endTime).format('HH:mm');
    console.log({ aaa: this.props.onEventDetailsClick });
    return (
      <div
        className="ic-event-details-modal"
        onClick={() => {
          console.log('father');
          this.handleClick();
        }}
      >
        <div className="ic-event-details-modal__header">
          <span
            style={{ background: color }}
            className="ic-event-details-modal__header-bar"
          />
          <h1 className="ic-event-details-modal__title">{title}</h1>
          {/* <Icon type="close" className="ic-event-details-modal__close" size={14} /> */}
        </div>
        <div className="ic-event-details-modal__content">
          <div className="ic-event-details-modal__content-item">
            <div className="ic-event-details-modal__content-item-left">
              <p>
                <time className="ic-event-details-modal__start-time">
                  {startTime}
                </time>
                <span> ~ </span>
                <time className="ic-event-details-modal__start-time">
                  {endTime}
                </time>
              </p>
              <p className="ic-event-details-modal__content-position">
                {position}
              </p>
            </div>
            <div className="ic-event-details-modal__content-item-right">
              {avatarUrl ? (
                <Avatar src={avatarUrl} size={32} />
              ) : (
                <Avatar icon="user" size={32} />
              )}

              {/* <span style={{ color }}>{111}</span> */}
            </div>
          </div>

          <div className="ic-event-details-modal__content-desc">
            <p>{desc}</p>
          </div>
          <div className="ic-event-details-modal__content-btns">
            <Button
              onClick={e => {
                e.stopPropagation();
                onCurrentEventClick(eventData);
              }}
            >
              编辑本次事件
            </Button>
            {formdata && formdata[636483916988].length > 0 && (
              <React.Fragment>
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    onFutureEventClick(eventData);
                  }}
                >
                  编辑将来事件
                </Button>
                <Button
                  onClick={e => {
                    e.stopPropagation();
                    onAllEventClick(eventData);
                  }}
                >
                  编辑全部系列
                </Button>
              </React.Fragment>
            )}
          </div>
        </div>
      </div>
    );
  }
}
