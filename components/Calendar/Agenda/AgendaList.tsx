/// <reference path='../../../typings/custom-typings.d.ts'/>

import React from 'react';
import classnames from 'classnames';
import moment from 'moment';
import result from 'lodash/result';
import { getWeekDayName, formatHHmmTime } from '../../utils/dateUtil';
import {
  filterEventsByImportance,
  groupEventsByDay,
  getEventsGroupsInDateRange,
} from '../../utils/eventUtil';
import { Popover } from 'antd';
import EventDetails from '../EventDetails';
import { func } from 'prop-types';

function getGroupTitle(date) {
  return `${getWeekDayName(date)} ${date.getFullYear()}年${date.getMonth() +
    1}月${date.getDate()}日`;
}
function sortDownDate(a, b) {
  return Date.parse(a.date) - Date.parse(b.date);
}

export default function AgendaList(props) {
  const {
    events,
    startDate: propStartDate,
    dateRange,
    detailVisible,
    importantOnly,
    weatherVisible,
  } = props;

  const eventsGroups = groupEventsByDay(
    filterEventsByImportance(events, importantOnly)
  );
  console.log({eventsGroups})
  let eventsGroupsInDateRange = [];
  const [rangeStep, rangeUnit] = dateRange.split(':');
  const startDate = new Date(propStartDate);
  startDate.setHours(0, 0, 0, 0);
  const endDate = moment(startDate)
    .add(rangeStep, rangeUnit)
    .subtract(1, 'ms')
    .toDate();
  if (startDate && endDate) {
    eventsGroupsInDateRange = getEventsGroupsInDateRange(
      eventsGroups,
      startDate.valueOf(),
      endDate.valueOf()
    );
  }
  console.log({ eventsGroupsInDateRange });
  eventsGroupsInDateRange.sort(sortDownDate);
  console.log({ eventsGroupsInDateRange });
  const {
    onEventDetailsClick,
    onCurrentEventClick,
    onFutureEventClick,
    onAllEventClick,
  } = props;
  return (
    <div className="ic-agenda-list">
      {eventsGroupsInDateRange.map(
        ({ monthDayHash, date, events: groupEvents }) => (
          <div key={monthDayHash} className="ic-agenda-list__group">
            <div className="ic-agenda-list__group-header">
              <div className="ic-agenda-list__day-title">
                {getGroupTitle(date)}
              </div>
              {weatherVisible && (
                <div
                  className={classnames(
                    'ic-agenda__img',
                    'ic-agenda-list__weather',
                    `ic-agenda-list__weather-${result(
                      groupEvents[0],
                      'original.event_weather'
                    )}`
                  )}
                />
              )}
            </div>
            <div className="ic-agenda-list__events">
              {groupEvents.map(event => {
                const {
                  occurId,
                  original: {
                    event_time,
                    event_endtime,
                    event_title,
                    event_short,
                    event_location,
                    event_desc,
                    event_attach,
                    event_image,
                    category_color,
                    formdata,
                  },
                } = event;
                console.log({ groupEvents, event });
                const hasAttachment = event_attach && event_attach[1];
                return (
                  <div className="ic-agenda__popover">
                    <Popover
                      // trigger='click'
                      getPopupContainer={() =>
                        document.querySelector('.ic-agenda-list')
                      }
                      className="ic-agenda__popover"
                      content={
                        <EventDetails
                          eventData={event.original}
                          onEventDetailsClick={onEventDetailsClick}
                          onCurrentEventClick={onCurrentEventClick}
                          onFutureEventClick={onFutureEventClick}
                          onAllEventClick={onAllEventClick}
                        />
                      }
                    >
                      <div key={occurId} className="ic-agenda-list__event-card">
                        <div
                          className="ic-agenda-list__event-dot"
                          style={{ background: category_color }}
                        ></div>
                        <div className="ic-agenda-list__event-time">
                          {`${formatHHmmTime(event_time)} ~ ${formatHHmmTime(
                            event_endtime
                          )}`}
                        </div>
                        <div className="ic-agenda-list__event-title">
                          {event_title}
                        </div>
                        <div className="ic-agenda-list__event-content">
                          <div className="ic-agenda-list__event-short">
                            {(formdata && formdata.location) || event_location}
                          </div>
                          {detailVisible && (
                            <div className="ic-agenda-list__event-detail">
                              {(formdata && formdata.dec) || event_desc}
                            </div>
                          )}
                        </div>
                        <div className="ic-agenda-list__event-ai-wrap">
                          {hasAttachment && (
                            <div className="ic-agenda-list__event-attachment">
                              <a
                                className="ic-agenda__img"
                                href={event_attach[1]}
                                target="_blank"
                              >
                                <div className="ic-agenda-list__event-attachment-icon" />
                              </a>
                            </div>
                          )}
                          {detailVisible && event_image && (
                            <div className="ic-agenda-list__event-image">
                              <img src={event_image} />
                            </div>
                          )}
                        </div>
                      </div>
                    </Popover>
                  </div>
                );
              })}
            </div>
          </div>
        )
      )}
    </div>
  );
}
