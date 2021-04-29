import React from "react";
import { StyleSheet, View, Modal, ActivityIndicator } from "react-native";

interface ActivityLoader {
    loading: boolean
}

const ActivityLoader: React.FC<ActivityLoader> = ({ loading }) => {
    
    return (
        <Modal 
            visible={loading}
            transparent={true}
            animationType={'none'} 
        >
            <View style={styles.modalBackground}>
                <View style={styles.activityIndicatorWrapper}>
                    <ActivityIndicator animating={loading} size="large" color="#34CB79" />
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modalBackground: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'column',
        justifyContent: 'space-around',
        backgroundColor: '#00000040'
    },
    activityIndicatorWrapper: {
        backgroundColor: '#FFFFFF',
        height: 100,
        width: 100,
        borderRadius: 10,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-around'
    }
});

export default ActivityLoader;
