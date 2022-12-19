import * as WebBrowser from "expo-web-browser";
import * as Facebook from "expo-auth-session/providers/facebook";

WebBrowser.maybeCompleteAuthSession();

const FecebookLogin = () => {
    return ([requestFB, responseFB, promptAsyncFB] = Facebook.useAuthRequest({
        clientId: "329687222684086",
    }));
};

export default FecebookLogin;
