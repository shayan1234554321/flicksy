import { useState } from "react";
import { router } from "expo-router";
import { ResizeMode, Video } from "expo-av";
import * as DocumentPicker from "expo-document-picker";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  RefreshControl,
} from "react-native";
import { icons } from "../../utility/constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { FormField } from "../../elements/input";
import CustomButton from "../../elements/button";
import { createVideoPost } from "../../hooks/serverFunctions";
import Toast from "react-native-toast-message";
import { Colors } from "../../utility/colors";

const Create = () => {
  const { user } = useGlobalContext();
  const [uploading, setUploading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const [form, setForm] = useState({
    title: "",
    video: null,
    thumbnail: null,
    prompt: "",
  });

  const openPicker = async (selectType) => {
    const result = await DocumentPicker.getDocumentAsync({
      type:
        selectType === "image"
          ? ["image/png", "image/jpg", "image/jpeg"]
          : ["video/mp4", "video/gif"],
    });

    if (!result.canceled) {
      if (selectType === "image") {
        setForm({
          ...form,
          thumbnail: result.assets[0],
        });
      }

      if (selectType === "video") {
        setForm({
          ...form,
          video: result.assets[0],
        });
      }
    } else {
      Toast.show({
        type: "error",
        text1: "Document picked",
        text2: JSON.stringify(result, null, 2),
      });
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    setForm({
      title: "",
      video: null,
      thumbnail: null,
      prompt: "",
    });
    setRefreshing(false);
  };

  const submit = async () => {
    if (
      !form.title ||
      form.title?.length < 1 ||
      !form.thumbnail ||
      !form.video
    ) {
      return Toast.show({
        type: "error",
        text1: "Please provide all fields",
      });
    }

    setUploading(true);
    try {
      await createVideoPost(form, user);

      Toast.show({
        type: "success",
        text1: "Video uploaded",
      });
      router.push("/home");
    } catch (error) {
      Toast.show({
        type: "error",
        text1: "Something went wrong",
      });
    } finally {
      setForm({
        title: "",
        video: null,
        thumbnail: null,
        prompt: "",
      });

      setUploading(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={{ width: "100%" }}
      style={styles.scroll}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <Text style={styles.text}>Upload Video</Text>

      <FormField
        title="Video Title"
        value={form.title}
        placeholder="Give your video a catchy title..."
        handleChangeText={(e) => setForm({ ...form, title: e })}
        otherStyles={{ marginTop: 20 }}
        minLength={1}
        maxLength={100}
      />

      <View style={{ marginTop: 15 }}>
        <Text style={styles.text2}>Upload Video</Text>

        <TouchableOpacity onPress={() => openPicker("video")}>
          {form.video ? (
            <Video
              source={{ uri: form.video.uri }}
              style={styles.video}
              useNativeControls
              resizeMode={ResizeMode.COVER}
              isLooping
            />
          ) : (
            <View style={styles.container2}>
              <View style={styles.container3}>
                <Image
                  source={icons.upload}
                  resizeMode="contain"
                  alt="upload"
                  style={{ width: "50%", height: "50%" }}
                />
              </View>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <View style={{ marginTop: 15 }}>
        <Text style={styles.text2}>Thumbnail Image</Text>

        <TouchableOpacity onPress={() => openPicker("image")}>
          {form.thumbnail ? (
            <Image
              source={{ uri: form.thumbnail.uri }}
              resizeMode="cover"
              style={styles.video}
            />
          ) : (
            <View style={styles.container4}>
              <Image
                source={icons.upload}
                resizeMode="contain"
                alt="upload"
                style={{ width: 15, height: 15 }}
              />
              <Text style={styles.text3}>Choose a file</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      <FormField
        title="AI Prompt"
        value={form.prompt}
        placeholder="The AI prompt of your video...."
        handleChangeText={(e) => setForm({ ...form, prompt: e })}
        otherStyles={{ marginTop: 15 }}
      />

      <CustomButton
        title="Submit & Publish"
        onPress={submit}
        containerStyles={{ marginTop: 15, marginBottom: 30 }}
        isLoading={uploading}
      />
    </ScrollView>
  );
};

export default Create;

const styles = StyleSheet.create({
  scroll: {
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: Colors.background,
    height: "100%",
    flex: 1,
  },
  text: {
    fontSize: 24,
    color: Colors.text,
    fontFamily: "PoppinsBold",
  },
  text2: {
    fontSize: 16,
    color: Colors.text,
    fontFamily: "PoppinsBold",
    marginBottom: 5,
  },
  video: {
    width: "100%",
    height: 250,
    borderRadius: 10,
  },
  container2: {
    width: "100%",
    height: 250,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textLight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container3: {
    width: 25,
    height: 25,
    borderWidth: 2,
    borderColor: Colors.textLight,
    borderStyle: "dashed",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  container4: {
    width: "100%",
    height: 80,
    paddingLeft: 10,
    paddingRight: 10,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: Colors.textLight,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    gap: 5,
  },
  text3: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Poppins",
  },
});
