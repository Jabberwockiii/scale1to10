import React from "react";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { render } from "react-dom";
import ProfilePage from "./pages/ProfilePage";
import StoryPage from "./pages/StoryPage";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import GalleryPage from "./pages/GalleryPage";
import NewPost from "./pages/NewPost";
import NewPost2 from"./pages/ProfilePage";
const rootElement = document.getElementById("root");
render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<GalleryPage />} />
        <Route path="profile" element={<ProfilePage />} />
        <Route path="story/:storyId" element={<StoryPage />} />
        <Route path="newpost" element={<NewPost />} />
        <Route path="newpost2" element={<NewPost2 />} />
      </Route>
      <Route
        path="*"
        element={
          <main style={{ padding: "1rem" }}>
            <p>There's nothing here!</p>
          </main>
        }
      />
    </Routes>
  </BrowserRouter>,
  rootElement
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();