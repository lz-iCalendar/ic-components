import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Checkbox from '../';
import docs from './docs.md';

import '../style/index.less';
import './stories.less';

class CheckboxDemo extends React.Component {
  state = {
    checked1: false,
    checked2: false,
  };

  handleChange1 = e => {
    this.setState({ checked1: e.target.checked });
  };

  handleChange2 = e => {
    this.setState({ checked2: e.target.checked });
  };

  render() {
    const { checked1, checked2 } = this.state;
    return (
      <div style={{ padding: 24 }}>
        <div>
          <Checkbox checked={checked1} onChange={this.handleChange1}>
            label 1
          </Checkbox>
        </div>

        <div>
          <Checkbox checked={checked2} onChange={this.handleChange2} labelPlacement="left">
            label 2
          </Checkbox>
        </div>
      </div>
    );
  }
}

storiesOf('Checkbox 多选框', module).add('Checkbox', () => <CheckboxDemo />, {
  notes: {
    markdown: docs,
  },
});
