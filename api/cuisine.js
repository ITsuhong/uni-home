import Request from '@/utils/requests';

export const getCuisine = (data) => {
  return Request('/cuisine/list', data);
};

export const getCuisineDetail=(data)=>{
	return Request('/cuisine/detail', data);
}

export const setIsEat=(data)=>{
	return Request('/cuisine/is_eat', data);
}

export const getEatList=(data)=>{
	return Request('/cuisine/eat/list', data);
}