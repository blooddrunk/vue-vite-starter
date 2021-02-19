<template>
  <section>
    <el-form inline @submit="handleSearch">
      <ElementFormInput
        name="query"
        label="Query"
        :show-label="false"
      ></ElementFormInput>

      <el-button native-type="submit">QUERY</el-button>
    </el-form>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useForm } from 'vee-validate';

import { usePaginatedList } from '@/hooks/usePaginatedList';

export type ListItem = {
  id: string;
  title: string | null;
  url?: string | null;
};

export default defineComponent({
  name: 'SimpleListView',

  components: {},

  setup() {
    const { values: filter, handleSubmit } = useForm({
      initialValues: {
        query: 'vue',
      },
    });

    const { fetchList, updatePagination } = usePaginatedList({
      paginationToQuery: {
        rowsPerPage: 'hitsPerPage',
      },

      initialFilter: filter,
    });

    const fetchData = () => {
      fetchList({
        url: 'https://hn.algolia.com/api/v1/search',
        __transformData: (data) => ({
          items: data?.hits,
          total: data?.nbHits,
        }),
        __needValidation: false,
      });
    };

    const handleSearch = handleSubmit(() => {
      // updatePagination({
      //   page: 2,
      // });
    });

    // fetchData();
    const obj = [1];
    const testRef = ref(obj);
    console.log(testRef.value);
    obj.push(2);
    console.log(testRef.value);

    return {
      handleSearch,
    };
  },
});
</script>
