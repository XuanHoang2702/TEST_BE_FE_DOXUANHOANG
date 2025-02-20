<script setup>
const props = defineProps({
  progress: {
    type: Number,
    required: true
  }
});
</script>

<template>
  <div class="recent-div">
    <div class="title">
      <span class="">Storage</span>
      <span class="text-deco">Change plan</span>
    </div>
    <div class="progress-div">
      <div class="progress-container">
        <div class="progress-bar" style="border-radius: 10px"
             :style="{ width: props.progress + '%' }"></div>
      </div>
      <div class="progress-text">
        <span class="custom-span"> {{ props.progress }}% </span>
        <span>
              used of 2GB
        </span>
      </div>
    </div>
  </div>
</template>

