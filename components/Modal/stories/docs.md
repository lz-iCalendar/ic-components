# Modal

## Example

```javascript
<Modal
  visible={visible}
  onClose={this.handleClose}
  header={<div style={{ textAlign: 'center' }}>Header</div>}
  destroyOnClose
>
  <div>content</div>
</Modal>
```

## props

|      属性      |     类型     | 默认值 |         描述         |
| :------------: | :----------: | :----: | :------------------: |
|    visible     |  `boolean`   | false  |       是否显示       |
|    onClose     | `function()` |   -    |     关闭时的回调     |
|     header     | `ReactNode`  |   -    |         头部         |
|     width      |   `number`   |   -    |         宽度         |
|     height     |   `number`   |   -    |         高度         |
|     height     |   `number`   |   -    |         高度         |
|     zIndex     |   `number`   |   -    |         层级         |
| destroyOnClose |  `boolean`   | false  | 关闭时是否销毁子元素 |
