<template>
  <div class="yqsj">
    <section class="top clearfix">
      <section class="top-left chartbox">
        <div class="title">实时热点事件</div>
        <div class="more" @click="toYqsjlb">更多&gt;&gt;</div>
        <rank :data="topLeft_data" :option="{type: 'yqsj'}"></rank>
      </section>
      <section class="top-middle">
        <div style="height:41%;">
          <div class="tm-1">全部热点事件热度均值</div>
          <div class="tm-2">{{ topMiddle.averageHeat }}</div>
        </div>
        <div style="height:59%;">
          <chart ref="topMiddle" :options="topMiddle.option" :auto-resize="true" @click="onClick"></chart>
        </div>
      </section>
      <section class="top-right chartbox">
        <div class="title">舆情热词</div>
        <cloud-word class="cloudword" :params="topRight"></cloud-word>
      </section>
    </section>
    <section class="bottom clearfix">
      <section class="bottom-left chartbox">
        <div class="title1" style="display:flex;">近30日热点事件
          <span class="question-mark"
            @mouseover="showTip1=true"
            @mouseout="showTip1=false"
          >?</span>
          <!-- <transition name="fade"> -->
            <div v-show="showTip1" class="tipBox">
              <div class="sanjiao"></div>
              <span>图中的每一个泡泡代表一个事件，泡泡的颜色代表事件的分类，泡泡的纵向位置和大小代表了事件的热度。</span>
            </div>
          <!-- </transition> -->
        </div>
        <chart ref="bottomLeft" :auto-resize="true"
          :options="bottomLeft"
          @click="onClickBottomLeft"
        ></chart>
      </section>
      <section class="bottom-right chartbox">
        <div class="br1">
          <span class="br1-1 ellipsis" @click="goto_yqzhfx">{{ eventName }}</span>
          <span class="br1-2">{{ eventType }}</span>
        </div>
        <div class="br2">
          <div>热点事件热度</div>
          <chart ref="bottomRight1" style="height: 50px;"
            :options="bottomRight1" :auto-resize="true"
            @click="onClick"
          ></chart>
        </div>
        <div class="br3">
          <span class="br3-1">较全部热点事件热度平均值</span>
          <span class="br3-2">{{ typeAverageRate }}</span>
        </div>
        <div class="br3">
          <span class="br3-1">较同类热点事件热度平均值</span>
          <span class="br3-2">{{ allAverageRate }}</span>
        </div>
        <div class="br4">
          <span class="br4-1" style="display:flex;">近7日趋势
            <span class="question-mark"
              @mouseover="showTip2=true"
              @mouseout="showTip2=false"
            >?</span>
            <div v-show="showTip2" class="tipBox">
              <div class="sanjiao"></div>
              <span>选取事件最近7天的数据绘制成趋势图。</span>
            </div>
          </span>
          <span class="br4-2">首件诉求反映时间: <span class="br4-3">{{ happenTime }}</span></span>
        </div>
        <div style="height: 50%;">
          <chart ref="bottomRight2"
            :options="bottomRight2" :auto-resize="true"
            @click="onClick"
          ></chart>
        </div>
      </section>
    </section>
  </div>
</template>

<script>
import moment from 'moment'
import api from '@/api'
import Rank from '@/components/Rank'
import CloudWord from '@/components/CloudWord'

