import { router, useLocalSearchParams } from "expo-router";
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
  getUserById,
  getUserPosts,
  signOut,
} from "../../hooks/serverFunctions";
import { useGlobalContext } from "../../context/GlobalProvider";
import EmptyState from "../../components/EmptyState";
import InfoBox from "../../components/InfoBox";
import VideoCard from "../../components/VideoCard";
import { useEffect, useState } from "react";
import { mainURL } from "../../utility/api";
import { Colors } from "../../utility/colors";
import { beautifyNumber } from "../../hooks/beautify";

const Profile = () => {
  const { user } = useGlobalContext();
  const [profile, setProfile] = useState(null);
  const { userId } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const getProfile = async () => {
    setRefreshing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    if (userId) {
      const profile = await getUserById(user.token, userId);
      setProfile(profile);
    } else {
      setProfile(user);
    }
    onRefresh(userId);
  };

  const onRefresh = async (userId) => {
    setRefreshing(true);
    const temp = await getUserPosts(user.token, userId || profile._id);
    setPosts(temp);
    setRefreshing(false);
  };

  useEffect(() => {
    getProfile();
  }, []);

  useEffect(() => {
    if (profile) {
      getProfile();
    }
  }, [userId]);

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
          {profile === null || !profile || profile === undefined ? null : (
            <>
              <View style={styles.profileImageContainer}>
                <Image
                  source={{ uri: mainURL + profile.profilePic }}
                  style={styles.profileImage}
                  resizeMode="cover"
                />
              </View>

              <InfoBox
                title={profile?.name}
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
          )}
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
    borderRadius: 36,
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
