import { WebView } from "react-native-webview";

const PaymentView = (props) => {
    const data = props?.route?.params;

    /**
     * Does action based on onMessage event data
     *
     * @param {Object} data Response data from the onMessage event
     * @return {void}
     */
    const getResponseFromView = (data) => {
        let paymentData = data.nativeEvent.data;
        paymentData = parseJson(paymentData);

        if (paymentData.status == "failed") {
            props.navigation.navigate("order history");
        } else if (paymentData.status == "completed") {
            props.navigation.navigate("order done");
        }
    };

    /**
     * Parse the given string to JSON
     *
     * @param {string} parsableString Parsable string
     * @returns {(string|Object)} Returns Object if parsable or the string itself
     */
    const parseJson = (parsableString) => {
        try {
            parsableString = JSON.parse(parsableString);
        } catch (e) {}
        return parsableString;
    };

    return (
        <>
            <WebView
                onMessage={getResponseFromView}
                source={{ uri: data.url }}
                incognito={true}
            />
        </>
    );
};

export default PaymentView;
