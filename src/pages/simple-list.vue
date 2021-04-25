<template>
  <section>
    <el-form inline @submit="handleSearch">
      <InputWrapper
        name="query"
        label="Query"
        :show-label="false"
      ></InputWrapper>

      <el-button native-type="submit" type="primary">QUERY</el-button>
    </el-form>

    <PaginatedTable class="tw-mt-3" v-bind="tableProps">
      <el-table-column
        prop="author"
        label="Author"
        width="100"
      ></el-table-column>
      <el-table-column prop="title" label="Title"></el-table-column>
      <el-table-column prop="url" label="Link">
        <template #default="{ row }">
          <a class="tw-text-primary" :href="row.url" target="_blank">
            {{ row.url }}
          </a>
        </template>
      </el-table-column>
      <el-table-column prop="created_at" label="Created At" width="200">
        <template #default="{ row }">
          {{ formatDate(row.created_at) }}
        </template>
      </el-table-column>
    </PaginatedTable>
  </section>
</template>

<route lang="yaml">
meta:
  requiresAuth: false
</route>

<script lang="ts">
import { defineComponent } from 'vue';
import { useForm } from 'vee-validate';
import { parseISO, format } from 'date-fns';

import { usePaginatedList } from '@/hooks/usePaginatedList';

export type ListItem = {
  id: string;
  title: string | null;
  url?: string | null;
};

export default defineComponent({
  name: 'SimpleListView',

  setup() {
    const { values: filter, handleSubmit } = useForm({
      initialValues: {
        query: 'vue',
      },
    });

    const { fetchListAndReset, tableProps } = usePaginatedList({
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
    });

    const handleSearch = handleSubmit(() => {
      fetchListAndReset();
    });

    handleSearch();

    const formatDate = (value: string) =>
      format(parseISO(value), 'yyyy-MM-dd HH:ss');

    return {
      tableProps,
      handleSearch,
      formatDate,
    };
  },
});
</script>
