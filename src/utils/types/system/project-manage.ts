import {PaginationParams} from '@/utils/types';

export type SearchParamsPro = PaginationParams & {
    name: string;
    status: string;
    process: number[];
}
export type DoingProProps = {
  project_id: string;
  description: string;
  plan: number;
  status: string;
  file_str: string;
}
