import React from 'react';
import { Checkbox, Select, Icon } from 'antd';
import AgendaList from './AgendaList';
const { Option } = Select;

const rangeOptions = [
  {
    label: '一天',
    value: '1:d',
  },
  {
    label: '一周',
    value: '1:w',
  },
  {
    label: '两周',
    value: '2:w',
  },
  {
    label: '一个月',
    value: '1:M',
  },
  {
    label: '三个月',
    value: '3:M',
  },
  {
    label: '六个月',
    value: '6:M',
  },
  {
    label: '一年',
    value: '1:y',
  },
];

export default class Agenda extends React.PureComponent<any, any> {
  constructor(props) {
    super(props);
    const { defaultDateRange, dateRange } = props;

    this.state = {
      detailVisible: false,
      importantOnly: false,
      weatherVisible: false,
      dateRange: dateRange || defaultDateRange,
    };
  }

  handleRangeChange = value => {
    const { onDateRangeChange } = this.props;
    this.setState({ dateRange: value });
    typeof onDateRangeChange === 'function' && onDateRangeChange(value);
  };

  handleCheckboxChange = (event, stateField) => {
    const { checked } = event.target;
    this.setState({ [stateField]: checked });
  };

  setDetailVisibility = event => {
    this.handleCheckboxChange(event, 'detailVisible');
  };

  setImportanceFilter = event => {
    this.handleCheckboxChange(event, 'importantOnly');
  };

  setWeatherVisibility = event => {
    this.handleCheckboxChange(event, 'weatherVisible');
  };

  render() {
    const {
      events,
      startDate,
      dateRange: propDateRange,
      onEventDetailsClick,
      onCurrentEventClick,
      onFutureEventClick,
      onAllEventClick,
      onExportClick,
      onEventView
    } = this.props;
    const {
      dateRange: stateDateRange,
      detailVisible,
      importantOnly,
      weatherVisible,
    } = this.state;
    const dateRange = propDateRange || stateDateRange;

    return (
      <div className="ic-agenda">
        <div className="ic-agenda__header">
          <div className="ic-agenda__date-range">
            <div className="ic-agenda__date-range-label">日期范围</div>
            <Select onChange={this.handleRangeChange} value={dateRange}>
              {rangeOptions.map(({ label, value }) => (
                <Option key={value} value={value}>
                  {label}
                </Option>
              ))}
            </Select>
          </div>
          <div className="ic-agenda__header-right-part">
            <span
              className="ic-agenda__header-right-part-export"
              onClick={() => {
                onExportClick(events);
              }}
            >
              <Icon type="download" />
              {/*   <img src={exportImg}/> */}
              导出
            </span>
            <Checkbox onChange={this.setDetailVisibility}>详情</Checkbox>
            <Checkbox onChange={this.setImportanceFilter}>重要</Checkbox>
            <Checkbox onChange={this.setWeatherVisibility}>天气</Checkbox>
          </div>
        </div>
        <div className="ic-agenda__body">
          <AgendaList
            events={events}
            startDate={startDate}
            dateRange={dateRange}
            detailVisible={detailVisible}
            importantOnly={importantOnly}
            weatherVisible={weatherVisible}
            onEventDetailsClick={onEventDetailsClick}
            onCurrentEventClick={onCurrentEventClick}
            onFutureEventClick={onFutureEventClick}
            onAllEventClick={onAllEventClick}
            onEventView={onEventView}
          />
        </div>
      </div>
    );
  }
}
