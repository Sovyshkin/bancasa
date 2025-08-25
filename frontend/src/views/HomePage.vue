<script setup>
import Block_1 from '../components/Block_1.vue';
import Block_2 from '../components/Block_2.vue';
import Block_3 from '../components/Block_3.vue';
import Block_4 from '../components/Block_4.vue';
import Block_5 from '../components/Block_5.vue';
import Block_6 from '../components/Block_6.vue';
import Block_7 from '../components/Block_7.vue';
import Block_8 from '../components/Block_8.vue';
import Block_9 from '../components/Block_9.vue';
</script>
<template>
  <div class="home">
        <Block_1 /> 
        <Block_2 />
        <Block_3 />
        <Block_4 />
        <Block_5 />
        <Block_6 />
        <Block_7 />
        <Block_8 />
        <Block_9 />
      </div>
</template>
<style>
.home {
    width: 100%;
    display: flex;
    flex-direction: column;
}

.wrap {
    width: 100%;
  height: 100vh;
  padding: 40px;
}

.block-bg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    inset: 0;
    height: 100%;
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    box-sizing: border-box;
    margin-top: 0;
    z-index: 1;
  }
</style>