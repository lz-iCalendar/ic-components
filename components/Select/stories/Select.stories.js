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
    checked: false,
  };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;
    return <Select />;
  }
}

storiesOf('Select 选择器', module).add(
  'Select',
  () => (
    <IcDecorator info="Select 组件">
      <SelectDemo1 />
    </IcDecorator>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
