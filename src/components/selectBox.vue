<script setup>
import { ref } from "vue";
const props = defineProps(["modelValue", "filterOption"]);
const emit = defineEmits(["update:modelValue", "update:filterOption"]);
</script>

<template>
    <div class="select-box-div">
      <div class="title">
        <span class="">Member</span>
        <span class="text-deco">Select all</span>
      </div>
      <div class="checkbox-item">
        <div class="item">
          <input
            type="radio"
            id="all"
            value="all"
            :checked="filterOption === 'all'"
            @change="$emit('update:filterOption', 'all')"
          />
          <label for="all">All</label>
        </div>
        <div class="item">
          <input
            type="radio"
            id="admin"
            value="admin"
            :checked="filterOption === 'admin'"
            @change="$emit('update:filterOption', 'admin')"
          />
          <label for="admin">Admin</label>
        </div>
      </div>
    </div>
</template>

<style scoped>
</style>
