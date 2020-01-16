import React from 'react';
import { MaterialIcons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import { Search, SearchInput, SearchButton } from './styles';

export default function SearchForm({ loadDevs }) {
  return (
    <Search>
      <SearchInput
        placeholder="Buscar devs por techs..."
        placeholderTextColor="#999"
        autoCapitalize="words"
        autoCorrect={false}
      />
      <SearchButton onPress={loadDevs}>
        <MaterialIcons name="my-location" size={20} color="#fff" />
      </SearchButton>
    </Search>
  );
}

SearchForm.propTypes = {
  loadDevs: PropTypes.func.isRequired,
};
