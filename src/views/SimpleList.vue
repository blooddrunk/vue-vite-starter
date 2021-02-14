<template>
  <section>
    <div></div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, watch } from 'vue';

import SimplePagination from '@/components/SimplePagination.vue';
import { usePaginatedList } from '@/hooks/usePaginatedList';

export type ListItem = {
  id: string;
  title: string | null;
  url?: string | null;
};

export default defineComponent({
  name: 'SimpleListView',

  components: {
    SimplePagination,
  },

  setup() {
    const query = ref('vue');

    const { fetchList } = usePaginatedList({
      paginationToQuery: {
        rowsPerPage: 'hitsPerPage',
      },
    });

    fetchList({
      url: 'https://hn.algolia.com/api/v1/search',
      params: {
        query: query.value,
        page: 1,
      },
      __transformData: (data) => ({
        items: data?.hits,
        total: data?.nbHits,
      }),
      __needValidation: false,
    });

    return {
      query,
    };
  },
});
</script>
