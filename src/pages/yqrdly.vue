<template>
  <div class="contentDiv clearfix">
    <div class="right-content">
    		<div class="topDiv">
    			<span class="nameSpan">相关诉求</span>
    			<span class="valueSpan">共<em>{{relatedCount}}</em>件</span>
    			<span class="nameSpan">市长热线</span>
    			<span class="valueSpan"><em>{{hotlineCount}}</em>件</span>
    			<span class="nameSpan">网站</span>
    			<span class="valueSpan"><em>{{websiteCount}}</em>件</span>
    			<span class="nameSpan">APP</span>
    			<span class="valueSpan"><em>{{appCount}}</em>件</span>
    			<span class="nameSpan">市长信箱</span>
    			<span class="valueSpan"><em>{{mailCount}}</em>件</span>
    			<span class="nameSpan">服务报警台</span>
    			<span class="valueSpan"><em>{{alarmCount}}</em>件</span>
    		</div>
    		<div class="middleDiv">
    			<select class="selectTime" @change="timeChange()">
				<option v-for="(item, index) in itemlist" v-bind:selected="(index == selectIndex?true:false)">{{item.date}}</option>
			</select>
    			<a @click="goLastOrNext('last',$event)" class="scrollLeft"
    				v-bind:disabled="(selectIndex==0)?true:false"
    				v-bind:style="{'cursor': (selectIndex==0?'not-allowed':'pointer')}"></a>
    			<div class="scrollDiv">
    				<ul class="scrollUL">
    					<li v-for="(item, index) in dataList"
    						v-bind:style="{'left': (index * 33 + 9) + 'px','top': (getIndexBySource(item.source) * 30 + 7) + 'px','background-color':getBackgroundColorBySource(item.source)}"></li>
    				</ul>
    			</div>
    			<a @click="goLastOrNext('next',$event)" class="srcollRight"
    				v-bind:disabled="(selectIndex==(itemlist.length - 1))?true:false"
    				v-bind:style="{'cursor': (selectIndex==(itemlist.length - 1)?'not-allowed':'pointer')}"></a>
    			<div class="typeDiv">
    				<div class="typeItem">
    					<a @click="selectOrNot(3,$event)" class="select_btn btn_select_one"></a>
    					<span class="typeName nameOne">市长热线</span>
    				</div>
    				<div class="typeItem">
    					<a @click="selectOrNot(2,$event)" class="select_btn btn_select_two"></a>
    					<span class="typeName nameTwo">网站</span>
    				</div>
    				<div class="typeItem">
    					<a @click="selectOrNot(1,$event)" class="select_btn btn_select_three"></a>
    					<span class="typeName nameThree">APP</span>
    				</div>
    				<div class="typeItem">
    					<a @click="selectOrNot(5,$event)" class="select_btn btn_select_four"></a>
    					<span class="typeName nameFour">市长信箱&报警服务台</span>
    				</div>
    			</div>
    		</div>
    		<div class="bottomDiv">
    			<div class="leftDiv">
    				<div v-for="(item,index) in showFloors"
    				v-bind:style="{'width':'100%','height':(100 / showFloors.length)+'%','float':'left','background-color':getBackgroundColor(item)}"></div>
    			</div>
    			<div class="rightDiv">
    				<div v-for="(item,index) in showFloors"
    					v-bind:style="{'min-width':'100%','width': (dataList.length * 290)+'px','height':(100 / showFloors.length)+'%','background-color':getFloorBackgroundColor(index),'position':'absolute','left':'0','top':(index * 100 / showFloors.length)+'%'}"></div>
    				<ul class="bottomUL">
	    				<li v-for="(item,index) in dataList"
	    					v-bind:style="{'left': (index * 290) + 'px','top': (getFloorHeight(item.source) * 100 / showFloors.length)+'%'}"  @click="showDetail(item.id )">
	    					<div class="cardItemTop">
	    						<span class="cardItemName">反映时间</span>
	    						<span class="cardItemDetails">{{item.askTime}}</span>
	    					</div>
	    					<div class="cardItemMiddle">
	    						<span class="cardItemName">诉求类别</span>
	    						<span class="cardItemDetails">{{item.type}}</span>
	    						<span class="cardItemStatus">({{item.status}})</span>
	    					</div>
	    					<div class="cardItemBottom">
	    						<span class="cardItemName toTop">诉求主题</span>
	    						<span class="carItemTitle">{{item.title}}</span>
	    					</div>
	    				</li>
	    			</ul>
    			</div>
    		</div>
    </div>
  </div>
