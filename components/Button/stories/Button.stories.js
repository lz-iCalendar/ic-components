import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../';

import '../style/index.less';
import './stories.less';

class ModalTest extends React.Component {
  state = {
    visible: false,
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleOpen}>Button</Button>
      </div>
    );
  }
}

storiesOf('Button 按钮', module)
  .add('primary', () => <Button type="primary">primary</Button>)
  .add('text', () => <Button type="text">text</Button>);
