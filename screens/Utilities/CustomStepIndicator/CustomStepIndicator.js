import { useState } from "react";
import { View, Text, Dimensions, StyleSheet } from "react-native";
import StepIndicator from "react-native-step-indicator";
import { customPixel } from "../CustomStyleAttribute/CustomPixel";
import Finished from "../../../assets/svgs/order details/finished.svg";
import Unfinished from "../../../assets/svgs/order details/unfinished.svg";
import Current from "../../../assets/svgs/order details/current.svg";

const { width, height } = Dimensions.get("window");

const customStyles = {
    stepIndicatorSize: 30,
    currentStepIndicatorSize: 30,
    separatorStrokeWidth: 2,
    currentStepStrokeWidth: 2,
    stepStrokeCurrentColor: "#45BD3A",
    stepStrokeWidth: 2,
    stepStrokeFinishedColor: "#45BD3A",
    stepStrokeUnFinishedColor: "#DFDFDF",
    separatorFinishedColor: "#45BD3A",
    separatorUnFinishedColor: "#898989",
    stepIndicatorFinishedColor: "#45BD3A",
    stepIndicatorUnFinishedColor: "#FFFFFF",
    stepIndicatorCurrentColor: "#FFFFFF",
    stepIndicatorLabelFontSize: customPixel.h10,
    currentStepIndicatorLabelFontSize: customPixel.h13,
    stepIndicatorLabelCurrentColor: "#2C2C2C",
    stepIndicatorLabelFinishedColor: "#2C2C2C",
    stepIndicatorLabelUnFinishedColor: "#2C2C2C",
    labelColor: "#2C2C2C",
    labelSize: customPixel.h13,
    currentStepLabelColor: "#2C2C2C",
};

const CustomStepIndicator = ({ direction, height, data, currentPosition }) => {
    return (
        <View style={[styles.container, { height: height }]}>
            <StepIndicator
                direction={direction}
                customStyles={customStyles}
                currentPosition={parseInt(currentPosition)}
                labels={data}
                stepCount={data?.length}
                renderStepIndicator={(params) => {
                    if (params.stepStatus === "finished") {
                        return <Finished />;
                    } else if (params.stepStatus === "current") {
                        return <Current />;
                    } else {
                        return <Unfinished />;
                    }
                }}
                renderLabel={
                    direction === "vertical"
                        ? ({ position, stepStatus }) => {
                              return (
                                  <View
                                      style={[
                                          styles.informationCont,
                                          {
                                              height: height / 5,
                                              marginTop: height / 6.4,
                                          },
                                      ]}
                                  >
                                      <View style={styles.labelCont}>
                                          <Text
                                              style={[
                                                  styles.label,
                                                  {
                                                      color:
                                                          stepStatus ===
                                                          "unfinished"
                                                              ? "#BCBCBC"
                                                              : "#2C2C2C",
                                                  },
                                              ]}
                                          >
                                              {data[position].label}
                                          </Text>
                                      </View>

                                      <Text>
                                          {data[position]?.date && (
                                              <View style={styles.labelCont}>
                                                  <Text
                                                      style={[
                                                          styles.text,
                                                          {
                                                              width:
                                                                  (customPixel.wF -
                                                                      customPixel.h20 *
                                                                          2 -
                                                                      customPixel.h45) *
                                                                  0.6,
                                                              color:
                                                                  stepStatus ===
                                                                  "unfinished"
                                                                      ? "#BCBCBC"
                                                                      : "#898989",
                                                          },
                                                      ]}
                                                  >
                                                      <Text
                                                          style={[
                                                              styles.label,
                                                              {
                                                                  color:
                                                                      stepStatus ===
                                                                      "unfinished"
                                                                          ? "#BCBCBC"
                                                                          : "#898989",
                                                              },
                                                          ]}
                                                      >
                                                          {data[position]
                                                              .date &&
                                                              `${data[position].date} at `}
                                                      </Text>

                                                      {data[position].time}
                                                  </Text>
                                              </View>
                                          )}
                                      </Text>
                                  </View>
                              );
                          }
                        : ""
                }
            />
        </View>
    );
};

export default CustomStepIndicator;

const styles = StyleSheet.create({
    container: {},
    informationCont: {
        marginLeft: customPixel.h12,
        width: customPixel.wF - customPixel.h20 * 2 - customPixel.h45,
    },
    labelCont: {
        flexDirection: "row",
        justifyContent: "space-between",
    },
    label: {
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h14,
        marginBottom: customPixel.h10,
    },
    text: {
        fontFamily: "Roboto_500Medium",
        fontSize: customPixel.h12,
        color: "#929292",
        lineHeight: customPixel.h17,
    },
});
