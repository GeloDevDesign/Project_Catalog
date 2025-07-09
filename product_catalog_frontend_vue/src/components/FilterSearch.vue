<script setup>
import { ref, onMounted, watch } from "vue";
import { debounce } from "lodash";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";

const { getCategories } = useCategoryStore();
const { paginateProducts } = useProductStore();
const { data } = storeToRefs(useCategoryStore());
const { pagination } = storeToRefs(useProductStore());



const searchValue = ref("");
const selectedCategory = ref(null);

const debouncedFilter = debounce(() => {
  paginateProducts("products", 1, 10, searchValue.value, selectedCategory.value);
}, 500);

watch([searchValue, selectedCategory], () => {
  debouncedFilter();
});

onMounted(async () => {
  await getCategories("/categories");
});
</script>

<template>
  <div class="join">
    <input v-model="searchValue" class="input join-item" placeholder="Search" />
    <select v-model="selectedCategory" class="select join-item max-w-28">
      <option value="">All Categories</option>
      <option v-for="category in data" :key="category.id" :value="category.id">
        {{ category.name }}
      </option>
    </select>
  </div>
</template>
