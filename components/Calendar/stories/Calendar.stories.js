import React from 'react';
import { storiesOf } from '@storybook/react';
import Calendar from '../Calendar';
import { mockEvents, multiDaysEvents } from './mockData';
import 'antd/dist/antd.css';
import '../style/index.less';
import { Button } from 'antd';
import moment from 'moment';

const stories = storiesOf('Calendar 日历', module);

class Wrap extends React.Component {
  state = {
    events: multiDaysEvents,
    eventKeyword: undefined,
    spinning: false,
  };

  handleEventDetailsClick = eventData => {
    console.log({ eventData });
  };

  handleChange = dates => {
    const start = moment(dates[0]).format('YYYY-MM-DD');
    const end = moment(dates[1]).format('YYYY-MM-DD');
    console.log({ start, end });
  };

  render() {
    const { events, spinning } = this.state;
    return (
      <div>
        <Button onClick={() => this.setState({ spinning: !spinning })}>
          切换 spinning
        </Button>
        <input
          onChange={e => this.setState({ eventKeyword: e.target.value })}
        />
        <Calendar
          eventKeyword={this.state.eventKeyword}
          events={events}
          defaultActiveTab="singleDay"
          onEventDetailsClick={this.handleEventDetailsClick}
          spinning={spinning}
          onDateRangeChange={this.handleChange}
          height={500} 
        />
      </div>
    );
  }
}

stories
  .add('单日（PC 端）', () => <Wrap />)
  .add(
    '单日（移动端）',
    () => (
      <div>
        <Calendar events={mockEvents} defaultActiveTab="singleDay" />
      </div>
    ),
    { viewport: { defaultViewport: 'iphone6' } }
  )
  .add('多日（PC 端）', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar events={mockEvents} defaultActiveTab="multiDay" height={800} />
    </div>
  ))
  .add(
    '多日（移动端）',
    () => (
      <div>
        <Calendar events={multiDaysEvents} defaultActiveTab="multiDay" />
      </div>
    ),
    { viewport: { defaultViewport: 'iphone6' } }
  )
  .add('单周', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar events={mockEvents} defaultActiveTab="singleWeek" />
    </div>
  ))
  .add('多周', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar
        events={[
          {
            calendarId: 9,
            occur_id: 1, // 事件发生编号（唯一）
            category_color: 'rgb(255, 160, 120)',
            event_title: '事件8',
            event_short: '上海市黄埔区茂名南路59号上海花园酒店',
            event_desc: '事件2：一楼大堂右侧',
            occur_begin: '2020-12-16T12:00:00',
            occur_end: '2020-12-16T13:00:00',
            event_hostheadurl: 'http://placekitten.com/32/32',
            event_image: 'http://placekitten.com/200/150',
            event_time: '08:30',
            event_endtime: '09:00',
            event_weather: 2,
            event_attach: ['附件', 'http://www.baidu.com'],
            event_important: 0,
            category_name: '分类1',
            hasPopover: true,
            hasTitle: true,
            hasEditBtn: false, // 没有编辑按钮
            hasViewBtn: true, // 有查看按钮
          },
        ]}
        defaultActiveTab="multiWeek"
      />
    </div>
  ))
  .add('月', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar events={mockEvents} defaultActiveTab="month" />
    </div>
  ))
  .add('年', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar events={mockEvents} defaultActiveTab="year" />
    </div>
  ))
  .add('议程（PC 端）', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar events={mockEvents} defaultActiveTab="agenda" />
    </div>
  ))
  .add(
    '议程（移动端）',
    () => (
      <div style={{ padding: 10 }}>
        <Calendar events={mockEvents} defaultActiveTab="agenda" />
      </div>
    ),
    { viewport: { defaultViewport: 'iphone5' } }
  )
  .add('计划（PC 端）', () => (
    <div
      style={{
        height: '100vh',
        padding: '20px 40px',
        background: '#f5f5f5',
        overflowY: 'auto',
      }}
    >
      <Calendar events={mockEvents} defaultActiveTab="plan" />
    </div>
  ))
  .add(
    '计划（移动 端）',
    () => <Calendar events={mockEvents} defaultActiveTab="plan" />,
    {
      viewport: { defaultViewport: 'iphone5' },
    }
  );
