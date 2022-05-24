import { Ref, App } from 'vue';

export * from './auth';
export * from './element-plus';
export * from './misc';

export type MaybeRef<T> = T | Ref<T>;

export type UserPlugin = (app: App) => void | Promise<void>;
