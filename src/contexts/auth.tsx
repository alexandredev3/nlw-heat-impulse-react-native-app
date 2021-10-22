import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState
} from "react";
import { Alert } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as AuthSession from 'expo-auth-session';

import { api } from "../services/api";


type AuthProviderProps = {
  children: ReactNode;
}

type User = {
  id: string;
  name: string;
  login: string;
  avatar_url: string;
}

type AuthContextData = {
  user: User | null;
  signInURL: string;
  isSigning: boolean;
  signIn: () => Promise<void>;
  signOut: () => void;
}

type AuthResponse = {
  token: string;
  user: User;
}

type AuthorizationResponse = {
  params: {
    code: string | undefined;
    error?: string;
  };
  type?: string;
}

const GITHUB_CLIENT_ID = '1323593476a10d38d44d';
const GITHUB_SCOPE = 'user';
const TOKEN_STORAGE = '@dowhile:token';

const signInURL = `https://github.com/login/oauth/authorize?scope=${GITHUB_SCOPE}&client_id=${GITHUB_CLIENT_ID}`;

const setToken = (token: string) => {
  api.defaults.headers.common.authorization = `Bearer ${token}`;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData); 

function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isSigning, setIsSigning] = useState(false);

  async function signIn() {
    try {
      setIsSigning(true);

      const AuthSessionResponse = await AuthSession.startAsync({ authUrl: signInURL }) as unknown as AuthorizationResponse;

      // AuthSessionResponse.params.error['access_denied'] if user close the web browser before the request be completed.
      if (AuthSessionResponse.type === 'error' || AuthSessionResponse.params.error === 'access_denied') {
        setIsSigning(false);
        return;
      }

      const { params } = AuthSessionResponse;

      const response = await api.post<AuthResponse>('/authenticate', {
        code: params.code,
      });

      const { token, user } = response.data;

      await AsyncStorage.setItem(TOKEN_STORAGE, token);

      setToken(token);

      setUser(user);
    } catch (err) {
      console.log(err);
      Alert.alert('Failed to load the lastest messages');
    } finally {
      setIsSigning(false);
    }
  }

  async function signOut() {
    setUser(null);
    await AsyncStorage.removeItem(TOKEN_STORAGE);
  }

  useEffect(() => {
    AsyncStorage.getItem(TOKEN_STORAGE).then((token) => {
      if (token) {
        setToken(token);
  
        api.get<User>('/profile').then(response => {
          const { data } = response;
  
          setUser(data);
        }).catch(err => {
          console.log(err);
          Alert.alert('Failed to load the lastest messages');
        });
      }
    });
  }, []);

  return (
    <AuthContext.Provider 
      value={{
        signInURL,
        user,
        isSigning,
        signIn,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

const useAuth = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error('useAuth must be used within a AuthProvider');
  }

  return context;
}

export {
  AuthProvider,
  useAuth
};