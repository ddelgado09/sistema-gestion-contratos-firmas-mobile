import { View, Text, StyleSheet, TouchableOpacity, Button, Alert } from 'react-native';
import React, { useRef, useState } from 'react';
import { Camera, CameraType,  } from 'expo-camera';

export default function PhotoScreen({ navigation }) {
    const [type, setType] = useState(CameraType.back);
    const [permission, requestPermission] = Camera.useCameraPermissions();
    const [cameraReady, setCameraReady] = useState(false);
    let cameraRef;

    const toggleCameraType = () => {
        setType(current => (current === CameraType.back ? CameraType.front : CameraType.back));
    }
    const takePicture = async () => {
        if (!cameraRef || !cameraReady) return;

        // const photo = await CameraCapturedPicture.
    }

    if (!permission) {
        return <View />
    }

    if (!permission.granted) {
        return (
            <View style={styles.container}>
              <Text style={{ textAlign: 'center' }}>Necesitas conceder permisos para usar la camara</Text>
              <Button onPress={requestPermission} title="grant permission" />
            </View>
          );
    }

    return (
        <View style={styles.container}>
             <Camera style={styles.camera} type={type} ref={(r) => cameraRef = r} onCameraReady={() => setCameraReady(true)} onTa>
                <View style={styles.buttonContainer}>
                    <TouchableOpacity style={styles.button} onPress={toggleCameraType}>
                        <Text style={styles.text}>Cambiar cámara</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.button} onPress={takePicture}>
                        <Text style={styles.text}>Tomar foto</Text>
                    </TouchableOpacity>
                </View>
            </Camera>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
      },
      camera: {
        flex: 1,
      },
      buttonContainer: {
        flex: 1,
        flexDirection: 'row',
        backgroundColor: 'transparent',
        margin: 64,
      },
      button: {
        flex: 1,
        alignSelf: 'flex-end',
        alignItems: 'center',
      },
      text: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'white',
      },
})