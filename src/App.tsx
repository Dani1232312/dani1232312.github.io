import { useEffect, useState } from 'react'
import './App.css'

const sections = ['education', 'experience', 'projects', 'contact']

function App() {
  const [activeSection, setActiveSection] = useState('education')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const scrollTo = (id: string) => {
    if (id === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
    setMenuOpen(false)
  }

  // Scroll spy
  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight / 3
      for (const id of sections) {
        const elem = document.getElementById(id)
        if (elem && scrollPos >= elem.offsetTop) {
          setActiveSection(id)
        }
      }
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    window.location.href = `mailto:btn.daniel@yahoo.com?subject=Contact from ${formData.name}&body=${formData.message}`
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <span className="nav-name" onClick={() => scrollTo('top')} style={{ cursor: 'pointer' }}>
          Daniel Botnarenco
        </span>
        <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
          {sections.map((s) => (
            <button
              key={s}
              className={activeSection === s ? 'active' : ''}
              onClick={() => scrollTo(s)}
            >
              {s.charAt(0).toUpperCase() + s.slice(1)}
            </button>
          ))}
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)}>
          ☰
        </button>
      </nav>

      {/* Hero / About */}
      <section className="section hero fade-in hero-animate">
        <h1 className="hero-title">Software Engineer</h1>
        <p className="location">Bucharest, Romania</p>
        <p className="about">
          Software Engineer with a diverse background in real-time embedded systems,
          full-stack web development, and interactive UX/UI design. Experienced in
          delivering production-grade solutions and taking ownership of complex components.
        </p>
      </section>

      {/* Education */}
      <section id="education" className="section fade-in">
        <h2>Education</h2>
        <div className="item">
          <h3>Project Management</h3>
          <span>2023 – 2025 · National School of Political and Administrative Studies</span>
          <p>Bucharest, Romania</p>
        </div>
        <div className="item">
          <h3>Computer Science</h3>
          <span>2019 – 2023 · University of Twente</span>
          <p>Enschede, Netherlands</p>
        </div>
      </section>

      {/* Experience */}
      <section id="experience" className="section fade-in">
        <h2>Work Experience</h2>

        <div className="item">
          <h3>Software Engineer – ASML BV – Veldhoven, Netherlands</h3>
          <span>01/09/2023 – 01/09/2025</span>
          <ul>
            <li>Owned and developed core modules within the Expose Sequence of ASML’s DUV systems.</li>
            <li>Delivered software changes executed on every wafer processed worldwide.</li>
            <li>Engineered high-performance, low-latency C++/C solutions meeting hard real-time constraints.</li>
            <li>Involved in all stages of wafer processing, interfacing with optics, motion control, and sensors.</li>
            <li>Led creation of Software Impact Analysis documents outlining benefits, drawbacks, regression/progression considerations, and cross-component implications.</li>
            <li>Mentored new team members, performed code reviews, maintained high code quality standards.</li>
            <li>Acted as component representative in stakeholder meetings, aligning cross-team priorities.</li>
            <li>Tools: Git, ClearCase, JIRA, Jenkins, Valgrind, GDB, GoogleTest, Python, Agile Scrum</li>
          </ul>
        </div>

        <div className="item">
          <h3>Freelance Software Engineer</h3>
          <span>01/01/2023 – Present</span>
          <ul>
            <li>Delivered custom software solutions using React, Laravel, and .NET.</li>
            <li>Built a real-time .NET web app tracking multiple locations with map integration.</li>
            <li>Created Laravel-based education platforms with audio submissions and gamified UX.</li>
            <li>Delivered lightweight SEO-optimized landing pages for small businesses.</li>
            <li>Ensured cross-device accessibility, backend stability, and intuitive interfaces.</li>
            <li>Collaborated directly with stakeholders using Agile-like workflow.</li>
            <li>Technologies: .NET, C#, Laravel, PHP, React, JavaScript, MySQL, REST APIs, HTML, CSS</li>
          </ul>
        </div>

        <div className="item">
          <h3>Full Stack Developer – Cloudmazing BV – Goor, Netherlands</h3>
          <span>01/10/2022 – 01/02/2023</span>
          <ul>
            <li>Developed full-featured web apps using Laravel and React.</li>
            <li>Participated in requirement gathering sessions and designed database schemas.</li>
            <li>Built responsive, interactive frontend components aligned with UX principles.</li>
            <li>Handled end-to-end feature development, from architecture to testing.</li>
            <li>Collaborated in a small team, owning separate client projects but sharing knowledge.</li>
            <li>Technologies: Laravel, PHP, React, JavaScript, MySQL, Eloquent ORM, REST APIs, HTML, CSS</li>
          </ul>
        </div>

        <div className="item">
          <h3>Frontend Developer – Halloy BV – Hengelo, Netherlands</h3>
          <span>01/06/2021 – 01/01/2022</span>
          <ul>
            <li>Designed complex interactive UIs using React, React Native, and TypeScript.</li>
            <li>Developed a custom 3D visualization system for warehouse logistics.</li>
            <li>Built 3D renderer from scratch using advanced geometric computations.</li>
            <li>Integrated frontend with backend APIs ensuring synchronized performant data flows.</li>
            <li>Worked in a small Agile team, owning the frontend stack and contributing to sprints.</li>
            <li>Technologies: React, React Native, TypeScript, JavaScript, REST APIs, CSS Modules</li>
          </ul>
        </div>
      </section>

      {/* Projects */}
      <section id="projects" className="section fade-in">
        <h2>Projects</h2>
        <ul>
          <li>Real-time multi-location tracking web application (.NET)</li>
          <li>Education platform with audio submissions & gamified UX (Laravel)</li>
          <li>Custom 3D warehouse visualization engine (React + math-based rendering)</li>
        </ul>
      </section>

      {/* Contact */}
      <section id="contact" className="section contact fade-in">
        <h2>Contact</h2>
        {submitted && <p className="success-msg">Thank you! Your message has been sent.</p>}
        <form className="contact-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="name"
            placeholder="Your Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Your Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            value={formData.message}
            onChange={handleChange}
            required
          />
          <button type="submit">Send Message</button>
        </form>
      </section>
    </>
  )
}

export default App
