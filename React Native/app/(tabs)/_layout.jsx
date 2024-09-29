import { Redirect, Tabs } from "expo-router";
import { ActivityIndicator, Image, StyleSheet, Text, View } from "react-native";
import { icons } from "../../utility/constants";
import { useGlobalContext } from "../../context/GlobalProvider";
import { Colors } from "../../utility/colors";

const TabIcon = ({ icon, color, name, focused }) => {
  return (
    <View style={tabStyles.container}>
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 15, height: 15 }}
      />
      <Text
        style={{
          color: color,
          fontFamily: focused ? "PoppinsBold" : "Poppins",
          fontSize: 12,
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const tabStyles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 5,
  },
});

const TabLayout = () => {
  const { user, loading } = useGlobalContext();

  if (!user && !loading) return <Redirect href="/signin" />;

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator color={Colors.primary} size="large" />
      ) : (
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: Colors.primary,
            tabBarInactiveTintColor: Colors.textLight,
            tabBarShowLabel: false,
            tabBarStyle: {
              backgroundColor: Colors.backgroundLight,
              borderTopWidth: 1,
              borderTopColor: Colors.text,
              height: 74,
            },
          }}
        >
          <Tabs.Screen
            name="home"
            options={{
              title: "Home",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.home}
                  color={color}
                  name="Home"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="liked"
            options={{
              title: "Liked",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.liked}
                  color={color}
                  name="Liked"
                  focused={focused}
                />
              ),
            }}
          />

          <Tabs.Screen
            name="create"
            options={{
              title: "Create",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.plus}
                  color={color}
                  name="Create"
                  focused={focused}
                />
              ),
            }}
          />
          <Tabs.Screen
            name="profile"
            options={{
              title: "Profile",
              headerShown: false,
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  icon={icons.profileIcon}
                  color={color}
                  name="Profile"
                  focused={focused}
                />
              ),
            }}
          />
        </Tabs>
      )}
    </View>
  );
};

export default TabLayout;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
});
