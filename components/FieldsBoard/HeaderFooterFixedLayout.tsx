import React from 'react';
import classNames from 'classnames';

export interface HeaderFooterFixedLayoutProps {
  headerClassName?: string;
  header?: JSX.Element;
  contentClassName?: string;
  content?: JSX.Element;
  footerClassName?: string;
  footer?: JSX.Element;
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
    } = this.props;
    return (
      <div className="header-footer-fixed-layout">
        <div
          className={classNames(
            'header-footer-fixed-layout__header',
            headerClassName
          )}
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
        >
          {footer}
        </div>
      </div>
    );
  }
}
