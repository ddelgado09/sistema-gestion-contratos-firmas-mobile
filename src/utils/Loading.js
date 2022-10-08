import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import Lottie from 'lottie-react-native';

export default function Loading({ children, visible }) {
    return (
        <Lottie
            style={{ display: visible ? 'flex' : 'none'}}
            autoPlay
            loop
        />
    )
}

const styles = StyleSheet.create({
    lottie: {
      width: 100,
      height: 100,
    },
  });