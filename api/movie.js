import Request from '@/utils/requests';

export const getMovies = (data) => {
  return Request('/movie/list', data);
};

export const getMovieDetail=(data)=>{
	return Request('/movie/detail', data);
}