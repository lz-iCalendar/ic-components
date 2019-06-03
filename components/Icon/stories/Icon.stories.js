import React from 'react';
import { storiesOf } from '@storybook/react';
import ClipboardJS from 'clipboard';
import { message } from 'antd';
import * as icons from 'ic-icons';
import Icon from '../';
import docs from './docs.md';
import '../style/index.less';
import './style.less';
import IcDecorator from '../../../IcDecorator';

// 所有 icon 的 key
const iconKeys = Object.keys(icons);

const SingeIcon = ({ type, size }) => {
  return (
    <div data-clipboard-text={`<Icon type="${type}" />`} className={`single-icon icon__${type}`}>
      <Icon type={type} size={size} />
      <span>{type}</span>
    </div>
  );
};

class IconDemo extends React.Component {
  iconsType = [];

  componentDidMount = () => {
    this.iconsType = iconKeys.map(iconKey => {
      const index = iconKey.indexOf('Out');
      return iconKey.substring(0, index).toLocaleLowerCase();
    });

    this.iconsType.forEach(type => {
      this[type] = new ClipboardJS(`.icon__${type}`);
      this[type].on('success', function(e) {
        message.success('复制成功');
      });
    });
    this.forceUpdate();
  };

  render() {
    return (
      <div className="icon__test">
        {this.iconsType.map(type => (
          <SingeIcon key={type} type={type} size={36} />
        ))}
      </div>
    );
  }
}

storiesOf('Icon 字体图标', module)
  .add(
    '字体图标',
    () => (
      <IcDecorator info="点击字体图标可复制">
        <IconDemo />
      </IcDecorator>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  );
