import React, { useState , useEffect } from 'react'
import "./navbar.css"
import Card from "./card"

const Navbar = () => {

    const [language, setLanguage] = useState("All")
    const [loading, setLoading] = useState(false);
    const [repos, setRepos] = useState({})

    return(
        <nav>
            <button>All</button>
            <button>Java</button>
            <button>Javascript</button>
            <button>Python</button>
            <button>Ruby</button>
        </nav>
    )
}

export default Navbar