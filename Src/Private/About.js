import React from 'react';
import { Image, ScrollView, StyleSheet, Text, View } from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const About = () => {
  return (
    <ScrollView style={styles.container}>
      <Image
        source={require('../Assets/Image/about.png')}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>About RR Decore</Text>
        <Text style={styles.description}>
          Pioneers in the weaving of handloom silks, RR Décor is India’s premier textile design company, with focus on originality of designs. We design and market exclusive furnishing and upholstery fabrics for residential and contract interiors.
          {"\n"}
          {"\n"}
          RR Décor fabrics begin life in the design department where a team of artists, designers and stylists put their ideas into practice. An essential tool at the creative stage is the company’s indepth study of ancient fabrics fused with modern day eccentricities.
          {"\n"}
          {"\n"}
          Most research into RR Décor fabrics start at least twelve months in advance, with special focus on more innovative trends which range from contemporary art to extreme experimentation by International Design Houses, who are instrumental in the designing of our collections.
          {"\n"}
          {"\n"}
          Each new fabric is therefore, a fusion of the past and present, craft and industry, while fully adhering to the RR Décor philosophy of original designs only. RR Décor collections are launched in January every year through our network of retailers and distributors in India and rest of the world.
        </Text>
        <Text style={styles.instagramTitle}>Instagram</Text>
        <View style={styles.instagramContainer}>
          <Image source={require('../Assets/Icons/inst.png')} />
          <Text style={styles.instagramText}>rr_decore</Text>
        </View>

      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
  },
  image: {
    alignSelf: 'center',
    marginTop: hp('2%'),
    backgroundColor: '#fff',
    width: wp('90%'),
    height: hp('20%'),
    borderRadius: 10,
  },
  contentContainer: {
    width: wp('94%'),
    alignSelf: 'center',
  },
  title: {
    fontSize: 18,

    color: '#222222',
    marginTop: hp('2%'),
  },
  description: {
    fontSize: 14,
    // fontFamily: 'Poppins-Regular',
    color: '#5D5D5D',
    marginTop: hp('2%'),
  },
  instagramTitle: {
    fontSize: 18,

    color: '#222222',
    marginTop: hp('2%'),
  },
  instagramContainer: {
    flexDirection: 'row',
    marginTop: hp('2%'),
    alignItems: 'center',
  },
  instagramText: {
    fontSize: 15,

    color: '#222222',
    marginLeft: wp('3%'),
  },
});

export default About;