export default {
  name: 'Yqsj',
  props: ['query'],
  components: {
    Rank,
    CloudWord,
  },
  data () {
    function randomData(days) {
      return {
        id: Math.round(Math.random()*1000),
        name: '事件名称' + Math.round(Math.random()*1000),
        value: [moment().subtract(days, 'days').format('YYYY-MM-DD'), Math.round(Math.random()*100)]
      }
    }
    var dataBJ = Array.from({length:31}, (v,k) => randomData(30-k));
    var dataGZ = Array.from({length:31}, (v,k) => randomData(30-k));
    var dataSH = Array.from({length:31}, (v,k) => randomData(30-k));
    var itemStyle = {
      normal: {
        opacity: 0.8,
        shadowBlur: 10,
        shadowOffsetX: 0,
        shadowOffsetY: 0,
        shadowColor: 'rgba(0, 0, 0, 0.5)'
      }
    };
    var topRight_data = Array.from({length:26}, (v,k) => {
      return {
        content: 'abcdefghijklmnopqrstuvwxyz'[k],
        freq: 26-k,
      }
    });
    const colorPalette = [
      '#2ec7c9','#b6a2de','#5ab1ef','#ffb980','#d87a80',
      '#8d98b3','#e5cf0d','#97b552','#95706d','#dc69aa',
      '#07a2a4','#9a7fd1','#588dd5','#f5994e','#c05050',
      '#59678c','#c9ab00','#7eb00a','#6f5553','#c14089'
    ];
    return {
      eventId: 1,
      eventName: '居民区噪声扰民',
      eventType: '城市管理',
      typeAverageRate: '??',
      allAverageRate: '??',
      happenTime: '2018-01-01',
      showTip1: false,
      showTip2: false,
      topLeft_data: [],
      topMiddle:{
        lessProp: 0.0,
        greatProp: 0.5714285714285714,
        averageHeat: 70.87,
        betweenProp: 0.42857142857142855,
        option: {
          color:['#67e0e3', '#273d72'],
          title: [
            {
              textStyle: {
                color: '#AEB6D5',
                fontSize: 14,
                fontWeight: 'normal',
              },
              text: '事件热度大于70',
              left: '13%',
              bottom: '10%'
            },
            {
              textStyle: {
                color: '#AEB6D5',
                fontSize: 14,
                fontWeight: 'normal',
              },
              text: '事件热度介于50-70',
              left: 'center',
              bottom: '10%'
            },
            {
              textStyle: {
                color: '#AEB6D5',
                fontSize: 14,
                fontWeight: 'normal',
              },
              text: '事件热度低于50',
              left: '73.5%',
              bottom: '10%'
            }
          ],
          // tooltip: {
          //   textStyle: {
          //     color: '#55DDE1'
          //   },
          //   trigger: 'item',
          //   formatter: "{a} <br/>{b}: {c} ({d}%)"
          // },
          series: [
            {
              silent: true,
              center: ['20%', '40%'],
              name:'hotLess',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  color: '#FFB85C',
                  fontSize: 20,
                  position: 'center',
                  formatter (params) {
                    return !params.dataIndex ? params.percent + '%' : ''
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'hotLess1'},
                {value:310, name:'hotLess2'},
              ]
            },
            {
              silent: true,
              center: ['50%', '40%'],
              name:'hotBetween',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  color: '#FFB85C',
                  fontSize: 20,
                  position: 'center',
                  formatter (params) {
                    return !params.dataIndex ? params.percent + '%' : ''
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:234, name:'hotBetween1'},
                {value:135, name:'hotBetween2'},
              ]
            },
            {
              silent: true,
              center: ['80%', '40%'],
              name:'hotGreat',
              type:'pie',
              radius: ['50%', '70%'],
              avoidLabelOverlap: false,
              label: {
                normal: {
                  show: true,
                  color: '#FFB85C',
                  fontSize: 20,
                  position: 'center',
                  formatter (params) {
                    return !params.dataIndex ? params.percent + '%' : ''
                  }
                }
              },
              labelLine: {
                normal: {
                  show: false
                }
              },
              data:[
                {value:335, name:'hotGreat1'},
                {value:1548, name:'hotGreat2'}
              ]
            }
          ]
        }
      },
      topRight: {
        title: '热词',
        showTags: true,
        tags: topRight_data,
        options: {
          outlineMethod: 'none',
          clickToFront: 500,
          shape: 'vcylinder',
          lock: 'y',
          reverse: true,
          depth: 0.8,
          maxSpeed: 0.05,
          minSpeed: 0.01,
          initial: [0.2, 0],
          weight: true,
          weightFrom: 'data-weight',
          weightMode: 'both',
          wheelZoom: false,
          zoom: 1,
          weightGradient: {
            0: "#2ec7c9",
            0.2: "#b6a2de",
            0.4: "#5ab1ef",
            0.6: "#ffb980",
            0.8: "#d87a80",
            1: "#8d98b3"
          },
        }
      },
      bottomLeft: {
        color: colorPalette,
        legend: {
          textStyle: {
            color: '#55DDE1',
            fontSize: 16
          },
          height: '80%',
          top: 'middle',
          right: 20,
          orient: 'vertical',
          data: ['北京', '上海', '广州'],
        },
        grid: {
          left: '4%',
          top: '15%',
          right: '23%',
          bottom: '10%',
        },
        tooltip: {
          textStyle: {
            color: '#55DDE1'
          },
          padding: 10,
          backgroundColor: '#222',
          borderColor: '#777',
          borderWidth: 1,
          formatter: function (obj) {
            return obj.data.name + '<br/>'
              + obj.data.value[0] + '<br/>'
              + '事件热度: ' + obj.data.value[1];
          }
        },
        xAxis: {
          type: 'category',
          data: Array.from({length:31}, (v,k) => moment().subtract(30-k, 'days').format('YYYY-MM-DD')),
          // type: 'time',
          name: '日期',
          nameGap: 16,
          nameTextStyle: {
            color: '#fff',
            fontSize: 14
          },
          splitLine: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          boundaryGap: false,
          axisLabel: {
            align: 'center',
          },
        },
        yAxis: {
          name: '',
          type: 'value',
          min: 0,
          max: 'dataMax',
          nameLocation: 'end',
          nameGap: 20,
          nameTextStyle: {
            color: '#fff',
            fontSize: 16
          },
          axisLine: {
            lineStyle: {
              color: '#eee'
            }
          },
          splitLine: {
            show: false
          }
        },
        visualMap: [
          {
            show: false,
            left: 'right',
            top: '0%',
            dimension: 1,
            min: 0,
            max: 100,
            itemWidth: 20,
            itemHeight: 100,
            calculable: true,
            precision: 0.1,
            text: ['热度'],
            textGap: 10,
            textStyle: {
              color: '#fff'
            },
            inRange: {
              symbolSize: [10, 70]
            },
            outOfRange: {
              symbolSize: [10, 70],
              color: ['rgba(255,255,255,.2)']
            },
            controller: {
              inRange: {
                color: ['#c23531']
              },
              outOfRange: {
                color: ['#444']
              }
            }
          }
        ],
        series: [
          {
            name: '北京',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataBJ
          },
          {
            name: '上海',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataSH
          },
          {
            name: '广州',
            type: 'scatter',
            itemStyle: itemStyle,
            data: dataGZ
          }
        ]
      },
      bottomRight1: {
        color: ['#55DDE1', '#55dde14d'],
        grid: {
          left: 0,
          right: 0,
        },
        xAxis:  {
          show: false,
          type: 'value'
        },
        yAxis: {
          show: false,
          type: 'category',
          data: ['热点事件热度']
        },
        series: [
          {
            name: 'hot-on',
            type: 'bar',
            stack: 'hot',
            barWidth: 16,
            label: {
              normal: {
                show: true,
                position: ['95%', '-100%']
              }
            },
            data: [76.1]
          },
          {
            name: 'hot-off',
            type: 'bar',
            stack: 'hot',
            barWidth: 16,
            label: {
              normal: {
                show: false,
                position: 'insideRight'
              }
            },
            data: [23.9]
          }
        ]
      },
      bottomRight2: {
        grid: {
          left: 0,
          top: 15,
          right: 20,
          bottom: 0,
          containLabel: true,
        },
        xAxis: {
          axisLine: {
            lineStyle: {
              color: '#55DDE1'
            }
          },
          axisLabel: {
            color: '#A7B7D6',
          },
          // nameTextStyle: {
          //   color: '#fff',
          //   fontSize: 14
          // },
          type: 'category',
          boundaryGap: false,
          data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        },
        yAxis: {
          type: 'value',
          minInterval: 1,
          axisLine: {
            lineStyle: {
              color: '#55DDE1'
            }
          },
          axisLabel: {
            color: '#A7B7D6',
          },
          splitLine: {
            lineStyle: {
              color: '#55DDE1',
              opacity: 0.5
            }
          },
          // nameTextStyle: {
          //   color: '#fff',
          //   fontSize: 14
          // },
          maxInterval: 10,
        },
        tooltip: {
          trigger: 'item',
          textStyle: {
            color: '#55DDE1'
          }
        },
        series: [{
          type: 'line',
          lineStyle: {
            color: '#55DDE1'
          },
          showSymbol: true,
          showAllSymbol: true,
          symbolSize: function (value) {
            return Math.floor(value/10) + 4
          },
          itemStyle: {
            color: '#55DDE1'
          },
          data: [20, 10, 35, 30, 40, 75, 60],
        }]
      },
      commonParams: {
        timeScope: 3,
        beginTime: undefined,
        endTime: undefined,
        topNum: 5,
        containElseNum: false
      },
      loadingOption: {
        text: '正在加载',
        textColor: '#55DDE1',
        color: '#55DDE1',
        maskColor: 'transparent'
      }
    }
  },
  created () {
    this.initIndex();
  },
  mounted () {
    this.$nextTick(() => {
      // this.initTimer();
    });
  },
  activated () {
    // this.initIndex();
    // this.initTimer();
  },
  deactivated () {
    // this.clearTimer();
  },
  methods: {
    initIndex () {
      this._getTopLeftData();
      this._getTopMiddleData();
      this._getTopRightData();
      this._getBottomLeftData();
    },
    toYqsjlb () {
      this.$router.push({
        name: 'yqsjlb',
        query: { type: 'yqsj' },
      });
    },
    _getTopLeftData () {
      api.get_hotevent_page({
        pageNumber: 1,
        pageSize: 10,
        // keyword: '',
        // type: '',
      }).then(res => {
        log.debug('get_hotevent_page', res);
        this.topLeft_data = res.data.list
        // .sort((a,b) => b.heat-a.heat)
        .map(e => { return {
          id: e.id,
          name: e.content,
          value: e.heat,
          happenTime: e.happenTime,
        }})

        this._getBottomRightData(this.topLeft_data[0]);
      });
    },
    _getTopMiddleData () {
      api.get_hotevent_heatdistribution().then(res => {
        log.debug('get_hotevent_heatdistribution', res);
        this.topMiddle.averageHeat = res.data.averageHeat.toFixed(2);
        this.topMiddle.option.title.forEach((e,i) => {
          e.text = i === 0 ? `事件热度大于${res.data.top}`
            : i === 1 ? `事件热度介于${res.data.bottom}-${res.data.top}`
            : `事件热度低于${res.data.bottom}`;
        });
        this.topMiddle.option.series.forEach((e,i) => {
          e.data[0].value = i === 0 ? res.data.greatProp
            : i === 1 ? res.data.betweenProp
            : res.data.lessProp;
          e.data[1].value = i === 0 ? 1 - res.data.greatProp
            : i === 1 ? 1 - res.data.betweenProp
            : 1 - res.data.lessProp;
        });
      });
    },
    _getTopRightData () {
      api.get_hotwrod_top({ topN: 20 }).then(res => {
        log.debug('get_hotwrod_top', res);
        this.topRight.tags = res.data;
      });
    },
    _getBottomLeftData () {
      api.get_hotevent_typedistribution().then(res => {
        log.debug('get_hotevent_typedistribution', res);
        this.bottomLeft.xAxis.data = res.data.xAxis;
        this.bottomLeft.legend.data = res.data.data.map(e => Object.keys(e)[0]);
        this.bottomLeft.series = res.data.data.map(e => {
          return {
            name: Object.keys(e)[0],
            type: 'scatter',
            itemStyle: {
              normal: {
                opacity: 0.8,
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowOffsetY: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)',
              }
            },
            data: Object.values(e)[0],
          }
        });
      });
    },
    goto_yqzhfx(){
      this.$router.push({
        name: 'yqzhfx',
        params: { eventId: this.eventId },
        query: this.query,
      });
    },
    _getBottomRightData (data) {
      this.eventId = data.id;
      api.get_hotevent_detail({ eventId: data.id }).then(res => {
        log.debug('get_hotevent_detail', res);
        this.eventType = res.data.typeName;
        this.eventName = res.data.content;
        this.bottomRight1.series[0].data = [res.data.heat];
        this.bottomRight1.series[1].data = [100 - res.data.heat];
        this.typeAverageRate = typeof res.data.typeAverageRate === 'string'
          ? res.data.typeAverageRate
          : res.data.typeAverageRate.toFixed(2) + '%';
        this.allAverageRate = typeof res.data.allAverageRate === 'string'
          ? res.data.allAverageRate
          : res.data.allAverageRate.toFixed(2) + '%';
        this.happenTime = res.data.happenTime;
        this.bottomRight2.xAxis.data = res.data.appealLineChart.map(e => e.name);
        this.bottomRight2.series[0].data = res.data.appealLineChart.map(e => e.value);
      }).catch((err) => {
        log.debug('catch error:', err);
      });
    },
    _showLoading () {
      this.$refs.leftTop.showLoading(this.loadingOption);
      this.$refs.leftBottom.showLoading(this.loadingOption);
      this.$refs.centerBottom1.showLoading(this.loadingOption);
    },
    _hideLoading () {
      this.$refs.leftTop.hideLoading();
      this.$refs.leftBottom.hideLoading();
      this.$refs.centerBottom1.hideLoading();
    },
    centerBottomAction () {
      let centerBottom1 = this.$refs.centerBottom1;
      clearTimeout(this.timer);
      this.timer = setInterval(() => {
        let data = centerBottom1.options.series[0].data;
        centerBottom1.dispatchAction({
          type: 'downplay',
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
        this.dataIndex = (this.dataIndex + 1) % data.length
        this._getSecondCategoryData(data[this.dataIndex]);
        centerBottom1.dispatchAction({
          type: 'highlight',
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
        centerBottom1.dispatchAction({
          type: 'showTip',
          seriesIndex: 0,
          dataIndex: this.dataIndex
        });
      }, this.interval);
    },
    onClick (event) {
      log.debug('onClick:', event);
    },
    onMouseover (event) {
      log.debug('onMouseover:', event);
    },
    onClickBottomLeft (param) {
      log.debug('onClickBottomLeft:', param);
      this._getBottomRightData(param.data);
    },
    clearTimer (event) {
      // log.debug('--clearTimer--');
      clearTimeout(this.timer);
      this.$refs.centerBottom1.dispatchAction({
        type: 'downplay',
        seriesIndex: 0,
        dataIndex: this.dataIndex
      });
    },
    initTimer (event) {
      // log.debug('--initTimer--');
      this.centerBottomAction();
    }
  },
  watch: {}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.echarts{
  width: 100%;
  height: 100%;
}
.ellipsis{
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.yqsj{
  width: 100%;
  padding: 0 30px 15px 30px;

  .chartbox {
    background: linear-gradient(to left, #b7d7ee, #b7d7ee) left top no-repeat,
    linear-gradient(to bottom, #b7d7ee, #b7d7ee) left top no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) right top no-repeat,
    linear-gradient(to bottom, #b7d7ee, #b7d7ee) right top no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) left bottom no-repeat,
    linear-gradient(to bottom, #b7d7ee, #b7d7ee) left bottom no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) right bottom no-repeat,
    linear-gradient(to left, #b7d7ee, #b7d7ee) right bottom no-repeat;
    background-size: 1px 30px, 30px 1px, 1px 30px, 30px 1px;
    box-shadow: 0 0 10px 2px rgba(85, 221, 225, 0.5) inset;
  }
  .top{
    width: 100%;
    height: 460px;
    margin-bottom: 10px;

    .title{
      position: absolute;
      overflow: hidden;
      top: 25px;
      left: 28%;
      width: 44%;
      height: 35px;
      line-height: 35px;
      text-align: center;
      font-family: PingFangSC-Semibold;
      font-size: 16px;
      font-weight: bold;
      color: #55DDE1;
      letter-spacing: 0.2px;
      background-image: url('../assets/title.png');
      background-repeat: no-repeat;
      background-position: 0% 50%;
      background-size: 100% 100%;
    }
    .top-left{
      width: 500px;
      height: 100%;
      float: left;
      position: relative;

      .more{
        position: absolute;
        top: 45px;
        right: 20px;
        cursor: pointer;
        font-family: PingFangSC-Regular;
        font-size: 14px;
        color: #55DDE1;
        letter-spacing: 0.18px;
      }
    }
    .top-middle{
      width: 860px;
      height: 100%;
      float: left;
      position: relative;
      text-align: center;

      .tm-1{
        height: 33px;
        line-height: 33px;
        padding: 20px 0 20px 0;
        box-sizing: content-box;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: 24px;
        color: #55DDE1;
        letter-spacing: 0.3px;
      }
      .tm-2{
        height: 67px;
        line-height: 67px;
        margin-bottom: 40px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: 48px;
        color: #FFB85C;
        letter-spacing: 0.6px;
      }
    }
    .top-right{
      width: 500px;
      height: 100%;
      float: right;
      position: relative;

      .title{
        left: 30%;
        width: 40%;
      }
      .cloudword{
        padding-top: 85px;
        width: 100%;
        height: 100%;
      }
    }
  }
  .bottom{
    width: 100%;
    height: 478px;

    .tipBox{
      width: auto;
      height: 100%;
      display: flex;
      justify-content: flex-start;
      align-items: center;

      .sanjiao{
        margin-left: -2px;
        width: 0;
        height: 0;
        border-width: 6px;
        border-style: solid;
        border-color: transparent #313540 transparent transparent;
      }
      &>span{
        display: inline-block;
        background-color: #313540;
        padding: 0 10px;
        margin-left: 0;
        line-height: 35px;
        height: 35px;
        font-size: 12px;
        font-weight: normal;
        z-index: 100;
      }
    }
    .bottom-left{
      width: 1350px;
      height: 100%;
      float: left;
      position: relative;
      margin-right: 10px;

      .title1{
        z-index: 100;
        // width: 132px;
        height: 25px;
        top: 26px;
        left: 36px;
        position: absolute;
        overflow: hidden;
        font-family: PingFangSC-Semibold;
        font-size: 18px;
        color: #55DDE1;
        letter-spacing: 0.23px;
        font-weight: bold;

        .question-mark{
          cursor: pointer;
          display: inline-block;
          width: 18px;
          height: 18px;
          line-height: 15px;
          border: 2px solid #55dde1;
          border-radius: 50%;
          font-size: 14px;
          font-weight: normal;
          padding-left: 4px;
          vertical-align: top;
          top: 4px;
          position: relative;
          margin-left: 5px;
        }
      }
    }
    .bottom-right{
      width: 500px;
      height: 100%;
      float: right;
      position: relative;
      padding: 28px 20px 15px 20px;

      .br1{
        height: 25px;
        line-height: 25px;
        margin-bottom: 20px;
        position: relative;

        .br1-1{
          width: 80%;
          cursor: pointer;
          display: inline-block;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: 18px;
          color: #F5A623;
          letter-spacing: 0.23px;
        }
        .br1-2{
          min-width: 64px;
          max-width: 20%;
          position: absolute;
          right: 0;
          top: 2px;
          display: inline-block;
          height: 20px;
          line-height: 20px;
          text-align: center;
          background: #55DDE1;
          font-family: PingFangSCRegular;
          font-size: 12px;
          color: #121d55;
          letter-spacing: 0.15px;
        }
      }
      .br2{
        height: 72px;
        // margin-bottom: 50px;
        font-family: PingFangSC-Semibold;
        font-weight: bold;
        font-size: 16px;
        color: #55DDE1;
        letter-spacing: 0.2px;
      }
      .br3{
        height: 20px;
        margin-bottom: 15px;

        .br3-1{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #FFFFFF;
          letter-spacing: 0.18px;
        }
        .br3-2{
          margin-left: 5px;
          font-family: PingFangSCRegular;
          font-size: 14px;
          color: #F8E71C;
          letter-spacing: 0.18px;
          line-height: 20px;
        }
      }
      .br4{
        height: 22px;
        margin-top: 20px;
        position: relative;

        .br4-1{
          display: inline-block;
          font-family: PingFangSC-Semibold;
          font-weight: bold;
          font-size: 16px;
          color: #55DDE1;
          letter-spacing: 0.2px;

          .question-mark{
            cursor: pointer;
            display: inline-block;
            width: 14px;
            height: 14px;
            line-height: 10px;
            border: 1px solid #55dde1;
            border-radius: 50%;
            font-size: 12px;
            font-weight: normal;
            padding-left: 3px;
            vertical-align: top;
            top: 5px;
            position: relative;
            margin-left: 5px;
          }
          .tipBox{
            &>span{
              line-height: 24px;
              height: 24px;
            }
          }
        }
        .br4-2{
          position: absolute;
          right: 0;
          top: 0;
          font-family: PingFangSCRegular;
          font-size: 14px;
          color: #55DDE1;
          letter-spacing: 0.18px;
        }
        .br4-3{
          font-family: PingFangSC-Regular;
          font-size: 14px;
          color: #F8E71C;
          letter-spacing: 0.18px;
        }
      }
    }
  }
}
</style>
