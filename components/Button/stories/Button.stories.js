import React from 'react';
import { storiesOf } from '@storybook/react';
import { actions } from '@storybook/addon-actions';
import Button from '../';
import docs from './docs.md';

import '../style/index.less';
import './stories.less';

storiesOf('Button 按钮', module)
  .add('primary', () => <Button type="primary">primary</Button>, {
    notes: {
      markdown: docs,
    },
  })
  .add('text', () => <Button type="text">text</Button>, {
    notes: {
      markdown: docs,
    },
  })
  .add(
    'block',
    () => (
      <Button type="primary" block>
        block
      </Button>
    ),
    {
      notes: {
        markdown: docs,
      },
    }
  );
