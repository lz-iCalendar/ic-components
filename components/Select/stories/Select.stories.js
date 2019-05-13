import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Select from '../';
import docs from './docs.md';
import IcDecorator from '../../../IcDecorator';

import '../style/index.less';
import './stories.less';

const { Option } = Select;

class SelectDemo1 extends React.Component {
  state = {
    value: 1,
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
        <Select style={{ width: 120 }} value={value} onChange={this.handleChange}>
          <Option value={1}>1</Option>
          <Option value={2}>2</Option>
          <Option value={3}>3</Option>
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
