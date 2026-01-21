import { useEffect, useState } from 'react'
import './App.css'

const sections = ['education', 'experience', 'projects', 'contact']

function App() {
  const [activeSection, setActiveSection] = useState('education')
  const [menuOpen, setMenuOpen] = useState(false)
  const [formData, setFormData] = useState({ name: '', email: '', message: '' })
  const [submitted, setSubmitted] = useState(false)

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
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
    // Using mailto link for simplicity
    window.location.href = `mailto:btn.daniel@yahoo.com?subject=Contact from ${formData.name}&body=${formData.message}`
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  return (
    <>
      {/* Navbar */}
      <nav className="navbar">
        <span className="nav-name">Daniel Botnarenco</span>
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
        <h2>Experience</h2>
        <div className="item">
          <h3>Software Engineer – ASML BV</h3>
          <span>09/2023 – 09/2025</span>
          <ul>
            <li>Owned core modules of the Expose Sequence in DUV lithography systems.</li>
            <li>Delivered software executed on every wafer across the global DUV fleet.</li>
            <li>Developed hard real-time C++/C software with strict timing constraints.</li>
            <li>Led impact analysis, mentored teammates, and represented components.</li>
          </ul>
          <p className="tech">
            C++, C, Git, Jenkins, JIRA, GDB, Valgrind, GoogleTest, Python, Agile Scrum
          </p>
        </div>
        <div className="item">
          <h3>Freelance Software Engineer</h3>
          <span>01/2023 – Present</span>
          <ul>
            <li>Built React, Laravel, and .NET applications for multiple clients.</li>
            <li>Developed real-time tracking systems and education platforms.</li>
            <li>Delivered SEO-optimized landing pages and cross-device solutions.</li>
          </ul>
          <p className="tech">React, .NET, C#, Laravel, PHP, MySQL, REST APIs</p>
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
