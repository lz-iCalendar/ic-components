import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import { getWeeksOfMonth } from '../../utils/dateUtil';
import styles from './MonthlyCalendarBody.module.css';

export default class MonthlyCalendarBody extends React.PureComponent {
  static propTypes = {
    date: PropTypes.object.isRequired,
    events: PropTypes.arrayOf(PropTypes.object),
  };

  static defaultProps = {
    date: new Date(),
    events: [],
  };

  state = {
    calendarViewWidth: undefined,
  };

  rootRef = React.createRef();

  componentDidMount() {
    this.setState({
      calendarElement: this.rootRef.current,
    });
  }

  getDayElementWidth() {
    const { calendarElement } = this.state;
    return calendarElement && Math.floor(calendarElement.offsetWidth / 7);
  }

  render() {
    const { calendarElement } = this.state;
    const { className, date: propDate, dayViewParams, dayViewComponent: DayViewComponent } = this.props;
    const year = propDate.getFullYear();
    const month = propDate.getMonth();
    const weeks = getWeeksOfMonth(year, month);
    const dayElementWidth = this.getDayElementWidth();

    return (
      <div className={classnames(styles.container, className)} ref={this.rootRef}>
        {weeks.map((week, index) => (
          <div className={styles.week} key={index}>
            {week.map(date => (
              <DayViewComponent
                key={date.valueOf()}
                params={dayViewParams}
                date={date}
                calendarActiveDate={propDate}
                calendarElement={calendarElement}
                dayElementWidth={dayElementWidth}
              />
            ))}
          </div>
        ))}
      </div>
    );
  }
}
