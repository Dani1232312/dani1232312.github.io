import { useCallback, useEffect, useState } from 'react'
import './App.css'
import { education, experience, games, otherWork, profile, skills, type Game, type Job } from './data'
import { ArrowRight, ArrowUp, Close, Expand, External, Gamepad, GitHub, Mail, Menu, Pin, Play } from './icons'

const sections = [
  { id: 'work', label: 'Work' },
  { id: 'games', label: 'Games' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const base = import.meta.env.BASE_URL
const gameUrl = (g: Game) => `${base}${g.slug}/`
const coverUrl = (g: Game) => `${base}covers/${g.slug}.jpg`
const githubHandle = profile.github.replace('https://', '')

// a game opens in the player at #play/<slug>, so the link can be shared and Back closes it
const gameFromHash = () => {
  const m = window.location.hash.match(/^#play\/(.+)$/)
  return games.find((g) => g.slug === m?.[1]) ?? null
}

// "Sep 2023 – Sep 2025" -> "2 yrs 1 mo", counting both end months
const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const toMonth = (s: string) => {
  if (s === 'Present') {
    const d = new Date()
    return d.getFullYear() * 12 + d.getMonth()
  }
  const [mon, year] = s.split(' ')
  return Number(year) * 12 + MONTHS.indexOf(mon)
}
const duration = (period: string) => {
  const [from, to] = period.split(' – ')
  const total = toMonth(to) - toMonth(from) + 1
  if (!(total > 0)) return ''
  const y = Math.floor(total / 12)
  const m = total % 12
  return [y && `${y} yr${y > 1 ? 's' : ''}`, m && `${m} mo${m > 1 ? 's' : ''}`].filter(Boolean).join(' ')
}

const BULLETS_SHOWN = 3

function Tech({ items }: { items: string[] }) {
  return (
    <ul className="tech">
      {items.map((t) => (
        <li key={t}>{t}</li>
      ))}
    </ul>
  )
}

function SectionHead({ n, label, title, sub }: { n: string; label: string; title: string; sub?: string }) {
  return (
    <div className="section-head reveal">
      <p className="kicker">
        <span>{n}</span>
        {label}
      </p>
      <h2>{title}</h2>
      {sub && <p className="section-sub">{sub}</p>}
    </div>
  )
}

function JobItem({ job }: { job: Job }) {
  const [open, setOpen] = useState(false)
  const long = job.bullets.length > BULLETS_SHOWN + 1
  const bullets = long && !open ? job.bullets.slice(0, BULLETS_SHOWN) : job.bullets

  return (
    <li className={`timeline-item reveal ${job.current ? 'current' : ''}`}>
      <div className="timeline-meta">
        <span className="period">{job.period}</span>
        <span className="length">{duration(job.period)}</span>
        {job.place && <span className="place">{job.place}</span>}
      </div>
      <div className="timeline-card">
        <h3>
          {job.title} <span className="at">· {job.company}</span>
          {job.current && <span className="badge">Current</span>}
        </h3>
        <ul className="bullets">
          {bullets.map((b) => (
            <li key={b}>{b}</li>
          ))}
        </ul>
        {long && (
          <button className="more" onClick={() => setOpen(!open)} aria-expanded={open}>
            {open ? 'Show less' : `Show ${job.bullets.length - BULLETS_SHOWN} more`}
          </button>
        )}
        <Tech items={job.tech} />
      </div>
    </li>
  )
}

function Player({ game, onClose }: { game: Game; onClose: () => void }) {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    document.body.classList.add('no-scroll')
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.classList.remove('no-scroll')
      window.removeEventListener('keydown', onKey)
    }
  }, [onClose])

  const fullscreen = () => document.querySelector<HTMLElement>('.player-frame')?.requestFullscreen?.()

  return (
    <div className="player" role="dialog" aria-modal="true" aria-label={game.title}>
      <div className="player-bar">
        <div className="player-title">
          <span className="dot" style={{ background: game.accent }} />
          <strong>{game.title}</strong>
          <span className="muted">{game.controls}</span>
        </div>
        <div className="player-actions">
          <button onClick={fullscreen} title="Fullscreen">
            <Expand /> <span>Fullscreen</span>
          </button>
          <a href={gameUrl(game)} target="_blank" rel="noopener" title="Open in a new tab">
            <External /> <span>New tab</span>
          </a>
          <button className="close" onClick={onClose} title="Close (Esc)" aria-label="Close">
            <Close size={18} />
          </button>
        </div>
      </div>
      <div className="player-stage">
        {!loaded && (
          <div className="player-loading">
            <div className="spinner" style={{ borderTopColor: game.accent }} />
            Loading {game.title}…
          </div>
        )}
        <iframe
          className="player-frame"
          src={gameUrl(game)}
          title={game.title}
          allow="fullscreen; autoplay; gamepad"
          allowFullScreen
          onLoad={(e) => {
            setLoaded(true)
            e.currentTarget.focus()
          }}
        />
      </div>
    </div>
  )
}

