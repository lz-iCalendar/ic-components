import moment from 'moment';

const toDayStart = moment()
  .startOf('day');
 // .format('YYYY-MM-DD HH:mm:ss');
const toDayEnd = moment()
  .endOf('day');
 // .format('YYYY-MM-DD HH:mm:ss');

const tomorrowStart = moment()
  .add(1, 'day')
  .startOf('day')
  .format('YYYY-MM-DD HH:mm:ss');
const toDayStarttoDayStart = moment()
  .add(1, 'day')
  .endOf('day')
  .format('YYYY-MM-DD HH:mm:ss');

export const mockEvents = [
  // {
  //   occur_id: 1, // 事件发生编号（唯一）
  //   category_color: 'rgb(67, 209, 227)',
  //   event_title: '事件1',
  //   event_short: '海市黄埔区茂名南路58号上海花园酒店',
  //   event_desc: '事件1：一楼大堂右侧',
  //   occur_begin: '2019-08-15T00:00:00.000Z', // 事件发生时间
  //   occur_end: '2019-08-15T23:59:59.999Z', // 事件
  //   event_hostheadurl: 'http://placekitten.com/30/30',
  //   event_image: 'http://placekitten.com/200/140',
  //   event_time: '00:00',
  //   event_endtime: '23:59',
  //   event_weather: 1,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 1,
  //   category_name: '分类1',
  // },
  {
    occur_id: -1, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类111',
    forbidRender: true,
  },
  {
    occur_id: -2, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类222',
    forbidRender: true,
  },
  {
    occur_id: -3, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类333',
    forbidRender: true,
  },
  {
    occur_id: -4, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类444',
    forbidRender: true,
  },
  {
    occur_id: -5, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类555',
    forbidRender: true,
  },
  {
    occur_id: -6, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类666',
    forbidRender: true,
  },
  {
    occur_id: -7, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类777',
    forbidRender: true,
  },
  {
    occur_id: -8, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '是是是是title',
    event_short: '是是是是short',
    event_desc: '是是是是desc',
    occur_begin: moment().startOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生时间
    occur_end: moment().endOf('days').format('YYYY-MM-DDTHH:mm:ss'), // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类888',
    forbidRender: true,
  },
  {
    occur_id: 1, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '事件8',
    event_short: '上海市黄埔区茂名南路59号上海花园酒店',
    event_desc: '事件2：一楼大堂右侧',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类1',
  },

  {
    occur_id: 2, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '事件2',
    event_short: '上海市黄埔区茂名南路59号上海花园酒店',
    event_desc: '事件2：一楼大堂右侧',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '08:30',
    event_endtime: '09:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类1',
  },

  // {
  //   occur_id: 15, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件9',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '08:50',
  //   event_endtime: '10:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类1',
  // },
  // {
  //   occur_id: 9, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件9',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '08:50',
  //   event_endtime: '10:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类1',
  // },


  // {
  //   occur_id: 10, // 事件发生编号（唯一）
  //   category_color: 'rgb(67, 209, 227)',
  //   event_title: '事件1',
  //   event_short: '海市黄埔区茂名南路58号上海花园酒店',
  //   event_desc: '事件1：一楼大堂右侧',
  //   occur_begin: '2019-08-15T00:00:00.000Z', // 事件发生时间
  //   occur_end: '2019-08-15T23:59:59.999Z', // 事件
  //   event_hostheadurl: 'http://placekitten.com/30/30',
  //   event_image: 'http://placekitten.com/200/140',
  //   event_time: '00:00',
  //   event_endtime: '23:59',
  //   event_weather: 1,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 1,
  //   category_name: '分类2',
  // },

  // {
  //   occur_id: 3, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件9',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '09:00',
  //   event_endtime: '10:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },
  // {
  //   occur_id: 4, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件2',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '09:00',
  //   event_endtime: '10:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },

  // {
  //   occur_id: 5, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件8',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '09:00',
  //   event_endtime: '10:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },


  // {
  //   occur_id: 11, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件8',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '09:00',
  //   event_endtime: '11:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },


  // {
  //   occur_id: 12, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件8',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '10:00',
  //   event_endtime: '11:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },



  // {
  //   occur_id: 13, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件8',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '10:00',
  //   event_endtime: '12:00',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },




  {
    occur_id: 14, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '事件8',
    event_short: '上海市黄埔区茂名南路59号上海花园酒店',
    event_desc: '事件2：一楼大堂右侧',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '10:00',
    event_endtime: '12:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类2',
  },

  {
    occur_id: 16, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '事件8',
    event_short: '上海市黄埔区茂名南路59号上海花园酒店',
    event_desc: '事件2：一楼大堂右侧',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '12:00',
    event_endtime: '13:30',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类2',
  },


  {
    occur_id: 17, // 事件发生编号（唯一）
    category_color: 'rgb(255, 160, 120)',
    event_title: '事件8',
    event_short: '上海市黄埔区茂名南路59号上海花园酒店',
    event_desc: '事件2：一楼大堂右侧',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/32/32',
    event_image: 'http://placekitten.com/200/150',
    event_time: '13:30',
    event_endtime: '15:00',
    event_weather: 2,
    event_attach: ['附件', 'http://www.baidu.com'],
    event_important: 0,
    category_name: '分类2',
  },
  // {
  //   occur_id: 15, // 事件发生编号（唯一）
  //   category_color: 'rgb(255, 160, 120)',
  //   event_title: '事件8',
  //   event_short: '上海市黄埔区茂名南路59号上海花园酒店',
  //   event_desc: '事件2：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/32/32',
  //   event_image: 'http://placekitten.com/200/150',
  //   event_time: '10:01',
  //   event_endtime: '11:02',
  //   event_weather: 2,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },


  // {
  //   occur_id: 6, // 事件发生编号（唯一）
  //   category_color: 'rgb(57, 232, 154)',
  //   event_title: '事件3',
  //   event_short: '上海市黄埔区茂名南路51号上海花园酒店',
  //   event_desc: '事件3：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/34/34',
  //   event_time: '11:03',
  //   event_endtime: '13:03',
  //   event_weather: 2,
  //   event_important: 1,
  //   category_name: '分类2',
  // },
  // {
  //   occur_id: 7, // 事件发生编号（唯一）
  //   category_color: 'rgb(57, 232, 154)',
  //   event_title: '事件3',
  //   event_short: '上海市黄埔区茂名南路51号上海花园酒店',
  //   event_desc: '事件3：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/34/34',
  //   event_time: '13:00',
  //   event_endtime: '14:00',
  //   event_weather: 2,
  //   event_important: 1,
  //   category_name: '分类2',
  // },
  // {
  //   occur_id: 8, // 事件发生编号（唯一）
  //   category_color: 'rgb(218, 126, 244)',
  //   event_title: '事件4',
  //   event_short: '上海市黄埔区茂名南路52号上海花园酒店',
  //   event_desc: '事件4：一楼大堂右侧',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/36/36',
  //   event_image: 'http://placekitten.com/200/140',
  //   event_time: '16:00',
  //   event_endtime: '18:00',
  //   event_weather: 3,
  //   event_attach: ['附件', 'http://www.baidu.com'],
  //   event_important: 0,
  //   category_name: '分类2',
  // },
  // {
  //   occur_id: 9, // 事件发生编号（唯一）
  //   category_color: 'rgb(218, 155, 244)',
  //   event_title: '事件5',
  //   event_short: '上海市黄埔区茂名南路53号上海花园酒店',
  //   event_desc: '事件5：一楼大堂右侧，请至组委会领餐券',
  //   occur_begin: toDayStart, // 事件发生时间
  //   occur_end: toDayEnd, // 事件发生结束时间
  //   event_hostheadurl: 'http://placekitten.com/36/36',
  //   event_time: '18:00',
  //   event_endtime: '21:00',
  //   event_weather: 3,
  //   event_important: 1,
  //   category_name: '分类3',
  // },
  {
    occur_id: 10, // 事件发生编号（唯一）
    category_color: 'rgb(67, 209, 227)',
    event_title: '事件6',
    event_short: '上海市黄埔区茂名南路53号上海花园酒店',
    event_desc: '事件6：一楼大堂右侧，请至组委会领餐券',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/36/36',
    event_time: '22:00',
    event_endtime: '23:45',
    event_weather: 3,
    event_important: 1,
    category_name: '分类3',
  },
  {
    occur_id: 18, // 事件发生编号（唯一）
    category_color: 'rgb(67, 209, 227)',
    event_title: '事件6',
    event_short: '上海市黄埔区茂名南路53号上海花园酒店',
    event_desc: '事件6：一楼大堂右侧，请至组委会领餐券',
    occur_begin: toDayStart, // 事件发生时间
    occur_end: toDayEnd, // 事件发生结束时间
    event_hostheadurl: 'http://placekitten.com/36/36',
    event_time: '22:00',
    event_endtime: '23:45',
    event_weather: 3,
    event_important: 1,
    category_name: '分类3',
  },
];
