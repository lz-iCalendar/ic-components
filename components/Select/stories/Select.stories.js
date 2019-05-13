import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Select from '../';
import docs from './docs.md';
import IcDecorator from '../../../IcDecorator';

import '../style/index.less';
import './stories.less';

import Trigger from 'rc-trigger';

const { Option } = Select;

class SelectDemo1 extends React.Component {
  state = {
    value: '',
  };

  handleChange = value => {
    this.setState({ value });
  };

  options = [
    {
      label: 1,
      value: 1,
    },
    {
      label: 2,
      value: 2,
    },
    {
      label: 3,
      value: 3,
    },
  ];

  render() {
    const { value } = this.state;
    return (
      <div>
        <Select
          style={{ width: 120 }}
          value={value}
          onChange={this.handleChange}
        >
          {this.options.map(option => (
            <Option key={option.value} value={option.value}>
              {option.label}
            </Option>
          ))}
        </Select>
      </div>
    );
  }
}

storiesOf('Select 选择器', module).add(
  'Select',
  () => (
    <IcDecorator>
      <SelectDemo1 />
    </IcDecorator>
  ),

  {
    notes: {
      markdown: docs,
    },
  }
);
