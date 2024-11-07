import { defineStore } from 'pinia';
import {getList} from "@/api/diary.js"

export default defineStore('diary', {
	state: () => ({
    list: [],
		pagination: {
		  current: 1,
		  pageSize: 10,
		  total: 0
		}
	}),
	actions: {
		async query(payload) {
      const { current, pageSize } = this.pagination;
		  const response = await getList({ ...payload })
		  if(response?.code == 200) {
		    this.list = payload?.pageNum > 1 ? this.list.concat(response.data.list) : response.data.list
        this.pagination = {
          current: response.data.pageNum,
          pageSize: response.data.pageSize,
          total: response.data.total
        }
		  }
		  return response
		},
   
	},
});