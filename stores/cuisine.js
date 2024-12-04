import {
	defineStore
} from 'pinia';
import {
	getCuisine,
	getAll
} from "@/api/cuisine.js"

export default defineStore('cuisine', {
	state: () => ({
		list: [],
		pagination: {
			current: 1,
			pageSize: 10,
			total: 0
		},
		allList: []
	}),
	actions: {
		async query(payload) {
			const {
				current,
				pageSize
			} = this.pagination;
			const response = await getCuisine({
				...payload
			})
			if (response?.code == 200) {
				this.list = payload?.pageNumber > 1 ? this.list.concat(response.data.list) : response.data
					.list
				this.pagination = {
					current: response.data.pageNumber,
					pageSize: response.data.pageSize,
					total: response.data.total
				}
			}
			return response
		},
		async getAll() {
			const res = await getAll()
			this.allList = res.data
		}
	},

});