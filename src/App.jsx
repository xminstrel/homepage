import { useEffect, useMemo, useState } from 'react'
import avatarUrl from '../assets/images/avatar.png'

// Content editing area:
// Most homepage text and links live in these constants. Update them first when
// you want to change the visible content without touching the layout components.
const links = {
  github: 'https://github.com/xminstrel',
  notes: 'https://note.xminstrel.top',
  email: 'mailto:xminstrelpro@gmail.com',
}

// Keep each id in sync with the matching <Section id="..."> below.
const navItems = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Projects' },
  { id: 'stack', label: 'Stack' },
  { id: 'contact', label: 'Contact' },
]

// Add, remove, or reorder project cards here. The UI numbers them automatically.
const projects = [
  {
    label: 'Tool',
    title: 'ZJU Classroom Transcript Tool',
    description:
      'Exports speech-recognition text from Zhiyun Classroom and prepares AI summary prompts for faster review.',
    tags: ['AI prompt', 'Transcript', 'Study tool'],
  },
  {
    label: 'Notes',
    title: 'ROS2 Learning Notes',
    description:
      'Documents hands-on learning around ROS2 Jazzy, WSL, turtlesim, colcon, CMake, and debugging workflows.',
    tags: ['ROS2 Jazzy', 'WSL', 'CMake'],
  },
  {
    label: 'Workflow',
    title: 'AI Modeling Workflow',
    description:
      'Supports math modeling contests with problem decomposition, modeling routes, code implementation, and paper polishing.',
    tags: ['Modeling', 'Optimization', 'Writing'],
  },
]

const stack = [
  'React',
  'Tailwind CSS',
  'ROS2',
  'Python',
  'CMake',
  'Optimization',
  'Obsidian',
  'GitHub Pages',
  'Cloudflare',
]

// Contact rows reuse the URLs from links above so there is only one source of truth.
const contacts = [
  { label: 'GitHub', href: links.github, detail: 'github.com/xminstrel' },
  { label: 'Notes', href: links.notes, detail: 'note.xminstrel.top' },
  { label: 'Email', href: links.email, detail: 'xminstrelpro@gmail.com' },
]

function Icon({ name }) {
  const icons = {
    moon: (
      <path
        d="M21 12.8A8.6 8.6 0 1 1 11.2 3 6.7 6.7 0 0 0 21 12.8Z"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
    sun: (
      <>
        <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" strokeWidth="1.8" />
        <path
          d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeWidth="1.8"
        />
      </>
    ),
    external: (
      <path
        d="M14 4h6v6m0-6-9 9m-1-7H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.8"
      />
    ),
    pin: (
      <>
        <path
          d="M20 10c0 5.5-8 11-8 11S4 15.5 4 10a8 8 0 1 1 16 0Z"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.8"
        />
        <circle cx="12" cy="10" r="2.6" fill="none" stroke="currentColor" strokeWidth="1.8" />
      </>
    ),
  }

  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      {icons[name]}
    </svg>
  )
}

function useActiveSection(ids) {
  const [active, setActive] = useState(ids[0])

  useEffect(() => {
    const update = () => {
      const line = window.innerHeight * 0.32
      let current = ids[0]

      for (const id of ids) {
        const element = document.getElementById(id)
        if (!element) continue
        if (element.getBoundingClientRect().top <= line) {
          current = id
        }
      }

      setActive(current)
    }

    update()
    window.addEventListener('scroll', update, { passive: true })
    window.addEventListener('resize', update)
    return () => {
      window.removeEventListener('scroll', update)
      window.removeEventListener('resize', update)
    }
  }, [ids])

  return active
}

