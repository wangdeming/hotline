<template>
  <div class="index-rank">
    <ul class="rank-box">
      <li class="rank-item"
      v-for="(item, index) in data"
      :class="[index == 0 ? 'rank-item0' : index == 1 ? 'rank-item1' : index == 2 ? 'rank-item2' : 'rank-itemx']"
      @click="gotoZhfx(item)">
        <span class="item-1"
          :class="{'item-1-fix': item.happenTime}"
        >NO.{{ index+1 }}</span>
        <span class="item-2 ellipsis" :title="item.name"
          :class="{'item-2-fix': item.happenTime}"
        >{{ item.name }}</span>
        <span v-if="item.happenTime" class="item-4">{{ item.happenTime.split(' ')[0] }}</span>
        <span class="item-3"
          :class="{'item-3-fix': item.happenTime}"
        >{{ item.value }}</span>
      </li>
    </ul>
  </div>
</template>

<script>

export default {
  name: 'Rank',
  props: {
    option: {
      type: Object,
      default: () => {
        return {
          type: 'yqsj'
        }
      }
    },
    data: Array
  },
  data () {
    return {
      msg: 'rank'
    }
  },
  created () {},
  mounted () {},
  methods: {
    gotoZhfx (item) {
      log.debug(item);
      if(this.option.type === 'yqsj'){
        this.$router.push({
          name: 'yqzhfx',
          params: {
            eventId: item.id
          },
          query: {
            type: this.option.type
          }
        });
      }else if(this.option.type === 'szdw'){
        this.$router.push({
          name: 'szzhfx',
          params: {
            departId: item.id
          },
          query: {
            type: this.option.type
          }
        });
      }else if(this.option.type === 'xzqy'){
        this.$router.push({
          name: 'xzzhfx',
          params: {
            departId: item.id
          },
          query: {
            type: this.option.type
          }
        });
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="stylus">
.index-rank{
  width: 100%;
  height: 100%;
  padding: 90px 15% 50px 15%;

  .ellipsis{
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .rank-box{
    list-style: none;
    
    .rank-item{
      position: relative;
      height: 22px;
      margin-bottom: 10px;
      cursor: pointer;
    }
    .rank-item:hover {
      background-color: rgba(0,0,0,.075);
    }
    .item-1{
      position: absolute;
      left: 0;
    }
    .item-1-fix{
      left: -40px;
    }
    .item-2{
      position: absolute;
      left: 22%;
      width: 70%;
      color: #fff;
    }
    .item-2-fix{
      left: 5%;
      width: 60%;
    }
    .item-3{
      position: absolute;
      // right: 0;
      left: 100%;
    }
    .item-4{
      position: absolute;
      left: 70%;
      color: #fff;
    }
    .rank-item0{
      font-family: 'PingFangSC-Semibold';
      font-size: 16px;
      letter-spacing: 0.2px;
      
      .item-1{
        color: #55DDE1;
      }
      .item-2{
        color: #FFFFFF;
      }
      .item-3{
        // color: #59B3FF;
        color: #F5A623;
      }
      .item-3-fix{
        color: #FFEC00
      }
    }
    .rank-item1{
      font-family: 'PingFangSC-Semibold';
      font-size: 15px;
      letter-spacing: 0.19px;
      
      .item-1{
        color: #55DDE1;
      }
      .item-2{
        color: #FFFFFF;
      }
      .item-3{
        // color: #59B3FF;
        color: #F5A623;
      }
      .item-3-fix{
        color: #FFEC00
      }
    }
    .rank-item2{
      font-family: 'PingFangSC-Semibold';
      font-size: 14px;
      letter-spacing: 0.18px;
      
      .item-1{
        color: #509698;
      }
      .item-2{
        color: #FFFFFF;
      }
      .item-3{
        // color: #59B3FF;
        color: #F5A623;
      }
      .item-3-fix{
        color: #FFEC00
      }
    }
    .rank-itemx{
      font-family: 'PingFangSC-Regular';
      font-size: 13px;
      letter-spacing: 0.18px;
      
      .item-1{
        color: #509698;
      }
      .item-2{
        color: #FFFFFF;
      }
      .item-3{
        // color: #59B3FF;
        color: #F5A623;
      }
      .item-3-fix{
        color: #FFEC00
      }
    }
  }
}
</style>