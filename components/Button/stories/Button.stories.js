import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';
import IcDecorator from '../../../IcDecorator';

class ButtonDemo extends React.Component {
  render() {
    return (
      <React.Fragment>
        <IcDecorator info="default 按钮">
          <Button type="default">default</Button>
        </IcDecorator>
        <IcDecorator info="primary 按钮">
          <Button type="primary">primary</Button>
        </IcDecorator>
        <IcDecorator info="text 按钮">
          <Button type="text">text</Button>
        </IcDecorator>
        <IcDecorator info="按钮的宽度等于父元素宽度" style={{ width: 200 }}>
          <Button type="primary" block>
            block
          </Button>
        </IcDecorator>
      </React.Fragment>
    );
  }
}

storiesOf('Button 按钮', module).add('按钮组件', () => <ButtonDemo />, {
  notes: {
    markdown: docs,
  },
});
