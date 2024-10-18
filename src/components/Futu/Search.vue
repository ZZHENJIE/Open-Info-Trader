<template>
    <ElInput
      v-model="Input"
      :placeholder="$t('Please Input')"
    >
      <template #prepend>
        <ElIcon>
            <Search />
        </ElIcon>
      </template>
      <template #append>
        <ElSelect v-model="Select" :placeholder="$t('Select Search Type')" style="width: 180px;">
          <Eloption label="Restaurant" value="1" />
          <Eloption label="Order No." value="2" />
          <Eloption label="Tel" value="3" />
        </ElSelect>
      </template>
    </ElInput>
</template>

<script setup lang="ts">
import { ref } from 'vue';

const Input = ref('');
const Select = ref();

</script>