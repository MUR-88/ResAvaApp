import { View, ActivityIndicator, Dimensions } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'

const Loading = () => {
  const { loading } = useSelector(state => state.loadingGlobal)

  if(loading){
    return (
      <View style={{
          height,
          width,
          top: 0,
          left: 0,
          position: 'absolute',
          zIndex: 100000000000000000,
          elevation: 100000000000000000,
          backgroundColor: 'rgba(0, 0, 0, 0.5)',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center'
      }}>
        <ActivityIndicator size="large" color="white" />
      </View>
    )
  } else {
    return null
  }
}

const { width, height } = Dimensions.get('screen')

export default Loading