import { Dimensions, StyleSheet } from 'react-native';
import { customPixel } from '../../../Utilities/CustomStyleAttribute/CustomPixel';
const { width, height } = Dimensions.get('window');

export const addNewAddressStyle = StyleSheet.create({
	container: {
		paddingHorizontal: customPixel.h20,
		backgroundColor: '#fff',
		minHeight: height,
		paddingBottom: customPixel.h26,
	},
	default: {
		marginTop: customPixel.h18,
		borderWidth: 1,
		borderColor: '#DFDFDF',
		borderRadius: 4,
		paddingVertical: customPixel.h16,
		paddingHorizontal: customPixel.w12,
		flexDirection: 'row',
		alignItems: 'center',
	},
	defaultIcon: {
		height: customPixel.h16,
		width: customPixel.h16,
	},
	defaultText: {
		fontFamily: 'Roboto_500Medium',
		fontSize: customPixel.h14,
		color: '#898989',
		marginLeft: customPixel.h10,
	},
	deleteAddress: {
		marginTop: customPixel.h18,
		width: customPixel.w174,
		height: customPixel.h42,
		backgroundColor: '#2C2C2C',
	},
	deleteAddressBtnCont: {
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
	},
	deleteAddressBtnText: {
		fontFamily: 'Roboto_500Medium',
		fontSize: customPixel.h14,
		lineHeight: customPixel.h14,
		color: '#FFFFFF',
		marginLeft: customPixel.h6,
		marginTop: customPixel.h4,
	},
	dropdown1BtnStyle: {
		width: (width - width * 0.051 - 30) / 2,
		// height: customPixel.h45,
		backgroundColor: '#FFF',
		borderRadius: customPixel.h2,
		borderWidth: 1,
		borderColor: '#DFDFDF',
	},
	dropdown1BtnStyle: {
		width: (width - width * 0.051 - 30) / 2,
		// height: customPixel.h45,
		backgroundColor: '#FFF',
		borderRadius: customPixel.h2,
		borderWidth: 1,
		borderColor: '#DFDFDF',
	},
	dropdown1BtnTextStyle: {
		fontFamily: 'DMSans_500Medium',
		fontSize: customPixel.h15,
		color: '#898989',
	},
	saveAddressCont: {
		width: (width - customPixel.h50) / 2,
		height: customPixel.h45,
		backgroundColor: '#FCCA19',
		justifyContent: 'center',
		alignItems: 'center',
		borderRadius: customPixel.h6,
	},
	saveAddressBtn: {
		fontFamily: 'DMSans_700Bold',
		fontSize: customPixel.h16,
		lineHeight: customPixel.h21,
		color: '#2C2C2C',
	},
});
