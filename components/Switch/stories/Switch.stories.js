import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Switch from '../';
import docs from './docs.md';
import IcDecorator from '../../../IcDecorator';

import '../style/index.less';
import './stories.less';

class SwitchDemo1 extends React.Component {
  state = {
    checked: false,
  };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    const { checked } = this.state;
    return <Switch checked={checked} onChange={this.handleChange} />;
  }
}

storiesOf('Switch 开关', module).add(
  'Switch',
  () => (
    <IcDecorator info="Switch 组件">
      <SwitchDemo1 />
    </IcDecorator>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
