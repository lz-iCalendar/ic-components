import React from 'react';
import YearDayView from '../YearDayView';
import { Icon } from 'antd';

export default class Row extends React.PureComponent<any, any> {
  state = {
    rowHeight: undefined,
  };

  componentDidMount() {
    this.setState({ rowHeight: this.rowRef.current.offsetHeight });
  }

  rowRef: any = React.createRef();

  render() {
    const {
      datesOfMonth,
      month,
      eventsMap,
      singleDayWidth,
      isFirstDayOfSection,
      getDaysToLastDayOfSection,
    } = this.props;
    const {
      onEventDetailsClick,
      onCurrentEventClick,
      onFutureEventClick,
      onAllEventClick,
      spinning,
    } = this.props;
    const { rowHeight } = this.state;
    const rowStyle = rowHeight ? { height: rowHeight } : {};
    return (
      <div
        ref={this.rowRef}
        key={month}
        className="ic-year-calendar__row"
        style={rowStyle}
      >
        <div className="ic-year-calendar__row-title">{spinning ? <Icon type="loading" /> : `${month + 1}月`}</div>
        {datesOfMonth.map((monthDay, index) => (
          <div
            className="ic-year-calendar__row-content"
            key={`${monthDay}-${index}`}
          >
            {monthDay && (
              <YearDayView
                params={eventsMap}
                date={monthDay}
                dayElementWidth={singleDayWidth}
                dateVisible={false}
                dotVisible={false}
                hostAvatarVisible={false}
                eventsLimit={null}
                isFirstDayOfSection={isFirstDayOfSection}
                getDaysToLastDayOfSection={date =>
                  getDaysToLastDayOfSection(date, month)
                }
                style={{ height: 'auto' }}
                paddingConfig={{
                  top: 4,
                  bottom: 1,
                  left: 0,
                  right: 6,
                }}
                onEventDetailsClick={onEventDetailsClick}
                onCurrentEventClick={onCurrentEventClick}
                onFutureEventClick={onFutureEventClick}
                onAllEventClick={onAllEventClick}
              />
            )}
          </div>
        ))}
      </div>
    );
  }
}
