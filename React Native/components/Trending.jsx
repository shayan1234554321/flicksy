import { useState } from "react";
import { ResizeMode, Video } from "expo-av";
import * as Animatable from "react-native-animatable";
import {
  FlatList,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { Colors } from "../utility/colors";
import { icons } from "../utility/constants";
import { mainURL } from "../utility/api";

const zoomIn = {
  0: {
    scale: 0.9,
  },
  1: {
    scale: 1,
  },
};

const zoomOut = {
  0: {
    scale: 1,
  },
  1: {
    scale: 0.9,
  },
};

const TrendingItem = ({ activeItem, index, item }) => {
  const [play, setPlay] = useState(false);

  return (
    <Animatable.View
      style={{ marginRight: 5 }}
      animation={index === activeItem ? zoomIn : zoomOut}
      duration={500}
    >
      {play ? (
        <Video
          source={{ uri: mainURL + item.videoURL }}
          style={itemStyles.video}
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
          style={itemStyles.button}
          activeOpacity={0.7}
          onPress={() => setPlay(true)}
        >
          <ImageBackground
            source={{
              uri: mainURL + item.thumbnail,
            }}
            style={itemStyles.imageBackground}
            resizeMode="cover"
          />

          <Image
            source={icons.play}
            style={itemStyles.image}
            resizeMode="contain"
          />
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const itemStyles = StyleSheet.create({
  video: {
    width: 200,
    height: 350,
    borderRadius: 20,
    marginTop: 10,
    backgroundColor: Colors.black,
  },
  button: {
    position: "relative",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  imageBackground: {
    width: 200,
    height: 350,
    borderRadius: 20,
    marginTop: 15,
    marginBottom: 15,
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
  },
  image: {
    width: 36,
    height: 36,
    position: "absolute",
  },
});

const Trending = ({ posts }) => {
  const [activeItem, setActiveItem] = useState(0);

  const viewableItemsChanged = ({ viewableItems }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].index);
    }
  };

  return (
    <FlatList
      data={posts}
      horizontal
      keyExtractor={(item) => item._id}
      renderItem={({ item, index }) => (
        <TrendingItem activeItem={activeItem} index={index} item={item} />
      )}
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 90,
      }}
      contentOffset={{ x: 0 }}
      showsHorizontalScrollIndicator={false}
    />
  );
};

export default Trending;
