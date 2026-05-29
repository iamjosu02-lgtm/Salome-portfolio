import React, { useEffect, useState } from 'react';
import './App.css';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL || 'https://salome-portfolio-api.onrender.com';

const WELCOME_ROTATION = ['wall3.mp4', 'wall6.mp4', 'wall5.mp4', 'wall1.mp4'];

const SECTION_BACKGROUNDS = {
  profile: 'wall7.mp4',
  qualification: 'wall4.mp4',
  skills: 'wall5.mp4',
  contact: 'wall6.mp4'
};

function App() {
  const [activeSection, setActiveSection] = useState('welcome');
  const [currentWall, setCurrentWall] = useState(0);
  const [profile, setProfile] = useState(null);
  const [skills, setSkills] = useState(null);
  const [profileBio, setProfileBio] = useState([]);

  useEffect(() => {
    if (activeSection !== 'welcome') {
      return undefined;
    }

    const interval = setInterval(() => {
      setCurrentWall((prev) => (prev + 1) % WELCOME_ROTATION.length);
    }, 5000);

    return () => clearInterval(interval);
  }, [activeSection]);

  useEffect(() => {
    if (activeSection === 'profile' && !profile) {
      fetch(`${BACKEND_URL}/api/profile`)
        .then((res) => res.json())
        .then((data) => {
          setProfile(data);
          if (data.bio) setProfileBio(data.bio);
        })
        .catch(() => {});
    }
    if (activeSection === 'skills' && !skills) {
      fetch(`${BACKEND_URL}/api/skills`)
        .then((res) => res.json())
        .then(setSkills)
        .catch(() => {});
    }
  }, [activeSection, profile, skills]);

  const goToSection = (sectionName) => {
    setActiveSection(sectionName);
  };

  return (
    <div className="app">
      <div className="video-background">
        {activeSection === 'welcome' ? (
          WELCOME_ROTATION.map((wall, index) => (
            <video
              key={wall}
              className={`video-slide ${index === currentWall ? 'active' : ''}`}
              autoPlay
              muted
              loop
              playsInline
            >
              <source src={`/${wall}`} type="video/mp4" />
            </video>
          ))
        ) : (
          <video className="video-slide active" autoPlay muted loop playsInline>
            <source src={`/${SECTION_BACKGROUNDS[activeSection]}`} type="video/mp4" />
          </video>
        )}
        <div className="video-overlay" />
      </div>

      <header className="header">
        <div className="header-left">
          <div className="profile-circle">
            <img src="/front.png" alt="Salome profile" className="profile-image" />
          </div>
        </div>
        <nav className="navigation">
           <button
             className={`nav-button ${activeSection === 'profile' ? 'active' : ''}`}
             onClick={() => goToSection('profile')}
           >
             Salome
           </button>
          <button
            className={`nav-button ${activeSection === 'qualification' ? 'active' : ''}`}
            onClick={() => goToSection('qualification')}
          >
            Qualification
          </button>
          <button
            className={`nav-button ${activeSection === 'skills' ? 'active' : ''}`}
            onClick={() => goToSection('skills')}
          >
            Skills
          </button>
          <button
            className={`nav-button ${activeSection === 'contact' ? 'active' : ''}`}
            onClick={() => goToSection('contact')}
          >
            Contact Information
          </button>
        </nav>
      </header>

      <main className="main-content">
        {activeSection === 'welcome' && (
          <section className="glass-card welcome-card">
            <h1 className="welcome-title">Welcome to My Portfolio</h1>
            <p className="intro-text">
              SALOME RAJABU RASHIDI | Data Science Student | Machine Learning
            </p>
          </section>
        )}

{activeSection === 'profile' && (
          <section className="glass-card profile-card">
            <h1>Profile</h1>
            <div className="profile-layout">
              <div className="profile-photo-wrap">
                <img src="/front.png" alt="Salome profile portrait" className="profile-photo-large" />
              </div>
              <div className="profile-bio">
                <h3>{profile?.fullName || 'Loading...'}</h3>
                {profile?.bio && profileBio.length > 0 ? (
                  profileBio.map((para, idx) => (
                    <p key={idx}>{para}</p>
                  ))
                ) : (
                  <>
                    <p>
                      Salome is a dedicated Data Science learner with strong interest in
                      machine learning, cloud technologies, and modern web development.
                    </p>
                    <p>
                      She enjoys building polished digital experiences, working with data,
                      and delivering practical solutions that create real value.
                    </p>
                    <p>
                      Her focus is to grow into a professional who combines technical depth,
                      creativity, and consistent execution in every project.
                    </p>
                  </>
                )}
              </div>
            </div>
            <button className="section-button back-button" onClick={() => goToSection('welcome')}>
              Back
            </button>
          </section>
        )}

        {activeSection === 'skills' && (
          <section className="glass-card skills-card">
            <h1>Skills</h1>
            <div className="skills-grid">
              {skills?.skills && skills.skills.map((skill) => (
                <div className="skill-item" key={skill}>
                  <h3>{skill}</h3>
                </div>
              ))}
            </div>
            <button className="section-button back-button" onClick={() => goToSection('welcome')}>
              Back
            </button>
          </section>
        )}

        {activeSection === 'qualification' && (
          <section className="glass-card qualification-card">
            <h1>Qualification</h1>
            <div className="qualification-list">
              <div className="qualification-item">
                <h3>Cloud Computing Student</h3>
                <p>
                  Strong foundation in cloud concepts, deployment flow, and environment
                  setup for modern web applications.
                </p>
              </div>
              <div className="qualification-item">
                <h3>Frontend Portfolio Development</h3>
                <p>
                  Builds responsive and user-friendly interfaces using HTML, CSS,
                  JavaScript, and React with clean UI principles.
                </p>
              </div>
              <div className="qualification-item">
                <h3>Deployment Experience</h3>
                <p>
                  Hands-on project publishing workflow with Vercel and Render, including
                  iterative updates and production-ready structure.
                </p>
              </div>
            </div>
            <button className="section-button back-button" onClick={() => goToSection('welcome')}>
              Back
            </button>
          </section>
        )}

        {activeSection === 'contact' && (
          <section className="glass-card contact-card">
            <h1>Contact Information</h1>
            <div className="info-list">
              <p><strong>Email:</strong> salomerajabu387@gmail.com</p>
              <p><strong>Phone:</strong> 0679708416</p>
              <p><strong>Location:</strong> Tanzania</p>
              <p><strong>Availability:</strong> Open to internships and project collaboration</p>
            </div>
            <button className="section-button back-button" onClick={() => goToSection('welcome')}>
              Back
            </button>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;