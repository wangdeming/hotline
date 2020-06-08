<template>
<div class="main">
  <!-- <div class="main-right">	 -->
    <div class="time">
    		 <div class="center-top">
              <date-select @change="onChangeDate"></date-select>
          </div>
    	</select>
    </div>
    <div class="text">
      <div class="text-left">
      	<div class="text-left-top">
      		<div class="text-left-top-left">
      			<div class="title-bg">
			    		部门诉求统计
			    	</div>
			    	<div class="pietext">
			    		<h3 id="pieTotalnumber">0</h3>
			    		<div class="style-font1">部门诉求总数(件)</div>
			    		<div style="text-align: center;color: #37A2DA;">
			    			<span>已回复</span>
			    			<span id="finishCount" style="margin-left: 16px;">0件</span>
			    		</div>
			    		<div style="text-align: center;">
			    			<span>未回复</span>
			    			<span id="noFinishCount" style="margin-left: 16px;">0件</span>
			    		</div>
			    	</div>
			    	<chart :options="pie" :auto-resize="true">
			    	</chart>
      		</div>
      		<div class="text-left-top-right">
      			<chart :options="radar" :auto-resize="true">
			    	</chart>
      		</div>
      	</div>
      	<div class="text-left-bottom">
      		<div class="title-bg">诉求来源分布</div>
      		<chart ref="bar" :options="bar" :auto-resize="true"></chart>
      	</div>
      </div>
      <div class="text-rights">
      	<div class="">
      		<div class="title-bg" style="float: left;">
			    		诉求列表
			   </div>
		    	<select class="select" name="state" data-value="1" onclick="onchange()">
		    		<!--<select class="select" name="state" data-value="1" onclick="onchange()" v-model="selected">-->
						<option value="1">全部</option>
						<option value="2">已回复</option>
						<option value="3">未回复</option>
					</select>
      	</div>
	    	<ul id="hotliblist">
	    		<li v-for="(item,index) in listData" @click="showDetail(item.id )" style="cursor: pointer">
	    			  <span style="width: 50%;" :title="item.title">{{ index+1 }}.{{ item.title }}</span>
		    			<span  v-if="item.statusName == '已回复'" style="width: 28%;text-align: center;color: #F8E71C;">{{ item.statusName }}</span>
		    			<span  v-else-if="item.statusName == '未回复'" style="width: 28%;text-align: center;color: #F5A623;">{{ item.statusName }}</span>
		    			<span style="width: 22%;">{{ item.create_date }}</span>
               </li>

	    	</ul>
	    	<div class="pageStyle">
				 <navigation :pages="pages" :current.sync="pageNo" @navpage="msgListView"></navigation>
			</div>

      </div>
    </div>
  <!-- </div> -->


</div>
</template>

<script>
import mixin from '../mixins'
import api from '@/api'
import DateSelect from '@/components/DateSelect'
import navigation from '@/components/pagination'
import Detail from '@/components/Detail'

