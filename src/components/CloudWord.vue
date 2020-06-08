<template>
  <div class="cloudword">
    <!-- <p>{{ params.title }}</p> -->
    <div id="cw-box">
      <canvas ref="myCanvas" :class="[params.showTags ? 'cw-canvas-on' : 'cw-canvas-off']" :id="canvas_id">
        <p>Anything in here will be replaced on browsers that support the canvas element</p>
      </canvas>
      <section class="cw-tags" v-if="params.showTags" style="">
        <div>事件高频词为:</div>
        <ul class="tags-list">
          <li class="tags-item" v-for="tag in params.tags">
            <span class="words">{{ tag.content }}</span><span class="times">{{ tag.freq }}次</span>
          </li>
        </ul>
      </section>
    </div>
    <div ref="tags" :id="tags_id" style="display: none;">
      <a v-for="tag in params.tags" href="#" v-text="tag.content" :data-weight="Math.round(10 + Math.random() * 10)"></a>
    </div>
  </div>
</template>

<script>
import '@/scripts/tagcanvas.min.js'

// http://www.goat1000.com/tagcanvas-options.php
export default {
  name: 'CloudWord',
  props: {
    params: Object,
  },
  data () {
    var id = Math.random().toString().substr(2);
    return {
      canvas_id: 'cw_' + id,
      tags_id: 'tg_' + id,
    }
  },
  created () {},
  mounted () {
    this.$nextTick(() => {
      try {
        TagCanvas.Start(this.canvas_id, this.tags_id, this.params.options);
      } catch(e) {
        // something went wrong, hide the canvas container
      }
    });
  },
  methods: {},
  watch: {
    'params.tags'(val, oldVal){
      this.$nextTick(() => {
        TagCanvas.Reload(this.canvas_id);
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scope lang="stylus">
.cloudword{
  
  #cw-box{
    width: 100%;
    height: 100%;
    
    .cw-canvas-off{
      float: left;
      width: 100%;
      height: 100%;
    }
    .cw-canvas-on{
      float: left;
      width: 70%;
      height: 70%;
      margin-top: 7%;
      transform: scale(1.3);
    }
    .cw-tags{
      width: 128px;
      height: 340px;
      float: left;
      margin-right: 20px;
      padding: 10px;
      
      overflow: hidden;
      color: #55DDE1;
      background: rgba(99,123,190,0.10);
      
      font-family: PingFangSC-Regular;
      font-size: 14px;
      letter-spacing: 0.18px;
      
      .tags-list{
        margin-top: 20px;
        font-family: PingFangSC-Regular;
        font-size: 12px;
        letter-spacing: 0.15px;
        
        .tags-item{
          margin-top: 15px;
          height: 17px;
          
          .words{
            width: 45%;
            height: 100%;
            overflow: hidden;
            display: inline-block;
          }
          .times{
            display: inline-block;
            margin-left: 10%;
            width: 40%;
            height: 100%;
            overflow: hidden;
            font-family: PingFangSC-Regular;
            font-size: 12px;
            color: #F8E71C;
            letter-spacing: 0.15px;
          }
        }
      }
    }
  }
}
</style>
