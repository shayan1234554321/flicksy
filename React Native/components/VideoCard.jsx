import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import { View, Text, TouchableOpacity, Image, StyleSheet } from "react-native";
import { Colors } from "../utility/colors";
import { icons } from "../utility/constants";
import { router } from "expo-router";
import { beautifyNumber } from "../hooks/beautify";
import { useGlobalContext } from "../context/GlobalProvider";
import { incrementLike, incrementView } from "../hooks/serverFunctions";

const VideoCard = ({
  title,
  creator,
  avatar,
  thumbnail,
  video,
  userId,
  item,
  setPosts,
}) => {
  const { user } = useGlobalContext();
  const [play, setPlay] = useState(false);

  const handleGoToProfile = () => {
    if (userId)
      router.push({
        pathname: "/userProfile/profile",
        params: { userId },
      });
  };

  const handleIncrementView = () => {
    setPosts((prev) => {
      return prev.map((post) => {
        if (post._id === item._id) post.view = post.view + 1;
        return post;
      });
    });
    incrementView(user.token, item._id);
  };

  const handleIncrementLike = () => {
    setPosts((prev) => {
      return prev.map((post) => {
        if (post._id === item._id) {
          if (post.liked) {
            post.like = post.like - 1;
          } else {
            post.like = post.like + 1;
          }
          post.liked = !post.liked;
        }
        return post;
      });
    });
    incrementLike(user.token, item._id);
  };

  return (
    <View style={styles.container}>
      <View style={styles.container2}>
        <TouchableOpacity onPress={handleGoToProfile} style={styles.container3}>
          <View style={styles.container4}>
            <Image
              source={{ uri: avatar }}
              style={styles.image}
              resizeMode="cover"
            />
          </View>

          <View style={styles.container5}>
            <Text style={styles.text} numberOfLines={1}>
              {title}
            </Text>
            <Text style={styles.text2} numberOfLines={1}>
              {creator}
            </Text>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          style={{ paddingTop: 6, display: "flex", flexDirection: "row" }}
          onPress={() => {
            handleIncrementLike();
          }}
        >
          {item.liked ? (
            <Image
              source={icons.liked}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          ) : (
            <Image
              source={icons.like}
              style={{ width: 25, height: 25 }}
              resizeMode="contain"
            />
          )}
        </TouchableOpacity>
      </View>

      {play ? (
        <Video
          source={{ uri: video }}
          style={{
            width: "100%",
            height: 250,
            backgroundColor: Colors.black,
            borderRadius: 10,
            marginTop: 10,
          }}
          resizeMode={ResizeMode.CONTAIN}
          useNativeControls
          shouldPlay
          onPlaybackStatusUpdate={(status) => {
            if (status.didJustFinish) {
              setPlay(false);
            }
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            handleIncrementView();
            setPlay(true);
          }}
          style={styles.button}
        >
          <Image
            source={{ uri: thumbnail }}
            style={{
              width: "100%",
              height: "100%",
              borderRadius: 15,
              marginTop: 10,
            }}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={{ width: 48, height: 48, position: "absolute" }}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
      <View
        style={{
          display: "flex",
          flexDirection: "row",
          width: "100%",
          marginTop: 10,
        }}
      >
        <Text style={{ color: Colors.text, fontFamily: "PoppinsBold" }}>
          {beautifyNumber(item.view || 0)}{" "}
        </Text>
        <Text style={{ color: Colors.text, fontFamily: "Poppins" }}>
          Views •{" "}
        </Text>
        <Text style={{ color: Colors.text, fontFamily: "PoppinsBold" }}>
          {beautifyNumber(item.like || 0)}{" "}
        </Text>
        <Text style={{ color: Colors.text, fontFamily: "Poppins" }}>Likes</Text>
      </View>
    </View>
  );
};

export default VideoCard;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingLeft: 12,
    paddingRight: 12,
    marginBottom: 42,
  },
  container2: {
    display: "flex",
    flexDirection: "row",
    gap: 9,
    alignItems: "flex-start",
  },
  container3: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: "row",
    flex: 1,
  },
  container4: {
    width: 46,
    height: 46,
    borderRadius: 23,
    borderWidth: 2,
    borderColor: Colors.backgroundLight,
    display: "flex",
    justifyContent: "center",
    alignContent: "center",
    padding: 1.5,
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 23,
  },
  container5: {
    display: "flex",
    justifyContent: "center",
    flex: 1,
    marginLeft: 9,
    gap: 3,
  },
  text: {
    fontFamily: "PoppinsBold",
    fontSize: 18,
    color: Colors.text,
  },
  text2: {
    fontFamily: "Poppins",
    fontSize: 12,
    color: Colors.textLight,
  },
  video: {
    width: "100%",
    height: "180",
    borderRadius: 33,
    marginTop: 10,
  },
  button: {
    width: "100%",
    height: 250,
    borderRadius: 10,
    marginTop: 10,
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
