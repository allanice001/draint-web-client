import { renderHook } from '@testing-library/react-hooks';
import setUserModalStatus from '../../redux/user/account/actions/set-user-modal-status';
import { useSelector } from 'react-redux';
import useWelcomeModal from './use-welcome-modal';

jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: () => jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock('../../redux/user/account/actions/set-user-modal-status');

const getMockedState = isShownAfterSignUp => ({
  user: {
    account: {
      saw_after_sign_up: isShownAfterSignUp,
    },
  },
});

describe('useWelcomeModal tests', () => {
  afterEach(() => {
    useSelector.mockClear();
  });

  it("should open modal, if doesn't user saw welcome modal", () => {
    expect.assertions(2);

    const mockedState = getMockedState(false);

    useSelector.mockImplementation(callback => callback(mockedState));

    renderHook(() => useWelcomeModal());

    expect(setUserModalStatus).toHaveBeenCalledTimes(1);
    expect(setUserModalStatus).toHaveBeenCalledWith(mockedState.user.account);
  });

  it("shouldn't open modal, if user saw welcome modal", () => {
    expect.assertions(1);

    const mockedState = getMockedState(true);

    useSelector.mockImplementation(callback => callback(mockedState));

    renderHook(() => useWelcomeModal());

    expect(setUserModalStatus).toHaveBeenCalledTimes(0);
  });
});
