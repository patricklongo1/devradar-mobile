/* eslint-disable react/forbid-prop-types */
import React from 'react';
import { WebView } from 'react-native-webview';
import PropTypes from 'prop-types';

export default function Profile({ navigation }) {
  const githubUsername = navigation.getParam('github_username');

  return (
    <WebView
      style={{ flex: 1 }}
      source={{ uri: `https://github.com/${githubUsername}` }}
    />
  );
}

Profile.propTypes = {
  navigation: PropTypes.object.isRequired,
};
