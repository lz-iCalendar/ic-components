import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import {
  Icon,
  Checkbox,
  DatePicker,
  TimePicker,
  Switch,
  Form,
  Input,
  Select,
  Button,
  InputNumber,
  Modal,
  Tabs,
} from 'antd';
import EventComments from './EventComments';
import Swiper from 'swiper';
import 'swiper/dist/css/swiper.css';
import EventRepeat from './EventRepeat';

const { Option } = Select;
const { TextArea } = Input;
const { TabPane } = Tabs;

const timeZoneList = [
  {
    label: '上海，亚洲',
    value: '+8',
  },
];
const noop = () => {};

class EventDetails extends React.Component<any, any> {
  static propTypes = {
    /**
     * 事件数据
     */
    data: PropTypes.object,
    // data: {
    //   title: '事件标题', // 事件标题,
    //   isAllDay: true, // 是否为全天事件
    //   startTime: moment('2019-06-30 12:00:00'), // 开始时间
    //   endTime: moment('2019-06-30 12:00:00'), // 结束时间
    //   timeZone: '+8', // 时区
    //   position: '上海市普通新区世纪大道 2000 号', // 地点
    //   attendees: [{ name: 'Jacky', email: 'Jacky@gmail.com' }], // 参加者
    //   desc: '这里是事件详情', // 事件详情
    //   statistics: [
    //     // 人数统计
    //     { type: 'participator', count: 9 }, // 参加的
    //     { type: 'nonparticipating', count: 2 }, // 不参加的
    //     { type: 'undetermined', count: 2 }, //  待定的
    //   ],
    //   calendars: [{ name: '日历1' }, { name: '日历2' }, { name: '日历3' }], // 事件所属日历
    //   repeat: null, // 重复（待定）
    //   reminder: null, // 提醒（待定）
    //   option: {
    //     // 选项
    //     isImportant: true, // 是否重要
    //     hasComment: true, // 是否有评论
    //     hasApply: true, // 是否能报名
    //     max: 2, // 限额
    //     money: 5, // 金额
    //   },
    //   comments: [{ userInfo: { name: 'Karl', avatarUrl: 'http://xxx.xx/xx.png' }, comment: '这里是事件评论' }], // 评论
    // },
    /**
     * 模式：'edit' 编辑模式 | 'view' 查看模式
     * 默认：'view'
     */
    mode: PropTypes.oneOf(['edit', 'view']),

    /**
     * 点击保存时的回调：(data) => {}，data 表示表单数据
     * 默认：noop
     */
    onSave: PropTypes.func,

    /**
     * 点击删除时的回调：() => {}
     * 默认：noop
     */
    onRemove: PropTypes.func,

    /**
     * 添加图片时的回调：(file) => {}
     * 默认：noop
     */
    onAddImage: PropTypes.func,
  };

  static defaultProps = {
    mode: 'view',
    onSave: noop,
    onRemove: noop,
    onAddImage: noop,
  };

  constructor(props) {
    super(props);

    const data = cloneDeep(props.data);
    const defaultAttendeesValue = data.attendees.map(item => item.userId);
    const defaultCalendarsValue = data.calendars.map(item => item.calendarId);

    this.state = {
      data,
      defaultAttendeesValue,
      defaultCalendarsValue,
      status: 'edit', // 当前状态：'edit' 编辑状态 | 'view' 查看状态
      title: data.title,
      repeatVisible: true, // 重复 modal 是否显示
    };
  }

  mySwiper;
  componentDidMount = () => {
    this.mySwiper = new Swiper('.ic-event-details__images', {});
  };

  handleTitleChange = e => {
    this.setState({ title: e.target.value });
  };

  renderEventHeader = () => {
    const { mode } = this.props;
    const { title } = this.state;
    if (mode === 'edit') {
      return <input type="text" value={title} onChange={this.handleTitleChange} placeholder="无标题" />;
    }
    return <h1>{title}</h1>;
  };

  handleRemove = () => {
    this.props.onRemove();
  };

  handleCancel = () => {
    this.setState({ status: 'view' });
  };

