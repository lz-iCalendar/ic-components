import React from 'react';
import { allocateDailyEvents } from '../../utils/eventUtil';
import MonthlyCalendarHeader from '../MonthlyCalendarHeader';
import MonthlyCalendarBody from '../MonthlyCalendarBody';
import MonthDayView from '../MonthDayView';

export default class MonthlyCalendar extends React.PureComponent<any, any> {
  render() {
    const { events, onEventView } = this.props;
    return (
      <>
        <MonthlyCalendarHeader />
        <MonthlyCalendarBody
          className="ic-monthly-calendar__calendar-body"
          dayViewParams={allocateDailyEvents(events)}
          dayViewComponent={MonthDayView}
          {...this.props}
        />
      </>
    );
  }
}
