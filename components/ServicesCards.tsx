import { useEffect, useState } from 'react';
import { ScrollView } from 'react-native-gesture-handler';
import ServicesCard from './ServicesCard';
import { StyleSheet, View } from 'react-native';
import icons from '../constants/servicesIconsMap'

interface Service {
    id: number;
    title: string;
    description: string;
  }

function ServicesCards() {
    const [services, setServices] = useState<Service[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetch("https://669ae4f09ba098ed610102d8.mockapi.io/api/v1/ticDrive/services")
        .then(res => res.json())
        .then(res => {
           setServices(res)
           setLoading(false)
        })
    }, [])
    return (
        <ScrollView contentContainerStyle={styles.container}>
            {
                loading ? (
                    [1,2,3,4,5,6].map((_, index) => (
                        <View key={index} style={styles.cardContainer}>
                            <ServicesCard 
                                loading={true}
                            />
                        </View>
                    ))
                ) : (
                    services.map((elem, index) => (
                        <View key={index} style={styles.cardContainer}>
                            <ServicesCard 
                                id={elem.id} 
                                title={elem.title} 
                                description={elem.description}
                                icon={icons[index+1]}
                            />
                        </View>
                    ))
                )
            }
        </ScrollView>
    );
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        marginHorizontal: 7
    },
    cardContainer: {
        width: '50%', 
    },
    loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default ServicesCards;
