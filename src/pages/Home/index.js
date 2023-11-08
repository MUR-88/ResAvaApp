import React from "react";
import {Text, View, SafeAreaView, StyleSheet, Dimensions, Image} from "react-native";
import Constants  from "expo-constants";
import { Profile_Set } from "../../assets/icon";
import AutoHeightImage from 'react-native-auto-height-image';
import { Button } from "../../component";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
// import {color} from "../..variabel";


const Home = ({navigation}) =>{
  return(
    // use if status bar overlaying
    // <SafeAreaView style={{flex:1, marginTop:Constants.statusBarHeight
    // }}>
    
    <SafeAreaView style={{flex:1, backgroundColor:'#FAFAFA',}}>
      <StatusBar style="light"/>
        <RefreshControl style={{flex:1}}>
          <ScrollView style={{flex:1}}>
            <View style={{backgroundColor:'#007AFF', height:100,justifyContent:'flex_start',}} >
              <View style={[styles.Kotak]}>
                <Text style={[styles.Header1]}>Home</Text>
                <View style={[styles.Profile_Circle]}>
                  <AutoHeightImage source={Profile_Set} width={35} style={{justifyContent:'center'}} />
                </View>
              </View>
            </View>
            <View style={[styles.Content]}>
              <Text style={{color:'#007AFF', fontSize:18, fontFamily:'Poppins-Medium'}}>Today's Update</Text>
                <View style={{width:100, marginLeft:20, justifyContent:'center', backgroundColor:'black'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Login',
                        textcolor:'white',
                        backgroundcolor:'black',
                        alginSelf:'center',
                        onPress: () => navigation.navigate('Login')
                        // width:20
                      }}
                    />
                  </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />

                  </View>
                </View>
              </View>
            </View>
            <View style={[styles.Content1]}>
              <Text style={{color:'grey', fontSize:18, fontFamily:'Poppins-Medium'}}>Last Week Update</Text>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>
              <View style={[styles.Isi]}>
                <Text style={{color:'#3C3C43', marginVertical:5, marginLeft:10,opacity:0.6 }}>17 OCtober, 2023</Text>
                <View style={{flex: 1,marginHorizontal:10, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1}} />
                <View style={[styles.IsiContent]}>
                  <AutoHeightImage source={Profile_Set} width={40} style={{marginLeft:20, marginBottom:5}}/>
                  <View>
                    <Text style={[styles.IsiText,]}>
                      PT.Rimba Sejahtera 
                    </Text>
                    <Text style={[styles.IsiText, {fontWeight:900, }]}>
                      Tesso West A-023
                    </Text>
                    <Text style={[styles.IsiText, {fontSize:10, marginVertical:2}]}>
                      Updated at 17/10/2023, 17:15 Wib 
                    </Text>
                  </View>
                  <View style={{width:100, marginLeft:20, justifyContent:'center'}}>
                    <Button 
                      buttonStyle={{borderRadius:20 }} 
                      item={{
                        title:'Edit',
                        textcolor:'white',
                        backgroundcolor:'#007AFF',
                        alginSelf:'center',
                        // width:20
                      }}
                    />
                  </View>
                </View>
              </View>

            </View>

          </ScrollView>
        </RefreshControl>
    </SafeAreaView>
  )
}


export default Home;

const { width, height } = Dimensions.get('screen')
const styles = StyleSheet.create ({
  Header: {
    backgroundColor: '#FAFAFA',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 14,
    marginVertical:6,
    shadowColor: "#000",
    height:200,
    width:width-24,
    marginHorizontal:12,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.34,
    shadowRadius: 6.27,
    elevation: 10,
  },
  Header1: {
    marginLeft:10,
    marginTop:15,
    // marginBottom:10,
    flex:1 ,
    alignItems:'center',
    flexDirection:'column',
    // marginVertical:40,
    fontSize:32,
    fontFamily: 'Poppins-Bold',
    fontWeight:'900',
    color:'white'
    // marginTop:20

  },
  Profile_Circle:{
    alignContent:'flex-end', 
    alignItems:'center', 
    marginRight:20, 
    marginTop:25, 
    backgroundColor:'white', 
    borderRadius:50, 
    width:40,
    height: 40,
  },
  Kotak: {
    flexDirection:'row', 
    justifyContent:'space-between',  
    marginVertical:25
  },
  
  Content: {
   flex:1,
   flexDirection:'column',
   marginLeft:10,
   marginRight:10
  },
  Content1: {
    // flex:1,
    marginTop:50,
    flexDirection:'column',
    marginLeft:10,
    marginRight:10
   },
  
  Isi: {
    // marginLeft:10,
    // marginRight:10,
    // marginRight:20,
    flexDirection:'column',
    borderRadius:10,
    marginBottom:10,
    backgroundColor:'white',
    width:'98%',
    fle1:1,
    marginTop:5,
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 1,
    },
    shadowOpacity: 0.10,
    shadowRadius: 1.00,
    elevation:5
  },
  IsiContent:{
    flex:1,
    width:'90%',
    flexDirection:'row',
  //  justifyContent:'space-between',
   marginVertical:5,
  },
  IsiText:{
    fontSize:12, 
    fontFamily:'Poppins'
  },
})
