import styles from "../styles/footer.module.css"
import React from "react"

const developers = [
  {
    name: "Muna Al Haj Eid",
    photo:
      "https://drive.google.com/file/d/1zoElnYHwTMOtGojVqVVwSTVFWrdMdt9E/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/monabadei/",
    github: "https://github.com/MonaAlHajEid",
  },
  {
    name: "Jana Abuhaltam",
    photo:
      "https://drive.google.com/file/d/1adexxgVbn79z42KvSVDVKRe1_5jYi64L/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/jana-abuhaltam-b00335288/",
    github: "https://github.com/JanaAbuHaltam",
  },
  {
    name: "Hassan AbuGareeb",
    photo:
      "https://drive.google.com/file/d/1dkUfL5DWT4gSaiohuYN1Sw095XpDFBz0/view?usp=sharing",
    linkedin: "https://www.linkedin.com/in/hassan-abu-ghareeb-a13b1126a/",
    github: "https://github.com/Hassan-AbuGareeb",
  },
]

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.developers}>
        {developers.map((developer, index) => (
          <div key={index} className={styles.developer}>
            <img src={developer.photo} alt={`Developer ${index + 1}`} />
            <p>{developer.name}</p>
            <div className={styles.links}>
              <a
                href={developer.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
              <a
                href={developer.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                GitHub
              </a>
            </div>
          </div>
        ))}
      </div>
      <p>
        Connect with us on social media for the latest updates and more movie
        magic!
      </p>
      <p>
        © {new Date().getFullYear()} Movie Project Team 7. All rights reserved.
      </p>
    </footer>
  )
}

export default Footer
