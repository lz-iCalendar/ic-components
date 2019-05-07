import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../';
import docs from './docs.md';
import '../style/index.less';
import './stories.less';
import IcDecorator from '../../../IcDecorator';

storiesOf('Button 按钮', module)
  .add(
    'primary',
    () => (
      <IcDecorator info="普通按钮">
        <Button type="primary">primary</Button>
      </IcDecorator>
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
      <IcDecorator info="文字按钮">
        <Button type="text">text</Button>
      </IcDecorator>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  )
  .add(
    'block',
    () => (
      <IcDecorator info="宽度为父元素宽度的按钮">
        <Button type="primary" block>
          block
        </Button>
      </IcDecorator>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  );
