import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { Tabs, Form, InputNumber, Button, Select, DatePicker } from 'antd';
import './EventRepeat.less';
import moment from 'moment';

const { TabPane } = Tabs;

const noop = () => {};

const { Option } = Select;

const continueList = [
  {
    label: '永远',
    value: 'always',
  },
  {
    label: '共',
    value: 'count',
  },
  {
    label: '直到',
    value: 'until',
  },
];

const weekDayList = [
  {
    label: '周一',
    value: 1,
  },
  {
    label: '周二',
    value: 2,
  },
  {
    label: '周三',
    value: 3,
  },
  {
    label: '周四',
    value: 4,
  },
  {
    label: '周五',
    value: 5,
  },
  {
    label: '周六',
    value: 6,
  },
  {
    label: '周日',
    value: 0,
  },
];

const getMomentValue = value => {
  return value instanceof moment ? value : moment();
};

/**
 * 事件重复
 */
class EventRepeat extends React.PureComponent<any, any> {
  static propTypes = {
    /**
     * 表单的默认值
     * 默认：{}
     */
    defaultValues: PropTypes.object,
    // defaultValues: {
    //   timeZone: '+8',
    //   // day
    //   day: 1,
    //   dayContinue: {
    //     type: 'always', // 持续的类型：'always' 永远 | 'count' 共 | 'until' 直到
    //     value: 5, // type === 'always' 时，value 可无；type === 'count' 时，value 表示持续的次数； type === 'until' 时，value 表示持续到的时间
    //   },
    //   // week
    //   week: 1,
    //   weekDays: [0, 1],
    //   weekContinue: {
    //     type: 'always', // 持续的类型：'always' 永远 | 'count' 共 | 'until' 直到
    //     value: 5, // type === 'always' 时，value 可无；type === 'count' 时，value 表示持续的次数； type === 'until' 时，value 表示持续到的时间
    //   },
    //   // month
    //   month: 1,
    //   monthPosition: 1, // 在
    //   monthContinue: {
    //     type: 'always', // 持续的类型：'always' 永远 | 'count' 共 | 'until' 直到
    //     value: 5, // type === 'always' 时，value 可无；type === 'count' 时，value 表示持续的次数； type === 'until' 时，value 表示持续到的时间
    //   },
    //   // year
    //   year: 1,
    //   yearPosition: 1, // 在
    //   yearContinue: {
    //     type: 'always', // 持续的类型：'always' 永远 | 'count' 共 | 'until' 直到
    //     value: 5, // type === 'always' 时，value 可无；type === 'count' 时，value 表示持续的次数； type === 'until' 时，value 表示持续到的时间
    //   }
    // }

    /**
     * 点击保存时的回调
     * 默认：noop
     */
    onSave: PropTypes.func,

    status: PropTypes.string,
  };

  static defaultProps = {
    defaultValues: {},
    onSave: noop,
  };

  handleSave = () => {
    const { validateFields } = this.props.form;
    validateFields((err, values) => {
      if (err) {
        return;
      }
      this.props.onSave(values);
    });
  };

  renderDayOther = () => {
    const { defaultValues, form } = this.props;
    const { getFieldValue, getFieldDecorator } = form;
    const type = getFieldValue('dayContinueType');

    if (type === 'always') {
      return null;
    } else if (type === 'count') {
      return (
        <Form.Item label="dayValue" key="dayContinueValue-1" className="ic-event-repeat__no-label">
          {getFieldDecorator('dayContinueValue', {
            initialValue: defaultValues.dayContinue.value,
          })(<InputNumber />)}
          次
        </Form.Item>
      );
    } else if (type === 'until') {
      return (
        <Form.Item label="dayValue" key="dayContinueValue-2" className="ic-event-repeat__no-label">
          {getFieldDecorator('dayContinueValue', {
            initialValue: getMomentValue(defaultValues.dayContinue.value),
          })(<DatePicker />)}
        </Form.Item>
      );
    }
  };

  render() {
    const { form, defaultValues, status } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="ic-event-repeat">
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Tabs defaultActiveKey="1" animated={false}>
            {/* 每日 */}
            <TabPane tab="每日" key="1">
              <Form.Item label="每">
                {status === 'edit' ? (
                  getFieldDecorator('day', {
                    initialValue: defaultValues.day,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
                日
              </Form.Item>
              <Form.Item label="持续">
                {status === 'edit' ? (
                  getFieldDecorator('dayContinueType', {
                    initialValue: defaultValues.dayContinue.type,
                  })(
                    <Select>
                      {continueList.map(item => (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )
                ) : (
                  <span>{defaultValues.day ? defaultValues.day : '/'}</span>
                )}
              </Form.Item>
              {this.renderDayOther()}
            </TabPane>
            {/* 每周 */}
            <TabPane tab="每周" key="2">
              <Form.Item label="每">
                {status === 'edit' ? (
                  getFieldDecorator('week', {
                    initialValue: defaultValues.week,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
              <Form.Item label="在">
                {status === 'edit' ? (
                  getFieldDecorator('weekDays', {
                    initialValue: defaultValues.weekDays,
                  })(
                    <Select mode="multiple">
                      {weekDayList.map(item => (
                        <Option key={item.value} value={item.value}>
                          {item.label}
                        </Option>
                      ))}
                    </Select>
                  )
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
              <Form.Item label="持续">
                {status === 'edit' ? (
                  getFieldDecorator('weekContinue', {
                    initialValue: defaultValues.weekContinue.type,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
            </TabPane>
            {/* 每月 */}
            <TabPane tab="每月" key="3">
              <Form.Item label="每">
                {status === 'edit' ? (
                  getFieldDecorator('month', {
                    initialValue: defaultValues.month,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
              <Form.Item label="在">
                {status === 'edit' ? (
                  getFieldDecorator('monthPosition', {
                    initialValue: defaultValues.monthPosition,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
              <Form.Item label="持续">
                {status === 'edit' ? (
                  getFieldDecorator('monthContinue', {
                    initialValue: defaultValues.monthContinue.type,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
            </TabPane>
            {/* 每年 */}
            <TabPane tab="每年" key="4">
              <Form.Item label="每">
                {status === 'edit' ? (
                  getFieldDecorator('year', {
                    initialValue: defaultValues.year,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
              <Form.Item label="在">
                {status === 'edit' ? (
                  getFieldDecorator('yearPosition', {
                    initialValue: defaultValues.yearPosition,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
              <Form.Item label="持续">
                {status === 'edit' ? (
                  getFieldDecorator('yearPosition', {
                    initialValue: defaultValues.yearContinue.type,
                  })(<InputNumber />)
                ) : (
                  <span>{defaultValues.day}</span>
                )}
              </Form.Item>
            </TabPane>
          </Tabs>
          <div className="ic-event-repeat__time-zone">
            <Form.Item label="时区">亚洲，上海</Form.Item>
          </div>
        </Form>
        <Button block type="primary" onClick={this.handleSave}>
          保存
        </Button>
      </div>
    );
  }
}

export default Form.create()(EventRepeat);
