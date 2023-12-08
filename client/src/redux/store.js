// store.js

import { configureStore } from '@reduxjs/toolkit';
import userreducer from './user/userslice.js'

const store = configureStore({
  reducer: {
      user:userreducer
  },
});

export default store;
