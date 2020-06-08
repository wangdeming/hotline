<template>
<div class="main">
  <div class="main-right">	
    <div class="text">
      <div class="text-left">
      	<div class="text-left-top">
      		<div class="title-bg">热点事件热度</div>
      		<chart :options="pie" :auto-resize="true"></chart>        	
      		<div class="pietext"><span id="">较同类热点事件热度平均值&nbsp&nbsp</span><span class="fontColor">{{ detail.typeAverageRate }}</span></div>
      		<div class="pietexts"><span id="">较全部热点事件热度平均值&nbsp&nbsp</span><span class="fontColor">{{ detail.allAverageRate }}</span></div>
      	</div>
      	<div class="text-left-middle">
      		<div class="middle">
      			<div class="middleLeft">热点事件类别</div>
      			<div class="middleRight">{{ detail.typeName }}</div>
      		</div>
      		<div class="middle">
      			<div class="middleLeft">首件诉求反映时间</div>
      			<div class="middleRight">{{ detail.happenTime }}</div>
      		</div>
      		<div class="middle">
      			<div class="middleLeft">热点事件持续时长</div>
      			<div class="middleRight">{{ detail.duration }}</div>
      		</div>
      		<div class="middle">
      			<div class="middleLeft">热词</div>
      			<div class="middleRight">{{ detail.hotWords }}</div>
      		</div>
      	</div>
      	<div class="text-left-top photo">
      		<div class="title-bg">近7日趋势</div>
      		<chart :options="option" :auto-resize="true"></chart>
      	</div>
      </div>
      <div class="text-middle">
      	
      	<div class="title-bg">历史解决方案</div>
      	<div class="text-middle-detail" v-for="(item,index) in historyListData">
      		<div class="text-start">  
      			<div v-if="item.recommend ==1||item.recommend ==2">
      				<img src="../assets/start.svg"/>
      			</div>
      			<div v-if="item.recommend ==3||item.recommend ==4">
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      			</div>
      			<div v-if="item.recommend ==5||item.recommend ==6">
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      			</div>
      			<div v-if="item.recommend ==7||item.recommend ==8">
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      			</div>
      			<div v-if="item.recommend ==9||item.recommend ==10">
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      				<img src="../assets/start.svg"/>
      			</div>
	      		<div>推荐指数</div>
	      	</div>
      		<div class="text-middle-detail-left">
      			<div>诉求主题</div>
      			<div>办结部门</div>
      			<div>办结时间</div>
      			<div style="height: 72px;">承办记录</div>
      			<div>满意度评价&nbsp;&nbsp;</div>     			
      		</div>
      		<div class="text-middle-detail-right">
      			<div>{{ item.title }}</div>
      			<div>{{ item.department }}</div>
      			<div>{{ item.dealDateTime }}</div>
      			<div class="font-detail" :title="item.response_content">{{ item.response_content }}</div>
      			<div v-if="item.yes == 1">非常满意</div>
      			<div v-if="item.yes == 2">满意</div> 
      			<div v-if="item.yes == 3">比较满意</div> 
      			<div v-if="item.yes == 4">不满意</div> 
      		</div>     		
      	</div>
      	      	
      </div>
      <div class="text-rights">
      	<div class="">
      		<div class="title-bg" style="float: left;">
			    		同类事件列表
			   </div>	
		    	<!--<select class="select" name="state" data-value="1" @change="onchange" v-model="selected">
						<option value="1">全部</option>
						<option value="2">已办结</option>
						<option value="3">未办结</option>	
					</select>-->
      	</div>      	 
	    	<ul id="hotliblist">
	    		<li v-for="(item,index) in listData"  @click="gotoYqzhfx(item)">		
	    			  <span style="width: 40%;" :title="item.title">{{ index+1 }}.{{ item.content }}</span>
		    			<span style="width: 48%;text-align: center;">{{ item.happenTime }}</span>
		    			<span style="width: 12%;color: #F8E71C;">{{ item.heat }}</span>  
        	</li>	
	    	</ul>
	    	<div class="pageStyle">	    		
				 <navigation :pages="pages" :current.sync="pageNo" @navpage="msgListView"></navigation>
			</div>
	    	
      </div>
    </div>    
  </div>
</div>
</template>

<script>
import mixin from '../mixins'
import api from '@/api';
import cfg from '@/api/config'
import DateSelect from '@/components/DateSelect'
import navigation from '@/components/pagination'

