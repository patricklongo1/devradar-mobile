/* eslint-disable no-underscore-dangle */
/* eslint-disable react/forbid-prop-types */
import React, { useEffect, useState } from 'react';
import { Marker, Callout } from 'react-native-maps';
import PropTypes from 'prop-types';
import {
  requestPermissionsAsync,
  getCurrentPositionAsync,
} from 'expo-location';

import api from '../../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../../services/socket';

import SearchForm from '../../components/SearchForm';

import {
  CustomMapView,
  MarkerImage,
  Content,
  Name,
  Techs,
  Bio,
} from './styles';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [currentRegion, setCurrentRegion] = useState(null);
  const [techs, setTechs] = useState('');

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

  useEffect(() => {
    subscribeToNewDevs(dev => {
      setDevs([...devs, dev]);
    });
  }, [devs]);

  function setupWebsocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect(latitude, longitude, techs);
  }

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs,
      },
    });
    setDevs(response.data);
    setupWebsocket();
  }

  function handleRegionChanged(region) {
    setCurrentRegion(region);
  }

  if (!currentRegion) {
    return null;
  }

  return (
    <>
      <CustomMapView
        onRegionChangeComplete={handleRegionChanged}
        initialRegion={currentRegion}
      >
        {devs.map(dev => (
          <Marker
            key={dev._id}
            coordinate={{
              latitude: dev.location.coordinates[1],
              longitude: dev.location.coordinates[0],
            }}
          >
            <MarkerImage
              source={{
                uri: dev.avatar_url,
              }}
            />
            <Callout
              onPress={() => {
                navigation.navigate('Profile', {
                  github_username: dev.github_username,
                });
              }}
            >
              <Content>
                <Name>{dev.name}</Name>
                <Techs>{dev.techs.join(', ')}</Techs>
                <Bio>{dev.bio}</Bio>
              </Content>
            </Callout>
          </Marker>
        ))}
      </CustomMapView>
      <SearchForm loadDevs={loadDevs} techs={techs} setTechs={setTechs} />
    </>
  );
}

Main.propTypes = {
  navigation: PropTypes.object.isRequired,
};
