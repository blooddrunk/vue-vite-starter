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
import { defineComponent, ref, computed, watchEffect, watch } from 'vue';
import { useForm } from 'vee-validate';

import { usePaginatedList } from '@/hooks/usePaginatedList';
import { useAxios } from '@/hooks/useAxios';

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

    const { fetchList } = usePaginatedList({
      paginationToQuery: {
        rowsPerPage: 'hitsPerPage',
      },

      initialFilter: filter,
    });

    const { request } = useAxios(
      {
        url: `${import.meta.env.VITE_JSON_SERVER_PATH}products`,
        __needValidation: false,
      },
      {
        items: [],
        total: 0,
      },
      { immediate: false }
    );

    const fetchData = () => {
      // fetchList({
      //   url: 'https://hn.algolia.com/api/v1/search',
      //   __transformData: (data) => ({
      //     items: data?.hits,
      //     total: data?.nbHits,
      //   }),
      //   __needValidation: false,
      // });
      request();
    };

    const handleSearch = handleSubmit(() => {
      fetchData();
    });

    return {
      handleSearch,
    };
  },
});
</script>
