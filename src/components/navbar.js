import React, { useState, useEffect } from "react";
import "./navbar.css";
import Card from "./card";

const Navbar = () => {
  const languages = ["All", "Java", "Javascript", "Python", "Ruby"];
  const [language, setLanguage] = useState("All");
  const [loading, setLoading] = useState(true);
  const [repos, setRepos] = useState([]);

  useEffect(() => {
    async function callGithub() {
      try {
        let result = await fetch(
          `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`
        );
        result = await result.json();
        const firstTen = result.items.slice(0, 10);
        console.log(firstTen, "rezieult");
        setRepos([...firstTen]);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
    callGithub();
  }, [language]);

  return (
    <>
      <nav>
        {languages.map((lang, index) => {
          return (
            <button key={index} value={lang} onClick={() => setLanguage(lang)}>
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
          LOADING...{" "}
        </div>
      ) : (
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {repos.map((data, index) => {
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
