import { renderHook } from '@testing-library/react-hooks';
import useCanSeeArtwork from './use-can-see-artwork';
import { useSelector } from 'react-redux';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useSelector: jest.fn(),
}));

describe('useCanSeeArtwork tests', () => {
  const OWNER_PROFILE_ID = 'OWNER_PROFILE_ID';
  const NOT_OWNER_ID = 'NOT_OWNER_ID';

  const getMockedState = (
    permission = 'user',
    verification = 'verified',
    profileId = NOT_OWNER_ID
  ) => ({
    user: {
      query: { fetching: false },
      account: {
        permission,
        profile_id: profileId,
      },
    },

    artwork: {
      loading: false,
      artworkData: {
        currentArtwork: {
          verification,
          owner_profile_id: OWNER_PROFILE_ID,
        },
      },
    },
  });

  afterEach(() => {
    useSelector.mockClear();
  });

  it('should return boolean', () => {
    expect.assertions(1);

    useSelector.mockImplementation(callback => callback(getMockedState()));

    const { result } = renderHook(() => useCanSeeArtwork());

    expect(typeof result.current === 'boolean').toBeTruthy();
  });

  describe('artwork has UNVERIFIED status', () => {
    it('should return TRUE if user has MASTER role', () => {
      expect.assertions(1);

      useSelector.mockImplementation(callback =>
        callback(getMockedState('master', 'unverified'))
      );

      const { result } = renderHook(() => useCanSeeArtwork());

      expect(result.current).toStrictEqual(true);
    });

    it('should return TRUE if user is owner of this artwork', () => {
      expect.assertions(1);

      useSelector.mockImplementation(callback =>
        callback(getMockedState('owner', 'unverified', OWNER_PROFILE_ID))
      );

      const { result } = renderHook(() => useCanSeeArtwork());

      expect(result.current).toStrictEqual(true);
    });

    it('should return FALSE if user has USER role', () => {
      expect.assertions(1);

      useSelector.mockImplementation(callback =>
        callback(getMockedState('user', 'unverified'))
      );

      const { result } = renderHook(() => useCanSeeArtwork());

      expect(result.current).toStrictEqual(false);
    });
  });

  describe('artwork has VERIFIED status', () => {
    it('should return TRUE if user has MASTER role', () => {
      expect.assertions(1);

      useSelector.mockImplementation(callback =>
        callback(getMockedState('master', 'verified'))
      );

      const { result } = renderHook(() => useCanSeeArtwork());

      expect(result.current).toStrictEqual(true);
    });

    it('should return TRUE if user is owner of this artwork', () => {
      expect.assertions(1);

      useSelector.mockImplementation(callback =>
        callback(getMockedState('owner', 'verified', OWNER_PROFILE_ID))
      );

      const { result } = renderHook(() => useCanSeeArtwork());

      expect(result.current).toStrictEqual(true);
    });

    it('should return TRUE if user has USER role', () => {
      expect.assertions(1);

      useSelector.mockImplementation(callback =>
        callback(getMockedState('user', 'verified'))
      );

      const { result } = renderHook(() => useCanSeeArtwork());

      expect(result.current).toStrictEqual(true);
    });
  });
});
