import { Ref } from 'vue';

export * from './auth';
export * from './element-plus';
export * from './misc';

export type Optional<T, K extends keyof T> = Omit<T, K> & Partial<T>;

export type FnReturningPromise = (...args: any[]) => Promise<any>;

export type PromiseType<P extends Promise<any>> = P extends Promise<infer T>
  ? T
  : never;

export type MaybeRef<T> = T | Ref<T>;

export type Only<T, U> = {
  [P in keyof T]: T[P];
} & {
  [P in keyof U]?: never;
};

export type Either<T, U> = Only<T, U> | Only<U, T>;
