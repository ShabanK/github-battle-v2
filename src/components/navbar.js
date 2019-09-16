import React, { useState, useEffect } from "react";
import "./navbar.css";
import Card from "./card";

const axios = require("axios");

const Navbar = () => {
  const languages = ["All", "Java", "Javascript", "Python", "Ruby"];
  const [language, setLanguage] = useState("All");
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);
  const [current10, setCurrent10] = useState([]);

  useEffect(
    () => {
      async function callGithub() {
        try {
          const generateLanguagePromise = language =>
            axios.get(
              `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
            );
          const arrayOfPromises = languages.map(currentLanguage =>
            generateLanguagePromise(currentLanguage)
          );
          const resolvedData = await Promise.all(arrayOfPromises);
          setRepos(resolvedData);
          const result = resolvedData.filter(item => {
            return (
              item.config.url ===
              `https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories`
            );
          });
          setCurrent10(result[0].data.items.slice(0, 10));
        } catch (error) {
          console.log(error);
        }
      }
      callGithub();
      setLoading(false);
    },
    // eslint-disable-next-line
    []
  );

  function handleLangaugeChange(language) {
    setLanguage(language);
    const result = repos.filter(item => {
      return (
        item.config.url ===
        `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
      );
    });
    setCurrent10(result[0].data.items.slice(0, 10));
  }

  return (
    <>
      <nav>
        {languages.map((lang, index) => {
          return lang === language ? (
            <button style={{ color: "orange" }} key={index} value={lang}>
              {lang}
            </button>
          ) : (
            <button
              style={{ color: "purple" }}
              key={index}
              value={lang}
              onClick={() => handleLangaugeChange(lang)}
            >
              {lang}
            </button>
          );
        })}
      </nav>
      {loading ? (
        <div
          style={{
            fontSize: 40,
            textAlign: "center"
          }}
        >
          {" "}
          LOADING{" "}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {current10.map((data, index) => {
            return (
              <Card key={index} img={data.owner.avatar_url} name={data.name} />
            );
          })}
        </div>
      )}
    </>
  );
};

export default Navbar;
