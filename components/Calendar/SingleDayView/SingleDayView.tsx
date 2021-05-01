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
  state = {
    len: 0,
    height: 'auto'
  };

  componentDidMount() {
    const { events, eventsFilter } = this.props;
    if (events) {
      const eventsNew = events.filter(eventsFilter);
      const len = events.length - eventsNew.length;

      this.setState({
        len,
      });
    }
    this.reLayout();
    this.getDayViewHeight();
  }

  componentDidUpdate() {
    this.reLayout();
    this.getDayViewHeight();
  }

  getDayViewHeight = () => {
    const bgDOM = document.querySelector(
      '.ic-day-time-line__bg'
    ) as HTMLDivElement;
    if (bgDOM) {
      const height = bgDOM.offsetHeight;
      this.setState({ height });
    }
  };

  reLayoutEvents(startHHmm, endHHmm, containerHeight) {
    const { current } = this.rootRef;
    if (!current) {
      return;
    }

    const dom = document.querySelector('.ic-single-day-view') as HTMLDivElement;
    const totalHeight = dom.offsetHeight;

    const timeLineStartMinutes = getHHmmDurationByMinute(startHHmm);
    const timeLineEndMinutes = getHHmmDurationByMinute(endHHmm);
    const totalMinutes = timeLineEndMinutes - timeLineStartMinutes;
    const heightToMinutes = totalHeight / totalMinutes;
    const eventElements = current.children;

    Array.prototype.forEach.call(eventElements, element => {
      const eventStart = element.getAttribute('data-event_time');
      const eventEnd = element.getAttribute('data-event_endtime');
      const coincide = element.getAttribute('data-event_coincide');
      const counts = element.getAttribute('data-event_counts');
      const left = element.getAttribute('data-event_left');
      const startMinutes = getHHmmDurationByMinute(eventStart);
      const endMinutes = getHHmmDurationByMinute(eventEnd);
      const eventTotalMinutes = endMinutes - startMinutes;

      // 计算 top
      const distanceMin = startMinutes - timeLineStartMinutes;
      const cellCounts = Math.floor((distanceMin) / 48);
      const cellSurplus = distanceMin % 60;
      const elementTop = cellCounts * 48 + (cellSurplus / 60) * 48;

      // const elementTop =
      //   (startMinutes - timeLineStartMinutes) * heightToMinutes;

      const elementHeight =
        (eventTotalMinutes * totalHeight) / totalMinutes;

      const elementWidth = Number(100 / counts);
      element.style.left = `${left * 100}%`;
      element.style.width = `${elementWidth}%`;
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

  handleEventClick = event => {};
  judgeCoincide = (item, index) => {
    let i = 0;
    const { events } = this.props;
    const { len } = this.state;
    item.isVisible = true;
    if (index > 0) {
      index = index + len;
      if (
        item.original.event_time >= events[index - 1].original.event_endtime &&
        item.original.event_endtime >= events[index - 1].original.event_time
      ) {
        item.isVisible = false;
        return item;
      } else if (index === 1) {
        item.counts = 2;
        item.left = 0.5;
        events[index - 1].counts = 2;
        events[index - 1].left = 0;
        return item;
      } else {
        //情况1 ： 只有两种

        //如果元素上一个被标记了
        if (events[index - 1][`isCoincide${i}`]) {
          item[`isCoincide${i}`] = true;
          item.counts = events[index - 1].counts + 1;
          if (!events[index - 1].isVisible) {
            //如果上一个元素，是 分离点的话。
            events[index - 1].counts = 2;
            item.counts = 2;
            item.left = 0.5;
            events[index - 1].left = 0;
          } else {
            events[index - 1].counts = events[index - 1].counts + 1;
            const _counts = events[index - 1].counts;
            const num = Number(1 / item.counts);
            if (item.counts > 2 && index >= 2) {
              for (i = 0; i < item.counts; i++) {
                index - i >= 0 ? (events[index - i].counts = _counts) : '';
                index - i >= 0
                  ? (events[index - i].left = 1 - num * (i + 1))
                  : '';
              }
            } else if (item.counts === 2 && index >= 2) {
              for (i = 0; i < item.counts; i++) {
                index - i >= 0 ? (events[index - i].counts = _counts) : '';
                index - i >= 0
                  ? (events[index - i].left = 1 - num * (i + 1))
                  : '';
              }
            } else {
              events[index].counts = _counts;
              events[index].left = 0.5;
              events[index - 1].counts = _counts;
              events[index - 1].left = 0;
            }
          }
        } else {
          item[`isCoincide${i}`] = true;
          events[index - 1][`isCoincide${i}`] = true;
          events[index - 1].counts = 1;
          item.counts = 1;
        }
        return item;
      }
    } else {
      return item;
    }
  };

  sortByDate = (a, b) => {
    return (
      Date.parse(moment(a.startTime).format('YYYY-MM-DD HH:mm')) -
      Date.parse(moment(b.startTime).format('YYYY-MM-DD HH:mm'))
    );
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
      onEventView,
    } = this.props;
    const { height } = this.state;
    return (
      <div ref={this.rootRef} className="ic-single-day-view" style={{...style, height}}>
        {normalizeEvents(events || [])
          .filter(eventsFilter)
          // .sort(this.sortByDate)
          .map(this.judgeCoincide)
          .map(event => {
            const {
              occurId,
              counts,
              left,
              original: {
                event_time,
                event_endtime,
                event_title,
                event_hostheadurl,
                category_color,
                forbidRender,
                hasPopover = true,
                hasTitle = true,
                hasEditBtn = true,
                hasViewBtn = false,
              },
            } = event;
            if (forbidRender) {
              return;
            }

            const content = (
              <div
                data-event_time={event_time}
                data-event_endtime={event_endtime}
                key={occurId}
                data-event_counts={counts}
                data-event_left={left}
                className="ic-single-day-view__event"
                onClick={() => {
                  this.handleEventClick(event);
                }}
              >
                <div
                  className="ic-single-day-view__content"
                  style={{ background: category_color }}
                >
                  <div className="ic-single-day-view__content-host">
                    {' '}
                    {event_hostheadurl ? (
                      <img
                        className="ic-single-day-view__host-avatar"
                        src={event_hostheadurl}
                      />
                    ) : (
                      <Icon
                        type="user"
                        className="ic-single-day-view__host-icon"
                      />
                    )}
                    <div className="ic-single-day-view__event-time">{`${event_time} - ${event_endtime}`}</div>
                  </div>
                  {hasTitle && (
                    <div className="ic-single-day-view__event-title">
                      {event_title}
                    </div>
                  )}
                </div>
              </div>
            );

            if (hasPopover) {
              return (
                <Popover
                  key={occurId}
                  // trigger='click'
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
                      hasEditBtn={hasEditBtn}
                      hasViewBtn={hasViewBtn}
                      onEventView={onEventView}
                    />
                  }
                  className="ic-single-day-view__popover"
                >
                  {content}
                </Popover>
              );
            }

            return content;
          })}
      </div>
    );
  }
}
