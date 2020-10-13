import React, { lazy, Suspense } from 'react';
import SplashScreen from '../components/SplashScreen/SplashScreen';

const loadable = (importFunc, { fallback = null } = { fallback: null }) => {
  const LazyComponent = lazy(importFunc);

  return props => (
    <Suspense fallback={<SplashScreen />}>
      <LazyComponent {...props} />
    </Suspense>
  );
};

export default loadable;
