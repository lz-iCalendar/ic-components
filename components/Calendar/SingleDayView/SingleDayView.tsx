import React from 'react';
import memoizeOne from 'memoize-one';
import { getHHmmDurationByMinute, getStepDurationByMinute } from '../../utils/dateUtil';
import { normalizeEvents } from '../../utils/eventUtil';
import PropTypes from 'prop-types';
import Popover from '../../Popover';
import EventDetails from '../EventDetails';
import '../EventDetails/style/index.less';

export default class SingleDayView extends React.PureComponent<any, any> {
  static propTypes = {
    /**
     * 日期
     */
    date: PropTypes.object,

    /**
     * 当前日期的事件
     */
    events: PropTypes.array,

    /**
     * 事件筛选函数
     */
    eventsFilter: PropTypes.func,
  };

  componentDidMount() {
    this.reLayout();
  }

  componentDidUpdate() {
    this.reLayout();
  }

  reLayoutEvents(startHHmm, endHHmm, containerHeight) {
    const { current } = this.rootRef;
    if (!current) {
      return;
    }

    const timeLineStartMinutes = getHHmmDurationByMinute(startHHmm);
    const timeLineEndMinutes = getHHmmDurationByMinute(endHHmm);
    const totalMinutes = timeLineEndMinutes - timeLineStartMinutes;
    const heightToMinutes = containerHeight / totalMinutes;
    const eventElements = current.children;

    Array.prototype.forEach.call(eventElements, element => {
      const eventStart = element.getAttribute('data-event_time');
      const eventEnd = element.getAttribute('data-event_endtime');
      const startMinutes = getHHmmDurationByMinute(eventStart);
      const endMinutes = getHHmmDurationByMinute(eventEnd);
      const eventTotalMinutes = endMinutes - startMinutes;
      const elementTop = (startMinutes - timeLineStartMinutes) * heightToMinutes;
      const elementHeight = (eventTotalMinutes * containerHeight) / totalMinutes;

      element.style.top = `${elementTop}px`;
      element.style.height = `${elementHeight}px`;
    });
  }

  memoizedReLayoutEvents = memoizeOne((_events, startHHmm, endHHmm, containerHeight) => {
    this.reLayoutEvents(startHHmm, endHHmm, containerHeight);
  });

  reLayout() {
    const { events, startHHmm, endHHmm, containerHeight } = this.props;
    this.memoizedReLayoutEvents(events, startHHmm, endHHmm, containerHeight);
  }

  rootRef: any = React.createRef();

  handleEventClick = event => {
    console.log(event);
  };

  render() {
    const { events, eventsFilter, style } = this.props;

    return (
      <div ref={this.rootRef} className="ic-single-day-view" style={style}>
        {normalizeEvents(events || [])
          .filter(eventsFilter)
          .map(event => {
            const {
              occurId,
              original: { event_time, event_endtime, event_title, event_hostheadurl, category_color },
            } = event;
            return (
              <Popover
                trigger={['click']}
                getPopupContainer={() => document.querySelector('.ic-month-day-view')}
                content={<EventDetails eventData={event.original} />}
              >
                <div
                  data-event_time={event_time}
                  data-event_endtime={event_endtime}
                  key={occurId}
                  className="ic-single-day-view__event"
                  onClick={() => {
                    this.handleEventClick(event);
                  }}
                >
                  <img className="ic-single-day-view__host-avatar" src={event_hostheadurl} />
                  <div className="ic-single-day-view__content" style={{ background: category_color }}>
                    <div className="ic-single-day-view__event-time">{`${event_time} - ${event_endtime}`}</div>
                    <div className="ic-single-day-view__event-title">{event_title}</div>
                  </div>
                </div>
              </Popover>
            );
          })}
      </div>
    );
  }
}
