import React, {useState} from "react";
import {Text, View, SafeAreaView, StyleSheet, Dimensions, Image, StatusBar} from "react-native";
import Constants  from "expo-constants";;
import { Button, Input } from "../../component";
import { RefreshControl, ScrollView } from "react-native-gesture-handler";
// import {color} from "../..variabel";
import SelectDropdown from "react-native-select-dropdown";
import { Dropdown } from 'react-native-element-dropdown';

  const sector = [
    { label: 'Basrah', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const estate = [
    { label: 'A', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  const company = [
    { label: 'PTSI', value: '1' },
    { label: 'Item 2', value: '2' },
    { label: 'Item 3', value: '3' },
    { label: 'Item 4', value: '4' },
    { label: 'Item 5', value: '5' },
    { label: 'Item 6', value: '6' },
    { label: 'Item 7', value: '7' },
    { label: 'Item 8', value: '8' },
  ];

  // const DropdownComponent = () => {
    
  const countries = ["Peranap", "Tesso West", "Australia", "Ireland"]
  
  const AddNew = () =>{
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

  return(
    // use if status bar overlaying
    // <SafeAreaView style={{flex:1, marginTop:Constants.statusBarHeight
    // }}>
    <SafeAreaView style={{flex:1, backgroundColor:'#f2f2f2'}}>
      <StatusBar style="light"/>
      <RefreshControl>
        <ScrollView>
          <View style={{backgroundColor:'#007AFF', height:100,justifyContent:'flex_start',}} >
            <View style={[styles.Kotak]}>
              <Text style={[styles.Header1, { marginBottom:-10}]}>Resources Update</Text>
            </View>
          </View>
          <View style={[styles.Content]}>
            <Text style={{color:'#007AFF', fontSize:18, fontFamily:'Poppins-Medium', marginTop:5}}>Details</Text>
            <View style={[styles.Details1]}>
              <View style={[styles.button_waktu]}>
                <Button 
                  buttonStyle={{borderRadius:20 }} 
                  item={{
                    title:'Pilih Tanggal',
                    height:40,
                    textcolor:'grey',
                    backgroundcolor:'#white',
                    alginSelf:'center',
                    // width:20
                  }}
                />
              </View>
              <View style={[styles.container, {paddingVertical:10}]}>
                {/* {renderLabel()} */}
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={sector}
                  maxHeight={300}
                  placeholder={!isFocus? 'Sector' : ''}
                  labelField="label"
                  valueField="value"
                  text="sector"
                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
              </View>
              {/* <View style={{ flexDirection:'row'}}>
                <View style={[styles.container, {justifyContent:'flex-end'}]}>
                  <Dropdown
                    style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                    placeholderStyle={styles.placeholderStyle}
                    selectedTextStyle={styles.selectedTextStyle}
                    iconStyle={styles.iconStyle}
                    data={estate}
                    maxHeight={300}
                    labelField="label"
                    valueField="value"
                    placeholder={!isFocus? 'Estate' : ''}
                    value={value}
                    onFocus={() => setIsFocus(true)}
                    onBlur={() => setIsFocus(false)}
                    onChange={item => {
                      setValue(item.value);
                      setIsFocus(false);
                    }}
                  />
                </View>
                <View style={styles.containerInput}>
                <Input 
                  // onChangeText={handleChange('email_no_hp')}
                  item={{
                    // label: 'Compart ID',
                    // value: values.email_no_hp,
                    placeholder: 'Compart Id',
                    // borderWidth:0.5
                    // marginLeft:100,
                  }}
                />
                </View>
              </View> */}
              <View style={[styles.container, {paddingVertical:10}]}>

                {/* {renderLabel()} */}``
                <Dropdown
                  style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  iconStyle={styles.iconStyle}
                  data={company}
                  maxHeight={300}
                  labelField="label"
                  valueField="value"
                  placeholder={!isFocus? 'Company' : ''}

                  value={value}
                  onFocus={() => setIsFocus(true)}
                  onBlur={() => setIsFocus(false)}
                  onChange={item => {
                    setValue(item.value);
                    setIsFocus(false);
                  }}
                />
                <View style={[styles.button_waktu1]}>
                  <Button 
                    buttonStyle={{borderRadius:20 }} 
                    item={{
                      title:'Check Status Machine',
                      height:40,
                      textcolor:'#007AFF',
                      marginTop:10,
                      backgroundcolor:'#DEEBFF',
                      // opacity:0.10,
                      alginSelf:'center',
                      // width:20
                    }}
                  />
                </View>
              </View>
            </View>
            <View style={{flex: 1, marginLeft:-20, borderBottomColor:'#3C3C43', opacity:0.3, borderBottomWidth: 1, marginVertical:15, marginRight:-200}} />
            <Text style={{marginBottom:20, color:'#88888D', fontFamily:'Poppins-Regular', fontWeight:900, fontSize:18, marginLeft:10}}>Mechine Information</Text>
            <View style={[styles.MechInfo]}>
              <Dropdown
                style={[styles.dropdownMech,{marginTop:20}, isFocus && { borderColor: '#8888D' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={company}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus? 'Mechine ID' : ''}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdownMech, isFocus && { borderColor: '#8888D' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={company}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus? 'Estate' : ''}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <View style={{ flexDirection:'row', flex:1, backgroundColor:'white', borderRadius:10, height:40, marginLeft:10, borderColor:'black', marginTop:10, shadowColor: "#000",
                height: 40,
                flex:1,
                backgroundColor:'#D8D8D8',
                opacity:0.4,
                marginRight:10,
                marginVertical:5,
                borderRadius:15,
                justifyContent:'center',
                alignContent:'center',
                // width:'95%',
                // borderColor: 'gray',
                borderWidth: 0.5,
                borderRadius: 8,
                paddingHorizontal: 8,
              }}
              >
                <View style={[styles.container, {justifyContent:'center', flex:1}]}>
                  <Text style={styles.Abu}>Compartement Id </Text>
                </View>
                <View style={[styles.container,]}>
                  <View style={[styles.container, {justifyContent: 'flex-end',alignContent: 'flex-end',}]}>
                    <Input 
                      item={{
                        placeholder: 'XX TON',
                        borderWidth:0.5
                      }}
                    />
                  </View>
                </View>
              </View>
              <Dropdown
                style={[styles.dropdownMech, isFocus && { borderColor: '#8888D' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={company}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus? 'Type' : ''}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdownMech,{marginTop:5}, isFocus && { borderColor: '#8888D' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={company}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus? 'Main Activity' : ''}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdownMech, isFocus && { borderColor: '#8888D' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={company}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus? 'HM-Last Update' : ''}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              <Dropdown
                style={[styles.dropdownMech, {marginBottom:20}, isFocus && { borderColor: '#8888D' }]}
                placeholderStyle={styles.placeholderStyle}
                selectedTextStyle={styles.selectedTextStyle}
                iconStyle={styles.iconStyle}
                data={company}
                maxHeight={300}
                labelField="label"
                valueField="value"
                placeholder={!isFocus? 'HM-Current' : ''}
                value={value}
                onFocus={() => setIsFocus(true)}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                  setValue(item.value);
                  setIsFocus(false);
                }}
              />
              
            </View>
            <View style={[styles.container, {paddingVertical:10}]}>
            </View>
          </View>
          <View style={{ 
            // backgroundColor:'red',
            flexDirection:'row', 
            justifyContent: 'center',
            // borderTopLeftRadius: 36,
            // borderTopRightRadius: 36,
            borderRadius:20,
            flex:1
            }}>
            <View style={[ styles.atas, {width:'90%', borderRadius:10}]} >
              <View style={[styles.containerInput, {backgroundColor:'#D8D8D8',}] }>
                <Input
                  item={{
                    height:200,
                    label: 'Keterangan',
                    placeholder: 'Keterangan Alamat Ex: Samping kantor pos',
                    // textAlignVertical: 'top', paddingVertical:8, paddingHorizontal:12
                  }}
                  input={{backgroundColor:'black'}}
                  // multiline={true}
                  // numberOfLines={5}
                />
                {/* { errors.keterangan ? <Text style={globalStyles.textError}>{ errors.keterangan }</Text> : null } */}
              </View>
            </View>
            <View style={{
              position:'absolute',
              bottom:0,
              width,
              height:100,
              paddingHorizontal:25,
              justifyContent:'flex-end',
              paddingVertical:500

            }}>
            <View style={[styles.button_waktu1]}>
              <Button 
                buttonStyle={{borderRadius:20 }} 
                item={{
                  title:'Check Status Mechine',
                  height:40,
                  textcolor:'#007AFF',
                  marginTop:10,
                  marginVertical:20,
                  marginBottom:20,
                  backgroundcolor:'#DEEBFF',
                  // opacity:0.10,
                  alginSelf:'center',
                  // width:20
                }}
              />
            </View>
            </View>
          </View>
        </ScrollView>
      </RefreshControl>
    </SafeAreaView>
  )
}


export default AddNew;

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
  Kotak: {
    flexDirection:'row', 
    justifyContent:'space-between',  
    marginVertical:20
  },
  
  Content: {
  //  flex:1,
   flexDirection:'column',
   marginLeft:10,
  },
  Content1: {
    // flex:1,
    marginTop:50,
    flexDirection:'column',
    marginLeft:10,
   },
  
  // Isi: {
  //   // marginLeft:10,
  //   // marginRight:10,
  //   // marginRight:20,
  //   flexDirection:'column',
  //   borderRadius:10,
  //   marginBottom:10,
  //   backgroundColor:'red',
  //   width:'98%',
  //   marginTop:5,
  //   shadowColor: "#000",
  //   shadowOffset: {
  //       width: 0,
  //       height: 1,
  //   },
  //   shadowOpacity: 0.10,
  //   shadowRadius: 1.00,
  //   elevation:5
  // },
  IsiContent:{
   flexDirection:'row',
  //  justifyContent:'space-between',
   marginVertical:5,
  },
  IsiText:{
    fontSize:12, 
    fontFamily:'Poppins'
  },
  button_waktu:{
  width:"95%",
  marginTop:10, 
  marginBottom:5,
  marginLeft:10, 
  justifyContent:'center', 
  borderRadius:10, 
  backgroundColor:'white',
    shadowColor: "#000",
    shadowOffset: {
        width: 0,
        height: 5,
    },
    shadowOpacity: 0.10,
    shadowRadius: 1.00,
    elevation:5
  },
  button_waktu1:{
    width: '100%',
    marginTop:10, 
    marginBottom:5,
    justifyContent:'center', 
    borderRadius:10, 
  },
  container: {
    flex:1,
    flexDirection:'column',
    marginHorizontal:10,
  },
  MechInfo: {
    flex:1,
    width:'90%',
    borderRadius:10,
    alignItems:'center',
    backgroundColor:'white',
    // backgroundColor:'red',
    flexDirection:'column',
    marginHorizontal:15,
  },
Details1: {
  flex:1,
    width:'95%',
    borderRadius:10,
    backgroundColor:'white',
    marginHorizontal:5,
  },
  dropdown: {
    height: 40,
    // borderColor: 'gray',
    borderWidth: 0.5,
    backgroundColor:'white',
    opacity:0.4,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownMech: {
    height: 40,
    flex:1,
    backgroundColor:'#D8D8D8',
    opacity:0.4,
    marginVertical:5,
    borderRadius:25,
    justifyContent:'center',
    alignContent:'center',
    width:'95%',
    // borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  atas:{
    flexDirection:'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    marginTop: 8,
    paddingVertical: 10,
    backgroundColor: 'white',

  },
  title: {
    fontSize: 16
  },

  containerInput:{
    borderRadius:10,
    borderWidth:0.5,
    borderColor:'#8888D',
    alignItems:'center',
    opacity:0.4,
  },
})
