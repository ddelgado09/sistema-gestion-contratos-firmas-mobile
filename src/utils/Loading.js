import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import AnimatedLoader from "react-native-animated-loader";

export default function Loading({ visible }) {
    return (
        <AnimatedLoader
            visible={visible}
            overlayColor="rgba(255,255,255,0.75)"
            animationStyle={styles.lottie}
            speed={1}
        >
            <Text>Cargando...</Text>
        </AnimatedLoader>
    )
}

const styles = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100,
    },
  });