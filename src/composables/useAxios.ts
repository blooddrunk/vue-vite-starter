import { useAxios as useAxiosDefault } from '@vueuse/integrations';
import type {  AxiosRequestConfig } from 'axios'

import axios from '@/utils/axios';

export const useAxios = (...args: any[]) =>  
