import React from "react";
import { Modal, View, Text, TouchableOpacity, StyleSheet, SafeAreaView, StatusBar } from "react-native";

const CustomAlert = ({ visible, message, onCancel, onConfirm, item }) => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      {/* <StatusBar style="light" /> */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={visible}
        onRequestClose={() => onCancel()}
      >
        <View style={styles.modalBackground}>
          <View style={styles.alertContainer}>
            <Text style={styles.alertMessage}>{message}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#DDDDDD" }]}
                onPress={() => onCancel()}
              >
                <Text style={styles.buttonText}>Cancel</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.button, { backgroundColor: "#8296FF" }]}
                onPress={() => onConfirm(item, {masterlog: item})}
              >
                <Text style={[styles.buttonText, { color: "#FFFFFF" }]}>
                  Submit
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

export default CustomAlert;
