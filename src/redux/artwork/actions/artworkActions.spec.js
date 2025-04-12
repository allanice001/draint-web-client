import { GET_PUBLIC_ARTWORK_STYLES_PAGINATION } from 'constants/redux/publicArtwork';
import axios from 'dataLayer/axiosInstance';
import { getPaginateStyles } from './artworkActions';

jest.mock('dataLayer/axiosInstance');

const styles = [
  { uuid: '123w-21dq-vxc3', style: 'style', small_image: '1.jpg' },
];

describe('test getPaginateStyles thunk', () => {
  const limit = 25;
  const dispatch = jest.fn();

  it('should get success response', async () => {
    axios.get.mockImplementation(
      () => new Promise(resolve => resolve({ data: styles }))
    );

    await getPaginateStyles(limit)(dispatch);

    expect(axios.get).toHaveBeenCalledWith('/api/artworks/stylesPaginate', {
      params: { limit },
    });
    expect(dispatch).toBeCalledTimes(1);
    expect(dispatch).toHaveBeenCalledWith({
      type: GET_PUBLIC_ARTWORK_STYLES_PAGINATION,
      payload: styles,
    });
  });

  it('should call error block', async () => {
    axios.get.mockImplementation(
      () => new Promise((resolve, reject) => reject({ err: 'error' }))
    );

    await getPaginateStyles(limit)(dispatch);

    expect(axios.get).toHaveBeenCalledWith('/api/artworks/stylesPaginate', {
      params: { limit },
    });
    expect(dispatch).toBeCalledTimes(1);
  });
});
