<script lang="ts">
import {defineComponent} from "vue";
import thumbsUp from '../assets/images/thumbs-up.svg'
import avatar from '../assets/images/avatar.png'
import {calculateTime} from "../utils/CalculateTime";

export default defineComponent({

  props: {
    comment: {
      required: true,
      type: Object
    }
  },
  setup(props, {emit}) {
    const estimateTime = (date: number): string => calculateTime(date)
    const replyComment = () => {
      emit("onReply");
    }
    const likeComment = () => {
      emit("likeComment", props.comment.id);
    }
    return {
      estimateTime,
      replyComment,
      avatar,
      thumbsUp,
      likeComment,
    }
  },
  emits: ["onReply", "likeComment"],

})
</script>
<template>
  <div class="comment">
    <img class="avatar"
         :src="comment.user?.avatar||avatar">
    <div class="comment-content">
      <div class="comment-header">
        <span class="name">{{ comment.user.name }}</span>
        <span class="date">{{ estimateTime(comment.date) }}</span>
      </div>
      <p class="comment-text">{{ comment.text }}</p>
      <div class="comment-action">
        <a class="like" :class="{ 'liked':comment.iLikedIt}" @click="likeComment">
          <img class="like-icon" :src="thumbsUp">
          <span class="like-badge">{{ comment.likes }}</span>
        </a>
        <a class="reply" @click="replyComment" v-if="comment?.replies">Reply</a>
      </div>
    </div>
  </div>
</template>


<style scoped lang="scss">
.avatar {
  width: 35px;
  height: 35px;
  border-radius: 50%;
  margin-right: 15px;
}

.text-input {
  height: 35px;
  background-color: #fff;
  border: 1px solid #a8a5a5;
  width: 100%;
  border-radius: 3px;

  &::placeholder {
    padding-left: 10px;
  }
}

.comment {
  display: flex;
  padding: 15px;
  background-color: #fff;

  &-header {
    display: flex;

    .name {
      font-size: 1rem;
      line-height: .87em;
      font-weight: bold;
    }

    .date {
      font-size: .75rem;
      line-height: 1.25em;
      color: #b3bacb;
      margin-left: 10px;
    }
  }

  &-text {
    margin-top: 10px;
    color: #acb1b6;
    font-size: .875rem;
  }

  &-action {
    display: flex;
    align-items: center;

    .like {
      display: flex;
      justify-content: space-between;
      align-items: center;
      background-color: #f4f5fa;
      padding: 5px 12px;
      text-align: center;
      text-decoration: none;
      cursor: pointer;
      border-radius: 16px;
      width: 55px;

      &-icon {
        width: 18px;
      }

      &-badge {
        font-size: .75rem;
        font-weight: 600;
      }

      &.liked {
        background-color: #235ee7;

        & .like-icon {
          filter: brightness(0) saturate(100%) invert(100%) sepia(100%) saturate(2%) hue-rotate(323deg) brightness(107%) contrast(101%);
        }

        & .like-badge {
          color: white;
        }
      }
    }

    .reply {
      font-size: .75rem;
      font-weight: 700;
      margin-left: 20px;
      color: #3e72e9;
      cursor: pointer;
    }
  }

  &-reply {
    display: none;
  }
}
</style>