  handleSave = () => {
    const { validateFields } = this.props.form;

    validateFields((err, values) => {
      if (err) {
        return;
      }
      const { title } = this.state;

      const formData = { ...values, title };
      this.props.onSave(formData);
    });
  };

  handleEditClick = () => {
    this.setState({ status: 'edit' });
  };

  renderEventFooter = () => {
    const { status } = this.state;
    const hasCancel = status === 'edit';
    const hasSave = hasCancel;
    const hasEdit = !hasCancel;
    return (
      <React.Fragment>
        <Button type="danger" onClick={this.handleRemove}>
          删除
        </Button>
        {hasCancel && <Button onClick={this.handleCancel}>取消</Button>}
        {hasSave && (
          <Button type="primary" onClick={this.handleSave}>
            保存
          </Button>
        )}
        {hasEdit && (
          <Button type="primary" onClick={this.handleEditClick}>
            编辑
          </Button>
        )}
      </React.Fragment>
    );
  };

  handleOpenRepeatModal = () => {
    this.setState({ repeatVisible: true });
  };

  handleCloseRepeatModal = () => {
    this.setState({ repeatVisible: false });
  };

  renderRepeatModal = () => {
    const { repeatVisible } = this.state;
    return (
      <Modal
        visible={repeatVisible}
        title={<div style={{ textAlign: 'center' }}>重复</div>}
        onCancel={this.handleCloseRepeatModal}
        footer={null}
        className="ic-event-details__repeat-modal"
      >
        <EventRepeat />
      </Modal>
    );
  };

  handleCloseReminderModal = () => {
    this.setState({ reminderVisible: false });
  };

  renderReminderModal = () => {
    const { reminderVisible } = this.state;
    return (
      <Modal
        visible={reminderVisible}
        title={<div style={{ textAlign: 'center' }}>提醒</div>}
        onCancel={this.handleCloseReminderModal}
      >
        {/* {reminderOptions.map(option => {
          const { selectedReminders } = this.state
          const temp = selectedReminders.find()
          if () {
            
          }
          return (
            <div className="ic-event-details__reminder-item" key={option.value}>
              {option.label}
            </div>
          );
        })} */}
      </Modal>
    );
  };

  handleFileInputChange = e => {
    const file = e.target.files[0];
    this.props.onAddImage(file);
  };

  handleRemoveImage = () => {
    const activeIndex = this.mySwiper.activeIndex;
    Modal.confirm({
      title: '提示',
      content: '您确定要删除该图片吗？',
      onOk: () => this.handleRemoveImageConfirm(activeIndex),
    });
  };

  handleRemoveImageConfirm = activeIndex => {
    const { data } = this.state;
    data.images.splice(activeIndex, 1);
    console.log({ activeIndex });
    this.setState({ data });
    setTimeout(() => {
      this.mySwiper.removeSlide(activeIndex);
    });
  };

