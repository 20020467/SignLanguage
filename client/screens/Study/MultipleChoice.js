import IonIcon from '@expo/vector-icons/Ionicons';
import { useState } from "react";
import { Animated, Image, Modal, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-navigation";
import { COLOR } from '../styles';
import data from "../../constants/data";

const Exercise = ({ navigation }) => {
  const allQuestions = data;
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [currentOptionSelected, setCurrentOptionSelected] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [isOptionsDisabled, setIsOptionsDisabled] = useState(false);
  const [score, setScore] = useState(0)
  const [showNextButton, setShowNextButton] = useState(false)
  const [showScoreModal, setShowScoreModal] = useState(false)

  const validateAnswer = (selectedOption) => {
    let correct_option = allQuestions[currentQuestionIndex]['correct_option'];
    setCurrentOptionSelected(selectedOption);
    setCorrectOption(correct_option);
    setIsOptionsDisabled(true);
    if (selectedOption == correct_option) {
      // Set Score
      setScore(score + 1)
    }
    // Show Next Button
    setShowNextButton(true)
  }

  const handleNext = () => {
    if (currentQuestionIndex == allQuestions.length - 1) {
      // Last Question
      // Show Score Modal
      setShowScoreModal(true)
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setCurrentOptionSelected(null);
      setCorrectOption(null);
      setIsOptionsDisabled(false);
      setShowNextButton(false);
    }
    Animated.timing(progress, {
      toValue: currentQuestionIndex + 1,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }
  const restartQuiz = () => {
    setShowScoreModal(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setCurrentOptionSelected(null);
    setCorrectOption(null);
    setIsOptionsDisabled(false);
    setShowNextButton(false);
    Animated.timing(progress, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: false
    }).start();
  }


  const renderQuestion = () => {
    return (
      <View
        style={{
          marginTop: '3%',
          marginBottom: '7%'
        }}>
        {/* Question Counter */}
        <View style={{
          flexDirection: 'row',
          alignItems: 'flex-end'
        }}>
          <Text style={{ color: COLOR.Black, fontSize: 20, marginRight: 5, fontWeight: '700' }}>{currentQuestionIndex + 1}</Text>
          <Text style={{ color: COLOR.Black, fontSize: 18 }}>/ {allQuestions.length}</Text>
        </View>

        {/* Question */}
        <Text
          style={{
            color: COLOR.Black,
            fontSize: 20
          }}
        >
          {allQuestions[currentQuestionIndex]?.question}
        </Text>
        <View style={{alignItems: 'center'}}>
          <Image source={allQuestions[currentQuestionIndex]?.image} />
        </View>
      </View>
    )
  }

  const renderOptions = () => {
    return (
      <View style={{height: '50%', justifyContent: 'space-between'}} >
        {
          allQuestions[currentQuestionIndex]?.options.map(option => (
            <TouchableOpacity
              onPress={() => validateAnswer(option)}
              disabled={isOptionsDisabled}
              key={option}
              style={{
                borderWidth: 3,
                borderColor: option == correctOption
                  ? COLOR.Success
                  : option == currentOptionSelected
                    ? COLOR.Error
                    : COLOR.Secondary_2 + '40',
                backgroundColor: option == correctOption
                  ? COLOR.Success + '20'
                  : option == currentOptionSelected
                    ? COLOR.Error + '20'
                    : COLOR.Secondary_2 + '20',
                height: 60, borderRadius: 20,
                flexDirection: 'row',
                alignItems: 'center', justifyContent: 'space-between',
                paddingHorizontal: 20,
                // marginVertical: 7
              }}
            >

              <Text>{option}</Text>

              {/* Show Check Or Cross Icon based on correct answer*/}
              {
                option == correctOption ? (
                  <View style={{
                    width: 30, height: 30, borderRadius: 30 / 2,
                    backgroundColor: COLOR.Success,
                    justifyContent: 'center', alignItems: 'center'
                  }}>
                    <IonIcon name="checkmark" style={{
                      color: COLOR.White,
                      fontSize: 20
                    }} />
                  </View>
                ) : option == currentOptionSelected ? (
                  <View style={{
                    width: 30, height: 30, borderRadius: 30 / 2,
                    backgroundColor: COLOR.Error,
                    justifyContent: 'center', alignItems: 'center'
                  }}>
                    <IonIcon name="ios-alert" style={{
                      color: COLOR.White,
                      fontSize: 20
                    }} />
                  </View>
                ) : null
              }

            </TouchableOpacity>
          ))
        }
      </View>
    )
  }
  const renderNextButton = () => {
    if (showNextButton) {
      return (
        <TouchableOpacity
          onPress={handleNext}
          style={{
            marginTop: 20, width: '100%', backgroundColor: COLOR.accent, padding: 20, borderRadius: 5
          }}>
          <Text style={{ fontSize: 20, color: COLOR.White, textAlign: 'center' }}>Next</Text>
        </TouchableOpacity>
      )
    } else {
      return null
    }
  }


  const [progress, setProgress] = useState(new Animated.Value(0));
  const progressAnim = progress.interpolate({
    inputRange: [0, allQuestions.length],
    outputRange: ['0%', '100%']
  })
  // const renderProgressBar = () => {
  //     return (
  //         <View style={{
  //             width: '100%',
  //             height: 20,
  //             borderRadius: 20,
  //             backgroundColor: '#00000020',

  //         }}>
  //             <Animated.View style={[{
  //                 height: 20,
  //                 borderRadius: 20,
  //                 backgroundColor: COLORS.accent
  //             },{
  //                 width: progressAnim
  //             }]}>
  //             </Animated.View>

  //         </View>
  //     )
  // }

  return (
    <SafeAreaView style={{
      // flex: 1,
      height: '100%'
    }}>
      <ScrollView style={{flex: 1, height: '100%'}}>
        {/* <View style={{
          paddingTop: 20,
          marginBottom: 5,
          height: 65,
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "row",
          // backgroundColor: "#9FD0E6",
        }}>
          <View>
            <TouchableOpacity
              onPress={() => {
                navigation.goBack();
              }}>
              <Text style={{
                position: "absolute",
                top: 0,
                left: -150,
              }}>
                Back
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <Text style={{ fontWeight: 'bold', fontSize: 20 }}>
              Question
            </Text>
          </View>
        </View> */}

        <View style={{
          flex: 1,
          height: '100%',
          paddingVertical: '3%',
          paddingHorizontal: '5%',
          backgroundColor: COLOR.Background,
          justifyContent: 'center',
        }}>

          {/* ProgressBar */}
          {/* { renderProgressBar() } */}

          {/* Question */}
          {renderQuestion()}

          {/* Options */}
          {renderOptions()}

          {/* Next Button */}
          {renderNextButton()}

          {/* Score Modal */}
          <Modal
            animationType="slide"
            transparent={true}
            visible={showScoreModal}
          >
            <View style={{
              flex: 1,
              backgroundColor: COLOR.Primary_1,
              alignItems: 'center',
              justifyContent: 'center'
            }}>
              <View style={{
                backgroundColor: COLOR.White,
                width: '90%',
                borderRadius: 20,
                padding: 20,
                alignItems: 'center'
              }}>
                <Text style={{ fontSize: 30, fontWeight: 'bold' }}>{score > (allQuestions.length / 2) ? 'Congratulations!' : 'Oops!'}</Text>

                <View style={{
                  flexDirection: 'row',
                  justifyContent: 'flex-start',
                  alignItems: 'center',
                  marginVertical: 20
                }}>
                  <Text style={{
                    fontSize: 30,
                    color: score > (allQuestions.length / 2) ? COLOR.Success : COLOR.Error
                  }}>{score}</Text>
                  <Text style={{
                    fontSize: 20, color: COLOR.Black
                  }}>/ {allQuestions.length}</Text>
                </View>
                {/* Retry Quiz button */}
                <View style={{ flexDirection: 'row' }}>
                  <TouchableOpacity
                    onPress={restartQuiz}
                    style={{
                      backgroundColor: COLOR.accent,
                      padding: 20, width: '50%', borderRadius: 20
                    }}>
                    <Text style={{
                      textAlign: 'center', color: COLOR.White, fontSize: 20
                    }}>Retry Quiz</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{
                      backgroundColor: COLOR.Error,
                      padding: 20, width: '50%', borderRadius: 20
                    }}>
                    <Text style={{
                      textAlign: 'center', color: COLOR.White, fontSize: 20
                    }}>Exit</Text>
                  </TouchableOpacity>

                </View>

              </View>
            </View>
          </Modal>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}


export default Exercise