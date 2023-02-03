<script setup lang="ts">

import {onMounted, ref} from "vue";
import {IComment, IShowReply} from "../types";
import {getData} from "../utils/GetData";
import Comment from "./Comment.vue";
import Message from "./Message.vue";

export interface IDiscussion extends IComment {
  replies: IComment[];
}

let discussions = ref<IDiscussion[]>([])
const replayState = ref<IShowReply>({})
const onReply = (id: number) => {
  replayState.value[id].display = !replayState.value[id].display
}
const likeComment = (id: number) => {
  let index = discussions.value.findIndex((item, index) => {
    if (item.id === id) {
      item.iLikedIt = !item.iLikedIt
      item.iLikedIt == true ? item.likes++ : item.likes--;
    }
  })
  if (index == -1) {
    discussions.value.findIndex((item, index) => item.replies.findIndex((reply) => {
      if (reply.id === id) {
        reply.iLikedIt = !reply.iLikedIt
        reply.iLikedIt == true ? reply.likes++ : reply.likes--;
      }
    }))
  }
}
onMounted(() => {
  discussions.value = getData()
  discussions.value.map((item) => replayState.value[item.id] = {display: false})
})

</script>

<template>
  <div class="discussion">
    <Message :placeHolder="'Start a discussion'" :display="true"></Message>
    <div class="comment-wrapper" v-for="discussion in discussions">
      <Comment :comment="discussion" @onReply="onReply(discussion.id)" @likeComment="likeComment"></Comment>
      <div class="replies-wrapper" v-for="reply in discussion.replies">
        <Comment :comment="reply" @likeComment="likeComment"></Comment>
      </div>
      <div class="comment-reply">
        <Message :placeHolder="'Reply'" :display="replayState[discussion.id].display"></Message>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.discussion {
  margin-top: 50px;
  width: 100%;
  height: 100vh;
  border: 2px solid #ebeff3;


  .comment-wrapper {
    border: 1px solid #acb1b6;
    position: relative;

    .replies-wrapper {
      padding-left: 50px;

      &:after {
        content: "";
        width: 0px;
        height: 70%;
        position: absolute;
        border: 1px solid #f6f8f9;
        top: 80px;
        left: 36px;
      }
    }
  }
}
</style>