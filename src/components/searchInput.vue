<script setup>
import { defineProps, defineEmits } from "vue";

defineProps({
  modelValue: String,
  iconSearch: String,
});

const emit = defineEmits(["update:modelValue"]);
</script>

<template>
  <div class="search-div">
    <p class="search-text">Search</p>
    <div class="search-inp">
      <input
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        class="inp"
        placeholder="e.g. image.png"
      />
      <img class="icon" :src="iconSearch" alt="Search">
    </div>
  </div>
</template>

<style scoped>
</style>
