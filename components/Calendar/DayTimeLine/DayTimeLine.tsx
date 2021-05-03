import React from 'react';
import classnames from 'classnames';
import { getDayTimeLine } from '../../utils/dateUtil';
import ChildrenWithProps from '../../ChildrenWithProps';
import PropTypes from 'prop-types';

/**
 * 一天的时间线组件，包含两部分：
 * 1. 左侧的 “时分” 时间列表
 * 2. 右侧的 row 背景
 */
export default class DayTimeLine extends React.PureComponent<any, any> {
  static propTypes = {
    /**
     * 开始时间
     * 默认：'00:00'
     */
    startHHmm: PropTypes.string,

    /**
     * 结束时间
     * 默认：'23:59'
     */
    endHHmm: PropTypes.string,

    /**
     * 时间步长
     * 默认：'15:m'，即 15 分钟为一个步长
     */
    step: PropTypes.string,

    /**
     * 时间格式
     * 默认：'hh:mm a'
     */
    formatString: PropTypes.string,
  };

  static defaultProps = {
    startHHmm: '00:00',
    endHHmm: '23:59',
    step: '60:m',
    formatString: 'ha',
    timeSuffix: ['am', 'pm'],
  };

  state = {
    mainViewScrollHeight: undefined,
    topEventRowHeight: undefined,
    titleRowRightWidth: undefined,
    titleRowRightElement: undefined,
    scrollHeight: '100%',
  };

  mainViewRef: any = React.createRef();
  topEventRowRightRef: any = React.createRef();
  titleRowRightRef: any = React.createRef();
  timeColumnRef: any = React.createRef();

  componentDidMount() {
    this.updateStyle();
  }

  componentDidUpdate = (prevProps, prevState) => {
    this.updateStyle();
    this.getScrollHeight();
  };

  getScrollHeight = () => {
    const calendar = document.querySelector('.ic-calendar') as HTMLDivElement;
    const header = document.querySelector(
      '.ic-calendar__header'
    ) as HTMLDivElement;
    const title = document.querySelector(
      '.ic-day-time-line__title-row-right'
    ) as HTMLDivElement;
    const allDayEventContainer = document.querySelector(
      '.ic-day-time-line__event-row-right'
    ) as HTMLDivElement;

    if (calendar && header && title && allDayEventContainer) {
      const scrollHeight =
        calendar.offsetHeight -
        header.offsetHeight -
        title.offsetHeight -
        allDayEventContainer.offsetHeight;

      this.setState({ scrollHeight });
    }
  };

  updateStyle() {
    const {
      mainViewRef: { current: mainViewElement },
      topEventRowRightRef: { current: topEventRowRightElement },
      titleRowRightRef: { current: titleRowRightElement },
    } = this;
    const titleRowRightElementWidth = titleRowRightElement.offsetWidth;
    const titleRowRightElementChildrenWidth = Array.prototype.reduce.call(
      titleRowRightElement.children[0].children,
      (width, element) => width + element.offsetWidth,
      0
    );
    const titleRowRightWidth = Math.max(
      titleRowRightElementWidth,
      titleRowRightElementChildrenWidth
    );
    this.setState({
      mainViewScrollHeight: mainViewElement.scrollHeight,
      topEventRowHeight: topEventRowRightElement.offsetHeight,
      titleRowRightWidth,
      titleRowRightElement,
    });
  }

  handleContentScroll = e => {
    const { current: timeColumnElement } = this.timeColumnRef;
    timeColumnElement.scrollTop = e.target.scrollTop;
  };

  bgRef: any;
  getBgRef = ref => {
    this.bgRef = ref;
  };

  render() {
    const {
      mainViewScrollHeight,
      topEventRowHeight,
      titleRowRightWidth,
      titleRowRightElement,
      scrollHeight,
    } = this.state;
    const {
      startHHmm,
      endHHmm,
      step,
      formatString,
      timeSuffix,
      renderTitleRow,
      renderEventRow,
      renderMainView,
      titleRowHeight,
      className,
      style,
      height,
    } = this.props;
    let dayTimeLine = getDayTimeLine(startHHmm, endHHmm, step, formatString);

    if (timeSuffix) {
      const [am = 'AM', pm = 'PM'] = timeSuffix;
      dayTimeLine = dayTimeLine.map(time =>
        time
          .replace(/am|上午|早上|凌晨/i, am)
          .replace(/pm|下午|晚上/i, pm)
          .replace('中午', (_1, _2, s) =>
            Number(s.split(':')[0]) === 12 ? pm : am
          )
      );
    }
    const topEventRowHeightStyle = topEventRowHeight
      ? { height: topEventRowHeight }
      : {};
    const contentWidthStyle = titleRowRightWidth
      ? { width: titleRowRightWidth }
      : {};
    const verticalScrollableStyle = titleRowRightElement
      ? { height: `calc(100% - ${titleRowRightElement.offsetHeight}px)` }
      : {};

    return (
      <div
        className={classnames('ic-day-time-line', className)}
        style={{ ...style, height }}
      >
        <div className="ic-day-time-line__time-column">
          <div
            className="ic-day-time-line__title-row-left"
            style={{ height: titleRowHeight }}
          />
          <div
            ref={this.timeColumnRef}
            className="ic-day-time-line__scrollable-time"
            style={verticalScrollableStyle}
          >
            <div
              className="ic-day-time-line__event-row-left"
              style={topEventRowHeightStyle}
            />
            <div style={{ height: scrollHeight }}>
              {dayTimeLine.map((time, index) => (
                <div key={`${time}-${index}`} className="ic-day-time-line__label-row">
                  <div className="ic-day-time-line__label">{time}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="ic-day-time-line__content-column">
          <div className="ic-day-time-line__content" style={contentWidthStyle}>
            <div
              ref={this.titleRowRightRef}
              className="ic-day-time-line__title-row-right"
              style={{ height: titleRowHeight }}
            >
              {renderTitleRow(titleRowRightWidth)}
            </div>
            <div className="ic-day-time-line__scrollable-contentContainer">
              <div
                className="ic-day-time-line__scrollable-content"
                style={verticalScrollableStyle}
                onScroll={this.handleContentScroll}
              >
                <div
                  ref={this.topEventRowRightRef}
                  className="ic-day-time-line__event-row-right"
                >
                  {renderEventRow(titleRowRightWidth)}
                </div>
                <div
                  ref={this.mainViewRef}
                  className="ic-day-time-line__main-view"
                  style={{ height: scrollHeight, overflow: 'auto' }}
                >
                  <div className="ic-day-time-line__bg" ref={this.getBgRef}>
                    {dayTimeLine.map((time, index) => (
                      <div key={`${time}-${index}`} className="ic-day-time-line__bg-row" />
                    ))}
                  </div>
                  {/* 渲染事件 */}
                  <ChildrenWithProps
                    startHHmm={startHHmm}
                    endHHmm={endHHmm}
                    step={step}
                    containerHeight={mainViewScrollHeight}
                  >
                    {renderMainView(titleRowRightWidth)}
                  </ChildrenWithProps>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
