import React, { useEffect, useState, useRef } from "react";
import {
  Modal,
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const AlertCount = ({ visible, message, onCancel, onConfirm, item }) => {
  const [countdown, setCountdown] = useState(5);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (visible) {
      setCountdown(5); // Reset countdown when modal becomes visible
      setButtonDisabled(true); // Disable button initially
      startCountdown();
    } else {
      resetCountdown();
    }

    return () => clearInterval(intervalRef.current); // Cleanup on unmount or when not visible
  }, [visible]);

  const startCountdown = () => {
    intervalRef.current = setInterval(() => {
      setCountdown((prevCount) => {
        if (prevCount > 0) {
          return prevCount - 1;
        } else {
          clearInterval(intervalRef.current);
          setButtonDisabled(false); // Enable button when countdown completes
          return 0;
        }
      });
    }, 1000);
  };

  const resetCountdown = () => {
    clearInterval(intervalRef.current);
    setCountdown(5);
    setButtonDisabled(true);
  };

  const handleCancel = () => {
    resetCountdown();
    onCancel();
  };

  const handlePress = () => {
    if (!buttonDisabled) {
      onConfirm(item, { masterlog: item });
      resetCountdown();
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={handleCancel}
      >
        <View style={styles.modalBackground}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertMessage}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#DDDDDD" }]}
                onPress={handleCancel}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                disabled={buttonDisabled}
                onPress={handlePress}
                style={[
                  styles.button,
                  buttonDisabled
                    ? { backgroundColor: "#CCCCCC" }
                    : { backgroundColor: "#8296FF" },
                ]}
              >
                <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                  {buttonDisabled ? `Waiting (${countdown})` : "Submit"}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  alertContainer: {
    backgroundColor: "#FFFFFF",
    width: "80%",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
  },
  alertMessage: {
    fontSize: 18,
    marginBottom: 20,
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginHorizontal: 10,
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default AlertCount;