export default {
  mixins: [mixin],
  name: 'zhfx',
  components: {
    DateSelect,
    navigation,
    Detail,
  },
  data () {
    return {
	      msg: 'zhfx',
	      photoData: {},
	      listData:[],
	      pageNo: 1,
          pages:15,
	      state : {
			  date: new Date(2016, 9,  16)
			  },
      pie:{
					    tooltip: {
					        trigger: 'item',
					        formatter: "{a} <br/>{b}: {c} ({d}%)"
					    },
					    series: [
					        {
					            name:'回复情况',
					            type:'pie',
					            radius: ['50%', '70%'],
					            avoidLabelOverlap: false,
					            label: {
					                normal: {
					                    show: 1,
					                    position: 'center',
					                    formatter:function(value){
					                    	var html='';
					                    	return html;
					                    },
					                },
					                emphasis: {
					                    show: true,
					                    textStyle: {
					                        fontSize: '30',
					                        fontWeight: 'bold'
					                    }
					                }
					            },
					            labelLine: {
					                normal: {
					                    show: false
					                }
					            },
					            data:[
					                {value:335, name:'已回复',itemStyle:{
					                	color:'#5DEDF1'
					                }},
					                {value:310, name:'未回复',itemStyle:{
					                	color:'#3EC1F7'
					                }}
					            ],
					        }
					    ]
					},
					bar:{
							    tooltip : {
							        trigger: 'axis',
							        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
							            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
							        }
							    },
							    color:['#3EC1F7','#5DEDF1'],
							    legend: {
							    	left: '8%',
			    	 				top:'6%',
							         data:[{
										    name: '已回复',
										    // 强制设置图形为圆。
										     icon: 'square',
										   /* icon: 'image://'+require('../assets/复选框-选中1.svg'),*/
										    // 设置文本为红色
										    textStyle: {
										        color: '#3EC1F7'
										    }
										},{
										    name: '未回复',
										    // 强制设置图形为圆。
										     icon: 'square',
										 /*  icon: 'image://'+require('../assets/复选框-选中2.svg'),*/
										    // 设置文本为红色
										    textStyle: {
										        color: '#5DEDF1'
										    }
										}],
							    },
							    grid: {
							        left: '3%',
							        right: '4%',
							        bottom: '3%',
							        containLabel: true
							    },
							    xAxis:  {
							        type: 'value',
							        show: false,
							        axisLine:{lineStyle:{
							        	color: '#fff'
							        }},
							    },
							    yAxis: {
							        type: 'category',
							        show: true,
							        axisTick:false,
							       /* data: ['市长热线','网站','APP','市长信箱','报警服务台'],*/
							         data: ['报警服务台','市长信箱','APP','网站','市长热线'],
							        axisLine:{lineStyle:{
							        	color: '#fff',
							        	width:0,
							        }},
							    },
							    series: [
							        {
							            name: '已回复',
							            type: 'bar',
							            stack: '总量',
							            barWidth:20,
							            label: {
							            	color:'#3EC1F7',
							                normal: {
							                    show: false,
							                    position: 'insideRight'
							                }
							            },
							            data: [{value:0,itemStyle:{
					                	color:'#3EC1F7'},lable:{color:'#000'}}, {value:0,itemStyle:{
					                	color:'#3EC1F7'}}, {value:0,itemStyle:{
					                	color:'#3EC1F7'}}, {value:0,itemStyle:{
					                	color:'#3EC1F7'}}, {value:0,itemStyle:{
					                	color:'#3EC1F7'}},]
							        },
							        {
							            name: '未回复',
							            type: 'bar',
							            stack: '总量',
							            barWidth:20,
							            label: {
							            	color:'#5DEDF1',
							                normal: {
							                    show: false,
							                    position: 'insideRight'
							                }
							            },
							            data: [{value:0,itemStyle:{
					                	color:'#5DEDF1'}}, {value:0,itemStyle:{
					                	color:'#5DEDF1'}}, {value:0,itemStyle:{
					                	color:'#5DEDF1'}}, {value:0,itemStyle:{
					                	color:'#5DEDF1'}}, {value:0,itemStyle:{
					                	color:'#5DEDF1'}},]
					                }
							    ]
							},
							radar:{

								        name:{color: '#5DEDF1',},

										    tooltip: {
										        trigger: 'axis',
										        backgroundColor:'rgba(50,50,50,0.7)'
										    },
										    radar: [
										        {
										            indicator: [
										                {name: '按期回复率', max: 100, color: '#5DEDF1'},
										                {name: '群众满意度', max: 100, color: '#5DEDF1'},
										                {name: '综合评分', max: 100, color: '#5DEDF1'},
										            ],
										            center: ['50%','66%'],
										            radius: 160
										        }
										    ],
										    series: [
										        {
										            type: 'radar',
										          /*  name:"全部部门",*/
										             tooltip: {
										                trigger: 'item'
										            },
										            itemStyle: {normal: {areaStyle: {type: 'default'}}},
										            data: [
										                {
										                    value: [0,0,0],
										                    name: '本部门',
										                    itemStyle:{color:'#F8E71C'},
										                   /* lineStyle:{color:'#F8E71C'}*/
										                },
										                {
										                    value: [0,0,0],
										                    name: '全部部门均值',
										                    itemStyle:{color:'#5DEDF1'},
										                   /*  lineStyle:{color:'#5DEDF1'}*/
										                }
										            ]
										        }
										    ]
										},
				commonParams: {
			        timeScope: 1,
			        beginTime: undefined,
			        endTime: undefined,
			        topNum: 5,
			        containElseNum: false,
			        type:1
     			 }

    }
  },
  created () {
    // vue实例创建完毕, 获取数据
    const _this=this;
     $(function(){
          $('select.select').select();
          $('.select_ul').click(function(event) {
          	_this.commonParams.type=$('.cur').attr('data-value');
         	 _this._get_hotliblist();
          });
        });
   /*  this._get_hotliblist();
     this._get_analysis_all();*/
  },
  mounted () {
    // dom挂载完毕

  },
  methods: {
    //获取列表数据
    _get_hotliblist(){
    	api.get_hotliblist({
    	departId:this.params.departId,
        startDate:this.commonParams.beginTime,
        endDate:this.commonParams.endTime,
        timeScope:this.commonParams.timeScope,
        pageNumber:this.pageNo,
        pageSize:13,
        type:this.commonParams.type,
    	}).then(res => {
        log.debug('get_analysis', res);
        this.listData=res.data.list;
        this.pages=res.data.pages;
      });
    },
    //获取图表数据
    _get_analysis_all(){
    		api.get_analysis_all({
	    		departId:this.params.departId,
	        startDate:this.commonParams.beginTime,
          endDate:this.commonParams.endTime,
          timeScope:this.commonParams.timeScope,
	    	}).then(res => {
	    		//pie
	       	this.pie.series[0].data[0].value = res.data.count.finishCount;
	       	this.pie.series[0].data[1].value = res.data.count.noFinishCount;
          $("#pieTotalnumber").text(res.data.count.count);
          $("#finishCount").text(res.data.count.finishCount+"件");
          $("#noFinishCount").text(res.data.count.noFinishCount+"件");
          //bar已办结
          for (var i = 0, l = res.data.source.finishCount.length; i < l; i++) {
              if(res.data.source.finishCount[i].source==1){
              	this.bar.series[0].data[2].value = res.data.source.finishCount[i].count;
              }else if(res.data.source.finishCount[i].source==2){
              	this.bar.series[0].data[3].value = res.data.source.finishCount[i].count;
              }else if(res.data.source.finishCount[i].source==3){
              	this.bar.series[0].data[4].value = res.data.source.finishCount[i].count;
              }else if(res.data.source.finishCount[i].source==6){
              	this.bar.series[0].data[0].value = res.data.source.finishCount[i].count;
              }else if(res.data.source.finishCount[i].source==5){
              	this.bar.series[0].data[1].value = res.data.source.finishCount[i].count;
              }
          }
          for (var i = 0, l = res.data.source.noFinishCount.length; i < l; i++) {
              if(res.data.source.finishCount[i].source==1){
              	this.bar.series[1].data[2].value = res.data.source.noFinishCount[i].count;
              }else if(res.data.source.finishCount[i].source==2){
              	this.bar.series[1].data[3].value = res.data.source.noFinishCount[i].count;
              }else if(res.data.source.finishCount[i].source==3){
              	this.bar.series[1].data[4].value = res.data.source.noFinishCount[i].count;
              }else if(res.data.source.finishCount[i].source==6){
              	this.bar.series[1].data[0].value = res.data.source.noFinishCount[i].count;
              }else if(res.data.source.finishCount[i].source==5){
              	this.bar.series[1].data[1].value = res.data.source.noFinishCount[i].count;
              }
          }

          //radar
          this.radar.series[0].data[0].value = Object.values(res.data.score[0]);
          this.radar.series[0].data[1].value = Object.values(res.data.score[1]);
	     });
    },
    onChangeDate (state) {
      this.commonParams.timeScope = state.timeScope;
      this.commonParams.beginTime = state.beginTimeFormatted;
      this.commonParams.endTime = state.endTimeFormatted;

      this._get_hotliblist();
      this._get_analysis_all();
    },

   /* on_legendselectchanged(event){
      log.debug(event);
      let key, options = {
        legend: {
          selected: event.selected,
          data:[],
          textStyle: {
            color: '#55DDE1'
          }
        }
      };
      for(key in event.selected){
        if(key === '已回复'){
          options.legend.data[0] = {
            name: key,
            icon: 'image://' + (event.selected[key] ? require('../assets/复选框-选中1.svg') : require('../assets/复选框-未选中1.svg'))
          }
        }else{
          options.legend.data[1] = {
            name: key,
            icon: 'image://' + (event.selected[key] ? require('../assets/复选框-选中2.svg') : require('../assets/复选框-未选中2.svg'))
          }
        }
      }
      log.debug(options);
      this.$refs.bar.mergeOptions(options);
    },*/
    onchange(){
    	var options=$("#test option:selected");
    },
     msgListView(curPage){
        //根据当前页获取数据
        this.pageNo = curPage;
        this._get_hotliblist();
    },
    showDetail(id) {

      this.$layer.iframe({
        title:'诉求详情',
        content: {
          content: Detail, //传递的组件对象
          parent: this,//当前的vue对象
          data:{
            id:id,
          }//props
        },
        area:[(document.documentElement.clientWidth-200)+'px',(document.documentElement.clientHeight-80)+'px'],

      });
    },
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div,ul,li{margin:0;padding:0;}
ul{line-style:none;}
li {
	list-style-type:none;
  }


.text-left-top-left .echarts{
		width: 72.7%;
		height: 400px;
		margin-left: 10%;
		margin-top: -5%;
	}
.text-left-bottom .echarts{
	width: 92.7%;
	height: 380px;
	margin-left: 1%;
}
.text-left-top-right .echarts{
	width: 92.7%;
	height: 380px;
}
.main{
 width: 100%;
 height: 100%;
 margin-top: -10px;
}
.main-right{
 width: 83%;
 height: 100%;
 float: left;
 margin-top: -10px;
}
.time{
	width: 99%;
	height: 60px;
	background: rgba(99,123,190,0.10);
	margin: 10px 0px;
	margin-right: 0.5%;
	margin-left: 0.5%;
}
.time span{
	height: 60px;
	display:inline-block;
	/*float: left;*/
	line-height: 60px;
	margin-left: 20px;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
}
.time input{
	width: 186px;
	height: 30px;
	background: rgba(136,153,207,0.20);
  border: 0 solid #8E9FD5;
  margin: 15px 10px;
  color: #FFFFFF;
  text-align: center;
  /*float: left;*/
}
.time select{
	width: 90px;
	height: 30px;
	background: rgba(136,153,207,0.20);
  border: 0 solid #8E9FD5;
  margin: 15px 30px;
  color: #FFFFFF;
  text-align: center;
}
.text{
	width: 100%;
	height: 878px;
	margin-bottom: 10px;
}
.text-left{
	height: 100%;
	width: 71.5%;
	margin-right: 0.5%;
	margin-left: 0.5%;
	float: left;

}
.text-rights{
	height: 100%;
	width: 27%;
	margin-right: 0.5%;
	float: left;
	background: rgba(99,123,190,0.10);
	padding: 20px 10px ;
	position: relative;
}
/*.text-rights select{
	width: 90px;
	height: 30px;
	background: rgba(136,153,207,0.20);
  border: 0 solid #8E9FD5;
  color: #FFFFFF;
  float: right;
  margin-right: 12px;
  margin-top: 12px;
  text-align: center;
}*/
.text-rights ul{
	clear: both;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
	padding: 10px;
}
.text-rights ul li{
	border-bottom: dashed 1px #FFFFFF;
	height: 50px;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
	padding: 15px 0px;
}
.text-rights ul li span{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	display:block;
	float: left;
}
.textul{
	clear: both;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
	padding: 10px;

	/*border: 0 solid #FFFFFF;*/
}
.textli{
	border-bottom: dashed 1px #FFFFFF;
	height: 50px;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
	padding: 15px 0px;
}
.textspan{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
	display:block;
	float: left;
}
.text-left-top{
	width: 100%;
	height: 420px;
	margin-bottom: 10px;
}
.text-left-top-left{
	width: 49.6%;
	height: 100%;
	background: rgba(99,123,190,0.10);
	margin-right: 0.8%;
	float: left;
	padding: 20px;
	position: relative;
}
.text-left-top-right{
	width: 49.6%;
	height: 100%;
	background: rgba(99,123,190,0.10);
	float: left;
}
.text-left-bottom{
	width: 100%;
	height: 448px;
	background: rgba(99,123,190,0.10);
	padding: 20px;
}
.title-bg{
	height: 42px;
	width: 210px;
	text-align: center;
	line-height: 42px;
/*	background-image: url('../assets/标题.svg');*/
 background-image: url('../assets/title.png');
  background-repeat: no-repeat;
  background-position: 0% 70%;
  background-size: contain;
}
.pietext{
	position: absolute;
	left: 35.6%;
	top: 170px;
}
.pietext h3{
	font-size: 42px;
	color: #FFB85C;
	letter-spacing: 0.53px;
	text-align: center;
}
.style-font1{
	font-size: 16px;
	color: #FFFFFF;
	letter-spacing: 0.2px;
}
.center-top{
    padding-top: 15px;
    padding-left: 15px;
    }
.pageStyle{
	width: 100%;
	height: 100px;
	text-align: center;
	margin: 0 auto;
	bottom: 0px;
	position: absolute;
}

</style>
