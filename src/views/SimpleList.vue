<template>
  <section>
    <!-- <SearchHNForm
      :query="query"
      :on-query-change="handleQueryChange"
      @submit="handleSubmit"
    ></SearchHNForm> -->

    <div>
      {{ items }}
      <!-- <SimplePagination :pagination="pagination"></SimplePagination> -->
    </div>
  </section>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watchEffect, watch } from 'vue';

import SimpleList from '@/components/SimpleList.vue';
import SimplePagination from '@/components/SimplePagination.vue';
import SearchHNForm from '@/components/SearchHNForm.vue';
import { useAxios } from '@/hooks/useAxios';
import { usePagination } from '@/hooks/usePagination';

export type ListItem = {
  id: string;
  title: string | null;
  url?: string | null;
};

export default defineComponent({
  name: 'SimpleListView',

  components: {
    SimpleList,
    SimplePagination,
    SearchHNForm,
  },

  setup() {
    const query = ref('vue');
    const page = ref(1);

    const { data, isPending, request } = useAxios<{
      hits: ListItem[];
      nbHits: number;
    }>(
      {
        // ? '/hn/search' using proxy will take forever
        url: 'https://hn.algolia.com/api/v1/search',
        params: {
          query: query.value,
          page: page.value,
        },
        __needValidation: false,
      },
      {
        hits: [],
        nbHits: 0,
      }
    );

    const items = computed(() => data.value?.hits || []);

    const test = ref<any>({});

    test.value.k1 = 1;

    setTimeout(() => {
      test.value = 2;
    }, 300);

    watchEffect(() => {
      console.log(test.value);
    });

    // const handleQueryChange = (event: Event) => {
    //   query.value = (event.target as HTMLInputElement).value;
    // };

    // const pagination = usePagination({ pageSize: 20 });

    // watchEffect(() => {
    //   pagination.total.value = data.value?.nbHits || 0;
    // });

    // watch(pagination.currentPage, () => {
    //   page.value = pagination.currentPage.value;
    //   request();
    // });

    // const handleSubmit = (event: Event) => {
    //   event.preventDefault();

    //   if (pagination.isFirst.value) {
    //     request();
    //   } else {
    //     pagination.first();
    //   }
    // };

    return {
      query,
      items,
      isPending,
      // handleSubmit,
      // handleQueryChange,

      // pagination,
    };
  },
});
</script>
