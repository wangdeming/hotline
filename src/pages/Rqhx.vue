<template>
  <!-- <div class="contentDiv clearfix"> -->
    <div class="right-content">
      <div class="time">
         <div class="center-top">
              <date-select @change="onChangeDate"></date-select>
          </div>
      </div>      
      <div class="mainDiv">
        <div class="leftDiv">
          <div class="leftTopDiv">
            <div class="divTitle">
              <span>地域分布</span>              
              <a @click="downloadChart('areaMapChart')"></a>
            </div>
            <div class="mapAndNumDiv" id="areaMapChart">
              <!-- <div id="map" class="mapDiv"></div> -->
              <chart ref="mapChart" class="mapDiv" :options="mapOption" :auto-resize="true"></chart>
              <div class="numDiv">
                <div class="numDivItem">
                  <span class="areaDiv"></span>
                  <span class="frameDiv"></span>
                  <span class="numberDiv"></span>
                </div>
                <div class="numDivItem">
                  <span class="areaDiv"></span>
                  <span class="frameDiv"></span>
                  <span class="numberDiv"></span>
                </div>
                <div class="numDivItem">
                  <span class="areaDiv"></span>
                  <span class="frameDiv"></span>
                  <span class="numberDiv"></span>
                </div>
                <div class="numDivItem">
                  <span class="areaDiv"></span>
                  <span class="frameDiv"></span>
                  <span class="numberDiv"></span>
                </div>
                <div class="numDivItem">
                  <span class="areaDiv"></span>
                  <span class="frameDiv"></span>
                  <span class="numberDiv"></span>
                </div>
              </div>
            </div>            
          </div>
          <div class="leftBottomDiv">
            <div class="divTitle">
              <span>反应时间分布</span>
              <a  @click="downloadChart('timeChart')"></a>
            </div>
            <div class="timeDiv" id="timeChart">
            		<chart ref="leftBottom" :options="leftBottom" :auto-resize="true"></chart>
            </div>            
          </div>
        </div>
        <div class="rightDiv">
          <div class="rightDivOne">
            <div class="divTitle">
              <span>性别分布</span>
              <a  @click="downloadChart('sexChart')"></a>
            </div>
            <div class="rightContent" id="sexChart">
              <div class="valueDiv">
                <span class="valueItem sexValueOne">0%</span>
                <span class="valueItem sexValueTwo">0%</span>
                <span class="valueItem sexValueThree">0%</span>
              </div>
              <div class="chartDiv">
                <div class="unknownDiv colorOne"></div>
                <div class="menDiv colorTwo"></div>
                <div class="womenDiv colorThree"></div>
              </div>
              <div class="nameDiv">
                <span class="colorSpan colorOne"></span>
                <span class="nameItem">未知</span>
                <span class="colorSpan colorTwo"></span>
                <span class="nameItem">男</span>
                <span class="colorSpan colorThree"></span>
                <span class="nameItem">女</span>
              </div>
            </div>
          </div>          
          <div class="rightDivThree">
            <div class="divTitle">
              <span>个人信息公开人数占比</span>
              <a @click="downloadChart('publicInfoChart')"></a>
            </div>
            <div class="rightContent" id="publicInfoChart">
              <div class="valueDiv">
                <span class="valueItem publishInfoValueOne"></span>
                <span class="valueItem publishInfoValueTwo"></span>
              </div>
              <div class="chartDiv">
                <div class="publishInfo colorOne"></div>
                <div class="noPublishInfo colorTwo"></div>
              </div>
              <div class="nameDiv">
              <span class="colorSpan colorOne"></span>
                <span class="nameItem">已公开个人信息</span>
                <span class="colorSpan colorTwo"></span>
                <span class="nameItem">未公开个人信息</span>
              </div>
            </div>
          </div>
          <div class="rightDivFour">
            <div class="divTitle">
              <span>职业分布</span>
              <a @click="downloadChart('jobChart')"></a>
            </div>
            <div class="jobDiv" id="jobChart">
            		<chart ref="rightBottom" :options="rightBottom" :auto-resize="true"></chart>
            </div>            
          </div>
        </div>
      </div>
    </div>
  <!-- </div> -->
