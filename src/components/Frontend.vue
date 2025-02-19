<script setup>
import arrowUp from '../../public/img/arrow-up.svg?raw';
import arrowDown from '../../public/img/arrow-down.svg?raw';
import folderIcon from '../../public/img/folder-multiple.svg?raw';
import {computed, onMounted, reactive, ref} from "vue";

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


const toggleFolder = (folder) => {
  arrayFolder.forEach(f => {
    if (f !== folder) {
      f.isOpen = false;
      f.activeChild = null;
    }
  });

  folder.isOpen = !folder.isOpen;
  folder.activeChild = null; // Reset activeChild khi chọn thư mục cha
  updateRecords(folder);
};


const toggleChild = (folder, childIndex) => {
  folder.activeChild = folder.activeChild === childIndex ? null : childIndex;

  folder.item_child.forEach((child, index) => {
    child.isOpen = index === childIndex ? !child.isOpen : false;
  });

  updateRecords(folder, folder.activeChild);
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


const getTotalFiles = (folder) => {
  return folder.item_child.reduce((total, child) => total + child.items.length, 0);
};
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
          <div class="recent-div">
            <div class="title">
              <span class="">Storage</span>
              <span class="text-deco">Change plane</span>
            </div>
            <div class="progress-div">
              <div class="progress-container">
                <div class="progress-bar" style="border-radius: 10px"
                     :style="{ width: progress + '%' }"></div>
              </div>
              <div class="progress-text">
                <span class="custom-span"> {{ progress }}% </span>
                <span>
              used of 2GB
              </span>
              </div>
            </div>

          </div>

          <hr>

          <div class="search-div">
            <p class="search-text">
              Search
            </p>
            <div class="search-inp">
              <input v-model="searchQuery" class="inp" placeholder="e.g. image.png">
              <img class="icon" src="../../public/img/icon-search.svg" alt="Search">
            </div>

          </div>
          <hr>

          <div class="folder-file-div">
            <div class="title">
              <span class="">Folders</span>
              <span class="text-deco">New Folders</span>
            </div>
            <div class="folder-block">
              <div v-for="(folder, index) in arrayFolder" :key="index" class="folder-item">
                <div class="folder-parent"
                     :class="{'folder-parent-act': folder.isOpen }"
                     @click="toggleFolder(folder)">
                  <span v-if="folder.isOpen" v-html="arrowUp" class="arrow-up"></span>
                  <span v-else v-html="arrowDown" class="arrow-down"></span>
                  <span class="icon" v-html="folderIcon"></span>
                  <span class="text-sp">{{ folder.name }}</span>
                  <button class="count-folder">
                    {{ getTotalFiles(folder) }}
                  </button>
                </div>

                <div v-if="folder.isOpen" class="list-folder-child">
                  <div v-for="(child, childIndex) in folder.item_child" :key="childIndex"
                       class="child-items">
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
                        <img class="file-icon" src="../../public/img/file-file-type.svg" alt>
                        {{ item.name.length > 15 ? item.name.slice(0, 20) + '...' : item.name }}
                        ({{ item.size }} KB)
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>


          </div>
          <hr>

          <div class="select-box-div">
            <div class="title">
              <span class="">Member</span>
              <span class="text-deco">Select all</span>
            </div>
            <div class="checkbox-item">
              <div class="item">
                <input type="radio" id="all" value="all" v-model="filterOption">
                <label for="all">All</label>
              </div>
              <div class="item">
                <input type="radio" id="admin" value="admin" v-model="filterOption">
                <label for="admin">Admin</label>
              </div>
            </div>

          </div>
        </div>

      </div>
    </div>
    <div class="content-right">
      <div class="block-content">
        <table>
          <thead>
          <tr>
            <th><input type="checkbox"></th>
            <th>Select all</th>
            <th class="">
              <span>
                 Name
              </span>
              <span class="filter-icon">
              <img style="width: 15px; height: auto" class="" src="../../public/img/up-down.png"
                   alt>
             </span>

            </th>
            <th>
              <span>
                 Dimensions
              </span>
              <span class="filter-icon">
              <img style="width: 15px; height: auto" class="" src="../../public/img/up-down.png"
                   alt>
             </span>
            </th>
            <th>
              <span>
                 Size
              </span>
              <span class="filter-icon">
              <img style="width: 15px; height: auto" class="" src="../../public/img/up-down.png"
                   alt>
             </span>
            </th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(record, index) in filteredRecords" :key="index">
            <td class="col-1"><input type="checkbox"></td>
            <td class="col-4">
              <div class="image-block">
                <div class="overlay"></div>
                <img class="image-record"
                     :src="record.image || '../../public/img/team-work.jpg'"
                     alt="">
                <button class="view-btn">Enlarger</button>
              </div>
            </td>
            <td class="col-3">{{ record.name }}</td>
            <td class="col-2">{{ record.dimensions }}</td>
            <td class="col-2">{{ record.size }} KB</td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>
<style>

</style>
