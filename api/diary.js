import Request from '@/utils/requests';

export const createDiary = (data) => {
  return Request('/diary/create', data);
};
export const getList=(data)=>{
	return Request("/diary/list",data)
}
export const getDetail=(data)=>{
	return Request("/diary/detail",data)
}