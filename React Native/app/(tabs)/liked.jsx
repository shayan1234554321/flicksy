import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet, RefreshControl } from "react-native";
import EmptyState from "../../components/EmptyState";
import VideoCard from "../../components/VideoCard";
import { Colors } from "../../utility/colors";
import { userLikedPosts } from "../../hooks/serverFunctions";
import { useGlobalContext } from "../../context/GlobalProvider";
import { mainURL } from "../../utility/api";

const Liked = () => {
  const { user } = useGlobalContext();
  const [posts, setPosts] = useState([]);
  const [refreshing, setRefreshing] = useState(false);

  const fetchPosts = async () => {
    setRefreshing(true);
    const data = await userLikedPosts(user.token);
    setPosts(data);
    setRefreshing(false);
  };

  useEffect(() => {
    fetchPosts();
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
          video={mainURL + item.video}
          creator={item.user.name}
          avatar={mainURL + item.user.profilePic}
          item={item}
          setPosts={setPosts}
        />
      )}
      ListHeaderComponent={() => (
        <View style={styles.container}>
          {posts.length > 0 && (
            <Text style={styles.searchResultsText}>Your Liked Videos</Text>
          )}
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="Please Like Some Videos"
        />
      )}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={fetchPosts} />
      }
    />
  );
};

export default Liked;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 20,
    paddingHorizontal: 24,
  },
  searchResultsText: {
    fontSize: 16,
    color: Colors.textLight,
    fontFamily: "PoppinsBold",
  },
});
