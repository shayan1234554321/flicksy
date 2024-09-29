import { useEffect, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { View, Text, FlatList, StyleSheet } from "react-native";
import EmptyState from "../../components/EmptyState";
import SearchInput from "../../components/SearchInput";
import VideoCard from "../../components/VideoCard";
import { Colors } from "../../utility/colors";
import { searchPosts } from "../../hooks/serverFunctions";
import { useGlobalContext } from "../../context/GlobalProvider";
import { mainURL } from "../../utility/api";

const Search = () => {
  const { user } = useGlobalContext();
  const { query } = useLocalSearchParams();
  const [posts, setPosts] = useState([]);

  const fetchPosts = async () => {
    const data = await searchPosts(user.token, query);
    setPosts(data);
  };

  useEffect(() => {
    fetchPosts();
  }, [query]);

  useEffect(() => {
    searchPosts(query);
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
          <Text style={styles.searchResultsText}>Search Results</Text>
          <Text style={styles.queryText}>{query}</Text>

          <View style={styles.searchInputContainer}>
            <SearchInput initialQuery={query} refetch={fetchPosts} />
          </View>
        </View>
      )}
      ListEmptyComponent={() => (
        <EmptyState
          title="No Videos Found"
          subtitle="No videos found for this search query"
        />
      )}
    />
  );
};

export default Search;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 36,
    paddingHorizontal: 24,
  },
  searchResultsText: {
    fontSize: 14,
    color: Colors.textLight,
    fontFamily: "Poppins",
  },
  queryText: {
    fontSize: 28,
    color: Colors.text,
    fontFamily: "PoppinsBold",
    marginTop: 8,
  },
  searchInputContainer: {
    marginTop: 36,
    marginBottom: 48,
  },
});
