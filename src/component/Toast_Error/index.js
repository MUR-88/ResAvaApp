import { StyleSheet, View, Animated } from 'react-native'
import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setToast } from '../../redux'
import Text from '../Text'


const Toast_Error = ( {title} ) => {
  const { toast } = useSelector(state => state.toast)
    const dispatch = useDispatch()

    const offsetY = 120
    const fadeAnim = useRef(new Animated.Value(offsetY)).current;
    const opacityAnim = useRef(new Animated.Value(0)).current


    const fadeIn = () => {
      // Will change fadeAnim value to 1 in 5 seconds
      Animated.timing(fadeAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true
      }).start()
    };

    const fadeOut = () => {
      // Will change fadeAnim value to 0 in 3 seconds
      Animated.timing(fadeAnim, {
        toValue: offsetY,
        duration: 400,
        useNativeDriver: true
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true
      }).start()
    };

    const reset = () => {
      dispatch(setToast({
        show: false
      }))
      Animated.timing(fadeAnim, {
        toValue: offsetY,
        duration: 1,
        useNativeDriver: true
      }).start();
      Animated.timing(opacityAnim, {
        toValue: 0,
        duration: 1,
        useNativeDriver: true
      }).start()
    }

    useEffect(() => {
      // reset()
      if(toast.show == true && toast.type == 'error'){
        fadeIn()
        setTimeout(() => {
          fadeOut()
          setTimeout(() => {
            dispatch(setToast({
              show: false
            }))

          }, 600)
        }, toast.time)
      }
    }, [toast])

    if(toast.show == true && toast.type == 'error'){
      return (
          <View 
            style={styles.toast}>
              <Animated.View style={[styles.toast_error, {
                transform: [{
                  translateY: fadeAnim
                }],
                opacity: opacityAnim
              }]}>
                  <Text style={{color:"white"}}>{ toast.text }</Text>
              </Animated.View>
          </View>
      )
    } else {
      return null
    }
}

export default Toast_Error

const styles = StyleSheet.create({
    toast: { 
      position:'absolute', 
      bottom: 70, 
      width: '100%', 
      paddingHorizontal: 12,
      
    },
    toast_error:{
        
        flexDirection: 'row',
        padding:10,
        backgroundColor: '#DC0000',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 24,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
      
      },
})