import memoizeOne from 'memoize-one';
import { monthDayHasher, getHHmmDurationByMinute } from './dateUtil';
import moment from 'moment';

export const compareEvents = (e1, e2) => e1.endTime - e2.startTime;

export const isValidEvent = ({ startTime, endTime }) =>
  startTime.valueOf() < endTime.valueOf();

export const normalizeEvent = (event, index) => {
  const safeEvent = event || {};
  if (safeEvent.original) {
    return event;
  }

  const startTime = new Date(safeEvent.occur_begin);
  const endTime = new Date(safeEvent.occur_end);

  return {
    original: safeEvent,
    occurId: safeEvent.occur_id || index,
    startTime,
    endTime,
  };
};

export const normalizeEvents = memoizeOne(events =>
  events
    .map(normalizeEvent)
    .filter(isValidEvent)
    .sort(compareEvents)
);

/**
 * 分配事件：将事件以某天归类
 * @param events 事件
 * @return eventsMap 归好类的 eventsMap
 */
export const allocateDailyEvents = memoizeOne(events => {
  const validEvents = normalizeEvents(events);
  const eventsMap = new Map();
  const allocate = event => {
    const { startTime } = event;
    const eventKey = monthDayHasher(startTime);
    const eventsOfDate = eventsMap.get(eventKey);
    if (!eventsOfDate) {
      eventsMap.set(eventKey, [event]);
    } else if (eventsOfDate.every(({ occurId }) => event.occurId !== occurId)) {
      eventsOfDate.push(event);
    }
  };

  const allocateEvent = event => {
    allocate(event);

    const { startTime, endTime } = event;
    let calcStartTime = new Date(startTime);
    let calcEndTimeTime = new Date(endTime);
    while (calcStartTime.getDate() !== calcEndTimeTime.getDate()) {
      calcStartTime = new Date(calcStartTime);
      calcStartTime.setDate(calcStartTime.getDate() + 1);
      calcStartTime.setHours(0, 0, 0, 0);
      allocate({ ...event, startTime: calcStartTime, alreadyBegun: true });
    }
  };
  validEvents.forEach(allocateEvent);

  return eventsMap;
  //   const allocateEvent = event => {
  //   const { startTime, endTime } = event;
  //   const eventKey = monthDayHasher(startTime);
  //   const eventsOfDate = eventsMap.get(eventKey);
  //   if (!eventsOfDate) {
  //     eventsMap.set(eventKey, [event]);
  //   } else if (eventsOfDate.every(({ occurId }) => event.occurId !== occurId)) {
  //     eventsOfDate.push(event);
  //   }

  //   // 开始日期不等于结束日期时
  //   let calcStartTime = startTime;
  //   while (calcStartTime.getDate() !== endTime.getDate()) {
  //     calcStartTime = new Date(calcStartTime);
  //     calcStartTime.setDate(calcStartTime.getDate() + 1);
  //     calcStartTime.setHours(0, 0, 0, 0);
  //     allocateEvent({ ...event, startTime: calcStartTime, alreadyBegun: true });
  //   }
  // };

  // validEvents.forEach(allocateEvent);

  // return eventsMap;
  // });
});
//   const allocateEvent = event => {
//     const { startTime, endTime } = event;
//     const eventKey = monthDayHasher(startTime);
//     const eventsOfDate = eventsMap.get(eventKey);
//     if (!eventsOfDate) {
//       eventsMap.set(eventKey, [event]);
//     } else if (eventsOfDate.every(({ occurId }) => event.occurId !== occurId)) {
//       eventsOfDate.push(event);
//     }

//     // 开始日期不等于结束日期时
//     let calcStartTime = startTime;
//     while (calcStartTime.getDate() !== endTime.getDate()) {
//       calcStartTime = new Date(calcStartTime);
//       calcStartTime.setDate(calcStartTime.getDate() + 1);
//       calcStartTime.setHours(0, 0, 0, 0);
//       allocateEvent({ ...event, startTime: calcStartTime, alreadyBegun: true });
//     }
//   };

//   validEvents.forEach(allocateEvent);

//   return eventsMap;
// });

export const getEventDuration = (event, type) => {
  if (!isValidEvent(event)) {
    return 0;
  }

  const { startTime, endTime } = event;

  switch (type) {
    case 'day':
      if (
        moment(endTime).format('HH:mm') === moment(startTime).format('HH:mm')
      ) {
        return endTime.getDate() - startTime.getDate();
      } else {
        return endTime.getDate() - startTime.getDate() + 1;
      }
    default:
      return endTime - startTime;
  }
};

export const filterEventsByImportance = memoizeOne(function(
  events,
  importantOnly
) {
  if (!importantOnly) {
    return events;
  }

  return normalizeEvents(events).filter(
    item =>
      item.original &&
      item.original.formdata &&
      item.original.formdata.event_important == 'Y'
  );
  // return normalizeEvents(events).filter(({ original: { event_important } }) => !!event_important);
});

export const groupEventsByDay = memoizeOne(function(events) {
  const validEvents = normalizeEvents(events);
  const groups = [];
  let currentMonthDayHash;
  let currentGroupIndex = -1;
  validEvents.forEach(event => {
    const { startTime } = event;
    let monthDayHash = monthDayHasher(startTime);
    if (monthDayHash !== currentMonthDayHash) {
      groups.push({ monthDayHash, date: startTime, events: [event] });
      currentMonthDayHash = monthDayHash;
      currentGroupIndex++;
    } else {
      groups[currentGroupIndex].events.push(event);
    }
  });
  return groups;
});

export const getEventsGroupsInDateRange = memoizeOne(
  (groups, startDateValue, endDateValue) =>
    groups.filter(
      ({ monthDayHash }) =>
        monthDayHash >= startDateValue && monthDayHash <= endDateValue
    )
);

/**
 * 是否是全天事件
 * @param {object} event 事件
 * @return {boolean} 是全天事件，返回 true；否则返回 false
 */
export const isTotalDayEvent = event => {
  if (event.original) {
    const format = 'YYYYMMDD';
    const {
      event_time,
      event_endtime,
      formdata,
      occur_begin,
      occur_end,
    } = event.original;

    console.log({occur_begin, occur_end})
    if (
      (formdata && formdata.isAllday === 'Y') ||
      (Number(moment(occur_end).format(format)) -
        Number(moment(occur_begin).format(format)) >
        1)
    ) {
      return true;
    }
  } else {
    false;
  }
};

/**
 * 是否是多日事件
 * @param {object} event 事件
 * @return {boolean} 是多日事件，返回 true；否则返回 false
 */
export const isSeveralDayEvent = event => {
  const format = 'YYYYMMDD';
  const { event_end, event_begin } = event.original;
  return (
    Number(moment(event_end).format(format)) >
    Number(moment(event_begin).format(format))
  );
};

export const getEventsTimeRange = memoizeOne(
  (events: object[], defaultTimeRange: [string, string]) => {
    let [start, end] = defaultTimeRange;

    normalizeEvents(events)
      .filter(event => !isTotalDayEvent(event))
      .forEach(({ original: { event_time, event_endtime } }) => {
        if (
          getHHmmDurationByMinute(event_time) < getHHmmDurationByMinute(start)
        ) {
          start = event_time;
        }
        if (
          getHHmmDurationByMinute(event_endtime) > getHHmmDurationByMinute(end)
        ) {
          end = event_endtime;
        }
      });

    return [start, end];
  }
);