function Nav({ theme, onToggleTheme }) {
  const sectionIds = useMemo(() => navItems.map((item) => item.id), [])
  const active = useActiveSection(sectionIds)

  return (
    <nav className="site-nav">
      <div className="site-nav-inner">
        <a className="nav-brand" href="#top" aria-label="Back to top">
          <img src={avatarUrl} alt="" />
          <span>Xminstrel</span>
        </a>
        <div className="nav-links" aria-label="Primary navigation">
          {navItems.map((item) => (
            <a key={item.id} className={active === item.id ? 'active' : ''} href={`#${item.id}`}>
              {item.label}
            </a>
          ))}
          <a href={links.notes} target="_blank" rel="noreferrer">
            Notes
            <Icon name="external" />
          </a>
        </div>
        <button className="theme-toggle" type="button" onClick={onToggleTheme} aria-label="Toggle color theme">
          <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
        </button>
      </div>
    </nav>
  )
}

function Sidebar() {
  return (
    <aside className="sidebar" id="top">
      <div className="sidebar-inner">
        <div className="avatar-wrap">
          <div className="avatar-orbit outer" />
          <div className="avatar-orbit inner" />
          <div className="avatar-frame">
            <img src={avatarUrl} alt="Xminstrel avatar" />
          </div>
        </div>

        <div className="identity">
          <h1>Xminstrel</h1>
          <p className="handle">@xminstrel</p>
          {/* Sidebar intro shown under the avatar. Keep it short for mobile. */}
          <p className="tagline">
            Engineering student exploring robotics, AI tools, modeling, and personal knowledge systems.
          </p>
        </div>

        <div className="sidebar-meta">
          <div>
            <Icon name="pin" />
            <span>Engineering / Robotics / AI</span>
          </div>
          <div>
            <span className="mono">xminstrelpro#gmail.com</span>
          </div>
        </div>

        <div className="socials">
          <a href={links.github} target="_blank" rel="noreferrer">
            GitHub
          </a>
          <a href={links.notes} target="_blank" rel="noreferrer">
            Notes
          </a>
          <a href={links.email}>Email</a>
        </div>
      </div>
    </aside>
  )
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <div className="section-head">
        <h2>{title}</h2>
      </div>
      {children}
    </section>
  )
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light')

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('theme', theme)
  }, [theme])

  return (
    <>
      <Nav theme={theme} onToggleTheme={() => setTheme((current) => (current === 'dark' ? 'light' : 'dark'))} />
      <div className="page-shell">
        <Sidebar />

        <main className="content">
          <Section id="about" title="About">
            <div className="about-copy">
              {/* Main About copy. Add another <p> here if you want a longer bio. */}
              <p>
                I focus on robotics, ROS2, mathematical modeling, AI-native development, Obsidian-based knowledge
                management, and practical engineering workflows.
              </p>
              <p>
                This homepage is a compact index of the things I am building and learning. I like tools that make
                technical work easier to repeat, explain, and improve over time.
              </p>
            </div>
          </Section>

          <Section id="projects" title="Projects">
            <div className="project-list">
              {projects.map((project, index) => (
                <article className="project-row" key={project.title}>
                  <div className="project-index">{String(index + 1).padStart(2, '0')}</div>
                  <div className="project-body">
                    <div className="project-label">{project.label}</div>
                    <h3>{project.title}</h3>
                    <p>{project.description}</p>
                    <div className="mini-tags">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </Section>

          <Section id="stack" title="Interests / Stack">
            <div className="stack-grid">
              {stack.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
          </Section>

          <Section id="contact" title="Contact">
            <div className="contact-list">
              {contacts.map((item) => (
                <a
                  key={item.label}
                  className="contact-row"
                  href={item.href}
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noreferrer' : undefined}
                >
                  <span>{item.label}</span>
                  <strong>{item.detail}</strong>
                  <Icon name="external" />
                </a>
              ))}
            </div>
          </Section>

          <footer className="footer">
            <span>(c) {new Date().getFullYear()} Xminstrel</span>
            <span>Built with Vite, React, and Tailwind CSS.</span>
          </footer>
        </main>
      </div>
    </>
  )
}

export default App
