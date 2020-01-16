/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Marker, Callout } from 'react-native-maps';
import PropTypes from 'prop-types';

import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import {
  CustomMapView,
  MarkerImage,
  Content,
  Name,
  Techs,
  Bio,
} from './styles';

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if (granted) {
        const { coords } = await getCurrentPositionAsync({
          enableHighAccuracy: true,
        });

        const { latitude, longitude } = coords;

        setCurrentRegion({
          latitude,
          longitude,
          latitudeDelta: 0.06,
          longitudeDelta: 0.06,
        });
      }
    }
    loadInitialPosition();
  }, []);

  if (!currentRegion) {
    return null;
  }

  return (
    <CustomMapView initialRegion={currentRegion}>
      <Marker coordinate={{ latitude: -23.7203513, longitude: -46.5535921 }}>
        <MarkerImage
          source={{
            uri: 'https://avatars2.githubusercontent.com/u/51893683?s=460&v=4',
          }}
        />
        <Callout
          onPress={() => {
            navigation.navigate('Profile', {
              github_username: 'patricklongo1',
            });
          }}
        >
          <Content>
            <Name>Patrick Longo</Name>
            <Techs>Javascript, Node.js</Techs>
            <Bio>
              Atualmente cursando Bootcamp da RocketSeat. Estou focado em
              dominar a stack de desenvolvimento de JavaScript, utilizando
              Node.JS, ReactJS e React-Native!
            </Bio>
          </Content>
        </Callout>
      </Marker>
    </CustomMapView>
  );
}

Main.propTypes = {
  navigation: PropTypes.object.isRequired,
};
