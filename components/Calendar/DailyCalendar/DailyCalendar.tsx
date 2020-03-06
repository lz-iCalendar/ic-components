import React from 'react';
import classnames from 'classnames';
import memoizeOne from 'memoize-one';
import moment from 'moment';
import { getDatesBetween, getWeekDayName, monthDayHasher } from '../../utils/dateUtil';
import { allocateDailyEvents, isTotalDayEvent, getEventsTimeRange } from '../../utils/eventUtil';
import ChildrenWithProps from '../../ChildrenWithProps';
import DayTimeLine from '../DayTimeLine';
import SingleDayView from '../SingleDayView';
import MonthDayView from '../MonthDayView';
import PropTypes from 'prop-types';

function allDayEventsFilter(event) {
  return isTotalDayEvent(event);
}

// 不是全天事件
function notAllDayEventsFilter(event) {
  return !isTotalDayEvent(event);
}

export default class DailyCalendar extends React.PureComponent<any, any> {
  static propTypes = {
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

  static defaultProps = {
    activeDate: new Date(),
  };

  state = {
    timeLineRefreshKey: false,
  };

  UNSAFE_componentWillReceiveProps(nextProps) {
    const { events, startDate, endDate } = this.props;
    if (events !== nextProps.events || startDate !== nextProps.startDate || endDate !== nextProps.endDate) {
      this.setState(({ timeLineRefreshKey }) => ({ timeLineRefreshKey: !timeLineRefreshKey }));
    }
  }

  isFirstDayOfSection = (date: Date) => {
    const { startDate } = this.props;
    return date.getDate() === startDate.getDate();
  };

  getDaysToLastDayOfSection = (date: Date) => {
    const { endDate } = this.props;
    const end = moment(endDate);
    const start = moment(date);
    end
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    start
      .hour(0)
      .minute(0)
      .second(0)
      .millisecond(0);
    return end.diff(start, 'days');
  };

  getSingleDayWidth = (containerWidth, days) => {
    return Math.floor(containerWidth / days);
  };

  getTitleRowRenderer = memoizeOne((dates, activeDate) => containerWidth => {
    const days = dates.length;
    const singleDayWidth = this.getSingleDayWidth(containerWidth, days);

    return (
      <div className="ic-daily-calendar__top-right">
        {dates.map(date => (
          <div
            key={date.valueOf()}
            className={classnames('ic-daily-calendar__day-title', {
              ['ic-daily-calendar__day-title-active']: days > 1 && date.getDate() === activeDate.getDate(),
            })}
            style={{ width: singleDayWidth }}
          >
            <div className="ic-daily-calendar__day-title-week">{getWeekDayName(date)}</div>
            <div className="ic-daily-calendar__day-title-date">{`${date.getMonth() + 1}月${date.getDate()}日`}</div>
          </div>
        ))}
      </div>
    );
  });

  getEventRowRenderer = memoizeOne((dates, events) => containerWidth => {
    const eventsMap = allocateDailyEvents(events);
    const singleDayWidth = this.getSingleDayWidth(containerWidth, dates.length);
    const {onEventDetailsClick,onCurrentEventClick,onFutureEventClick,onAllEventClick} = this.props;
    return (
      <div className="ic-daily-calendar__top-right">
        {dates.map(date => (
          <div
            key={date.valueOf()}
            className="ic-daily-calendar__all-day-event-container"
            style={{ width: singleDayWidth }}
          >
            <MonthDayView
              params={eventsMap}
              eventsFilter={allDayEventsFilter}
              date={date}
              dayElementWidth={singleDayWidth}
              dateVisible={false}
              dotVisible={false}
              eventsLimit={null}
              isFirstDayOfSection={this.isFirstDayOfSection}
              getDaysToLastDayOfSection={this.getDaysToLastDayOfSection}
              style={{ height: 'auto', width: singleDayWidth }}
              onEventDetailsClick={onEventDetailsClick}
              onCurrentEventClick={onCurrentEventClick}
              onFutureEventClick={onFutureEventClick}
              onAllEventClick={onAllEventClick}
            />
          </div>
        ))}
      </div>
    );
  });

  getMainViewRenderer = memoizeOne((dates, events) => containerWidth => {
    const eventsMap = allocateDailyEvents(events);
    const singleDayWidth = this.getSingleDayWidth(containerWidth, dates.length);

    const {onEventDetailsClick,onCurrentEventClick,onFutureEventClick,onAllEventClick} = this.props;
    return (
      <ChildrenWithProps className="ic-daily-calendar__day-views">
        {dates.map(date => (
          <SingleDayView
            key={date.valueOf()}
            events={eventsMap.get(monthDayHasher(date))}
            eventsFilter={notAllDayEventsFilter}
            date={date}
            style={{ width: singleDayWidth }}
            onEventDetailsClick={onEventDetailsClick}
            onCurrentEventClick={onCurrentEventClick}
            onFutureEventClick={onFutureEventClick}
            onAllEventClick={onAllEventClick}
          />
        ))}
      </ChildrenWithProps>
    );
  });

  render() {
    const { events, startDate, endDate, activeDate, timeLineRange } = this.props;
    const { timeLineRefreshKey } = this.state;
    const dates = getDatesBetween(startDate, endDate);
    const [startHHmm, endHHmm] = getEventsTimeRange(events, timeLineRange);

    return (
      <div className="ic-daily-calendar">
        <DayTimeLine
          key={`${timeLineRefreshKey}`}
          startHHmm={startHHmm}
          endHHmm={endHHmm}
          renderTitleRow={this.getTitleRowRenderer(dates, activeDate)}
          renderEventRow={this.getEventRowRenderer(dates, events)}
          renderMainView={this.getMainViewRenderer(dates, events)}
        />
      </div>
    );
  }
}
