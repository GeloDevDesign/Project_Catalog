<script setup>
import { ref, onMounted, watch } from "vue";
import { debounce } from "lodash";
import { storeToRefs } from "pinia";
import { useCategoryStore } from "@/stores/category";
import { useProductStore } from "@/stores/product";

const { getCategories } = useCategoryStore();
const { filterProducts, } = useProductStore();
const { data: categories } = storeToRefs(useCategoryStore());

const productStore = useProductStore();
const { paginateProducts } = productStore;

const searchValue = ref("");
const selectedCategory = ref(null);

const debouncedFilter = debounce(() => {
  filterProducts({
    search: searchValue.value,
    category_id: selectedCategory.value,
  });
}, 500);

watch([searchValue, selectedCategory], () => {
  if (searchValue.value.trim() === ""  && selectedCategory.value === null) {
    paginateProducts("products", 1, 10);
     
    return;
  }
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
      <option :value="null">All Categories</option>
      <option
        v-for="category in categories"
        :key="category.id"
        :value="category.id"
      >
        {{ category.name }}
      </option>
    </select>
  </div>
</template>
