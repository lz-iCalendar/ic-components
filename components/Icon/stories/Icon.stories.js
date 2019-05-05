import React from 'react';
import { storiesOf } from '@storybook/react';
import Icon from '../';

import docs from './docs.md';

import '../style/index.less';

const SingeIcon = ({ onCopy, type, size }) => {
  return (
    <div onClick={() => onCopy(`<Icon type={${type}} />`)}>
      <Icon type={type} size={size} />
      <span>{type}</span>
    </div>
  );
};

class IconTest extends React.Component {
  handleCopy = () => {
    console.log('copied');
  };

  render() {
    return (
      <div>
        <SingeIcon onCopy={this.handleCopy} type="search" size={36} />
      </div>
    );
  }
}

storiesOf('Icon 字体图标', module).add('字体图标', () => <IconTest />, {
  notes: {
    markdown: docs,
  },
});
