import { Redirect, Stack } from "expo-router";
import { useGlobalContext } from "../../context/GlobalProvider";

const AuthLayout = () => {
  const { user, loading } = useGlobalContext();

  if (user && !loading) return <Redirect href="/home" />;

  return (
    <>
      <Stack screenOptions={{ headerShown: false }} >
        <Stack.Screen name="signin" />
        <Stack.Screen name="signup" />
      </Stack>
    </>
  );
};

export default AuthLayout;
