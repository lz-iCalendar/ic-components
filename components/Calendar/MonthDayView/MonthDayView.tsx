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

export default class MonthDayView extends React.PureComponent<any, any> {
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

  handleEventClick = event => {};
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
      onEventView,
    } = this.props;

    const eventKey = monthDayHasher(date);
    const eventsOfToday = eventsMap.get(eventKey) || [];
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
            .map((event, index) => {
              const {
                original: {
                  event_title,
                  occur_id,
                  category_color,
                  event_hostheadurl,
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
              const eventElementWidth = this.getEventElementWidth(event);
              const eventElementStyle = eventElementWidth
                ? { width: eventElementWidth }
                : {};
              const key = `${occur_id}-${index}`;
              const content = (
                <div
                  key={key}
                  className={classnames('ic-month-day-view__event', {
                    ['ic-month-day-view__event-hidden']: !this.isVisible(event),
                  })}
                  style={eventElementStyle}
                >
                  <div
                    className="ic-month-day-view__event-bar"
                    style={{
                      background: category_color,
                    }}
                    onClick={() => {
                      this.handleEventClick(event);
                    }}
                  >
                    {hasTitle && (
                      <div className="ic-month-day-view__event-title">
                        {event_title}
                      </div>
                    )}
                    {isTotalDayEvent(event) && (
                      <div className="ic-month-day-view__dot" />
                    )}
                  </div>
                </div>
              );

              if (hasPopover) {
                return (
                  <Popover
                    key={key}
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
                        hasEditBtn={hasEditBtn}
                        hasViewBtn={hasViewBtn}
                        onEventView={onEventView}
                      />
                    }
                  >
                    {content}
                  </Popover>
                );
              }
              return content;
            })}
          {eventsOfToday.length > eventsLimit && (
            <div className="ic-month-day-view__ellipse">...</div>
          )}
        </div>
      </div>
    );
  }
}
