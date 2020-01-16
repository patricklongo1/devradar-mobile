import styled from 'styled-components/native';
import MapView from 'react-native-maps';

export const CustomMapView = styled(MapView)`
  flex: 1;
`;

export const MarkerImage = styled.Image`
  width: 54px;
  height: 54px;
`;

export const Content = styled.View`
  width: 260px;
`;

export const Name = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const Techs = styled.Text`
  margin-top: 6px;
`;

export const Bio = styled.Text`
  color: #666;
  margin-top: 5px;
`;
