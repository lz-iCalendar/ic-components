# Popover

## Example

```javascript
<Popover content={<div>我是 Popover 组件中的内容</div>}>
  <button>button</button>
</Popover>
```

## props

|       属性        |        类型         |       默认值        |                   描述                   |
| :---------------: | :-----------------: | :-----------------: | :--------------------------------------: |
|      content      |  `React.ReactNode`  |          -          |             Popover 中的内容             |
|     children      |  `React.ReactNode`  |          -          |        触发显示 Popover 的子元素         |
|      trigger      |  `string` `array`   |          -          | 触发行为，可选值 `hover` `click` `focus` |
| getPopupContainer | `() => HtmlElement` | () => document.body |         popover 渲染所在的父节点         |
|     placement     |      `string`       |     bottomLeft      |               气泡卡片位置               |
