import Request from '@/utils/requests';
export const createAlbum = (data) => {
	return Request('/album/create', data);
};
export const findAlbum = () => {
	return Request('/album/findAll');
};
export const createPhotos = (data) => {
	return Request('/album/createPhotos',data);
};
export const findPhotos = (data) => {
	return Request('/album/findPhotos',data);
};