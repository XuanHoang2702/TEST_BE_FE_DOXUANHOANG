<script setup>
import {computed, onMounted, reactive, ref} from "vue";
import RencentBox from "@/components/rencentBox.vue";
import ListRecord from "@/components/listRecord.vue";
import FolderFileTree from "@/components/FolderFileTree.vue";
import SelectBox from "@/components/selectBox.vue";
import SearchInput from "@/components/searchInput.vue";

import iconSearch from '@/assets/img/icon-search.svg';

const arrayFolder = reactive([
  {
    name: 'Uploads',
    isOpen: true,
    item_child: [
      {
        name: "Images",
        isOpen: false,
        items: [
          {
            image: "",
            name: "image test Uploads",
            dimensions: "2000 X 2000",
            size: 7000.0,
            photo_by: 'admin'
          },
          {
            image: "",
            name: "image test 3 Uploads",
            dimensions: "2000 X 2000",
            size: 2100.4,
            photo_by: 'member'
          },
        ]
      },
      {
        name: "Documents",
        isOpen: false,
        items: [
          {
            image: "",
            name: "Documents Hoang Uploads",
            dimensions: "2000 X 2000",
            size: 2100.4,
            photo_by: 'member'
          },
          {
            image: "",
            name: "Documents test Uploads",
            dimensions: "2000 X 2000",
            size: 7000.0,
            photo_by: 'admin'
          },
          {
            image: "",
            name: "Documents test 3 Uploads",
            dimensions: "2000 X 2000",
            size: 2100.4,
            photo_by: 'member'
          },
        ]
      },
      {
        name: "Videos",
        isOpen: false,
        items: [
          {
            image: "",
            name: "Videos Hoang Uploads",
            dimensions: "2000 X 2000",
            size: 2100.4,
            photo_by: 'member'
          },
          {
            image: "",
            name: "Videos test Uploads",
            dimensions: "2000 X 2000",
            size: 7000.0,
            photo_by: 'admin'
          },
          {
            image: "",
            name: "Videos test 3 Uploads",
            dimensions: "2000 X 2000",
            size: 2100.4,
            photo_by: 'member'
          },
        ]
      },
    ]
  },
  {
    name: 'Sources',
    isOpen: false,
    item_child: [
      {
        name: "Images",
        isOpen: false,
        items: [
          {
            image: "",
            name: "image test Sources",
            dimensions: "2000 X 2000",
            size: 70000.0,
            photo_by: 'admin'
          },
          {
            image: "",
            name: "image Hoang Sources",
            dimensions: "2000 X 2000",
            size: 5000.0,
            photo_by: 'member'
          },
          {
            image: "",
            name: "image Minh Sources",
            dimensions: "2000 X 2000",
            size: 100000.0,
            photo_by: 'member'
          },
        ]
      },
      {
        name: "Documents",
        isOpen: false,
        items: []
      },
      {
        name: "Videos",
        isOpen: false,
        items: []
      },
    ]
  },
  {
    name: 'Shares',
    isOpen: false,
    item_child: [
      {
        name: "Images",
        isOpen: false,
        items: [
          {
            image: "",
            name: "image test Shares",
            dimensions: "2000 X 2000",
            size: 46460.0
          },
          {
            image: "",
            name: "imageDDaofo Shares",
            dimensions: "2000 X 2000",
            size: 77400.0
          },
          {
            image: "",
            name: "image Minh Shares",
            dimensions: "2000 X 2000",
            size: 700.0
          }
        ]
      },
      {
        name: "Documents",
        isOpen: false,
        items: []
      },
      {
        name: "Videos",
        isOpen: false,
        items: []
      },
    ]
  },
])
const arrayRecords = reactive([]);


const totalSize = computed(() => {
  let totalKB = 0;

  arrayFolder.forEach(folder => {
    folder.item_child.forEach(child => {
      child.items.forEach(item => {
        totalKB += item.size; // Giả sử item.size là KB
      });
    });
  });

  return totalKB;
});

const progress = computed(() => {
  const maxSize = 2 * 1024 * 1024; // 2GB tính bằng KB
  return Math.min((totalSize.value / maxSize) * 100, 100).toFixed(2); // Giới hạn tối đa 100%
});

const updateRecords = (folder, childIndex = null) => {
  arrayRecords.splice(0, arrayRecords.length); // Xóa toàn bộ trước khi cập nhật

  if (childIndex !== null) {
    // Nếu click vào thư mục con, chỉ lấy items của thư mục con đó
    const child = folder.item_child[childIndex];
    if (child) {
      arrayRecords.push(...child.items);
    }
  } else {
    // Nếu click vào thư mục cha, lấy tất cả items từ thư mục con
    folder.item_child.forEach(child => {
      arrayRecords.push(...child.items);
    });
  }
};


/// search
const searchQuery = ref("");
const filterOption = ref('all');

const filteredRecords = computed(() => {
  let records = arrayRecords;

  // Lọc theo checkbox (All/Admin)
  if (filterOption.value === 'admin') {
    records = records.filter(item => item.photo_by === 'admin');
  }

  if (searchQuery.value) {
    records = records.filter(item =>
      item.name.toLowerCase().includes(searchQuery.value.toLowerCase())
    );
  }

  return records;
});


// check box

onMounted(() => {
  const defaultFolder = arrayFolder.find((folder) => folder.name === "Uploads");
  if (defaultFolder) {
    updateRecords(defaultFolder);
  }
});
</script>

<template>
  <div class="frontend-page">
    <div class="content-left">
      <div class="content">
        <div class="block-btn">
          <button class="btn">
            Import Document
          </button>
        </div>
        <div class="block-action">
          <rencent-box :progress="progress"></rencent-box>
          <hr>

          <search-input v-model="searchQuery" :iconSearch="iconSearch"></search-input>

          <hr>
          <folder-file-tree :folders="arrayFolder" @updateRecords="updateRecords"/>
          <hr>

          <select-box
            v-model="searchQuery"
            v-model:filterOption="filterOption"
          />
        </div>

      </div>
    </div>
    <div class="content-right">
      <div class="block-content">
        <list-record :filtered-records="filteredRecords"></list-record>
      </div>
    </div>
  </div>
</template>
<style>

</style>

