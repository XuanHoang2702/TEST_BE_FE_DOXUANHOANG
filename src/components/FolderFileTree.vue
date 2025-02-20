<script setup>
import { ref, computed, defineProps, defineEmits } from "vue";
import arrowUp from "@/assets/img/arrow-up.svg?raw";
import arrowDown from "@/assets/img/arrow-down.svg?raw";
import folderIcon from "@/assets/img/folder-multiple.svg?raw";
import fileIcon from "@/assets/img/file-file-type.svg";

// Nhận props từ component cha
const props = defineProps({
  folders: Array,
});

// Emit để gửi dữ liệu ra ngoài
const emit = defineEmits(["updateRecords"]);

// Xử lý toggle thư mục cha
const toggleFolder = (folder) => {
  props.folders.forEach((f) => {
    if (f !== folder) {
      f.isOpen = false;
      f.activeChild = null;
    }
  });

  folder.isOpen = !folder.isOpen;
  folder.activeChild = null;
  emit("updateRecords", folder);
};

// Xử lý toggle thư mục con
const toggleChild = (folder, childIndex) => {
  folder.activeChild = folder.activeChild === childIndex ? null : childIndex;

  folder.item_child.forEach((child, index) => {
    child.isOpen = index === childIndex ? !child.isOpen : false;
  });

  emit("updateRecords", folder, folder.activeChild);
};

// Lấy tổng số file trong folder
const getTotalFiles = (folder) => {
  return folder.item_child.reduce((total, child) => total + child.items.length, 0);
};
</script>

<template>
  <div class="folder-file-div">
    <div class="title">
      <span>Folders</span>
      <span class="text-deco">New Folders</span>
    </div>
    <div class="folder-block">
      <div v-for="(folder, index) in folders" :key="index" class="folder-item">
        <div class="folder-parent"
             :class="{'folder-parent-act': folder.isOpen}"
             @click="toggleFolder(folder)">
          <span v-if="folder.isOpen" v-html="arrowUp" class="arrow-up"></span>
          <span v-else v-html="arrowDown" class="arrow-down"></span>
          <span class="icon" v-html="folderIcon"></span>
          <span class="text-sp">{{ folder.name }}</span>
          <button class="count-folder">{{ getTotalFiles(folder) }}</button>
        </div>

        <div v-if="folder.isOpen" class="list-folder-child">
          <div v-for="(child, childIndex) in folder.item_child" :key="childIndex" class="child-items">
            <div class="folder-child-pa"
                 :class="{'folder-child-act': folder.activeChild === childIndex}"
                 @click="toggleChild(folder, childIndex)">
              <span v-if="child.isOpen" v-html="arrowUp" class="arrow-up"></span>
              <span v-else v-html="arrowDown" class="arrow-down"></span>
              <span class="icon" v-html="folderIcon"></span>
              <span class="text-sp">{{ child.name }}</span>
              <button class="count-folder"
                      :class="{'count-folder-act': folder.activeChild === childIndex}">
                {{ child.items.length }}
              </button>
            </div>

            <div v-if="child.isOpen" class="folder-child-ch-list">
              <div v-for="(item, itemIndex) in child.items" :key="itemIndex" class="items">
                <img class="file-icon" :src="fileIcon" alt="File Icon">
                {{ item.name.length > 15 ? item.name.slice(0, 20) + '...' : item.name }}
                ({{ item.size }} KB)
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
