<template>
  <div class="message" v-show="display">
    <img class="avatar"
         :src="profile">
    <input type="text" :placeholder="placeHolder" class="text-input">
  </div>
</template>

<script lang="ts">
import {defineComponent, toRef} from "vue";
import profile from '../assets/images/profile.jpg'

export default defineComponent({

  props: {
    placeHolder: {
      required: true,
      type: String
    },
    display: {
      type: Boolean,
      default: false
    }
  },
  setup(props) {
    toRef(props, "display");

    //TODO: Implement start messaging

    return {profile}
  }
})
</script>

<style lang="scss" scoped>
.message {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fafbfc;
  border-radius: 3px 3px 0 0;
  padding: 30px 15px;

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
}
</style>