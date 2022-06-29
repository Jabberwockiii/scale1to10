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
Amplify.configure(awsconfig);

I18n.putVocabularies(translations);
I18n.setLanguage('zh-Hans');
I18n.putVocabularies({
  'zh-Hans': {
    'Sign in': '登录',
    'Sign Up': "注册",
    'Create Account': "创建账户",
    'Forgot your password?': "忘记密码",
    'Reset your password': "重置密码",
    'Enter your email': "输入邮箱",
    'Send code': "发送验证码",
    'Your passwords must match': "密码必须匹配确认密码",
    'Password must have at least 8 characters': "密码必须至少8个字符",
    'Signing in': "登录中",
  },
});

const App = () => {
  return (
    <Authenticator>
       {({ signOut, user }) => (
         <div className="App">
         <NavBar signOut={signOut}/>           
         <Outlet />
       </div>
       )}
    </Authenticator>
  );
};

export default App;