  render() {
    const { data, defaultAttendeesValue, defaultCalendarsValue } = this.state;
    const { form, mode } = this.props;
    const {
      isAllDay,
      startTime,
      endTime,
      timeZone,
      position,
      attendees,
      desc,
      statistics,
      calendars,
      option,
      comments,
      images,
    } = data;
    const { getFieldDecorator } = form;

    return (
      <div className="ic-event-details-wrapper">
        <div className="ic-event-details">
          <header className="ic-event-details-header">{this.renderEventHeader()}</header>
          <Form className="ic-event-details__form" labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
            <div className="ic-event-details__section-a">
              <Form.Item label="全天">
                {getFieldDecorator('isAllDay', {
                  initialValue: isAllDay,
                  valuePropName: 'checked',
                })(<Switch />)}
              </Form.Item>
              <Form.Item label="开始">
                {getFieldDecorator('startTime', {
                  initialValue: startTime,
                })(<DatePicker showTime />)}
              </Form.Item>
              <Form.Item label="结束">
                {getFieldDecorator('endTime', {
                  initialValue: endTime,
                })(<DatePicker showTime />)}
              </Form.Item>
              <Form.Item label="时区">
                {getFieldDecorator('timeZone', {
                  initialValue: timeZone,
                })(
                  <Select>
                    {timeZoneList.map(timeZoneListItem => (
                      <Option key={timeZoneListItem.value} value={timeZoneListItem.value}>
                        {timeZoneListItem.label}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="地点">
                {getFieldDecorator('position', {
                  initialValue: position,
                })(<Input />)}
              </Form.Item>
              <Form.Item label="参加者">
                {getFieldDecorator('attendees', {
                  initialValue: defaultAttendeesValue,
                })(
                  <Select mode="multiple">
                    {attendees.map(attendeesItem => (
                      <Option key={attendeesItem.userId} value={attendeesItem.userId}>
                        {attendeesItem.email}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="详情">
                {getFieldDecorator('desc', {
                  initialValue: desc,
                })(<TextArea />)}
              </Form.Item>
              <Form.Item label="统计" className="ic-event-details-no-label">
                <div>
                  {statistics.map(statisticsItem => (
                    <Button key={statisticsItem.type}>
                      {statisticsItem.label}（{statisticsItem.count}）
                    </Button>
                  ))}
                </div>
              </Form.Item>

              <Form.Item label="日历">
                {getFieldDecorator('calendars', {
                  initialValue: defaultCalendarsValue,
                })(
                  <Select mode="multiple">
                    {calendars.map(calendarsItem => (
                      <Option key={calendarsItem.calendarId} value={calendarsItem.calendarId}>
                        {calendarsItem.name}
                      </Option>
                    ))}
                  </Select>
                )}
              </Form.Item>
              <Form.Item label="重复">
                <Button onClick={this.handleOpenRepeatModal}>请设置</Button>
              </Form.Item>
              <Form.Item label="提醒">
                <Button>请选择</Button>
              </Form.Item>
            </div>

            <div className="ic-event-details__section-b">
              <Form.Item label="图片">
                <div className="swiper-container ic-event-details__images">
                  <div className="swiper-wrapper">
                    {images.map(imageUrl => (
                      <div className="swiper-slide" key={imageUrl}>
                        <img src={imageUrl} alt={imageUrl} />
                      </div>
                    ))}
                  </div>
                </div>
                <div className="ic-event-details__images-action">
                  <Icon
                    type="minus-circle"
                    className="ic-event-details__images-action-btn"
                    onClick={this.handleRemoveImage}
                  />
                  <Icon type="plus-circle" className="ic-event-details__images-action-btn" />
                  <input type="file" className="ic-event-details__file-input" onChange={this.handleFileInputChange} />
                </div>
              </Form.Item>
              <Form.Item label="选项" className="ic-event-details-item-bold" />
              <Form.Item label="重要" className="ic-event-details-label-right">
                {getFieldDecorator('isImportant', {
                  initialValue: option.isImportant,
                  valuePropName: 'checked',
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label="评论" className="ic-event-details-label-right">
                {getFieldDecorator('hasComment', {
                  initialValue: option.hasComment,
                })(<Checkbox />)}
              </Form.Item>
              <Form.Item label="报名" className="ic-event-details-label-right">
                {getFieldDecorator('hasApply', {
                  initialValue: option.hasApply,
                  valuePropName: 'checked',
                })(<Switch />)}
              </Form.Item>
              <Form.Item label="限额" className="ic-event-details-label-right">
                {getFieldDecorator('max', {
                  initialValue: option.max,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="金额" className="ic-event-details-label-right">
                {getFieldDecorator('money', {
                  initialValue: option.money,
                })(<InputNumber />)}
              </Form.Item>
            </div>
          </Form>
          <EventComments comments={comments} />
          {mode === 'edit' && <footer className="ic-event-details__footer">{this.renderEventFooter()}</footer>}

          {/* 重复 Modal */}
          {this.renderRepeatModal()}

          {/* 提醒 Modal */}
          {this.renderReminderModal()}
        </div>
      </div>
    );
  }
}

export default Form.create()(EventDetails);