function App() {
  const [activeSection, setActiveSection] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [progress, setProgress] = useState(0)
  const [playing, setPlaying] = useState<Game | null>(gameFromHash)
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
      setScrolled(window.scrollY > 8)
      const max = document.documentElement.scrollHeight - window.innerHeight
      setProgress(max > 0 ? window.scrollY / max : 0)
      const scrollPos = window.scrollY + window.innerHeight / 3
      let current = ''
      for (const { id } of sections) {
        const elem = document.getElementById(id)
        if (elem && scrollPos >= elem.offsetTop) current = id
      }
      // the last section is too short to reach a third of the way down, so the page bottom counts as it
      if (window.scrollY >= max - 4) current = sections[sections.length - 1].id
      setActiveSection(current)
    }
    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Fade sections in as they scroll into view
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add('in')
            io.unobserve(e.target)
          }
        }
      },
      { rootMargin: '0px 0px -10% 0px' },
    )
    document.querySelectorAll('.reveal').forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    const onHash = () => setPlaying(gameFromHash())
    window.addEventListener('hashchange', onHash)
    return () => window.removeEventListener('hashchange', onHash)
  }, [])

  const play = (g: Game) => {
    history.pushState({ played: true }, '', `#play/${g.slug}`)
    setPlaying(g)
  }

  const closePlayer = useCallback(() => {
    // go back if we pushed the #play entry ourselves, otherwise (opened from a shared link) just clear it
    if (history.state?.played) history.back()
    else history.replaceState(null, '', window.location.pathname + window.location.search)
    setPlaying(null)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const subject = encodeURIComponent(`Contact from ${formData.name}`)
    const body = encodeURIComponent(`${formData.message}\n\n${formData.name} <${formData.email}>`)
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`
    setSubmitted(true)
    setFormData({ name: '', email: '', message: '' })
  }

  const current = experience.find((j) => j.current)

  return (
    <>
      {/* Navbar */}
      <nav className={`navbar ${scrolled || menuOpen ? 'scrolled' : ''}`}>
        <div className="nav-inner">
          <button className="nav-name" onClick={() => scrollTo('top')}>
            {profile.name}
          </button>
          <div className={`nav-links ${menuOpen ? 'open' : ''}`}>
            {sections.map((s) => (
              <button key={s.id} className={activeSection === s.id ? 'active' : ''} onClick={() => scrollTo(s.id)}>
                {s.label}
              </button>
            ))}
          </div>
          <div className="nav-end">
            <a className="icon-btn" href={profile.github} target="_blank" rel="noopener" aria-label="GitHub">
              <GitHub size={18} />
            </a>
            <button className="icon-btn mobile-menu-btn" onClick={() => setMenuOpen(!menuOpen)} aria-label="Menu">
              {menuOpen ? <Close size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
        <div className="progress" style={{ transform: `scaleX(${progress})` }} />
      </nav>

      {/* Hero */}
      <header className="hero">
        <div className="hero-grid" aria-hidden />
        <div className="section-content hero-content">
          <div className="hero-text">
            <p className="eyebrow">
              <span>{profile.role}</span>
              <span className="eyebrow-place">
                <Pin size={13} /> {profile.location}
              </span>
            </p>
            <h1>{profile.name}</h1>
            <p className="lead">{profile.about}</p>
            {current && (
              <p className="now">
                <span className="pulse" />
                <span>
                  Now: {current.title} at <strong>{current.company}</strong>
                </span>
              </p>
            )}
            <div className="hero-cta">
              <button className="btn primary" onClick={() => scrollTo('games')}>
                <Play size={14} /> Play my games
              </button>
              <button className="btn ghost" onClick={() => scrollTo('contact')}>
                Get in touch <ArrowRight size={15} />
              </button>
            </div>
          </div>

          <div className="hero-games" aria-label="Games">
            {games.map((g, i) => (
              <button
                key={g.slug}
                className={`hero-card hero-card-${i}`}
                onClick={() => play(g)}
                style={{ ['--accent' as string]: g.accent }}
              >
                <img src={coverUrl(g)} alt="" />
                <span className="hero-card-label">
                  <span className="play-icon">
                    <Play size={10} />
                  </span>
                  {g.title}
                </span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Skills */}
      <div className="skills">
        <div className="section-content skills-grid">
          {skills.map((s) => (
            <div key={s.area} className="skill reveal">
              <h3>{s.area}</h3>
              <p>{s.note}</p>
              <Tech items={s.items} />
            </div>
          ))}
        </div>
      </div>

      <main>
        {/* Experience */}
        <section id="work" className="section">
          <div className="section-content">
            <SectionHead n="01" label="Experience" title="Where I’ve worked" />
            <ol className="timeline">
              {experience.map((job) => (
                <JobItem key={`${job.company}-${job.period}`} job={job} />
              ))}
            </ol>
          </div>
        </section>

        {/* Games */}
        <section id="games" className="section games">
          <div className="section-content">
            <SectionHead
              n="02"
              label="Games"
              title="Things I built for fun"
              sub="Both run right here in the browser, no install. Hit play."
            />

            <div className="game-grid">
              {games.map((g) => (
                <article key={g.slug} className="game-card reveal" style={{ ['--accent' as string]: g.accent }}>
                  <button className="game-cover" onClick={() => play(g)} aria-label={`Play ${g.title}`}>
                    <img src={coverUrl(g)} alt={`${g.title} screenshot`} loading="lazy" />
                    <span className="game-play">
                      <Play size={26} />
                    </span>
                  </button>
                  <div className="game-body">
                    <span className="genre">{g.genre}</span>
                    <h3>{g.title}</h3>
                    <p>{g.blurb}</p>
                    <Tech items={g.tech} />
                    <div className="game-actions">
                      <button className="btn primary" onClick={() => play(g)}>
                        <Play size={13} /> Play
                      </button>
                      <a className="btn ghost" href={gameUrl(g)} target="_blank" rel="noopener">
                        Full page <External size={15} />
                      </a>
                      <span className="controls">
                        <Gamepad size={15} /> {g.controls}
                      </span>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            <h3 className="sub-head reveal">Client work</h3>
            <div className="mini-grid">
              {otherWork.map((w) => (
                <div key={w.title} className="mini-card reveal">
                  <h4>{w.title}</h4>
                  <p>{w.text}</p>
                  <span className="mini-tech">{w.tech}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Education */}
        <section id="education" className="section education">
          <div className="section-content">
            <SectionHead n="03" label="Education" title="Where I studied" />
            <div className="edu-grid">
              {education.map((e) => (
                <div key={e.degree} className="edu-card reveal">
                  <span className="period">{e.period}</span>
                  <h3>{e.degree}</h3>
                  <p>{e.school}</p>
                  <span className="place">
                    <Pin size={13} /> {e.place}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact */}
        <section id="contact" className="section contact">
          <div className="section-content contact-grid">
            <div className="reveal">
              <SectionHead n="04" label="Contact" title="Let’s talk" />
              <p className="lead">
                Open to interesting C++ and web projects, freelance work, or just a chat about games and
                graphics.
              </p>
              <div className="contact-links">
                <a href={`mailto:${profile.email}`}>
                  <Mail size={18} /> {profile.email}
                </a>
                <a href={profile.github} target="_blank" rel="noopener">
                  <GitHub size={18} /> {githubHandle}
                </a>
              </div>
            </div>
            <form className="contact-form reveal" onSubmit={handleSubmit}>
              <label>
                Name
                <input type="text" name="name" value={formData.name} onChange={handleChange} required />
              </label>
              <label>
                Email
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </label>
              <label>
                Message
                <textarea name="message" value={formData.message} onChange={handleChange} required />
              </label>
              <button type="submit" className="btn primary">
                Send message <ArrowRight size={15} />
              </button>
              {submitted && <p className="success-msg">Your email app should open with the message ready to send.</p>}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="section-content footer-inner">
          <span>
            © {new Date().getFullYear()} {profile.name}
          </span>
          <div className="footer-links">
            <a href={`mailto:${profile.email}`}>Email</a>
            <a href={profile.github} target="_blank" rel="noopener">
              GitHub
            </a>
            <button onClick={() => scrollTo('top')}>
              Back to top <ArrowUp size={14} />
            </button>
          </div>
        </div>
      </footer>

      {playing && <Player key={playing.slug} game={playing} onClose={closePlayer} />}
    </>
  )
}

export default App
