import AsyncStorage from '@react-native-async-storage/async-storage';
import {create} from 'zustand';
import {createJSONStorage, persist} from 'zustand/middleware';
const INIT_STORE = {currentUser: {}, accessToken: null, refreshToken: null};
const userStore = create(
  persist(
    (set, get) => ({
      ...INIT_STORE,

      dispatchSetCurrentUser: user => set(() => ({currentUser: user})),

      dispatchSetToken: (accessToken, refreshToken) =>
        set(() => ({accessToken, refreshToken})),

      dispatchLogout: () => set(INIT_STORE),
    }),
    {
      name: 'USER_INFO',
      storage: createJSONStorage(() => AsyncStorage),
    },
  ),
);

export default userStore;
