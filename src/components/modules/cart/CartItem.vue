<template>
  <van-swipe-cell :disabled="readonly">
    <div
      class="tw-p-2 tw-mt-3 tw-bg-white tw-rounded-md tw-shadow tw-shadow-light"
    >
      <slot name="header"></slot>

      <div class="tw-flex tw-items-center">
        <van-checkbox
          v-if="!readonly"
          v-model="__checked"
          class="tw-flex-shrink-0 tw-pr-1.5"
          icon-size="18px"
        ></van-checkbox>

        <div
          class="tw-flex-grow tw-grid tw-grid-cols-7 tw-items-center tw-gap-3"
        >
          <van-image
            class="tw-col-span-2 tw-w-full tw-aspect-w-1 tw-aspect-h-1"
            :src="item.thumbnail"
            fit="cover"
            round
            radius="8px"
          ></van-image>

          <div class="tw-col-span-5 tw-self-start">
            <div
              class="tw-line-clamp-3 tw-break-all tw-text-medium tw-leading-none"
            >
              <figcaption class="tw-inline tw-text-dark">
                {{ item.title }}
              </figcaption>
              <span class="tw-ml-2 tw-text-xs tw-text-light">
                {{ item.body }}
              </span>
            </div>
            <div class="tw-mt-2 tw-flex tw-items-center">
              <span class="tw-text-primary tw-font-bold">{{ item.price }}</span>
              <span class="tw-ml-1 tw-text-primary tw-text-xs">元/月</span>

              <span
                v-if="readonly"
                class="tw-ml-auto tw-text-sm tw-font-semibold"
              >
                x{{ __quantity }}
              </span>
              <van-stepper
                v-else
                v-model="__quantity"
                class="tw-ml-auto"
                integer
                min="1"
                max="99"
                :disabled="cart.isItemPatching"
              ></van-stepper>
            </div>
          </div>
        </div>
      </div>

      <slot name="footer"></slot>
    </div>

    <template #right>
      <van-button
        square
        text="删除"
        type="danger"
        class="!tw-h-full"
        :loading="cart.isItemRemoving"
        @click="handleRemove"
      ></van-button>
    </template>
  </van-swipe-cell>
</template>

<script lang="ts" setup>
import { withDefaults, defineProps, defineEmits, watch } from 'vue';
import { useVModel, debouncedWatch } from '@vueuse/core';
import { Toast, Dialog } from 'vant';

import type { CartItem } from '@typings';
import { useCartStore } from '@/stores/cart';

type Props = {
  item: CartItem;
  checked?: boolean;
  quantity?: number;
  readonly?: boolean;
};

const props = withDefaults(defineProps<Props>(), {
  checked: false,
  quantity: 0,
  readonly: false,
});

const emit = defineEmits<{
  (e: 'update:checked', checked: boolean): void;
  (e: 'update:quantity', quantity: number): void;
}>();

const __checked = useVModel(props, 'checked', emit);
const __quantity = useVModel(props, 'quantity', emit);

const cart = useCartStore();
watch(
  () => cart.itemPatchingErrorMessage || cart.itemRemovingErrorMessage,
  (value) => {
    if (value) {
      Toast(value);
    }
  }
);
debouncedWatch(
  __quantity,
  () => {
    cart.patchItem(props.item);
  },
  {
    debounce: 500,
  }
);
const handleRemove = async () => {
  try {
    await Dialog.confirm({
      title: '提示',
      message: '是否确认删除？',
    });

    const result = await cart.removeItem(props.item);
    if (result) {
      cart.items = cart.items.filter((item) => item.id !== props.item.id);
    }
  } catch (error) {
    // * user cancel, do nothing
  }
};
</script>
