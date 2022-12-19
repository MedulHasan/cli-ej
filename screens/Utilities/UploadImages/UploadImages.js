import * as ImagePicker from "expo-image-picker";
export const uploadImages = async (images) => {
    let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
        allowsMultipleSelection: true,
    });
    if (!result.cancelled) {
        let filename = result.uri.split("/").pop();
        let imageType = filename.split(".")[1];
        const fileInfo = {
            uri:
                Platform.OS === "android"
                    ? result.uri
                    : result.uri.replace("file://", ""),
            type: `${result.type}/${imageType}`,
            name: filename,
        };
        return fileInfo;
    } else {
        return {};
    }
};
