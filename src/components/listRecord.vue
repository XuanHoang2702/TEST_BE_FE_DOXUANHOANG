<script setup>
import teamWork from '@/assets/img/team-work.jpg';
import upDown from '@/assets/img/up-down.png';

const props = defineProps({
  filteredRecords: {
    type: Array,
    required: true
  }
});

</script>
<template>
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
              <img style="width: 15px; height: auto" class="" :src="upDown"
                   alt>
             </span>

      </th>
      <th>
              <span>
                 Dimensions
              </span>
        <span class="filter-icon">
              <img style="width: 15px; height: auto" class="" :src="upDown"
                   alt>
             </span>
      </th>
      <th>
              <span>
                 Size
              </span>
        <span class="filter-icon">
              <img style="width: 15px; height: auto" class="" :src="upDown"
                   alt>
             </span>
      </th>
    </tr>
    </thead>
    <tbody>
    <tr v-for="(record, index) in props.filteredRecords" :key="index">
      <td class="col-1"><input type="checkbox"></td>
      <td class="col-4">
        <div class="image-block">
          <div class="overlay"></div>
          <img class="image-record"
               :src="record.image || teamWork"
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
</template>
