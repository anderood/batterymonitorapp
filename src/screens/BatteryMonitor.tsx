import React, { useEffect, useState } from 'react'
import { View, Text, Button } from 'react-native';
import * as Battery from 'expo-battery';
import * as Device from 'expo-device';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';



export function BatteryMonitor(){

    const [ batteryLevel, setBatteryLevel ] = useState<number | null>(null);

    useEffect(() => {
        const getLevel = async () => {
            const level = await Battery.getBatteryLevelAsync();
            setBatteryLevel(level);
        }
        getLevel();

        
    }, [])

    const getRingTones = async () => {
        try {
            const info = await FileSystem.getInfoAsync(FileSystem.documentDirectory + '/ringtones/');
            console.log(FileSystem)
            if(info.exists){
                const files = await FileSystem.readDirectoryAsync(info.uri);
                console.log({ 'Ringtones': files})
            }
        } catch (error) {
            console.log('Error getting ringtones:', error);
        }
        
    }

    return(
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center'}}>
            <Text> {`Device modelName: ${Device.modelName}`}</Text>
            <Text> {`Device osVersion: ${Device.osVersion}`}</Text>
            <Text> {`Device platformApiLevel: ${Device.platformApiLevel}`}</Text>
            <Text> {`Device productName: ${Device.productName}`}</Text>
            <Text> {`Device supportedCpuArchitectures: ${Device.supportedCpuArchitectures}`}</Text>
            <Text> {`Device totalMemory: ${Device.totalMemory}`}</Text>
            {batteryLevel !== null && (
                <Text>{`Battery Level: ${Math.round(batteryLevel * 100)}%`}</Text>
            )}

            <View>
                <Button title="get Ring" onPress={getRingTones}></Button>
            </View>

        </View>
    );
   
}