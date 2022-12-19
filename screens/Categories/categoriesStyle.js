import { StyleSheet, Dimensions } from "react-native";
import { customPixel } from "../Utilities/CustomStyleAttribute/CustomPixel";
const { height } = Dimensions.get("window");

const allCategoriesStyle = StyleSheet.create({
    superCont: {
        marginBottom:
            height < 534
                ? customPixel.h210 - 1
                : // : height < 684
                  // ? customPixel.h200
                  customPixel.h190 - 2,
    },
    container: {
        backgroundColor: "#fff",
    },
    searchContainer: {
        borderBottomWidth: 1,
        width: height < 534 ? customPixel.h300 + 50 : customPixel.h300,
        paddingTop: 0,
        borderColor: "#898989",
        position: "absolute",
        right: customPixel.h20,
        top: height < 534 ? customPixel.h5 : customPixel.h20,
    },
    item: {
        flex: 1,
        marginTop: customPixel.h20,
        flexDirection: "row",
        backgroundColor: "white",
        alignItems: "center",
        borderRadius: 7,
    },
    imageContainer: {
        height: customPixel.h90,
        width: customPixel.h90,
        borderWidth: 1,
        borderColor: "#DFDFDF",
        borderRadius: 6,
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
    },
    image: {
        height: customPixel.h50,
        width: customPixel.h50,
    },
    categoryView: {
        marginLeft: customPixel.w17,
    },
    categoryName: {
        fontSize: customPixel.h17,
        fontFamily: "DMSans_500Medium",
        color: "#2C2C2C",
    },
    subCategories: {
        fontSize: customPixel.h15,
        color: "#898989",
        fontFamily: "Roboto_500Medium",
        marginRight: customPixel.w10,
    },
    subCategoryContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginTop: customPixel.h16,
    },
    singleSubText: {
        marginLeft: customPixel.h15,
        fontFamily: "DMSans_500Medium",
        fontSize: customPixel.h15,
        color: "#2C2C2C",
    },
    singleSubLine: {
        borderBottomWidth: 1,
        marginVertical: customPixel.h12,
        borderColor: "#DFDFDF",
    },
    dropdownIcon: {
        height: customPixel.h30,
        width: customPixel.h30,
        flexDirection: "row",
        alignItems: "center",
    },
});

export { allCategoriesStyle };
