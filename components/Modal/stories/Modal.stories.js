import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Modal from '../';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';
import Button from '../../Button';
import IcDecorator from '../../../IcDecorator';

class ModalDemo extends React.Component {
  state = {
    visible: false,
  };

  handleClose = () => {
    this.setState({ visible: false });
  };

  handleOpen = () => {
    this.setState({ visible: true });
  };

  render() {
    const { visible } = this.state;
    return (
      <div>
        <Button onClick={this.handleOpen}>打开 Modal</Button>
        <Modal
          visible={visible}
          onClose={this.handleClose}
          header={<div style={{ textAlign: 'center' }}>Header</div>}
          destroyOnClose
        >
          <div>content</div>
        </Modal>
      </div>
    );
  }
}

storiesOf('Modal 模态窗', module).add(
  '模态窗',
  () => (
    <IcDecorator info="模态窗">
      <ModalDemo />
    </IcDecorator>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
