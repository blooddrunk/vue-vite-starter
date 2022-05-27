import { Ref, App } from 'vue';

export * from './auth';
export * from './misc';

export * from './biz';

export type MaybeRef<T> = T | Ref<T>;

export type UserPlugin = (app: App) => void | Promise<void>;
