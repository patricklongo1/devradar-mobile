import styled from 'styled-components/native';

export const Search = styled.View`
  position: absolute;
  top: 20px;
  left: 20px;
  right: 20px;
  z-index: 5;
  flex-direction: row;
`;

export const SearchInput = styled.TextInput`
  flex: 1;
  height: 50px;
  background: #fff;
  color: #333;
  border-radius: 25px;
  padding: 0 20px;
  font-size: 16px;
  shadow-color: #000;
  shadow-offset: 4px 4px;
  shadow-opacity: 0.2;
  shadow-radius: 2px;
  elevation: 2;
`;

export const SearchButton = styled.TouchableOpacity`
  height: 50px;
  width: 50px;
  border-radius: 25px;
  background: #8e4dff;
  justify-content: center;
  align-items: center;
  margin-left: 15px;
`;
