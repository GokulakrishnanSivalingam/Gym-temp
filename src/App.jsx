import { useEffect, useRef, useState } from 'react'
import './App.css'
import gym from './assets/gym.png'
import gym2 from './assets/gym3.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)
  const [animatedStats, setAnimatedStats] = useState({
    satisfied: 0,
    equipment: 0,
    trainers: 0,
    members: 0
  })
  const [hasAnimated, setHasAnimated] = useState(false)
  const statsRef = useRef(null)

  const handleSmoothScroll = (e, targetId) => {
    e.preventDefault()
    const targetElement = document.getElementById(targetId)
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
      setIsMenuOpen(false)
    } else if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setIsMenuOpen(false)
    }
  }

  const testimonials = [
    {
      name: "SRI JAYA",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80",
      rating: "★★★★★",
      text: "Joining this gym completely changed my lifestyle. The trainers are supportive, and the environment keeps me motivated every day."
    },
    {
      name: "RAJ KUMAR",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80",
      rating: "★★★★★",
      text: "Best gym in the area! The equipment is top-notch and the trainers really know their stuff. Highly recommend!"
    },
    {
      name: "PRIYA SHARMA",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&q=80",
      rating: "★★★★★",
      text: "I've lost 20kg in 3 months thanks to the personalized training programs. The community here is amazing!"
    },
    {
      name: "ARUN RAJ",
      image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&q=80",
      rating: "★★★★☆",
      text: "Great facilities and friendly staff. The yoga classes are my favorite. A perfect place for fitness enthusiasts."
    },
    {
      name: "DEVI LAKSHMI",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&q=80",
      rating: "★★★★★",
      text: "The personal training sessions have been life-changing. My trainer pushed me beyond what I thought was possible!"
    }
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    }

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible')
        }
      })
    }, observerOptions)

    const animatedElements = document.querySelectorAll('.fade-in, .fade-in-left, .fade-in-right, .scale-in')
    animatedElements.forEach(el => observer.observe(el))

    return () => {
      animatedElements.forEach(el => observer.unobserve(el))
    }
  }, [])

  useEffect(() => {
    const animateValue = (start, end, duration, callback) => {
      let startTimestamp = null
      const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp
        const progress = Math.min((timestamp - startTimestamp) / duration, 1)
        callback(Math.floor(progress * (end - start) + start))
        if (progress < 1) {
          window.requestAnimationFrame(step)
        }
      }
      window.requestAnimationFrame(step)
    }

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !hasAnimated) {
          setHasAnimated(true)
          
          animateValue(0, 98, 2000, (value) => {
            setAnimatedStats(prev => ({ ...prev, satisfied: value }))
          })
          
          animateValue(0, 100, 2000, (value) => {
            setAnimatedStats(prev => ({ ...prev, equipment: value }))
          })
          
          animateValue(0, 10, 2000, (value) => {
            setAnimatedStats(prev => ({ ...prev, trainers: value }))
          })
          
          animateValue(0, 1000, 2000, (value) => {
            setAnimatedStats(prev => ({ ...prev, members: value }))
          })
        }
      })
    }, { threshold: 0.5 })

    if (statsRef.current) {
      statsObserver.observe(statsRef.current)
    }

    return () => {
      if (statsRef.current) {
        statsObserver.unobserve(statsRef.current)
      }
    }
  }, [hasAnimated])

  return (
    <div className="app">
      <nav className="navbar">
        <div className="logo">
          <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="5" y="18" width="30" height="4" rx="2" fill="#f97316"/>
            <rect x="8" y="10" width="6" height="20" rx="3" fill="#ffffff"/>
            <rect x="26" y="10" width="6" height="20" rx="3" fill="#ffffff"/>
          </svg>
        </div>
        <div className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <a href="#" className="nav-link" onClick={(e) => handleSmoothScroll(e, 'home')}>Home</a>
          <a href="#about" className="nav-link" onClick={(e) => handleSmoothScroll(e, 'about')}>About</a>
          <a href="#program" className="nav-link" onClick={(e) => handleSmoothScroll(e, 'program')}>Program</a>
          <a href="#coaches" className="nav-link" onClick={(e) => handleSmoothScroll(e, 'coaches')}>Coaching</a>
          <button className="contact-btn" onClick={() => { setIsMenuOpen(false); handleSmoothScroll({ preventDefault: () => {} }, 'contact') }}>Contact</button>
        </div>
        <button className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          <span></span>
          <span></span>
          <span></span>
        </button>
      </nav>

      <section className="hero">
        <div className="hero-content fade-in-left">
          <h1 className="hero-title">
            BUILD
            <br />
            YOUR
            <br />
            MUSCLES
            <br />
            WITH US
          </h1>
          <p className="hero-subtitle">Premium Gym for Strength, Cardio & Recovery</p>
          <button className="join-btn">JOIN NOW</button>
        </div>
        <div className="hero-image fade-in-right">
          <img src={gym} alt="Fitness" />
        </div>
      </section>

      <section className="about-us" id="about">
        <div className="about-us-image fade-in-left">
          <img src="https://imgs.search.brave.com/QVWQetisuzZ2jk1pQIYHMkAJTqU6BvDbsTon48EKwh4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pbWFn/ZXMucGV4ZWxzLmNv/bS9waG90b3MvMzIw/ODUzMzIvcGV4ZWxz/LXBob3RvLTMyMDg1/MzMyL2ZyZWUtcGhv/dG8tb2YtcG93ZXJm/dWwtYm9keWJ1aWxk/ZXItcG9zaW5nLWlu/LWRhcmstZ3ltLmpw/ZWc_YXV0bz1jb21w/cmVzcyZjcz10aW55/c3JnYiZkcHI9MSZ3/PTUwMA" alt="About Us" />
        </div>
        <div className="about-us-content fade-in-right">
          <h2 className="section-title">WHO WE ARE</h2>
          <p className="about-us-description">
            Welcome to V studio Fitness, where fitness meets motivation,
            discipline, and transformation. We are dedicated to helping
            individuals build a healthier lifestyle through professional
            training, modern equipment, and a supportive fitness
            environment.
            <br /><br />
            Our gym is designed for everyone — from beginners starting
            their fitness journey to experienced athletes pushing their
            limits. With expert trainers, personalized workout guidance,
            and high-energy training spaces, we help you achieve your
            fitness goals faster and smarter.
          </p>
       <button className="read-more-btn">READ MORE</button>
        </div>
      </section>

      <section className="services" id="program">
        <div className="services-header fade-in">
          <h2 className="section-title">OUR SERVICES</h2>
          <h3 className="services-subtitle">TRAINING PROGRAM</h3>
        </div>
        <div className="services-grid">
          <div className="service-card scale-in">
            <img src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=400&q=80" alt="Weight Loss" />
            <h4>WEIGHT LOSS PROGRAM</h4>
            <p>Burn calories and shed pounds with our specialized weight loss training programs.</p>
          </div>
          <div className="service-card scale-in">
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" alt="Muscles Gain" />
            <h4>MUSCLES GAIN PROGRAM</h4>
            <p>Build lean muscle mass with our strength training and nutrition guidance.</p>
          </div>
          <div className="service-card scale-in">
            <img src="https://images.unsplash.com/photo-1518611012118-696072aa579a?w=400&q=80" alt="Cardio" />
            <h4>CARDIO EXERCISE</h4>
            <p>Improve your heart health and endurance with our cardio workout sessions.</p>
          </div>
          <div className="service-card scale-in">
            <img src="https://imgs.search.brave.com/XiwiqmfUzYLnmhsiNyB8o4BnnxCgz6usGr7jQBuL0QM/rs:fit:500:0:1:0/g:ce/aHR0cHM6Ly9waG90/b3MudHBuLnRvL2lu/L3J0L2VmL2VqLzI3/NHgyNDAud2VicA" alt="Yoga" />
            <h4>YOGA PRACTICE</h4>
            <p>Enhance flexibility and mindfulness through our yoga and meditation classes.</p>
          </div>
          <div className="service-card scale-in">
            <img src="https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=400&q=80" alt="Weight Lifting" />
            <h4>WEIGHT LIFTING</h4>
            <p>Master proper lifting techniques with our expert weight training programs.</p>
          </div>
          <div className="service-card scale-in">
            <img src="https://images.unsplash.com/photo-1518310383802-640c2de311b2?w=400&q=80" alt="Pilates" />
            <h4>BEGINNER PILATES</h4>
            <p>Start your pilates journey with our beginner-friendly classes and guidance.</p>
          </div>
        </div>
      </section>

      <section className="statistics" ref={statsRef}>
        <div className="stat-item fade-in">
          <h3 className="stat-number">{animatedStats.satisfied}%</h3>
          <p className="stat-label">SATISFIED CLIENTS</p>
        </div>
        <div className="stat-item fade-in">
          <h3 className="stat-number">{animatedStats.equipment}+</h3>
          <p className="stat-label">EQUIPMENT</p>
        </div>
        <div className="stat-item fade-in">
          <h3 className="stat-number">{animatedStats.trainers}+</h3>
          <p className="stat-label">TRAINERS</p>
        </div>
        <div className="stat-item fade-in">
          <h3 className="stat-number">{animatedStats.members}+</h3>
          <p className="stat-label">MEMBERS</p>
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content fade-in">
          <h2 className="cta-title">Lets Starts Your Goal With Us</h2>
          <p className="cta-description">
            Start a membership that supports your fitness goals and keeps you motivated every step of the way. Our flexible plans give you access to expert training, modern equipment, and a powerful fitness community.
          </p>
          <button className="cta-btn">START MEMBERSHIP</button>
        </div>
      </section>

      <section className="coaches" id="coaches">
        <div className="coaches-header fade-in">
          <h2 className="section-title">OUR COACHES</h2>
        </div>
        <div className="coaches-grid">
          <div className="coach-card scale-in">
            <img src="https://images.unsplash.com/photo-1567013127542-490d757e51fc?w=400&q=80" alt="Rajavel" />
            <h4 style={{ color: '#ffffff' }}>RAJAVEL</h4>
            <p style={{ color: '#f97316' }}>FOUNDER & TRAINER</p>
          </div>
          <div className="coach-card scale-in">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" alt="David Raj" />
            <h4 style={{ color: '#ffffff' }}>DAVID RAJ</h4>
            <p style={{ color: '#f97316' }}>ASSISTANT COACH</p>
          </div>
          <div className="coach-card scale-in">
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" alt="Vijay Priyan" />
            <h4 style={{ color: '#ffffff' }}>VIJAY PRIYAN</h4>
            <p style={{ color: '#f97316' }}>JUNIOR TRAINER</p>
          </div>
        </div>
      </section>

      <section className="testimonials">
        <div className="testimonials-header fade-in">
          <h2 className="section-title">TESTIMONIALS</h2>
        </div>
        <div className="testimonial-container fade-in">
          <button className="nav-arrow prev-arrow" onClick={prevTestimonial}>←</button>
          <div className="testimonial-card">
            <img src={testimonials[currentTestimonial].image} alt={testimonials[currentTestimonial].name} />
            <h4>{testimonials[currentTestimonial].name}</h4>
            <div className="rating">{testimonials[currentTestimonial].rating}</div>
            <p className="testimonial-text">
              "{testimonials[currentTestimonial].text}"
            </p>
          </div>
          <button className="nav-arrow next-arrow" onClick={nextTestimonial}>→</button>
        </div>
      </section>

      <section className="contact-section">
        <div className="contact-left fade-in-left">
          <div className="contact-info-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M22 16.92V19.92C22.0011 20.1985 21.9441 20.4742 21.8325 20.7293C21.7209 20.9845 21.5573 21.2136 21.3521 21.4019C21.1468 21.5901 20.9046 21.7335 20.6407 21.8227C20.3769 21.9119 20.0974 21.9455 19.82 21.92C16.7428 21.5857 13.787 20.5341 11.19 18.84C8.77382 17.2914 6.72538 15.2429 5.17679 12.8268C3.47999 10.2214 2.42823 7.25523 2.09999 4.18C2.0745 3.90356 2.1077 3.62504 2.1962 3.36192C2.2847 3.0988 2.42707 2.85716 2.61422 2.65223C2.80138 2.4473 3.02934 2.28366 3.28342 2.17172C3.5375 2.05978 3.81219 2.00212 4.08999 2.002H7.08999C7.58344 1.99522 8.06057 2.17821 8.42512 2.51751C8.78967 2.85681 9.01409 3.32728 9.05999 3.82C9.14612 4.8036 9.34348 5.77374 9.64999 6.71C9.76661 7.06172 9.79153 7.43728 9.72206 7.80119C9.65259 8.16511 9.49123 8.50434 9.25399 8.786L8.02999 10.01C9.43256 12.5305 11.4925 14.5904 14.013 15.993L15.237 14.769C15.5187 14.5318 15.8579 14.3704 16.2218 14.3009C16.5857 14.2315 16.9613 14.2564 17.313 14.373C18.2493 14.6795 19.2194 14.8769 20.203 14.963C20.6999 15.0094 21.1733 15.2372 21.513 15.6066C21.8527 15.976 22.0316 16.4569 22.02 16.952L22 16.92Z" fill="white"/>
            </svg>
            <p>+91 9765132939</p>
          </div>
          <div className="contact-info-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M20 4H4C2.9 4 2.01 4.9 2.01 6L2 18C2 19.1 2.9 20 4 20H20C21.1 20 22 19.1 22 18V6C22 4.9 21.1 4 20 4ZM20 8L12 13L4 8V6L12 11L20 6V8Z" fill="white"/>
            </svg>
            <p>vfitnesstudio@gmail.com</p>
          </div>
          <div className="contact-info-box">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 2C8.13 2 5 5.13 5 9C5 14.25 12 22 12 22C12 22 19 14.25 19 9C19 5.13 15.87 2 12 2ZM12 11.5C10.62 11.5 9.5 10.38 9.5 9C9.5 7.62 10.62 6.5 12 6.5C13.38 6.5 14.5 7.62 14.5 9C14.5 10.38 13.38 11.5 12 11.5Z" fill="white"/>
            </svg>
            <p>Main Road Redhills, Avadi</p>
          </div>
        </div>
        <div className="contact-right fade-in-right">
          <h2 className="contact-heading">CONTACT</h2>
          <form className="contact-form">
            <input type="text" placeholder="Enter your Name" className="contact-input" />
            <input type="email" placeholder="Enter your Email" className="contact-input" />
            <textarea placeholder="Enter your Message" className="contact-input contact-textarea" rows="4"></textarea>
            <button type="submit" className="contact-submit-btn">SUBMIT</button>
          </form>
        </div>
      </section>

      <footer className="footer">
        <div className="footer-left">
          <div className="footer-logo">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="5" y="18" width="30" height="4" rx="2" fill="#f97316"/>
              <rect x="8" y="10" width="6" height="20" rx="3" fill="#ffffff"/>
              <rect x="26" y="10" width="6" height="20" rx="3" fill="#ffffff"/>
            </svg>
          </div>
          <h3 className="footer-tagline">Train Hard. Stay Strong. Live Healthy.</h3>
          <p className="footer-description">
            Transform your body and mind with professional training, modern equipment, and a motivating fitness environment.
          </p>
        </div>
        <div className="footer-middle-left">
          <h4 className="footer-heading">Quick Links</h4>
          <ul className="footer-links">
            <li><a href="#">Home</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#program">Programs</a></li>
            <li><a href="#coaches">Trainers</a></li>
            <li><a href="#">Membership</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-middle-right">
          <h4 className="footer-heading">Supports</h4>
          <ul className="footer-links">
            <li><a href="#">Login</a></li>
            <li><a href="#">My account</a></li>
            <li><a href="#">Subscribe</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
        <div className="footer-right">
          <h4 className="footer-heading">News Letter</h4>
          <div className="newsletter-form">
            <input type="email" placeholder="Enter Your Email" className="newsletter-input" />
            <button className="newsletter-btn">SUBSCRIBE</button>
          </div>
        </div>
        <div className="footer-bottom">
          <p>Copyright ©2026 All rights reserved by VFit Studio</p>
        </div>
      </footer>
    </div>
  )
}

export default App
