import { CreateUserParams, SignInParams } from "@/type";
import {
  Account,
  Avatars,
  Client,
  Databases,
  ID,
  Query,
} from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  platform: "com.naveenalla.fastfood",
  databaseId: "68832e6f0012b43a6807",
  userCollectionId: "68832e9900098f3c8550",
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
};

export const client = new Client();
client
  .setEndpoint(appwriteConfig.endpoint)
  .setProject(appwriteConfig.projectId)
  .setPlatform(appwriteConfig.platform);

export const account = new Account(client);

export const databases = new Databases(client);

export const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
}: CreateUserParams) => {
  try {
    const newAccount = await account.create(ID.unique(), email, password, name);
    if (!newAccount) {
      throw new Error("User creation failed");
    }
    await SignIn({ email, password });
    const avatarUrl = avatars.getInitialsURL(name);
    const newUser = await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      {
        accountId: newAccount.$id,
        email,
        name,
        avatar: avatarUrl,
      }
    );
    if (!newUser) {
      throw new Error("User document creation failed");
    }
    return newUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw new Error(error as string);
  }
};

export const SignIn = async ({ email, password }: SignInParams) => {
  try {
    const session = await account.createEmailPasswordSession(email, password);
    if (!session) {
      throw new Error("Sign in failed");
    }
    const user = await account.get();
    if (!user) {
      throw new Error("User not found after sign in");
    }
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw new Error(error as string);
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) {
      throw new Error("No user is currently signed in");
    }
    const currentUser = await databases.getDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      Query.equal("accountId", currentAccount.$id)
    );
    if (!currentUser) {
      throw new Error("Current user document not found");
    }
    return currentUser;
  } catch (error) {
    console.error("Error getting current user:", error);
    throw new Error(error as string);
  }
};
