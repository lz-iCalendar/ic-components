import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Popover from '../';
import docs from './docs.md';
import IcDecorator from '../../../IcDecorator';

import '../style/index.less';
import './stories.less';

class PopoverDemo1 extends React.Component {
  render() {
    const { placement } = this.props;
    return (
      <Popover
        content={<div style={{ width: 100, height: 70, padding: 8 }}>content</div>}
        placement={placement}
        // trigger="click"
      >
        <button>{placement}</button>
      </Popover>
    );
  }
}

storiesOf('Popover 气泡卡片', module).add(
  'Popover',
  () => (
    <div style={{ padding: 50 }}>
      <IcDecorator info="placement = top">
        <PopoverDemo1 placement="top" />
      </IcDecorator>
      <IcDecorator info="placement = right">
        <PopoverDemo1 placement="right" />
      </IcDecorator>
      <IcDecorator info="placement = bottom">
        <PopoverDemo1 placement="bottom" />
      </IcDecorator>
      <IcDecorator info="placement = left">
        <PopoverDemo1 placement="left" />
      </IcDecorator>
      <IcDecorator info="placement = topLeft">
        <PopoverDemo1 placement="topLeft" />
      </IcDecorator>
      <IcDecorator info="placement = topRight">
        <PopoverDemo1 placement="topRight" />
      </IcDecorator>
      <IcDecorator info="placement = bottomLeft">
        <PopoverDemo1 placement="bottomLeft" />
      </IcDecorator>
      <IcDecorator info="placement = bottomRight">
        <PopoverDemo1 placement="bottomRight" />
      </IcDecorator>
      <IcDecorator info="placement = leftTop">
        <PopoverDemo1 placement="leftTop" />
      </IcDecorator>
      <IcDecorator info="placement = leftBottom">
        <PopoverDemo1 placement="leftBottom" />
      </IcDecorator>
      <IcDecorator info="placement = rightTop">
        <PopoverDemo1 placement="rightTop" />
      </IcDecorator>
      <IcDecorator info="placement = rightBottom">
        <PopoverDemo1 placement="rightBottom" />
      </IcDecorator>
    </div>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
