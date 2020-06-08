<template>
  <div class="main">
    <div class="main-right">	
    <div class="text">
    	<div class="text-detail magin-text">
    		<span class="text-detail-font1">
    			热点事件持续期间平均诉求量
    		</span>
    		<div>
    			<span class="text-detail-font2">
    				{{ detailData.avg_ask}}
    			</span>
    			<span class="text-detail-font4">
    				件/日
    			</span>   			
    		</div>
    	</div>
    	<div class="text-detail magin-text">
    		<span class="text-detail-font1">
    			峰值诉求量
    		</span>
    		<div>
    			<span class="text-detail-font2">
    				{{ detailData.peak_ask }}
    			</span>
    			<span class="text-detail-font4">
    				件/日
    			</span>   			
    		</div>
    	</div>
    	<div class="text-detail magin-text">
    		<span class="text-detail-font1">
    			峰值诉求量所在日期
    		</span>
    		<div>
    			<span class="text-detail-font2">
    			{{ detailData.peak_time }}
    			</span>
    			<span class="text-detail-font4">
    				
    			</span>   			
    		</div>
    	</div>
    	<div class="text-detail">
    		<span class="text-detail-font1">
    			热点事情持续时间
    		</span>
    		<div>
    			<span class="text-detail-font2">
    			{{ detailData.days}}
    			</span>
    			<span class="text-detail-font4">
    				天
    			</span>   	
    			<span class="text-detail-font2">
    			{{ detailData.hours}}
    			</span>
    			<span class="text-detail-font4">
    				小时
    			</span> 
    		</div>
    		<!--<div>
    			<span class="text-detail-font3">较全部部门峰值单日办结数量平均值</span>
    			<span class="text-detail-font3">{{ textData.maxFinishHotlibDiff }}</span>   			
    		</div>-->
    	</div>
    </div>
    <div class="number">
    	<div class="number-bg">
    		诉求数量变化趋势
    	</div>
    	<div class="dataButton">
    		<button id="btnHours" class="btnNoStyle" @click="buttonClick(1)">小时</button>
    		<button id="btnDay" class="btnStyle" @click="buttonClick(2)">天</button>
    		<button id="btnMonth" class="btnNoStyle" @click="buttonClick(3)">周</button>
    		<button id="btnYear" class="btnNoStyle" @click="buttonClick(4)">月</button>
    	</div>
    	<chart ref="option" :options="option" :auto-resize="true"></chart>
    </div>
    
   </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import leftNav from '@/components/leftNav'
