<!--
 * @Description: 
 * @Version: 1.0
 * @Autor: yongqing
 * @Date: 2021-02-27 19:50:02
 * @LastEditors: yongqing
 * @LastEditTime: 2021-02-27 23:49:46
-->
<template>
  <div class="app-container course-detail">
    <van-tabs color="#19B2FF">
      <van-tab title="视频">
        <div
          class="video-block"
          v-if="videoInfo.coverImg"
          @click="getVideoPlayAuth"
        >
          <div class="content">
            <div class="cover-content">
              <img class="coverImg" :src="videoInfo.coverImg" />
              <div class="mask">
                <van-icon name="play-circle-o" size="2rem" />
              </div>
            </div>

            <div class="info">
              <div class="title">{{ videoInfo.title }}</div>
              <div class="duration">时长:{{ videoInfo.duration }}</div>
            </div>
          </div>
        </div>
        <van-empty v-else description="暂无视频" />
      </van-tab>
      <van-tab title="课件">
        <div class="ebook-block" v-if="ebooksList.length > 0">
          <div
            class="ebook-item van-hairline--bottom"
            v-for="(item, index) in ebooksList"
            :key="index"
            @click="queryDownloadUrl(item.objectKey)"
          >
            <img src="@/assets/images/icon_pdf.png" />
            <div class="title">{{ item.title }}</div>
          </div>
        </div>
        <van-empty v-else description="暂无课件" />
      </van-tab>
    </van-tabs>
    <van-popup v-model="show" style="width:100%">
      <vue-aliplayer-v2 v-if="show" ref="VueAliplayerV2" :options="options" />
    </van-popup>
  </div>
</template>

<script>
import * as API from "@/api/base"
import VueAliplayerV2 from "@/components/AliplayerV2/index"

export default {
  components: {
    VueAliplayerV2,
  },
  data() {
    return {
      ebooksList: [],
      videoInfo: {},
      show: false,
      options: {
        vid: "",
        playauth: "",
        cover: "",
        format: "m3u8", //切换为直播流的时候必填
        encryptType: 1,
        mediaType: "video",
        skinLayout: [
          {
            name: "bigPlayButton",
            align: "blabs",
            x: 30,
            y: 80,
          },
          {
            name: "H5Loading",
            align: "cc",
          },
          {
            name: "errorDisplay",
            align: "tlabs",
            x: 0,
            y: 0,
          },
          {
            name: "infoDisplay",
          },
          {
            name: "tooltip",
            align: "blabs",
            x: 0,
            y: 56,
          },
          {
            name: "thumbnail",
          },
          {
            name: "controlBar",
            align: "blabs",
            x: 0,
            y: 0,
            children: [
              {
                name: "progress",
                align: "blabs",
                x: 0,
                y: 44,
              },
              {
                name: "playButton",
                align: "tl",
                x: 15,
                y: 12,
              },
              {
                name: "timeDisplay",
                align: "tl",
                x: 10,
                y: 7,
              },
              {
                name: "fullScreenButton",
                align: "tr",
                x: 10,
                y: 12,
              },
              {
                name: "setting",
                align: "tr",
                x: 15,
                y: 12,
              },
              {
                name: "volume",
                align: "tr",
                x: 5,
                y: 10,
              },
            ],
          },
        ],
      },
    }
  },
  mounted() {
    this.getChapterVideoAndEbook()
  },
  methods: {
    async queryDownloadUrl(key) {
      let data = await API.queryDownloadUrl({
        key,
      })
      window.open(data)
    },
    async getChapterVideoAndEbook(row) {
      let { courseChapterId } = this.$route.query
      let data = await API.getChapterVideoAndEbook({
        courseChapterId,
      })
      this.ebooksList = data.ebooks
      this.videoInfo = data.video
    },
    onPlay() {
      this.show = true
    },
    async getVideoPlayAuth() {
      let data = await API.getVideoPlayAuth({
        key: this.videoInfo.objectKey,
      })
      this.options.playauth = data.playAuth
      this.options.cover = data.videoMeta.coverURL
      this.options.vid = data.videoMeta.videoId
      this.show = true
    },
  },
}
</script>

<style lang="less" scoped>
.course-detail {
  .video-block {
    margin-top: 20px;
    .content {
      background: #fff;
      width: 350px;
      margin: 0 auto;
      border-radius: 5px 5px 0 0;

      .cover-content {
        position: relative;
        text-align: center;
        color: #fff;
        .mask {
          display: flex;
          align-items: center;
          justify-content: center;
          position: absolute;

          top: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
        }
      }

      img {
        width: 350px;
        display: block;
        border-radius: 5px 5px 0 0;
      }
      .info {
        padding: 5px 10px;
        .title {
          font-size: 16px;
          color: #222;
        }
        .duration {
          font-size: 14px;
          color: #999;
        }
      }
    }
  }
  .ebook-block {
    background: #fff;
    padding: 0 10px;
    .ebook-item {
      display: flex;
      align-items: center;
      padding: 10px 0;
      img {
        width: 44px;
        height: 44px;
      }
      .title {
        font-size: 14px;
        color: #222;
        margin-left: 10px;
      }
    }
  }
}
</style>
