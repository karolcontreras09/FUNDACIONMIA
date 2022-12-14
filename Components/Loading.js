import React from 'react';
import {
  StyleSheet,
  Dimensions,
  View,
  ActivityIndicator
} from 'react-native';

function Loading() {
  return (
    <View style={styles.loadingContainer}>
    <View style={[styles.container, styles.horizontal]}>
      <ActivityIndicator size="large" color="#0000ff" />
    </View>
</View>
  )
}

export default Loading;

const styles = StyleSheet.create({

    loadingContainer: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0, 0.3)',
      flex: 1, justifyContent: 'center', alignItems: 'center',
      width: Dimensions.get("window").width,
      height: Dimensions.get("window").height,
      zIndex: 1,
      position: 'absolute'
    },
    container: {
        flex: 1,
        justifyContent: "center",
      },
      horizontal: {
        flexDirection: "row",
        justifyContent: "space-around",
        padding: 10,
      },
});