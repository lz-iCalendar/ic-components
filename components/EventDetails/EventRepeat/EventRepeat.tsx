import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import cloneDeep from 'lodash/cloneDeep';
import { Tabs, Form, InputNumber, Button } from 'antd';
import './EventRepeat.less';

const { TabPane } = Tabs;

const noop = () => {};

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
    //   dayContinue: 5,
    //   // week
    //   week: 1,
    //   weekDays: [0, 1],
    //   weekContinue: 5,
    //   // month
    //   month: 1,
    //   monthPosition: '上海',
    //   monthContinue: 5,
    //   // year
    //   year: 1,
    //   yearPosition: '上海',
    //   yearContinue: 5
    // }

    /**
     * 点击保存时的回调
     * 默认：noop
     */
    onSave: PropTypes.func,
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

  render() {
    const { form, defaultValues } = this.props;
    const { getFieldDecorator } = form;
    return (
      <div className="ic-event-repeat">
        <Form labelCol={{ span: 6 }} wrapperCol={{ span: 14 }}>
          <Tabs defaultActiveKey="1" animated={false}>
            <TabPane tab="每日" key="1">
              <Form.Item label="每">
                {getFieldDecorator('day', {
                  initialValue: defaultValues.day,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="持续">
                {getFieldDecorator('dayContinue', {
                  initialValue: defaultValues.dayContinue,
                })(<InputNumber />)}
              </Form.Item>
            </TabPane>
            <TabPane tab="每周" key="2">
              <Form.Item label="每">
                {getFieldDecorator('week', {
                  initialValue: defaultValues.week,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="在">
                {getFieldDecorator('weekDays', {
                  initialValue: defaultValues.weekDays,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="持续">
                {getFieldDecorator('weekContinue', {
                  initialValue: defaultValues.weekContinue,
                })(<InputNumber />)}
              </Form.Item>
            </TabPane>
            <TabPane tab="每月" key="3">
              <Form.Item label="每">
                {getFieldDecorator('month', {
                  initialValue: defaultValues.month,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="在">
                {getFieldDecorator('monthPosition', {
                  initialValue: defaultValues.monthPosition,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="持续">
                {getFieldDecorator('monthContinue', {
                  initialValue: defaultValues.monthContinue,
                })(<InputNumber />)}
              </Form.Item>
            </TabPane>
            <TabPane tab="每年" key="4">
              <Form.Item label="每">
                {getFieldDecorator('year', {
                  initialValue: defaultValues.year,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="在">
                {getFieldDecorator('yearPosition', {
                  initialValue: defaultValues.yearPosition,
                })(<InputNumber />)}
              </Form.Item>
              <Form.Item label="持续">
                {getFieldDecorator('yearPosition', {
                  initialValue: defaultValues.yearContinue,
                })(<InputNumber />)}
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