import Datepicker from 'vuejs-datepicker';
import api from '@/api';
import cfg from '@/api/config'
import DateSelect from '@/components/DateSelect'
export default {
  mixins: [mixin],
  name: 'yqfzqs',
  components: {
    Datepicker,
    leftNav,
    cfg,
    DateSelect
  },
  data () {
  	
    let data = []

    for (let i = 0; i <= 360; i++) {
        let t = i / 180 * Math.PI
        let r = Math.sin(2 * t) * Math.cos(2 * t)
        data.push([r, i])
    }

    return {
      msg: 'yqfzqs',
      textData: {}, 
      detailData:{},
      day:{},
      state : {
  date: new Date(2016, 9,  16)
},
      option :{
			    title: {
			        text: ''
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    color:['#7ED321','#F8E71C','#F5A623'],
			    legend: {
			    	left: '8%',
			    	 top:'6%',
			       /* data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']*/		       
			       data:[{
									    name: '处理中诉求',
									    // 强制设置图形为圆。
									    icon: 'square',
									    /*icon: 'image://'+require('../assets/复选框-选中1.svg'),*/
									    // 设置文本为红色
									    textStyle: {
									        color: '#7ED321'
									    }
									},{
									    name: '新增诉求',
									    // 强制设置图形为圆。
									    icon: 'square',
									   /*icon: 'image://'+require('../assets/复选框-选中2.svg'),*/
									    // 设置文本为红色
									    textStyle: {
									        color: '#F8E71C'
									    }
									},{
									    name: '回复诉求',
									    // 强制设置图形为圆。
									    icon: 'square',
									   /* icon: 'image://'+require('../assets/复选框-选中3.svg'),*/
									    // 设置文本为红色
									    textStyle: {
									        color: '#F5A623'
									    }
									}]
			       
			    },
			    grid: {
			        left: '6%',
			        right: '4%',
			        bottom: '3%',
			        top:'18%',
			        containLabel: true
			    },
			    toolbox: {
			        feature: {
			            saveAsImage: {
			            	 icon: 'image://'+require('../assets/download.svg'),
			            },			          
			        },
			        right: '3%',
			    	 	top:'5%',
			    	 	width:"10%",
			    	 	height:"10%",
			    	 	itemSize:25,
			    },
			   xAxis: {
			        type: 'category',
			        boundaryGap: false,
			        axisLine:{lineStyle:{
			        	color: '#55DDE1'
			        }},
			        axisLabel: {
		            color: '#A7B7D6',
		          },
			         data: [],

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
		          },
		        },
			    series: [
			        {
			            name:'处理中诉求',
			            type:'line',
			            lineStyle:{
					        	color: '#7ED321'
					        },
			            data:[120, 132, 101, 134, 90, 230, 210]
			        },
			        {
			            name:'新增诉求',
			            type:'line',
			            lineStyle:{
					        	color: '#F8E71C'
					        },
			            data:[220, 182, 191, 234, 290, 330, 310]
			        },
			        {
			            name:'回复诉求',
			            type:'line',
			            lineStyle:{
					        	color: '#F5A623'
					        },
			            data:[150, 232, 201, 154, 190, 330, 410]
			        }
			    ]
			},
			commonParams: {
	        timeScope: 1,
	        beginTime: undefined,
	        endTime: undefined,
	        topNum: 5,
	        containElseNum: false
     }					
    }
  },
  created () {
    // vue实例创建完毕, 获取数据   
     this._get_eventStatistics();
  },
  activated () {
    //this._get_analysis();

  },
  mounted () {
    // dom挂载完毕
  },
  methods: {
    //获取数据
    _get_eventTrend(type){
    	api.get_eventTrend({
    		eventId:this.params.eventId,
        type:type
    	}).then(res => {
    		 this.option.xAxis.data=[];
          for (var i = 0, l = res.data.xAxis.length; i < l; i++) {
          	this.option.xAxis.data[i] = res.data.xAxis[i];
          }
         this.option.series[0].data= res.data.trend[0].data;
         this.option.series[1].data= res.data.trend[1].data;
         this.option.series[2].data= res.data.trend[2].data;
        
      });
    },
    _get_eventStatistics(){
    	api.get_eventStatistics({
    		eventId:this.params.eventId,
    	}).then(res => {
        console.log('get_eventStatistics', res);  
         this.detailData=res.data;
         this.day=res.data.days;  
         const _this=this;
          $(function () {   	
			    	  _this.getDay(_this.day+1);
			    });

      });
    },
    buttonClick(num){
    	if(num==1){
    		$("#btnHours").removeClass("btnNoStyle").addClass("btnStyle");
      	$("#btnDay").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnMonth").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnYear").removeClass("btnStyle").addClass("btnNoStyle");
       this._get_eventTrend(1);
    	 }else if(num==2){
    	 	$("#btnDay").removeClass("btnNoStyle").addClass("btnStyle");
    	 	$("#btnHours").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnMonth").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnYear").removeClass("btnStyle").addClass("btnNoStyle");
    	 this._get_eventTrend(2);
    	 }else if(num==3){
    	 	$("#btnMonth").removeClass("btnNoStyle").addClass("btnStyle");
    	 	$("#btnDay").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnHours").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnYear").removeClass("btnStyle").addClass("btnNoStyle");
    	 	this._get_eventTrend(3);
    	 }else{
    	 	$("#btnYear").removeClass("btnNoStyle").addClass("btnStyle");
    	 	$("#btnDay").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnMonth").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnHours").removeClass("btnStyle").addClass("btnNoStyle");
    	 this._get_eventTrend(4);
    	 }
    },
    on_legendselectchanged(event){
      console.log(event);
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
        if(key === '处理中诉求'){
          options.legend.data[0] = {
            name: key,
            icon: 'image://' + (event.selected[key] ? require('../assets/复选框-选中1.svg') : require('../assets/复选框-未选中1.svg'))
          }
        }else if(key === '回复诉求'){
        	 options.legend.data[2] = {
            name: key,
            icon: 'image://' + (event.selected[key] ? require('../assets/复选框-选中3.svg') : require('../assets/复选框-未选中3.svg'))
          }
        }
        else if(key === '新增诉求'){
          options.legend.data[1] = {
            name: key,
            icon: 'image://' + (event.selected[key] ? require('../assets/复选框-选中2.svg') : require('../assets/复选框-未选中2.svg'))
          }
        }
      }
      console.log(options);
      this.$refs.option.mergeOptions(options);
    },
    getDay(day){
    	if(day>=1&&day<=2){
	     	$("#btnHours").show();
      	$("#btnDay").hide();
      	$("#btnMonth").hide();
      	$("#btnYear").hide();
      	$("#btnHours").removeClass("btnNoStyle").addClass("btnStyle");
      	this._get_eventTrend(1);
	     }else if(day>=3&&day<=5){
	     	$("#btnHours").show();
      	$("#btnDay").show();
      	$("#btnMonth").hide();
      	$("#btnYear").hide();
      	$("#btnDay").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnHours").removeClass("btnNoStyle").addClass("btnStyle");
      	this._get_eventTrend(1);
	     }else if(day>=6&&day<=14){
	     	$("#btnHours").hide();
      	$("#btnDay").show();
      	$("#btnMonth").hide();
      	$("#btnYear").hide();
      	$("#btnDay").removeClass("btnNoStyle").addClass("btnStyle");
      	this._get_eventTrend(2);
	     }else if(day>=15&&day<=62){
	     	$("#btnHours").hide();
      	$("#btnDay").show();
      	$("#btnMonth").show();
      	$("#btnYear").hide();
      	$("#btnDay").removeClass("btnNoStyle").addClass("btnStyle");
      	$("#btnMonth").removeClass("btnStyle").addClass("btnNoStyle");
      	this._get_eventTrend(2);
	     }else if(day>=63&&day<=365){
	     	$("#btnHours").hide();
      	$("#btnDay").hide();
      	$("#btnMonth").show();
      	$("#btnYear").show();
      	$("#btnDay").removeClass("btnStyle").addClass("btnNoStyle");
      	$("#btnMonth").removeClass("btnNoStyle").addClass("btnStyle");
      	$("#btnYear").removeClass("btnStyle").addClass("btnNoStyle");
      	this._get_eventTrend(3);
	     }else{
	     	$("#btnHours").hide();
      	$("#btnDay").hide();
      	$("#btnMonth").hide();
      	$("#btnYear").show();
      	$("#btnYear").removeClass("btnNoStyle").addClass("btnStyle");
      	this._get_eventTrend(4);
	     }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	.echarts{
		width: 92.7%;
		height: 550px;
	}
.main{
 width: 100%;
 height: 100%;
 margin-left: 8px;
}
.main-right{
 width: 100%;
 height: 100%;
 float: left;
 margin-top: -10px;
}
.time{
	width: 99%;
	height: 60px;
	background: rgba(99,123,190,0.10);
	margin: 10px 0px;
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
	width: 99%;
	height: 240px;
	margin-top: 10px;	
}
.text-detail{
	float: left;
	width: 24.6%;
	height: 100%;	
	background: rgba(99,123,190,0.10);
	padding: 30px;
}
.text-detail div{
	margin: 0 auto;
	text-align: center;
	margin-top: 40px;
}
.text-detail-font3{
	font-size: 14px;
	color: #59B3FF;
	letter-spacing: 0.18px;
}
.text-detail-font1{
 font-size: 16px;
 color: #AEB6D5;
 letter-spacing: 0.2px;
}
.text-detail-font2{
 font-size: 36px;
 color: #FFB85C;
 letter-spacing: 0.45px;
}
.text-detail-font4{
font-size: 14px;
color: #AEB6D5;
letter-spacing: 0.45px;
line-height: 50px;
}
.magin-text{
	margin-right: 0.5%;
}
.number{
	width: 99%;
	height: 698px;
	background: rgba(99,123,190,0.10);
	margin: 10px 0px;
	padding: 30px;
	position: relative;
}
.number-bg{
	height: 42px;
	width: 210px;
	text-align: center;
	line-height: 42px;
	/*background-image: url('../assets/标题.svg');*/
	 background-image: url('../assets/title.png');
  background-repeat: no-repeat;
  background-position: 0% 70%;
  background-size: contain;
}
.dataButton{
	position: absolute;
	right: 15.6%;
	top: 100px;
	border: 1px solid #55DDE1;
	z-index: 1;
}
.btnNoStyle{
	border:0px;
	background-color:transparent;
	width: 60px;
	height: 32px;
  color: #55DDE1; 
}
.btnStyle{
	background: #55DDE1;
	color: #121d55;
	border:0px;
	width: 60px;
	height: 32px;
}
.center-top{
    padding-top: 15px;
    padding-left: 15px;
    }
</style>
