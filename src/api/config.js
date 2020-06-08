
export default {
  protocol: process.env.API_protocol,
  host: process.env.API_host,
  projectName: process.env.API_projectName,
  getPrefix: function(projectName){
    projectName = projectName || this.projectName;
    return this.protocol + this.host + (projectName ? ('/' + projectName) : '');
  },
  getUrl: function(type){
    return this.getPrefix() + (this.uri[type] || '');
  },
  uri: {
    'test': '/test',
    'homepage_total': '/homepage/total',
    'homepage_secondCategory': '/homepage/secondCategory',
    'departhomepage_distribution': '/departhomepage/distribution',
    'departhomepage_page': '/departhomepage/page',
    'depart_info': '/depart/info',
    'hotevent_page': '/hotevent/page',
    'hotevent_heatdistribution': '/hotevent/heatdistribution',
    'hotwrod_top': '/hotword/top',
    'hotevent_typedistribution': '/hotevent/typedistribution',
    'hotevent_detail': '/hotevent/detail',
    //诉求处理
    'analysis': '/analysis/analysis',
    'trend': '/analysis/trend',
    //诉求类别
    'consoleType':'/analysis/pie',
    //综合分析
    'analysis_all': '/analysis/all',
    'hotliblist': '/analysis/hotliblist',
    'querySexDistribution':'/crowdPortrait/querySexDistribution',
    'queryIsPublic':'/crowdPortrait/queryIsPublic',
    'timeDistribution':'/crowdPortrait/timeDistribution',
    'jobDistribution':'/crowdPortrait/jobDistribution',
    'districtDistribution':'/crowdPortrait/districtDistribution',
    //舆情事件人群画像
    'hotEventCrowdQuerySexDistribution':'/hotEventCrowd/querySexDistribution',
    'hotEventCrowdQueryIsPublic':'/hotEventCrowd/queryIsPublic',
    'hotEventCrowdTimeDistribution':'/hotEventCrowd/timeDistribution',
    'hotEventCrowdJobDistribution':'/hotEventCrowd/jobDistribution',
    'hotEventCrowdDistrictDistribution':'/hotEventCrowd/districtDistribution',
    'hotEventCrowdGridDistribution':'/hotEventCrowd/gridDistribution',
    //热点来源
    'sourceStatistics':'/source/statistics',
    'sourceRangeDate':'/source/rangeDate',
    'sourceList':'/source/list',
    //舆情事件综合分析，诉求处理
    'eventHistory':'/event/history',
    'eventTrend':'/event/trend',
    'eventStatistics':'/event/statistics',
    'hoteventPage':'/hotevent/page',
    'hoteventDetail':'/hotevent/detail',
    'detailHotlib':'/source/detailHotlib',

  }
}
