import cfg from './config'
import axios from 'axios'
import qs from 'qs'

// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
// axios.defaults.timeout = 30000;

// return new Promise((resolve, reject) => {
//   originJsonp(url, option, (err, data) => {
//     if (!err) {
//       resolve(data)
//     } else {
//       reject(err)
//     }
//   })
// })
export default {
  _error (err) {
    log.error(err);
    if (err.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      log.error(err.response.data);
      log.error(err.response.status);
      log.error(err.response.headers);
    } else if (err.request) {
      // The request was made but no response was received
      // `err.request` is an instance of XMLHttpRequest in the browser and an instance of
      // http.ClientRequest in node.js
      log.error(err.request);
    } else {
      // Something happened in setting up the request that triggered an Error
      log.error('Error', err.message);
    }
    log.error(err.config);
  },
  _success (res) {
    // log.error('[api]', res);
    return Promise.resolve(res.data)
  },
  _get (url, data) {
    return axios.get(url, {params: data})
      .then((res) => {
        return this._success(res)
      })
      .catch((err) => {
        this._error(err)
      })
  },
  _post (url, data) {
    return axios.post(url, qs.stringify(data))
      .then((res) => {
        return this._success(res)
      })
      .catch((err) => {
        this._error(err)
      })
  },
  testPOST (data) {
    return this._post(cfg.getUrl('test'), data)
  },
  testGET (data) {
    return this._get(cfg.getUrl('test'), data);
  },
  get_total (data) {
    return this._post(cfg.getUrl('homepage_total'), data);
  },
  get_secondCategory (data) {
    return this._post(cfg.getUrl('homepage_secondCategory'), data);
  },
  get_distribution (data) {
    return this._post(cfg.getUrl('departhomepage_distribution'), data);
  },
  get_depart_info (data) {
    return this._post(cfg.getUrl('depart_info'), data);
  },
  get_event_info (data) {
    return this._post(cfg.getUrl('event_info'), data);
  },
  get_hotevent_page (data) {
    return this._post(cfg.getUrl('hotevent_page'), data);
  },
  get_hotevent_heatdistribution (data) {
    return this._get(cfg.getUrl('hotevent_heatdistribution'), data);
  },
  get_hotwrod_top (data) {
    return this._post(cfg.getUrl('hotwrod_top'), data);
  },
  get_hotevent_typedistribution (data) {
    return this._get(cfg.getUrl('hotevent_typedistribution'), data);
  },
  get_hotevent_detail (data) {
    return this._post(cfg.getUrl('hotevent_detail'), data);
  },
  get_page (data) {
    return this._post(cfg.getUrl('departhomepage_page'), data);
  },
  //诉求处理
  get_analysis(data) {
    return this._post(cfg.getUrl('analysis'), data);
  },
  get_trend(data) {
    return this._post(cfg.getUrl('trend'), data);
  },
   //舆情库诉求处理，综合分析
  get_eventHistory(data) {
    return this._post(cfg.getUrl('eventHistory'), data);
  },
  get_eventTrend(data) {
    return this._post(cfg.getUrl('eventTrend'), data);
  },
  get_eventStatistics(data) {
    return this._post(cfg.getUrl('eventStatistics'), data);
  },
  get_hoteventPage(data) {
    return this._post(cfg.getUrl('hoteventPage'), data);
  },
  get_hoteventDetail(data) {
    return this._post(cfg.getUrl('hoteventDetail'), data);
  }, 
  //诉求类别
  get_consoleType(data) {
    return this._post(cfg.getUrl('consoleType'), data);
  },
  //综合分析
  get_analysis_all (data) {
    return this._post(cfg.getUrl('analysis_all'), data);
  },
  get_hotliblist (data) {
    return this._post(cfg.getUrl('hotliblist'), data);
  },
  get_querySexDistribution(data) {
  	return this._post(cfg.getUrl('querySexDistribution'), data);
  },
  get_queryIsPublic(data) {
  	return this._post(cfg.getUrl('queryIsPublic'), data);
  },
  get_timeDistribution(data) {
  	return this._post(cfg.getUrl('timeDistribution'), data);
  },
  get_jobDistribution(data) {
  	return this._post(cfg.getUrl('jobDistribution'), data);
  },
  get_districtDistribution(data) {
  	return this._post(cfg.getUrl('districtDistribution'), data);
  },
  get_hotEventCrowdQuerySexDistribution(data){
  	return this._post(cfg.getUrl('hotEventCrowdQuerySexDistribution'), data);
  },
  get_hotEventCrowdQueryIsPublic(data){
  	return this._post(cfg.getUrl('hotEventCrowdQueryIsPublic'), data);
  },
  get_hotEventCrowdTimeDistribution(data){
  	return this._post(cfg.getUrl('hotEventCrowdTimeDistribution'), data);
  },
  get_hotEventCrowdJobDistribution(data){
  	return this._post(cfg.getUrl('hotEventCrowdJobDistribution'), data);
  },
  get_hotEventCrowdDistrictDistribution(data){
  	return this._post(cfg.getUrl('hotEventCrowdDistrictDistribution'), data);
  },
  get_hotEventCrowdGridDistribution(data){
  	return this._post(cfg.getUrl('hotEventCrowdGridDistribution'), data);
  },
  //热点来源
  get_sourceStatistics(data){
  	return this._post(cfg.getUrl('sourceStatistics'), data);
  },
  get_sourceRangeDate(data){
  	return this._post(cfg.getUrl('sourceRangeDate'), data);
  },
  get_sourceList(data){
  	return this._post(cfg.getUrl('sourceList'), data);
  },
  //综合库
  get_taskDistribution(data) {
    return this._post(cfg.getUrl('departhomepage_distribution'), data);
  },
  get_detail (data) {
    return this._get(cfg.getUrl('detailHotlib'), data);
  },
}
