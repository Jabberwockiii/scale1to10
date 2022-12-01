//import logo from "./logo.svg";
import { Outlet } from "react-router-dom";
import "./App.css";
import NavBar from "./components/NavBar";
//aws 
import { Authenticator,  } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';
import Amplify from 'aws-amplify';
import awsconfig from './aws-exports';
import { I18n } from 'aws-amplify';
import { translations } from '@aws-amplify/ui-react';
import { Header} from './Header';
import {Grid, Flex, Image, View} from "@aws-amplify/ui-react";
import {SignInHeader} from "./SignInHeader";

Amplify.configure(awsconfig);

const components = {
  Header,
  SignIn: {
    Header: SignInHeader,
  },
};

export function Login() {
  return (
    <Grid templateColumns={{ base: "1fr 0", medium: "1fr 1fr" }}>
      <Flex
        backgroundColor={"white"}
        justifyContent="center"
      >
        <Authenticator components={components}>
        {({ signOut, user }) => (
         <div className="App">
         <NavBar signOut={signOut}/>           
         <Outlet />
       </div>
       )}
        </Authenticator>
      </Flex>
      <View height="100vh">
        <Image
          src = {require('./static/background1.jpg')}
          width="100%"
          height="100%"
          objectFit="cover"
        />
      </View>
    </Grid>
  );
}