</template>

<script>
  import mixin from '../mixins'
	import html2canvas from 'html2canvas'
	import api from '@/api'
	import DateSelect from '@/components/DateSelect'
	export default {
    mixins: [mixin],
		name: 'rqhx',
		components: {
			DateSelect
		},
		mounted() {
			this.$nextTick(() => {
				this.dispatch();
			});
		},
		data() {
			var rightBottomData = new Array();
			return {
        msg: 'rqhx',
				timer: null,
				colors: ["#E7BCF3", "#9FE6B8", "#FFDB5C", "#96BFFF", "#32C5E9", "#FF9F7F", "#37A2DA", "#FB7293", "#E062AE", "#E690D1"],
				startTime: '',
				endTime: '',
				timeScope: 1,
				mapOption: {
					tooltip: {
						trigger: 'item',
						formatter: '{b}<br/>{c}'
					},
					series: [{
						name: '上饶市分布图',
						type: 'map',
						map: 'shangrao', // 自定义扩展图表类型  
						aspectScale: 1.0, //地图长宽比. default: 0.75
						selectedMode: 'single',
						textAlign: 'center',
						zoom: 1.1, //控制地图的zoom，动手自己更改下 看看什么效果吧  
						// roam: false,
						shadowBlur: 50,
						shadowColor: 'rgba(21,41,185,.75)',
						label: {
							normal: {
								textStyle: {
									color: '#ffffff'
								}
							},
							emphasis: {
								textStyle: {
									color: '#ffffff'
								}
							}
						},
						itemStyle: {
							normal: {
								label: {
									show: true
								},
								color: '#ffffff',
								borderColor: 'rgba(255,255,255,0.6)',
								areaColor: 'rgba(93,237,241,0.6)'
							},
							emphasis: {
								areaColor: 'rgba(46,137,168,1.0)',
								shadowOffsetX: 0,
								shadowOffsetY: 0,
								shadowBlur: 20,
								borderWidth: 1,
								shadowColor: '#000000'
							},
						},
						data: [{
								name: "广丰区",
								value: 18
							},
							{
								name: "德兴市",
								value: 9
							},
							{
								name: "上饶县",
								value: 6
							},
							{
								name: "信州区",
								value: 8
							},
							{
								name: "玉山县",
								value: 6
							},
							{
								name: "铅山县",
								value: 7
							},
							{
								name: "万年县",
								value: 8
							},
							{
								name: "鄱阳县",
								value: 6
							},
							{
								name: "余干县",
								value: 6
							},
							{
								name: "弋阳县",
								value: 8
							},
							{
								name: "婺源县",
								value: 6
							},
							{
								name: "横峰县",
								value: 12
							}
						],
						markPoint: {
							symbol: 'circle',
							symbolSize: 50,
						}
					}]
				},
				rightBottom: {
					tooltip: {
						trigger: 'item',
						formatter: "{a} <br/>{b} : {c} ({d}%)"
					},
					legend: {
						right: '5%',
						top: 'middle',
						width: '25%',
						height: '80%',
						itemWidth: 14,
						itemHeight: 14,
						padding: [10, 20],
						itemGap: 60,
						textStyle: {
							color: '#A7B7D6',
							fontSize: 14
						},
						data: []
					},
					series: [{
						name: '职业分布',
						type: 'pie',
						radius: [15, 130],
						center: ['35%', '50%'],
						label: {
		                		normal: {
			                    formatter: '{b} : {c} ({d}%)',	                    
			                }
			            },
						roseType: 'area',
						data: []
					}]
				},
				leftBottom: {
					xAxis: {
						type: 'category',
						boundaryGap: false,
						data: ['0:00', '1:00', '2:00', '3:00', '4:00', '5:00',
							'6:00', '7:00', '8:00', '9:00', '10:00', '11:00',
							'12:00', '13:00', '14:00', '15:00', '16:00', '17:00',
							'18:00', '19:00', '20:00', '21:00', '22:00', '23:00'
						],
						 axisLine:{
						 	lineStyle:{
			        				color: '#55DDE1'
			        			}
						 },
			        		axisLabel: {
		            			color: '#A7B7D6',
		          		}
					},
					yAxis: {
						type: 'value',
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
				        }
					},
					itemStyle: {
						color: '#55DDE1'
					},
					tooltip: {
				        trigger: 'axis'
				    },
					series: [{
						name:'诉求数量',
						data: [],
						type: 'line'
					}]
				}
			}
		},
		created() {
//			this.initIndex();
		},
		destroyed() {
			clearTimeout(this.timer);
		},
		methods: {
			dispatch() {
				const mapChart = this.$refs.mapChart;
				mapChart.dispatchAction({
					type: 'mapSelect',
					name: mapChart.options.series[0].data[0].name,
				});
				var currentLoc = 0;
				clearTimeout(this.timer);
				this.timer = setInterval(function() {
					currentLoc = (currentLoc + 1) % mapChart.options.series[0].data.length;
					mapChart.dispatchAction({
						type: 'mapSelect',
						name: mapChart.options.series[0].data[currentLoc].name
					});
					currentLoc++;
				}, 2000);
			},
			initIndex() {
				this._getQuerySexDistribution();
				this._getQueryIsPublic();
				this._getTimeDistribution();
				this._getJobDistribution();
				this._getDistrictDistribution();
			},
			onChangeDate(state) {
				this.timeScope = state.timeScope;
				this.startTime = state.beginTimeFormatted;
				this.endTime = state.endTimeFormatted;
				this.initIndex();
			},
			downloadChart(chartId) {	
				var chartElement = document.querySelector("#"+ chartId)
				html2canvas(chartElement).then(function(canvas) {
					var dataURL =canvas.toDataURL("image/png");
					var $a = $("<a></a>").attr("href", dataURL).attr("download", chartId + ".png");
					$a.css("display","none");
					$("body").append($a);
    					$a[0].click();
    					$a.remove();
				});
			},
			_getQuerySexDistribution() {
				api.get_querySexDistribution({
					unitId: this.params.departId,
					startTime: this.startTime,
					endTime: this.endTime,
					timeScope: this.timeScope
				}).then(res => {
					var data = res.data; //0:女，1:男，2:未知
					var unknownNum = 0;
					var menNum = 0;
					var womenNum = 0;
					if(data.length == 0) {
//						$(".unknownDiv").text(unknownNum);
//						$(".menDiv").text(menNum);
//						$(".womenDiv").text(womenNum);
						$(".unknownDiv").css("width", "34%");
						$(".sexValueOne").text("0%").css("left", "calc(17% - 30px)");
						$(".menDiv").css("width", "33%");
						$(".sexValueTwo").text("0%").css("left", "calc(50.5% - 30px)");
						$(".womenDiv").css("width", "33%");
						$(".sexValueThree").text("0%").css("left", "calc(83.5% - 30px)");
					} else {
						for(var i = 0; i < data.length; i++) {
							if(data[i].sexCode == 2) {
								unknownNum = data[i].count;
//								$(".unknownDiv").text(unknownNum);
							}
							if(data[i].sexCode == 1) {
								menNum = data[i].count;
//								$(".menDiv").text(menNum);
							}
							if(data[i].sexCode == 0) {
								womenNum = data[i].count;
//								$(".womenDiv").text(womenNum);
							}
						}
						var amount = unknownNum + menNum + womenNum;
						var unknownPer = (unknownNum * 100 / parseFloat(amount)).toFixed(1) + '%';
						$(".unknownDiv").css("width", unknownPer);
						var unknownPoint = unknownNum * 50 / parseFloat(amount);
						$(".sexValueOne").text(unknownPer).css("left", "calc(" + unknownPoint + "% - 30px)");
						var menPer = (menNum * 100 / parseFloat(amount)).toFixed(1) + '%';
						$(".menDiv").css("width", menPer);
						var menPoint = (unknownNum * 100 + menNum * 50) / parseFloat(amount);
						$(".sexValueTwo").text(menPer).css("left", "calc(" + menPoint + "% - 30px)");
						var womenPer = (100 - (unknownNum * 100 / parseFloat(amount)).toFixed(1) - (menNum * 100 / parseFloat(amount)).toFixed(1)).toFixed(1) + '%';
						$(".womenDiv").css("width", womenPer);
						var womenPoint = (unknownNum * 100 + menNum * 100 + womenNum * 50) / parseFloat(amount);
						$(".sexValueThree").text(womenPer).css("left", "calc(" + womenPoint + "% - 30px)");
					}
				});
			},
			_getQueryIsPublic() {
				api.get_queryIsPublic({
					unitId: this.params.departId,
					startTime: this.startTime,
					endTime: this.endTime,
					timeScope: this.timeScope
				}).then(res => {
					var data = res.data; //0:不公开，1:公开
					var publishNum = 0;
					var noPublishNum = 0;
					if(data.length == 0) {
//						$(".publishInfo").text(0);
//						$(".noPublishInfo").text(0);
						$(".publishInfo").css("width", "50%");
						$(".publishInfoValueOne").text(0).css("left", "calc(25% - 30px)");
						$(".noPublishInfo").css("width", "50%");
						$(".publishInfoValueTwo").text(0).css("left", "calc(75% - 30px)");
					} else {
						for(var i = 0; i < data.length; i++) {
							if(data[i].is_public == 1) {
								publishNum = data[i].count;
//								$(".publishInfo").text(publishNum);
							}
							if(data[i].is_public == 0) {
								noPublishNum = data[i].count;
//								$(".noPublishInfo").text(noPublishNum);
							}
						}
						var amount = publishNum + noPublishNum;
						var publishPer = (publishNum * 100 / parseFloat(amount)).toFixed(1) + '%';
						$(".publishInfo").css("width", publishPer);
						var publishPoint = publishNum * 50 / parseFloat(amount);
						$(".publishInfoValueOne").text(publishPer).css("left", "calc(" + publishPoint + "% - 30px)");
						var noPublishPer = (noPublishNum * 100 / parseFloat(amount)).toFixed(1) + '%';
						$(".noPublishInfo").css("width", noPublishPer);
						var noPublishPoint = (publishNum * 100 + noPublishNum * 50) / parseFloat(amount);
						$(".publishInfoValueTwo").text(noPublishPer).css("left", "calc(" + noPublishPoint + "% - 30px)");
					}
				});
			},
			_getTimeDistribution() {
				api.get_timeDistribution({
					unitId: this.params.departId,
					startTime: this.startTime,
					endTime: this.endTime,
					timeScope: this.timeScope
				}).then(res => {
					var data = res.data;
					var counts = data.counts;
					this.leftBottom.series[0].data = counts;
				});
			},
			_getJobDistribution() {
				api.get_jobDistribution({
					unitId: this.params.departId,
					startTime: this.startTime,
					endTime: this.endTime,
					timeScope: this.timeScope
				}).then(res => {
					var data = res.data;
					var jobDistributionArray = new Array();
					var jobArray = new Array();
					for(var i = 0; i < data.length; i++) {
						var temp = new Object();
						temp.value = data[i].count;
						temp.name = data[i].asker_career;
						var colorObject = new Object();
						colorObject.color = this.colors[i];
						temp.itemStyle = colorObject;
						jobDistributionArray.push(temp);
						jobArray.push(data[i].asker_career);
					}
					this.rightBottom.series[0].data = jobDistributionArray;
					this.rightBottom.legend.data = jobArray;
				});
			},
			_getDistrictDistribution() {
				api.get_districtDistribution({
					unitId: this.params.departId,
					startTime: this.startTime,
					endTime: this.endTime,
					timeScope: this.timeScope
				}).then(res => {
					var data = res.data.list;
					var sum = res.data.sum;
					var mapArray = new Array();
					for(var i = 0; i < data.length; i++) {
						var tempObj = new Object();
						tempObj.name = data[i].ask_district;
						tempObj.value = data[i].count;
						mapArray.push(tempObj);
						if(sum == 0) {
							if(i < 5) {
								$(".numDivItem:eq(" + i + ")>span.areaDiv").text(data[i].ask_district);
								$(".numDivItem:eq(" + i + ")>span.frameDiv").css("width", "0px");
								$(".numDivItem:eq(" + i + ")>span.numberDiv").text("0.0%");
							}
						} else {
							if(i < 5) {
								$(".numDivItem:eq(" + i + ")>span.areaDiv").text(data[i].ask_district);
								var frameWidth = (data[i].count * 50 / parseFloat(sum)).toFixed(1) + 'px';
								$(".numDivItem:eq(" + i + ")>span.frameDiv").css("width", frameWidth);
								var perCount = (data[i].count * 100 / parseFloat(sum)).toFixed(1) + '%';
								$(".numDivItem:eq(" + i + ")>span.numberDiv").text(perCount);
							}
						}
					}
					this.mapOption.series[0].data = mapArray;
				});
			}
		}
	}
