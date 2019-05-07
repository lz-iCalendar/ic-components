import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Checkbox from '../';
import docs from './docs.md';
import IcDecorator from '../../../IcDecorator';

import '../style/index.less';
import './stories.less';

class CheckboxDemo1 extends React.Component {
  state = {
    checked: false,
  };

  handleChange = e => {
    this.setState({ checked: e.target.checked });
  };

  render() {
    const { checked } = this.state;
    return (
      <Checkbox checked={checked} onChange={this.handleChange}>
        label
      </Checkbox>
    );
  }
}

class CheckboxDemo2 extends React.Component {
  state = {
    checked: false,
  };

  handleChange = e => {
    this.setState({ checked: e.target.checked });
  };

  render() {
    const { checked } = this.state;
    return (
      <Checkbox checked={checked} onChange={this.handleChange} labelPlacement="left">
        label
      </Checkbox>
    );
  }
}

storiesOf('Checkbox 多选框', module)
  .add(
    'right',
    () => (
      <IcDecorator info="labelPlacement 为 right">
        <CheckboxDemo1 />
      </IcDecorator>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  )
  .add(
    'left',
    () => (
      <IcDecorator info="labelPlacement 为 left">
        <CheckboxDemo2 />
      </IcDecorator>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  );
