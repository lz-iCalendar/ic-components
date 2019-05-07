import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../';
import docs from './docs.md';

import '../style/index.less';
import './stories.less';

class ModalTest extends React.Component {
  state = {
    visible: false,
  };

  render() {
    const { visible } = this.state;
    return (
      <div style={{ padding: 24 }}>
        <Button onClick={this.handleOpen}>Button</Button>
      </div>
    );
  }
}

storiesOf('Button 按钮', module)
  .add(
    'primary',
    () => (
      <Button type="primary" style={{ margin: 24 }}>
        primary
      </Button>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  )
  .add(
    'text',
    () => (
      <Button type="text" style={{ margin: 24 }}>
        text
      </Button>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  );