</script>

<style scoped lang="stylus">
	.echarts {
		width: 100%;
		height: 100%;
	}
	
	.contentDiv {
		width: 100%;
		min-width: 1280px;
		height: 960px;
	}
	
	.right-content {
		width: 100%;
		margin-left: 10px;
		padding-right: calc(1.5% - 5px);
		float: left;
		height: 100%;
	}
	
	.time {
		width: 100%;
		height: 60px;
		background-color: rgba(99,123,190, 0.1);
		margin-bottom: 10px;
	}
	
	.center-top {
		padding-top: 15px;
		padding-left: 15px;
	}
	
	.mainDiv {
		width: 100%;
		height: 890px;
	}
	
	.leftDiv {
		width: calc(50% - 5px);
		height: 100%;
		margin-right: 10px;
		float: left;
	}
	
	.rightDiv {
		width: calc(50% - 5px);
		height: 100%;
		float: left;
	}
	
	.leftTopDiv {
		width: 100%;
		height: 524px;		
		margin-bottom: 10px;
	}
	
	.leftBottomDiv {
		width: 100%;
		height: 356px;		
	}
	
	.divTitle {
		width: 100%;
		height: 58px;
		position: relative;
		background-color: rgba(99,123,190, 0.1);
	}
	
	.divTitle>span {
		display: inline-block;
		width: 160px;
		height: 38px;
		line-height: 38px;
		position: absolute;
		top: 20px;
		left: 16px;
		font-size: 16px;
		color: #55DDE1;
		letter-spacing: 0.2px;
		text-align: center;
		background-image: url(../assets/title.png);
		background-size: 100% 100%;
	}
	
	.divTitle>a {
		display: inline-block;
		width: 24px;
		height: 24px;
		position: absolute;
		top: 27px;
		right: 20px;
		background-image: url(../assets/download.svg) !important;
		background-size: 100% 100%;
	}
	
	.rightDivOne,
	.rightDivTwo,
	.rightDivThree {
		width: 100%;
		height: 193px;
		margin-bottom: 10px;
	}
	
	.rightDivFour {
		width: 100%;
		height: 484px;
		position: relative;
	}
	
	.rightDivThree>.divTitle>span {
		width: 240px !important;
	}
	.rightContent{
		width: 100%;
		height: calc(100% - 58px);
		background-color: rgba(99,123,190, 0.1)
	}
	.valueDiv {
		width: 80%;
		height: 40px;
		line-height: 40px;
		margin: 0 auto 5px;
		position: relative;
	}
	
	.chartDiv {
		width: 80%;
		height: 40px;
		line-height: 50px;
		margin: 0 auto;
	}
	
	.chartDiv>div {
		text-align: center;
		color: #121d55;
		font-size: 15px;
		line-height: 40px;
	}
	
	.nameDiv {
		width: 80%;
		height: 50px;
		line-height: 50px;
		margin: 0 auto;
		text-align: center;
	}
	
	.colorSpan {
		display: inline-block;
		width: 14px;
		height: 14px;
		margin-right: 10px;
	}
	
	.colorOne {
		background-color: #67E0E3;
	}
	
	.colorTwo {
		background-color: #FFDB5C;
	}
	
	.colorThree {
		background-color: #FF9F7F;
	}
	
	.nameItem {
		display: inline-block;
		width: auto;
		height: 14px;
		line-height: 14px;
		margin-right: 40px;
		font-size: 14px;
		color: #A7B7D6;
	}
	
	.unknownDiv {
		width: 23.6%;
		height: 100%;
		float: left;
	}
	
	.menDiv {
		width: 34.1%;
		height: 100%;
		float: left;
	}
	
	.womenDiv {
		width: 42.3%;
		height: 100%;
		float: left;
	}
	
	.gridmanDiv {
		width: 43.5%;
		height: 100%;
		float: left;
	}
	
	.noGridmanDiv {
		width: 56.5%;
		height: 100%;
		float: left;
	}
	
	.publishInfo {
		width: 43.5%;
		height: 100%;
		float: left;
	}
	
	.noPublishInfo {
		width: 56.5%;
		height: 100%;
		float: left;
	}
	
	.valueItem {
		display: inline-block;
		width: 60px;
		height: 25px;
		line-height: 25px;
		font-size: 18px;
		color: #A7B7D6;
		position: absolute;
		top: 15px;
	}
	
	.sexValueOne {
		left: calc(11.8% - 30px);
	}
	
	.sexValueTwo {
		left: calc(40.6% - 30px);
	}
	
	.sexValueThree {
		left: calc(78.9% - 30px);
	}
	
	.publishInfoValueOne {
		left: calc(25% - 30px);
	}
	
	.publishInfoValueTwo {
		left: calc(75% - 30px);
	}
	
	.mapAndNumDiv {
		width: 100%;
		height: calc(100% - 58px);
		background-color: rgba(99,123,190, 0.1);
		position: relative;
	}
	.timeDiv {
		width: 100%;
		height: calc(100% - 58px);
		background-color: rgba(99,123,190, 0.1);
	}
	.mapDiv {
		width: 75%;
		height: 100%;
		float: left;
	}
	
	.numDiv {
		width: 160px;
		height: 100%;
		position: absolute;
		top: 0;
		right: 0;
	}
	
	.numDivItem {
		width: 100%;
		height: 20px;
		line-height: 20px;
		margin-bottom: 25px;
	}
	
	.numDivItem:first-child {
		margin-top: 100px;
	}
	
	.areaDiv {
		display: inline-block;
		width: 45px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #A7B7D6;
		margin-right: 5px;
		float: left;
	}
	
	.frameDiv {
		display: inline-block;
		width: 50px;
		height: 20px;
		line-height: 20px;
		float: left;
		margin-right: 5px;
		background: linear-gradient(to right, #8EF0F2 0%, #55DDE1 100%);
	}
	
	.numberDiv {
		display: inline-block;
		width: 40px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #A7B7D6;
		float: left;
	}
	
	.jobDiv{
		width: 100%;
		height: calc(100% - 58px);
		background-color: rgba(99,123,190, 0.1)
	}
</style>