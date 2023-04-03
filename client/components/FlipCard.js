import FlipCard from 'react-native-flip-card'
import { View } from 'react-native/types'
import { Image } from 'react-native-elements'

const FlipCard= () =>{
  return(
    <FlipCard 
    friction={6}
    perspective={1000}
    flipHorizontal={true}
    flipVertical={false}
    flip={false}
    clickable={true}
    onFlipEnd={(isFlipEnd)=>{console.log('isFlipEnd', isFlipEnd)}}
  >   
    <View >
      <Text>The Face</Text>
    </View>
    <View >
      <Image source={require('../assets/icon.png')}/>
    </View>
  </FlipCard>
  )
  
}
export default FlipCard
