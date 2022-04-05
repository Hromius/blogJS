/* eslint-disable react/react-in-jsx-scope */

import { Route, Routes } from 'react-router-dom';
import SignUp from './sign-up/SignUp';
import Login from './sign-in/sign-in';
import Articles from './articles/Articles';
import CreateArticle from './create article/CreateArticle';
import Article from './article_page/Article';
import Profile from './profile/Profile';
import Header from './header/Header';
import RedactArticle from './redact article/RedactArticle';

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Header />}>
        <Route path="/articles" element={<Articles />} />
        <Route path="/sign-up" element={<SignUp />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/sign-in" element={<Login />} />
        <Route path="/articles/:slug" element={<Article />} />
        <Route path="/new-article" element={<CreateArticle />} />
        <Route path="/articles/:slug/edit" element={<RedactArticle />} />

      </Route>
    </Routes>
  );
}

// <Route path="/" element={<HeaderLogin/>} >