export default {
  mixins: [mixin],
  name: 'yqzhfx',
  components: {
    DateSelect,
    navigation
  },
  data () {		
    return {
	      msg: 'yqzhfx',
	      photoData: null,
	      listData:[],
	      historyListData:[],
	      pageNo: 1,
	      detail:{},
        pages:15,
	      state : {
			  date: new Date(2016, 9,  16)
			  },
      pie:{
					    /*tooltip: {
					        trigger: 'item',
					        formatter: "{a} <br/>{b}: {c} ({d}%)"
					    },*/ 
					    color:['#67e0e3', '#eaeaea'],
					    title: [
				            {
				              textStyle: {
				                color: '#55DDE1',
				                fontSize: 14,
				                lineHeight:86,
				                fontWeight: 'normal',
				              },
				              /*text: '较同类热点事件热度平均值-20%'+'\n'+'较全部热点事件热度平均值-20%',*/
				              left: '6%',
				              bottom: '6%'
				            }
				          ],
					    series: [
					        { 
					        	silent: true,
					            name:'回复情况',
					            type:'pie',
					            radius: ['50%', '70%'],
					            avoidLabelOverlap: false,
					            label: {
					               /* normal: {
					                    show: 1,
					                    position: 'center',
					                    formatter:function(value){
					                    	var html='';
					                    	return html;
					                    },
					                },*/
					                normal: {
					                  show: true,
					                  color: '#F5A623',
					                  fontSize: 36,
					                  position: 'center',
					                  formatter (params) {
					                    return !params.dataIndex ? params.percent  : ''
					                  }
					                },
					                emphasis: {
					                    show: true,
					                    textStyle: {
					                        fontSize: '36',
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
					                	color:'rgb(234,234,234)'
					                }}
					            ],
					        }
					    ]
					},
			option :{
			    title: {
			        text: ''
			    },
			    tooltip: {
			        trigger: 'axis'
			    },
			    grid: {
			        left: '6%',
			        right: '4%',
			        bottom: '3%',
			        top:'18%',
			        containLabel: true
			    },
			    /*toolbox: {
			        feature: {
			            saveAsImage: {
			            	 icon: 'image://'+require('../assets/download.svg'),
			            },			          
			        },
			        right: '3%',
			    	 	top:'6%',
			    	 	width:"10%",
			    	 	height:"10%"
			    },*/
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
		          maxInterval: 10,
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
			        timeScope: 1,
			        beginTime: undefined,
			        endTime: undefined,
			        topNum: 5,
			        containElseNum: false,
			        type:'',
     			 }
							
    }
  },
  created () {
    // vue实例创建完毕, 获取数据
    this._get_eventHistory(this.params.eventId);
    //this._get_hoteventPage();
    this._get_hoteventDetail(this.params.eventId);
  },
  mounted () {
    // dom挂载完毕
     
  },
  methods: {
  	//获取列表数据
    _get_hoteventPage(){
    	api.get_hoteventPage({
        pageNumber:this.pageNo,
        pageSize:13,
        type:this.commonParams.type,     
    	}).then(res => {
        log.debug('get_hoteventPage', res); 
        this.listData=res.data.list;
        var num;
        for (var i = 0, l = this.listData.length; i < l; i++) {
         if(this.listData[i].id==this.params.eventId){
         	num=i;
         }       	
        }
        this.listData.splice(num,1);
        this.pages=res.data.pages;       
      });
    }, 	  	
    //获取历史解决方案
    _get_eventHistory(id){
    	api.get_eventHistory({
    	/*eventId:this.params.eventId,*/   
    	eventId:id,
    	}).then(res => {
        log.debug('get_eventHistory', res);  
         this.historyListData=res.data;
        /* console.log(res.data[0].recommend);*/
      });
    },
    //获取图表数据
    _get_hoteventDetail(id){
    		api.get_hoteventDetail({
	    	eventId:id,
	    	}).then(res => { 
	    		 log.debug('_get_hoteventDetail', res); 
	    		  this.detail=res.data;
	    		  this.commonParams.type=res.data.type;
	    		  this.option.xAxis.data = res.data.appealLineChart.map(e => e.name);
                  this.option.series[0].data = res.data.appealLineChart.map(e => e.value);
                  this.pie.series[0].data[0].value = res.data.heat;  
	       	      this.pie.series[0].data[1].value = 100-res.data.heat; 
	       	     /* this.pie.title[0].text = '较同类热点事件热度平均值'+res.data.typeAverageRate+'\n'+'较全部热点事件热度平均值'+res.data.allAverageRate; */
	       	    this._get_hoteventPage(this.commonParams.type);
	       	    
                
	     });
    },
    onChangeDate (state) {
      this.commonParams.timeScope = state.timeScope;
      this.commonParams.beginTime = state.beginTimeFormatted;
      this.commonParams.endTime = state.endTimeFormatted;

      /*this.initIndex();
      this.initTimer();*/
      this._get_hotliblist();
      this._get_analysis_all();
    },
    
    changed(event){
    	log.debug(event);
    },
     msgListView(curPage){
        //根据当前页获取数据
        this.pageNo = curPage;
       this._get_hoteventPage(this.commonParams.type);
    },
    gotoYqzhfx(item){	    
	    this._get_eventHistory(item.id);
	    this._get_hoteventPage(this.commonParams.type);
	    this._get_hoteventDetail(item.id);
      this.$router.push({
        name: 'yqzhfx',
        params: {
          eventId: item.id,
        },
        query: {
          type: 'yqsj'
        }
      });
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
div,ul,li{margin:0;padding:0;}
ul{line-style:none;}
li {
	list-style-type:none;
	cursor: pointer;
}
.text-left-top .echarts{
		width: 46.7%;
		height: 360px;
		margin-left: 28%;
		margin-top: -10%;		
	}
.photo .echarts{
		width: 100%;
		height: 280px;
		margin-left: -2%;
		margin-top: 2%;
	}
.main{
 width: 100%;
 height: 100%;
}
.main-right{
 width: 100%;
 height: 100%;
 float: left;
}
.text{
	width: 100%;
	height: 948px;
	margin-bottom: 20px;	
}
.text-left{
	height: 100%;
	width: 35.5%;
	margin-right: 0.5%;
	margin-left: 0.5%;
	float: left;	
}
.text-middle{	
	height: 100%;
	width: 35.5%;
	margin-right: 0.5%;
	float: left;
	padding: 20px;
	background: rgba(99,123,190,0.10);	
}
.text-start{
	position: absolute;
	top: 5%;
	right: 5%;
	margin: 0 auto;
	text-align: center;
}
.text-middle-detail{
	position: relative;
	border: 1px solid #55DDE1;
    border-radius: 8px;
    height: 250px;
    width: 100%;
    margin-top: 20px;
    padding: 15px 20px;
}
.text-middle-detail-left{
	height: 100%;
	float: left;
	font-size: 14px;
	color: #55DDE1;
	letter-spacing: 0.18px;
	line-height: 36px;
}
.text-middle-detail-right{
	height: 100%;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
	line-height: 36px;
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
	height: 390px;
	margin-bottom: 10px;
	background: rgba(99,123,190,0.10);
	padding: 20px;
	position: relative;
}
.text-left-middle{
	width: 100%;
	height: 150px;
	margin-bottom: 10px;
	padding: 20px;
	background: rgba(99,123,190,0.10);
}
.middleLeft{
	float: left;
	color: #55DDE1;	
	font-size: 14px;
	letter-spacing: 0.18px;
}
.middleRight{
	float: right;
	font-size: 14px;
	color: #FFFFFF;
	letter-spacing: 0.18px;
}
.middle{
	clear: both;
	height: 30px;
}
/*.text-left-middle{
	width: 100%;
	height: 303px;
	margin-bottom: 10px;
	background: rgba(99,123,190,0.10);
}
.text-left-bottom{
	width: 100%;
	height: 303px;
	margin-bottom: 10px;
	background: rgba(99,123,190,0.10);
}*/
.title-bg{
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
.pietext{
	position: absolute;
	left: 33%;
	top: 80%;	
	font-size: 14px;
	color: #55DDE1;
	letter-spacing: 0.18px;
}
.pietexts{
	position: absolute;
	left: 33%;
	top: 86%;	
	font-size: 14px;
	color: #55DDE1;
	letter-spacing: 0.18px;
}
.fontColor{
	font-size: 14px;
	color: #F5A623;
	letter-spacing: 0.18px;
	line-height: 20px;
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
.font-detail{
	text-overflow: -o-ellipsis-lastline;
	overflow: hidden;
	text-overflow: ellipsis;
	display: -webkit-box;
	-webkit-line-clamp: 2;
	-webkit-box-orient: vertical; 
	height: 72px;
}  

</style>
