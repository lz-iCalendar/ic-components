# Search

## Example

```javascript
<Search value={value} onChange={this.handleChange} onSearch={this.handleSearch} />
```

## props

|   属性   |         类型         | 默认值 |              描述              |
| :------: | :------------------: | :----: | :----------------------------: |
|  value   |       `string`       |   -    |               值               |
| onChange |    `function(e)`     |   -    |     输入框内容变化时的回调     |
| onSearch | `function(value, e)` |   -    | 按下回车或点击搜索图表时的回调 |
