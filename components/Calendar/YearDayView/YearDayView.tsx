import React from 'react';
import classnames from 'classnames';
import {
  monthDayHasher,
  isSameMonthDay,
  isFirstDateOfWeek,
  getDaysToLastDayOfWeek,
} from '../../utils/dateUtil';
import {
  getEventDuration,
  isTotalDayEvent,
  isSeveralDayEvent,
} from '../../utils/eventUtil';
import EventDetails from '../EventDetails';
import '../EventDetails/style/index.less';
import PropTypes from 'prop-types';
import { Popover, Avatar } from 'antd';

const dayElementPadding = {
  top: 1,
  bottom: 1,
  left: 6,
  right: 6,
};

const constructPadding = ({ top, bottom, left, right }) =>
  `${top}px ${right}px ${bottom}px ${left}px`;

export default class YearDayView extends React.PureComponent<any, any> {
  static propTypes = {
    /**
     * 事件详情弹窗点击的回调
     * 默认：noop
     */
    onEventDetailsClick: PropTypes.func,
    onCurrentEventClick: PropTypes.func,
    onFutureEventClick: PropTypes.func,
    onAllEventClick: PropTypes.func,
  };

  static defaultProps = {
    grayDayOfOtherMonths: true,
    dateVisible: true,
    dotVisible: true,
    hostAvatarVisible: true,
    eventsLimit: 3,
    calendarActiveDate: new Date(),
    isFirstDayOfSection: isFirstDateOfWeek,
    getDaysToLastDayOfSection: getDaysToLastDayOfWeek,
    eventsFilter: () => true,
    paddingConfig: dayElementPadding,
  };

  getEventElementWidth(event) {
    const {
      dayElementWidth,
      getDaysToLastDayOfSection,
      paddingConfig,
    } = this.props;
    if (!dayElementWidth) {
      return undefined;
    }

    const { left, right } = paddingConfig;
    const daysToLastDayOfSection = getDaysToLastDayOfSection(event.startTime);
    const maxDurationByDay = daysToLastDayOfSection + 1;
    const eventDurationByDay = getEventDuration(event, 'day');
    const realDurationByDay =
      maxDurationByDay > eventDurationByDay
        ? eventDurationByDay
        : maxDurationByDay;
    return dayElementWidth * realDurationByDay - left - right;
  }

  isVisible(event) {
    const { isFirstDayOfSection } = this.props;
    const { alreadyBegun, startTime } = event;
    return !alreadyBegun || isFirstDayOfSection(startTime);
  }

  handleEventClick = event => {

  };
  isInclude(arr, obj) {
    let include = false;
    arr &&
      Object.keys(arr).forEach((item, index) => {
        if (
          (arr[index][0] && arr[index][0].occurId === obj.occurId) ||
          (arr[index][1] && arr[index][1].occurId === obj.occurId)
        ) {
          include = true;
        }
      });
    if (include) {
      return true;
    } else {
      return false;
    }
  }

  render() {
    const {
      grayDayOfOtherMonths,
      date,
      calendarActiveDate,
      params: eventsMap,
      dateVisible,
      dotVisible,
      hostAvatarVisible,
      eventsLimit: propEventsLimit,
      eventsFilter,
      style,
      paddingConfig,
      onEventDetailsClick,
      onCurrentEventClick,
      onFutureEventClick,
      onAllEventClick,
    } = this.props;
    const dateSort = (a,b) => {
      return Date.parse(a.startTime) - Date.parse(b.startTime);
    }
    const eventKey = monthDayHasher(date);
    const eventsOfToday = eventsMap.get(eventKey) || [];
    eventsOfToday.sort(dateSort)
    //第一步，先找到相同的开始结束时间 数据
    // eventsOfToday.forEach((item, index) => {
    //   let find = false;
    //   eventsOfTodayNew[index] = [];
    //   eventsOfToday.forEach((items) => {
    //     if (
    //       item.original.occur_begin === items.original.occur_begin &&
    //       item.original.occur_end === items.original.occur_end &&
    //       item.occurId !== items.occurId
    //     ) {
    //       let include = false;
    //       include = this.isInclude(eventsOfTodayNew, items);
    //       if (!include) {
    //         eventsOfTodayNew[i].push(items);
    //         find = true;
    //       }
    //     }
    //   });

    //   if (find) {
    //     eventsOfTodayNew[i].push(item);
    //     // eventsOfToday.splice(index, 1, eventsOfTodayNew[i]);
    //     indexs.push(index)
    //     i++;
    //   }
    // });
    // console.log({ eventsOfTodayNew,eventsOfToday ,indexs,i});

    const monthDay = date.getDate();
    const isActive = isSameMonthDay(date, calendarActiveDate);
    const isDateOfOtherMonth =
      date.getMonth() !== calendarActiveDate.getMonth();
    const weekDay = date.getDay();
    const isWeekend = weekDay === 0 || weekDay === 6;
    const eventsLimit = propEventsLimit || eventsOfToday.length;


    return (
      <div
        className="ic-month-day-view"
        style={{ padding: constructPadding(paddingConfig), ...style }}
      >
        {dateVisible && (
          <div
            className={classnames('ic-month-day-view__month-day', {
              ['ic-month-day-view__month-day-active']: isActive,
              ['ic-month-day-view__other-month-day']:
                isDateOfOtherMonth && grayDayOfOtherMonths,
              ['ic-month-day-view__weekend']: isWeekend,
            })}
          >
            {monthDay}
          </div>
        )}
        <div>
          {eventsOfToday
            .slice(0, eventsLimit)
            .filter(eventsFilter)
            .map(event => {
              const {
                original: {
                  event_title,
                  occur_id,
                  category_color,
                  event_hostheadurl,
                },
              } = event;
              const eventElementWidth = this.getEventElementWidth(event);
              const eventElementStyle = eventElementWidth
                ? { width: eventElementWidth }
                : {};

              // const {occur_start,occur_end} = event.original;
              return (
                <Popover
                  key={occur_id}
                  trigger="click"
                  // trigger={['click']}
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
                >
                  <div
                    key={occur_id}
                    className={classnames('ic-month-day-view__event', {
                      ['ic-month-day-view__event-hidden']: !this.isVisible(
                        event
                      ),
                    })}
                    style={eventElementStyle}
                  >
                    {/* {!hostAvatarVisible ? <img src={event_hostheadurl} />:<Avatar icon="user" size={22} />}  */}
                    <div
                      className="ic-month-day-view__event-bar"
                      style={{
                        background: isSeveralDayEvent(event)
                          ? category_color
                          : 'none',
                      }}
                      onClick={() => {
                        this.handleEventClick(event);
                      }}
                    >
                      <div
                        className="ic-month-day-view__event-title"
                        style={{
                          display: isSeveralDayEvent(event) ? '' : 'none',
                        }}
                      >
                        {event_title}
                      </div>
                      {/* dotVisible && */}
                      {/* {isTotalDayEvent(event) && (
                        <div className="ic-month-day-view__dot" />
                      )} */}
                      {!isSeveralDayEvent(event) && !isTotalDayEvent(event) && (
                        <div
                          className="ic-month-day-view__dot"
                          style={{ background: category_color }}
                        />
                      )}
                    </div>
                  </div>
                </Popover>
              );
            })}
          {eventsOfToday.length > eventsLimit && (
            <div className="ic-month-day-view__ellipse">...</div>
          )}
        </div>
      </div>
    );
  }
}
