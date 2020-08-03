import React from 'react';
import memoizeOne from 'memoize-one';
import {
  getHHmmDurationByMinute,
  getStepDurationByMinute,
} from '../../utils/dateUtil';
import { normalizeEvents } from '../../utils/eventUtil';
import PropTypes from 'prop-types';
import EventDetails from '../EventDetails';
import '../EventDetails/style/index.less';
import { Popover, Icon } from 'antd';
import moment from 'moment';

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
      const elementTop =
        (startMinutes - timeLineStartMinutes) * heightToMinutes;
      const elementHeight =
        (eventTotalMinutes * containerHeight) / totalMinutes;

      element.style.top = `${elementTop}px`;
      element.style.height = `${elementHeight}px`;
    });
  }

  memoizedReLayoutEvents = memoizeOne(
    (_events, startHHmm, endHHmm, containerHeight) => {
      this.reLayoutEvents(startHHmm, endHHmm, containerHeight);
    }
  );

  reLayout() {
    const { events, startHHmm, endHHmm, containerHeight } = this.props;
    this.memoizedReLayoutEvents(events, startHHmm, endHHmm, containerHeight);
    // this.handleEvents(events);
  }

  rootRef: any = React.createRef();

  handleEventClick = event => {
    console.log(event);
  };
  handleEvents = events => {
    let eventsNew = events && JSON.parse(JSON.stringify(events));
    let obj = {};
    let format = 'YYYY-MM-DD HH:mm';
    events &&
      events.length > 0 &&
      events.forEach((event, index1) => {
        let include = false;
        eventsNew.forEach((event2, index) => {
          if (
            moment(event2.startTime).format(format) ===
              moment(event.startTime).format(format) &&
            moment(event2.endTime).format(format) ===
              moment(event.endTime).format(format) &&
            event2.occurId !== event.occurId
          ) {
            eventsNew.splice(index, 1);
            obj[index1] = [];
            if (obj && Object.keys(obj).length > 0) {
              let last2 = false;
              Object.keys(obj).map(item => {
                let last = false;
                obj[item].map(items => {
                  if (
                    moment(event2.startTime).format(format) ===
                      moment(items.events.startTime).format(format) &&
                    moment(event2.endTime).format(format) ===
                      moment(items.events.endTime).format(format)
                  ) {
                    last = true;
                  }
                  if (last) {
                    last2 = true;
                  }
                });
                if (!last2) {
                  obj[index1].push({ events: event2 });
                  include = true;
                } else {
                  include = false;
                }
              });
            }
          }
          // else {
          //   obj[index1] = [];
          //   obj[index1].push({ events: event2 });
          //   include = true;
          // }
        });
        if (include) {
          obj[index1].push({ events: event });
          include = false;
        }
      });
  };

  render() {
    const {
      events,
      eventsFilter,
      style,
      onEventDetailsClick,
      onCurrentEventClick,
      onFutureEventClick,
      onAllEventClick,
    } = this.props;
    return (
      <div ref={this.rootRef} className="ic-single-day-view" style={style}>
        {normalizeEvents(events || [])
          .filter(eventsFilter)
          .map(event => {
            const {
              occurId,
              original: {
                event_time,
                event_endtime,
                event_title,
                event_hostheadurl,
                category_color,
              },
            } = event;
            return (
              <Popover
                trigger="click"
                getPopupContainer={() =>
                  document.querySelector('.ic-month-day-view')
                }
                content={
                  <EventDetails
                    eventData={event.original}
                    onEventDetailsClick={onEventDetailsClick}
                    onCurrentEventClick={onCurrentEventClick}
                    onFutureEventClick={onFutureEventClick}
                    onAllEventClick={onAllEventClick}
                  />
                }
                className="ic-single-day-view__popover"
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
                  <div
                    className="ic-single-day-view__content"
                    style={{ background: category_color }}
                  >
                    {event_hostheadurl ? (
                      <img
                        className="ic-single-day-view__host-avatar"
                        src={event_hostheadurl}
                      />
                    ) : (
                      <Icon
                        type="user"
                        className="ic-single-day-view__host-icon"
                      ></Icon>
                    )}
                    <div className="ic-single-day-view__event-time">{`${event_time} - ${event_endtime}`}</div>
                    <div className="ic-single-day-view__event-title">
                      {event_title}
                    </div>
                  </div>
                </div>
              </Popover>
            );
          })}
      </div>
    );
  }
}
