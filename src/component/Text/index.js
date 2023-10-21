import { Text } from 'react-native'
import React from 'react'

const TextInter = (props) => {
  return (
    <Text style={{
        fontFamily:'Poppins',
        ...props.style
    }}>
    { props.children }
    </Text>
  )
}

export default TextInter
