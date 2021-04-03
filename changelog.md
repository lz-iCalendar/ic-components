## Release v2.0.0

### v2 版本想对于 v1 版本，主要是将 antd@3.x 升级到了 antd@4.x

- feat:添加 FieldsBoard 组件
- feat:添加 FormInput 组件
- feat:添加 HeaderFooterFixedLayout 组件
- remove:除以上三个组件，其他组件在 v2 版本暂时被移除

## Release v1.4.1

- fix:修复议程视图没有编辑/查看事件的按钮

## Release v1.4.0

- fix:修复 onEventView 回调在多周和月视图中无效的 bug

## Release v1.3.1

- feat:将 antd 作为 peerDependencies

## Release v1.3.0

- feat:添加 hasEditBtn 和 hasViewBtn 事件属性
- feat:Calendar 组件添加 onEventView props

## Release v1.2.1

- fix:修复 hasPopover 和 hasTitle 在多周/月/年视图中无效的 bug

## Release v1.2.0

- feat:事件添加 hasPopover 和 hasTitle 属性用于控制事件 popover 和 title 的显示与隐藏

## Release v1.1.2

- fix:修复计划视图有的日历不显示出来的 bug（传入的事件需要有 calendarId 这个属性，否则计划视图会有问题）

## Release v1.1.0

- fix:修复编译报错的 bug
- remove:移除 Icon

## Release v1.0.0

- update
- Update docs
- fix:修复 Calendar 组件在移动端不能左右滑动的 bug
- feat:添加对 forbidRender 事件参数的处理
- feat:Calendar 组件的 onDateRangeChange 回调添加第二个参数
- feat:Calendar 组件添加 yearSpinning 属性
- fix:修复 Calendar 组件在多周视图进行切换时,不会调用 onDateRangeChange 的 bug
- feat:Calendar 组件添加 spinner 属性
- fix:修复 Calendar 组件中 map 方法渲染缺少 key 的 bug
- feat:修复 Calendar 组件切换至月视图时,回调参数错误的 bug
- Merge branch 'master' of github.com:lz-iCalendar/ic-components
- feat:修复 Calendar 组件切换至月视图时,回调参数错误的 bug
- update
- update
- fix:修复 Calendar 组件中 SingleDayView 组件中 key 未传值的 bug
- 更新
- 修改日历视图根据重要筛选部分
- 修改事件弹框页面，增加三个编辑按钮
- 🌈 修改了字段不对应
- 增加 avatar
- 修复显示 bug
- 修复了月视图，多周视图点击事件报错 bug
- 修复了月视图，多周视图点击事件报错 bug
- feat:完善日历组件弹窗详情
- fix bugs
- 0.5.0
- 优化了事件时间跨度超过 20 天渲染性能
- update
- feat:Calendar 组件添加 onEventDetailsClick 属性
- update
- update
- feat:Button 组件添加 disabled 属性
- feat:添加视图中事件的详情组件
- docs:补充文档
- feat:添加 Avatar 组件
- feat:Add InputNumber Component
- 优化 Icon 组件
- feat:export TextArea and Popover
- docs:update readme.md
- feat:添加 Popover 组件
- feat:添加 TextArea 组件
- feat:Button 组件 type 属性添加 defualt 可选值
- chore: export components in index.tsx
- feat:完成 Select 组件文档
- feat:Input 和 Search 组件添加 transition
- feat:添加 Select 组件
- update
- feat:Add Switch component
- feat:IcDecorator 组件添加 style
- fix:修复 Warning: This synthetic event is reused for performance reasons 警告
- Merge branch 'master' of github.com:lz-iCalendar/ic-components
- feat:修改组件呈现方式
- feat:Button 组件添加 block 属性
- feat:添加 IcDecorator 组件
- feat:添加 IcDecorator 组件
- feat:Checkbox 组件使用主题色
- feat:添加 Button 组件 hover 和 active 样式
- chore:添加 Button 组件文档
- feat:修改 @primary-color less 变量
- fix:修复 Modal 组件 destroyOnClose 属性警告
- feat:Add Checkbox component
- chore:Update readme.md
- fix:修复 Modal 组件在 visible 为 true 时，Modal 窗口的位置错位的 bug
- feat:Modal 组件添加动画，且添加 Modal 组件文档
- feat:添加复制 icon 组件功能
- fix:修复 Icon 组件 size 属性 bug
- update docs
- feat:Add Button component
- feat:Add wechat icon to Icon component
- feat:Add @primary-color variable
- feat:Mod Modal component body classname
- Merge branch 'master' of github.com:lz-iCalendar/ic-components
- Initial commit
- feat:Use Icon component to Search component
- feat:Add zIndex prop to Modal component
- feat:Add search icon to Icon component
- chore:Add Input component props info
- chore:Remove file
- feat:Add Modal component
- feat:Add Icon component
- chore:Update Storybook
- chore:Mod Storybook config
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- fix: disable pan
- fix style
- feat: switch view when panning horizontally on moible
- refactor
- Update Storybook
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- fix: DailyCalendar and Plan view's style issues
- 0.4.0
- update stories
- feat:移动端可以显示计划视图
- fix:修复时间线在 Safari 中的样式问题
- feat:议程适配移动端
- refactor: DayTimeLine styles
- fix: plan view style issues
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- fix: agenda view switch date range
- feat:Calendar update
- feat:Add Plan
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- fix: DayTimeLine styles on PC
- Upgrade Storybook
- Merge branch 'master' of github.com:realsungroup/icalViewComponent
- Upgrade Storybook
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- refactor: DayTimeLine, DailyCalendar
- Modify style
- fix: agenda issues
- chore: Calendar stories
- fix: year calendar style issues
- fix: year calendar style issues
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- feat: year calendar
- chore:Add storybook addons
- chore:Add @storybook/addon-viewport
- update
- update Storybook
- multiple weeks view
- some refactor and single week view
- fix: key
- 0.3.0
- chore:npm scripts doploy-storybook -> deploy
- feat:Add Plan component
- update
- fix: style
- fix:EventBar bug
- fix:EventBar bug
- feat:Add EventBar component
- 0.2.1
- fix:Search bug
- Merge branch 'master' of github.com:realsungroup/icalViewComponent
- fix: calendar bug fix
- 0.2.0
- Merge branch 'master' of github.com:realsungroup/icalViewComponent
- feat:Add Search component
- feat:add Input component
- feat: Calendar onDateRangeChange interface
- fix: calendar date switcher
- fix: daily calendar event styles
- Merge branch 'master' of https://github.com/realsungroup/icalViewComponent
- improve date switcher
- daily calendar
- chore:remove private filed
- Merge branch 'master' of github.com:realsungroup/ic-components
- update
- fix: replace img element
- js to tsx
- Merge branch 'master' of github.com:realsungroup/ic-components
- yarn.lock
- chore:update package.json
- merge yarn.lock and package.json
- rafactor: dateUtil
- chore:add .npmignore
- chore:update .gitignore
- fix:fix use Typescript compilation fails
- update
- adjust styles
- fix:className error
- refactor:style
- refactor:move components
- refactor:use storybook
- Merge branch 'master' of github.com:realsungroup/icalViewComponent
- docs:update README.md
- Calendar gets events from props
- daily calendar (not completed)
- fix: modify agenda view
- agenda view
- monthly calendar
- eject config
- eject config
- remove license
- add license
- add license
- Initial commit from Create React App
