import { useEffect, useState } from "react";
import {
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  Text,
  View,
} from "react-native";

import { images } from "../../utility/constants";
import { getAllPosts, getLatestPosts } from "../../hooks/serverFunctions";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import Trending from "../../components/Trending";
import VideoCard from "../../components/VideoCard";
import { Colors } from "../../utility/colors";
import { useGlobalContext } from "../../context/GlobalProvider";
import { mainURL } from "../../utility/api";

const Home = () => {
  const { user } = useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [latestPosts, setLatestPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = async () => {
    setRefreshing(true);
    const temp = await getAllPosts(user.token);
    setPosts(temp);
    setRefreshing(false);
  };

  useEffect(() => {
    async function call() {
      setPosts(await getAllPosts(user.token));
      setLatestPosts(await getLatestPosts(user.token));
    }
    call();
  }, []);

  return (
    <FlatList
      style={{ backgroundColor: Colors.background }}
      data={posts}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <VideoCard
          userId={item.user._id}
          title={item.title}
          thumbnail={mainURL + item.thumbnail}
          video={mainURL + item.videoURL}
          creator={item.user.name}
          avatar={mainURL + item.user.profilePic}
          item={item}
          setPosts={setPosts}
        />
      )}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          <View style={styles.container2}>
            <View>
              <Text style={styles.text}>Welcome Back</Text>
              <Text style={styles.text2}>{user.name}</Text>
            </View>

            <View style={{ marginTop: 4.5 }}>
              <Image
                source={images.logoSmall}
                style={{ width: 27, height: 30 }}
                resizeMode="contain"
              />
            </View>
          </View>

          <SearchInput />

          <View style={styles.container3}>
            <Text style={styles.text2}>Most Liked Videos</Text>
            {latestPosts.length > 0 && <Trending posts={latestPosts} />}
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="Be the First one to create"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    />
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    display: "flex",
    marginTop: 18,
    marginBottom: 18,
    paddingLeft: 12,
    paddingRight: 12,
    gap: 18,
  },
  container2: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    marginBottom: 18,
  },
  text: {
    fontFamily: "Poppins",
    fontSize: 14,
    color: Colors.textLight,
  },
  container3: {
    width: "100%",
    flex: 1,
    paddingTop: 15,
    paddingBottom: 24,
  },
  text2: {
    fontFamily: "PoppinsBold",
    color: Colors.textLight,
    marginBottom: 9,
    fontSize: 20,
  },
});
