import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import EventDetails from '../';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';
import IcDecorator from '../../../IcDecorator';
import moment from 'moment';
import _1Jpg from '../assets/1.jpg';
import _2Jpg from '../assets/2.jpg';

const eventData = {
  title: '事件标题', // 事件标题,
  isAllDay: true, // 是否为全天事件
  startTime: moment('2019-06-30 12:00:00'), // 开始时间
  endTime: moment('2019-06-30 13:00:00'), // 结束时间
  timeZone: '+8', // 时区
  position: '上海市普通新区世纪大道 2000 号', // 地点
  attendees: [{ userId: 1, name: 'Jacky', email: 'Jacky@gmail.com' }], // 参加者
  desc: '这里是事件详情', // 事件详情
  statistics: [
    // 人数统计
    { label: '参加', type: 'participator', count: 9 }, // 参加的
    { label: '不参加', type: 'nonparticipating', count: 2 }, // 不参加的
    { label: '待定', type: 'undetermined', count: 2 }, //  待定的
  ],
  calendars: [{ calendarId: 1, name: '日历1' }, { calendarId: 2, name: '日历2' }, { calendarId: 3, name: '日历3' }], // 事件所属日历
  repeat: null, // 重复（待定）
  reminder: null, // 提醒（待定）
  images: [_1Jpg, _2Jpg],
  option: {
    // 选项
    isImportant: true, // 是否重要
    hasComment: true, // 是否有评论
    hasApply: true, // 是否能报名
    max: 2, // 限额
    money: 5, // 金额
  },
  comments: [
    {
      commentId: 1,
      userInfo: {
        name: 'Karl',
        avatarUrl:
          'http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1f178a82b9014a90d146a5b5ae773912b31beeba.jpg',
      },
      comment: '这里是事件评论',
    },
  ], // 评论
};

class EventDetailsDemo extends React.Component {
  handleRemove = () => {
    console.log('Remove clicked!');
  };
  handleSave = formData => {
    console.log({ formData });
    console.log('Save clicked!');
  };

  handleComment = comment => {
    console.log({ comment });
  };

  render() {
    return (
      <div>
        <EventDetails
          data={eventData}
          onRemove={this.handleRemove}
          onSave={this.handleSave}
          onComment={this.handleComment}
        >
          default
        </EventDetails>
      </div>
    );
  }
}

storiesOf('EventDetails 事件详情', module).add('事件详情组件', () => <EventDetailsDemo />, {
  notes: {
    markdown: docs,
  },
});
