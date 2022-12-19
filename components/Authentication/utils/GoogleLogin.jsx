import * as Google from "expo-auth-session/providers/google";
import * as WebBrowser from "expo-web-browser";
import config from "../../../config";

WebBrowser.maybeCompleteAuthSession();

const GoogleLogin = () => {
    return ([request, response, promptAsync] = Google.useAuthRequest({
        expoClientId: config.GOOGLE_EXPO_CLIENT_ID,
        iosClientId: config.GOOGLE_IOS_CLIENT_ID,
        androidClientId: config.GOOGLE_ANDROID_CLIENT_ID,
    }));
};

export default GoogleLogin;
