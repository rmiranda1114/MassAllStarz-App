import React from 'react';
import { View, StyleSheet, FlatList, Dimensions, Image } from 'react-native';

const Slider = () => {


    const sliderList=[
        {
            id:1,
            name:'Slider 1',
            imageUrl: require(`../../assets/MAS1.jpg`)
        },
        {
            id:2,
            name:'Slider 2',
            imageUrl: require(`../../assets/MAS2.jpg`)
        },
        {
            id:3,
            name:'Slider 3',
            imageUrl: require(`../../assets/MAS3.jpg`)
        },
        {
            id:4,
            name:'Slider 4',
            imageUrl: require(`../../assets/MAS4.jpg`)
        },
        {
            id:5,
            name:'Slider 5',
            imageUrl: require(`../../assets/MAS5.jpg`)
        },
    ]
    return (
        <View style={styles.container}>
            <FlatList 
                data={sliderList}
                horizontal={false}
                flashScrollIndicator={true}
                renderItem={({item})=>(
                    <Image source={item.imageUrl} 
                        style={{
                            width:Dimensions.get('screen').width*0.9,
                            height:200,
                            borderRadius: 10,
                            margin: 2
                        }}
                    />
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        marginTop: 10,
        height: Dimensions.get('screen').height*0.7
    }
})

export default Slider;