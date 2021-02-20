<template>
  <section>
    <el-form inline @submit="handleSearch">
      <ElementFormInput
        name="query"
        label="Query"
        :show-label="false"
      ></ElementFormInput>

      <el-button native-type="submit">QUERY</el-button>
      <el-button @click="nextPage">NEXT</el-button>
      <el-button @click="handleSearchAndReset">RESET</el-button>
    </el-form>
  </section>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
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

    const { fetchList, fetchListAndReset, updatePagination } = usePaginatedList(
      {
        paginationToQuery: {
          rowsPerPage: 'hitsPerPage',
        },

        initialFilter: filter,

        initialRequestConfig: {
          url: 'https://hn.algolia.com/api/v1/search',
          __transformData: (data) => ({
            items: data?.hits,
            total: data?.nbHits,
          }),
          __needValidation: false,
        },
      }
    );

    const handleSearch = handleSubmit(() => {
      fetchList();
    });

    const handleSearchAndReset = handleSubmit(() => {
      fetchListAndReset();
    });

    const nextPage = () => {
      updatePagination({
        page: 2,
      });
    };

    handleSearch();

    return {
      handleSearch,
      handleSearchAndReset,
      nextPage,
    };
  },
});
</script>
