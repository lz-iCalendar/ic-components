import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import HeaderFooterFixedLayout from '../';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';

class HeaderFooterFixedLayoutDemo extends React.Component {
  render() {
    return (
      <HeaderFooterFixedLayout
        header={'Header'}
        headerClassName="header"
        content={
          <ul>
            {new Array(100).fill(0).map((item, index) => (
              <li>{index}</li>
            ))}
          </ul>
        }
        contentClassName="content"
        footer="Footer"
        footerClassName="footer"
      />
    );
  }
}

storiesOf('HeaderFooterFixedLayout 布局', module).add(
  'HeaderFooterFixedLayout 布局组件',
  () => <HeaderFooterFixedLayoutDemo />,
  {
    notes: {
      markdown: docs,
    },
    viewport: { defaultViewport: 'iphone5' },
  }
);
