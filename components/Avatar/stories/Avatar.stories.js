import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Avatar from '../';
import docs from './docs.md';
import IcDecorator from '../../../IcDecorator';

import '../style/index.less';
import './stories.less';

class AvatarDemo extends React.Component {
  state = {
    checked: false,
  };

  handleChange = checked => {
    this.setState({ checked });
  };

  render() {
    return (
      <Avatar
        size={50}
        src="http://gss0.baidu.com/7Po3dSag_xI4khGko9WTAnF6hhy/zhidao/pic/item/1f178a82b9014a90d146a5b5ae773912b31beeba.jpg"
      />
    );
  }
}

storiesOf('Avatar 头像', module).add(
  'Avatar',
  () => (
    <IcDecorator info="Avatar 组件">
      <AvatarDemo />
    </IcDecorator>
  ),
  {
    notes: {
      markdown: docs,
    },
  }
);
