import {
  API_URL
} from '../config';

const imgFromApi = (imgUrl) => {
  return `${API_URL}${imgUrl}`
}

export {
  imgFromApi
} 