</template>

<script>
import mixin from '../mixins'
import api from '@/api'
import Detail from '@/components/Detail'

export default {
  mixins: [mixin],
  name: 'yqrdly',
  components: {},
  data () {
    return {
      relatedCount:0,
      hotlineCount:0,
      websiteCount:0,
      appCount:0,
      mailCount:0,
      alarmCount:0,
      itemlist:[],
      selectIndex:0,
      sourceIds:[1,2,3,5,6],
      dataList:[],
      showFloors:[1,2,3,4],
    }
  },
  created () {
    this.initIndex();
  },
  methods: {
  	getIndexBySource(index) {
  		if (index == 1) {
  			return 2;
  		}else if (index == 2) {
  			return 1;
  		}else if (index == 3) {
  			return 0;
  		}else{
  			return 3;
  		}
  	},
  	getBackgroundColorBySource(index) {
  		if (index == 1) {
  			return '#F8E71C';
  		}else if (index == 2) {
  			return '#55DDE1';
  		}else if (index == 3) {
  			return '#F5A623';
  		}else{
  			return '#7ED321';
  		}
  	},
  	getBackgroundColor(index) {
  		if (index == 1) {
  			return '#F5A623';
  		}else if (index == 2) {
  			return '#55DDE1';
  		}else if (index == 3) {
  			return '#F8E71C';
  		}else{
  			return '#7ED321';
  		}
  	},
  	getFloorBackgroundColor(index) {
  		if(index % 2 == 0){
  			return 'rgba(99,123,190,0.10)';
  		}else{
  			return 'rgba(21,34,94,0.10)';
  		}
  	},
  	getFloorHeight(index){
  		var tempNum;
  		if (index == 1) {
  			tempNum = 3;
  		}else if (index == 2) {
  			tempNum = 2;
  		}else if (index == 3) {
  			tempNum = 1;
  		}else{
  			tempNum = 4;
  		}
  		var tempIndex = this.showFloors.indexOf(tempNum);
  		log.debug(this.showFloors);
  		log.debug(tempNum);
  		log.debug(tempIndex);
  		return tempIndex;
  	},
  	selectOrNot(index,event) {
  		var num = '';
  		if (index == 1) {
  			num = 'three';
  		}else if (index == 2) {
  			num = 'two';
  		}else if (index == 3) {
  			num = 'one';
  		}else{
  			num = 'four';
  		}
  		if($(event.target).hasClass("btn_select_" + num)){
			$(event.target).removeClass("btn_select_" + num).addClass("btn_noselect_" + num);
			var currentIndex = this.sourceIds.indexOf(index);
			if (currentIndex > -1) {
			    this.sourceIds.splice(currentIndex, 1);
			}
			if(index == 5){
				var lastIndex = this.sourceIds.indexOf(6);
				if (lastIndex > -1) {
				    this.sourceIds.splice(lastIndex, 1);
				}
			}
		}else{
			$(event.target).removeClass("btn_noselect_" + num).addClass("btn_select_" + num);
			this.sourceIds.push(index);
			if(index == 5){
				this.sourceIds.push(6);
			}
		}
		var tempArr = [];
		if($(".select_btn").eq(0).hasClass("btn_select_one")){
			tempArr.push(1);
		}
		if($(".select_btn").eq(1).hasClass("btn_select_two")){
			tempArr.push(2);
		}
		if($(".select_btn").eq(2).hasClass("btn_select_three")){
			tempArr.push(3);
		}
		if($(".select_btn").eq(3).hasClass("btn_select_four")){
			tempArr.push(4);
		}
		this.showFloors = tempArr;
		this._getSourceList();
  	},
  	goLastOrNext(key,event) {
  		if($(event.target).attr("disabled")){
  			return false;
  		}else{
  			this.selectIndex = $('.selectTime>option').index($('.selectTime>option:selected'));
  			if (key == 'last') {
  				this.selectIndex -= 1;
  			}
  			if(key == 'next'){
  				this.selectIndex += 1;
  			}
			this._getSourceList();
  		}
  	},
    initIndex() {
		this._getSourceStatistics();
		this._getSourceRangeDate();
	},
	_getSourceStatistics() {
		api.get_sourceStatistics({
			eventId: this.params.eventId
//			eventId:1,
		}).then(res => {
			var data = res.data;
			this.relatedCount = (typeof(data.relatedCount)=="undefined" ? 0:data.relatedCount);
			this.hotlineCount = (typeof(data.hotlineCount)=="undefined" ? 0:data.hotlineCount);
			this.websiteCount = (typeof(data.websiteCount)=="undefined" ? 0:data.websiteCount);
			this.appCount = (typeof(data.appCount)=="undefined" ? 0:data.appCount);
			this.mailCount = (typeof(data.mailCount)=="undefined" ? 0:data.mailCount);
			this.alarmCount = (typeof(data.alarmCount)=="undefined" ? 0:data.alarmCount);
		});
	},
	_getSourceRangeDate() {
		api.get_sourceRangeDate({
			eventId: this.params.eventId,
//			eventId:1,
		}).then(res => {
			var data = res.data;
			this.itemlist = data;
			this._getSourceList();
		});
	},
	timeChange() {
		this.selectIndex = $('.selectTime>option').index($('.selectTime>option:selected'));
		this._getSourceList();
	},
	_getSourceList() {
		api.get_sourceList({
			eventId: this.params.eventId,
//			eventId:1,
			date:this.itemlist[this.selectIndex].date,
			sourceIds:this.sourceIds
		}).then(res => {
			var data = res.data;
			this.dataList = data;
		});
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
	.contentDiv {
		width: calc(100% - 10px);
		height: 948px;
		margin-left: 10px;
	}
	.right-content {
		width: 100%;
		height: 948px;
	}
	.topDiv{
		width: 100%;
		height: 60px;
		line-height: 60px;
		background-color: rgba(99,123,190, 0.1);
		margin-bottom: 11px;
	}
	.nameSpan{
		font-family: PingFangSC-Semibold;
		font-size: 16px;
		color: #55DDE1;
		letter-spacing: 0.2px;
		margin-right: 20px;
	}
	.nameSpan:first-child{
		margin-left: 20px;
	}
	.valueSpan{
		font-family: PingFangSC-Semibold;
		font-size: 14px;
		color: #FFFFFF;
		letter-spacing: 0.18px;
		margin-right: 60px;
	}
	.valueSpan>em{
		color: #F5A623;
		margin: 0 5px;
	}
	.middleDiv{
		width: 100%;
		height: 165px;
		line-height: 165px;
		background-color: rgba(99,123,190, 0.1);
		margin-bottom: 12px;
		position: relative;
	}
	.scrollLeft{
		display: inline-block;
		width: 45px;
		height: 86px;
		background-image: url(../assets/scrollLeft.svg) !important;
		position: absolute;
		left: 20px;
		top: 40px;
	}
	.srcollRight{
		display: inline-block;
		width: 45px;
		height: 86px;
		background-image: url(../assets/scrollRight.svg) !important;
		position: absolute;
		right: 220px;
		top: 40px;
	}
	.scrollDiv{
		display: inline-block;
		width: calc(100% - 380px);
		height: 120px;
		margin: 25px 0px 0px 90px;
		position: relative;
		overflow-x: scroll;
		overflow-y: hidden;
		-ms-overflow-style:none;
	}
	.scrollDiv::-webkit-scrollbar{height:0px}
	.scrollUL{
		width: auto;
		min-width: 100%;
		height: 100%;
		position: relative;
	}
	.scrollUL>li{
		display: inline-block;
		width: 24px;
		height: 16px;
		position: absolute;
	}
	.selectTime{
		display: inline-block;
		width: 150px;
		height: 30px;
		background: rgba(136,153,207,0.20);
		border: 0 solid #8E9FD5;
		position: absolute;
		top: 0;
		left: calc(50% - 165px);
		font-size: 13px;
		color: #FFFFFF;
		outline: none;
		z-index: 1000;
	}
	.selectTime>option{
		background-color: rgba(136,153,207,1.0);
	}
	.typeDiv{
		width: 170px;
		height: 165px;
		position: absolute;
		top: 0;
		right: 20px;
	}
	.typeItem{
		width: 100%;
		height: 20px;
		margin-bottom: 15px;
		line-height: 20px;
	}
	.typeItem:first-child{
		margin-top: 20px;
	}
	.select_btn{
		display: inline-block;
		width: 18px;
		height: 18px;
		margin-right: 10px;
		margin-top: 1px;
		float: left;
		background-size: 100% 100% !important;
	}
	.btn_select_one{
		background-image: url(../assets/select_1.svg) !important;
	}
	.btn_noselect_one{
		background-image: url(../assets/no_select_1.svg) !important;
	}
	.btn_select_two{
		background-image: url(../assets/select_2.svg) !important;
	}
	.btn_noselect_two{
		background-image: url(../assets/no_select_2.svg) !important;
	}
	.btn_select_three{
		background-image: url(../assets/select_3.svg) !important;
	}
	.btn_noselect_three{
		background-image: url(../assets/no_select_3.svg) !important;
	}
	.btn_select_four{
		background-image: url(../assets/select_4.svg) !important;
	}
	.btn_noselect_four{
		background-image: url(../assets/no_select_4.svg) !important;
	}
	.typeName{
		height: 20px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		letter-spacing: 0.18px;
		float: left;
	}
	.nameOne{
		color: #F5A623;
	}
	.nameTwo{
		color: #50E3C2;
	}
	.nameThree{
		color: #F8E71C;
	}
	.nameFour{
		color: #7ED321;
	}
	.bottomDiv{
		width: 100%;
		height: 700px;
	}
	.leftDiv{
		width: 20px;
		height: 100%;
		float: left;
	}
	.rightDiv{
		width: calc(100% - 20px);
		height: 100%;
		float: left;
		overflow-x: scroll;
		overflow-y: hidden;
	    position: relative;
	}
	.bottomUL{
		width: auto;
		min-width: 100%;
		height: 100%;
		position: relative;
	}
	.bottomUL>li{
		width: 280px;
		height: 160px;
		position: absolute;
		background: #4B68B0;
		box-shadow: 0 0 4px 1px rgba(85,221,225,0.49);
    cursor: pointer;
	}
	.cardItemTop{
		width: calc(100% - 30px);
		height: 20px;
		margin: 15px 15px 0;
	}
	.cardItemMiddle{
		width: calc(100% - 30px);
		height: 20px;
		margin: 15px 15px 0;
	}
	.cardItemBottom{
		width: calc(100% - 30px);
		height: 60px;
		margin: 15px 15px 0;
	}
	.cardItemName{
		display: inline-block;
		width: 60px;
		height: 20px;
		line-height: 20px;
		font-size: 14px;
		color: #55DDE1;
		margin-right: 15px;
		font-family: PingFangSC-Semibold;
	}
	.cardItemDetails{
		display: inline-block;
		width: auto;
		height: 20px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #FFFFFF;
	}
	.cardItemStatus{
		display: inline-block;
		width: auto;
		height: 20px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #F8E71C;
	}
	.carItemTitle{
		display: inline-block;
		width: calc(100% - 80px);
		height: 60px;
		line-height: 20px;
		font-family: PingFangSC-Regular;
		font-size: 14px;
		color: #FFFFFF;
	}
	.toTop{

	}
</style>
