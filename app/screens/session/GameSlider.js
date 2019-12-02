import React from 'react';
import {View, Dimensions} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Game from './Game';

const GameSlide = item => {
  return <Game data={item} />;
};

const GameSlider = ({games, activeSlide}) => {
  if (!games.length) {
    return null;
  } else {
    return (
      <View>
        <Carousel
          activeSlideAlignment={'center'}
          data={games}
          renderItem={GameSlide}
          sliderWidth={sliderWidth}
          itemWidth={sliderWidth - 40}
          inactiveSlideScale={1}
          inactiveSlideOpacity={1}
          firstItem={activeSlide}
        />
      </View>
    );
  }
};

const {width: viewportWidth} = Dimensions.get('window');
const sliderWidth = viewportWidth;

export default GameSlider;
