<template>
  <van-swipe-cell :disabled="readonly">
    <div class="p-2 mt-3 bg-white rounded-md">
      <div class="flex items-center">
        <van-checkbox
          v-if="!readonly"
          v-model="_checked"
          class="flex-shrink-0 pr-1.5"
          icon-size="18px"
        ></van-checkbox>

        <div class="flex-grow grid grid-cols-7 items-center gap-3">
          <van-image
            class="col-span-2 w-full aspect-w-1 aspect-h-1"
            :src="item.thumbnail"
            fit="cover"
            round
            radius="8px"
          ></van-image>

          <div class="col-span-5 self-start">
            <div class="line-clamp-3 break-all text-medium leading-none">
              <figcaption class="inline text-dark">
                {{ item.title }}
              </figcaption>
              <span class="ml-2 text-xs text-light">
                {{ item.body }}
              </span>
            </div>
            <div class="mt-2 flex items-center">
              <span class="text-primary font-bold">{{ item.price }}</span>
              <span class="ml-1 text-primary text-xs">元/月</span>

              <span v-if="readonly" class="ml-auto text-sm font-semibold">
                x{{ quantity }}
              </span>
              <van-stepper
                v-else
                v-model="_quantity"
                class="ml-auto"
                integer
                min="1"
                max="99"
                :disabled="cart.isItemPatching"
              ></van-stepper>
            </div>
          </div>
        </div>
      </div>
    </div>

    <template #right>
      <van-button
        square
        text="删除"
        type="danger"
        class="!h-full"
        :loading="cart.isItemRemoving"
        @click="handleRemove"
      ></van-button>
    </template>
  </van-swipe-cell>
</template>

<script lang="ts" setup>
import { useVModel, debouncedWatch } from '@vueuse/core';
import { Toast, Dialog } from 'vant';

import type { CartItem } from '@typings';

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

const _checked = useVModel(props, 'checked', emit);
const _quantity = useVModel(props, 'quantity', emit);

const cart = useCartStore();

watch(
  () => cart.itemPatchingError || cart.itemRemovingError,
  (value) => {
    if (value) {
      Toast.fail(value.message);
    }
  }
);

debouncedWatch(
  _quantity,
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

    await cart.removeItem(props.item);
    if (!cart.itemRemovingError) {
      cart.items = cart.items.filter((item) => item.id !== props.item.id);
    }
  } catch (error) {
    // * user cancel, do nothing
  }
};
</script>
