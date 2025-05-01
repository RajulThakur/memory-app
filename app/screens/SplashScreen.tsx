import React from 'react';
import LottieView from 'lottie-react-native';

interface Props {
  onFinish: (param: boolean) => void;
}

export default function SplashScreen({ onFinish }: Props) {
  return (
    <LottieView
      source={require('../../assets/splash.json')}
      style={{ width: '100%', height: '100%' }}
      autoPlay
      loop={false}
      onAnimationFinish={() => onFinish(true)}
    />
  );
}
