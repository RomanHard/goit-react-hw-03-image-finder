import axios from 'axios';

const API_KEY = '27264356-434762754b358cf0758f386e7';
axios.defaults.baseURL = 'https://pixabay.com/api/';

export const fetchImages = async (searchQuery, page) => {
  try {
    const { data } = await axios.get('', {
      params: {
        q: searchQuery,
        page,
        key: API_KEY,
        image_type: 'photo',
        orientation: 'horizontal',
        per_page: 12,
      },
    });

    const images = data.hits.map(({ id, webformatURL, largeImageURL }) => ({
      id,
      webformatURL,
      largeImageURL,
    }));

    const totalHits = data.totalHits;
    const isLoadMoreButtonVisible = totalHits > 0 && totalHits > page * 12;

    return { images, totalHits, isLoadMoreButtonVisible };
  } catch (error) {
    console.log(error);
    return { images: [], totalHits: null, isLoadMoreButtonVisible: false };
  }
};
