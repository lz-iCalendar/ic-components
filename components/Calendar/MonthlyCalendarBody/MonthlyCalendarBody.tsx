import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getWeeksOfMonth } from '../../utils/dateUtil';
import memoizeOne from 'memoize-one';

export default class MonthlyCalendarBody extends React.PureComponent<any, any> {
  static propTypes = {
    date: PropTypes.object.isRequired,
    events: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    date: new Date(),
    events: [],
  };

  rootRef: any = React.createRef();

  state = {
    calendarViewWidth: undefined,
    calendarElement: undefined,
  };

  componentDidMount() {
    this.setState({
      calendarElement: this.rootRef.current,
    });
  }

  getDayElementWidth() {
    const { calendarElement } = this.state;
    return calendarElement && Math.floor(calendarElement.offsetWidth / 7);
  }

  getHeight = memoizeOne((contentViewHeight) => {
    // 减去 header 的高度，得到 body 的高度
    return contentViewHeight - 40;
  });

  render() {
    const { calendarElement } = this.state;
    const {
      className,
      grayDayOfOtherMonths,
      date: propDate,
      dayViewParams,
      onEventDetailsClick,
      onCurrentEventClick,
      onFutureEventClick,
      onAllEventClick,
      dayViewComponent: DayViewComponent,
      weeks: customWeeks,
      onEventView,
      contentViewHeight,
    } = this.props;
    const year = propDate.getFullYear();
    const month = propDate.getMonth();
    const weeks = customWeeks || getWeeksOfMonth(year, month);
    const dayElementWidth = this.getDayElementWidth();

    const height = this.getHeight(contentViewHeight);

    return (
      <div
        className={classnames('ic-monthly-calendar-body', className)}
        ref={this.rootRef}
        style={{height, overflow: 'auto'}}
      >
        {weeks.map((week, index) => (
          <div className="ic-monthly-calendar-body__week" key={index}>
            {week.map(date => (
              <DayViewComponent
                key={date.valueOf()}
                params={dayViewParams}
                date={date}
                calendarActiveDate={propDate}
                calendarElement={calendarElement}
                dayElementWidth={dayElementWidth}
                grayDayOfOtherMonths={grayDayOfOtherMonths}
                onEventDetailsClick={onEventDetailsClick}
                onCurrentEventClick={onCurrentEventClick}
                onFutureEventClick={onFutureEventClick}
                onAllEventClick={onAllEventClick}
                onEventView={onEventView}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
