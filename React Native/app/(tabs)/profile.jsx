import { router } from "expo-router";
import {
  View,
  Image,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { icons } from "../../utility/constants";
import {
  getUserPosts,
  signOut,
  updateProfilePic,
  uploadAsset,
} from "../../hooks/serverFunctions";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import VideoCard from "../../components/VideoCard";
import { useEffect, useState } from "react";
import { saveToLocalStorage } from "../../hooks/localStorage";
import { mainURL } from "../../utility/api";
import { Colors } from "../../utility/colors";
import { beautifyNumber } from "../../hooks/beautify";
import * as DocumentPicker from "expo-document-picker";

const Profile = () => {
  const { user, setUser } = useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [updatingImage, setUpdatingImage] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const temp = await getUserPosts(user.token, user._id);
    setPosts(temp);
    setRefreshing(false);
  };

  const logout = async () => {
    await signOut(user.token);
    await saveToLocalStorage("userToken", null);
    setUser(null);
    if (router.canDismiss()) {
      router.dismissAll();
    }
    router.replace("/signin");
  };

  const openPicker = async () => {
    const result = await DocumentPicker.getDocumentAsync({
      type: ["image/png", "image/jpg", "image/jpeg"],
    });

    if (!result.canceled) {
      handleProfileUpdate(result.assets[0]);
    }
  };

  const handleProfileUpdate = async (image) => {
    setUpdatingImage(true);
    const URL = await uploadAsset(image, user.token);
    await updateProfilePic(user.token, URL);
    setUser({ ...user, profilePic: URL });
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setUpdatingImage(false);
  };

  useEffect(() => {
    onRefresh();
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: Colors.background }}
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <VideoCard
          title={item.title}
          thumbnail={mainURL + item.thumbnail}
          video={mainURL + item.videoURL}
          creator={item.user.name}
          avatar={mainURL + item.user.profilePic}
          item={item}
          setPosts={setPosts}
        />
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this profile"
        />
      )}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <>
            <TouchableOpacity onPress={logout} style={styles.logoutButton}>
              <Image
                source={icons.logout}
                resizeMode="contain"
                style={styles.logoutButtonIcon}
              />
            </TouchableOpacity>

            <TouchableOpacity
              onPress={openPicker}
              style={styles.profileImageContainer}
            >
              {updatingImage ? (
                <ActivityIndicator color={Colors.primary} size="small" />
              ) : (
                <Image
                  source={{ uri: mainURL + user.profilePic }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              )}
            </TouchableOpacity>

            <InfoBox
              title={user?.name}
              containerStyles={styles.infoBoxContainer}
              titleStyles={styles.infoBoxTitle}
            />

            <View style={styles.infoBoxContainerRow}>
              <InfoBox
                title={beautifyNumber(
                  posts.reduce((a, b) => a + b.view, 0) || 0
                )}
                subtitle="Views"
                titleStyles={styles.infoBoxTitleXL}
                containerStyles={styles.infoBoxContainerRowItem}
              />
              <InfoBox
                title={beautifyNumber(
                  posts.reduce((a, b) => a + b.like, 0) || 0
                )}
                subtitle="Likes"
                titleStyles={styles.infoBoxTitleXL}
              />
            </View>
          </>
        </View>
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
    marginBottom: 40,
    paddingHorizontal: 24,
  },
  logoutButton: {
    flex: 1,
    width: "100%",
    alignItems: "flex-end",
    marginBottom: 20,
    position: "absolute",
    top: 0,
  },
  logoutButtonIcon: {
    width: 25,
    height: 25,
  },
  profileImageContainer: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: Colors.primary,
    backgroundColor: Colors.backgroundLight,
    borderRadius: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  profileImage: {
    width: "90%",
    height: "90%",
    borderRadius: 36,
  },
  infoBoxContainer: {
    marginTop: 20,
  },
  infoBoxTitle: {
    fontSize: 24,
  },
  infoBoxContainerRow: {
    marginTop: 20,
    flexDirection: "row",
  },
  infoBoxContainerRowItem: {
    marginRight: 40,
  },
  infoBoxTitleXL: {
    fontSize: 28,
  },
});
