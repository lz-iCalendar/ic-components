import React from 'react';
import classNames from 'classnames';

export interface HeaderFooterFixedLayoutProps {
  headerClassName?: string;
  header?: JSX.Element;
  headerHeight?: string | number;
  contentClassName?: string;
  content?: JSX.Element | JSX.Element[];
  footerClassName?: string;
  footer?: JSX.Element;
  footerHeight?: string | number;
}

export default class HeaderFooterFixedLayout extends React.Component<
  HeaderFooterFixedLayoutProps
> {
  render() {
    const {
      headerClassName,
      header,
      contentClassName,
      content,
      footer,
      footerClassName,
      headerHeight,
      footerHeight,
    } = this.props;
    return (
      <div className="header-footer-fixed-layout">
        <div
          className={classNames(
            'header-footer-fixed-layout__header',
            headerClassName
          )}
          style={{ height: headerHeight }}
        >
          {header}
        </div>

        <div
          className={classNames(
            'header-footer-fixed-layout__content',
            contentClassName
          )}
        >
          {content}
        </div>

        <div
          className={classNames(
            'header-footer-fixed-layout__footer',
            footerClassName
          )}
          style={{ height: footerHeight }}
        >
          {footer}
        </div>
      </div>
    );
  }
}
