import { useEffect, useRef, useState } from 'react'
import './App.css'
import gym from './assets/gym.png'
import gym2 from './assets/gym2.png'

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

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
          <a href="#" className="nav-link">Home</a>
          <a href="#about" className="nav-link">About</a>
          <a href="#program" className="nav-link">Program</a>
          <a href="#coaches" className="nav-link">Coaching</a>
          <button className="contact-btn">Contact</button>
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
          <img src={gym2} alt="About Us" />
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

      <section className="statistics">
        <div className="stat-item fade-in">
          <h3 className="stat-number">98%</h3>
          <p className="stat-label">SATISFIED CLIENTS</p>
        </div>
        <div className="stat-item fade-in">
          <h3 className="stat-number">100+</h3>
          <p className="stat-label">EQUIPMENT</p>
        </div>
        <div className="stat-item fade-in">
          <h3 className="stat-number">10+</h3>
          <p className="stat-label">TRAINERS</p>
        </div>
        <div className="stat-item fade-in">
          <h3 className="stat-number">1000+</h3>
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
            <h4>RAJAVEL</h4>
            <p>FOUNDER & TRAINER</p>
          </div>
          <div className="coach-card scale-in">
            <img src="https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=400&q=80" alt="David Raj" />
            <h4>DAVID RAJ</h4>
            <p>ASSISTANT COACH</p>
          </div>
          <div className="coach-card scale-in">
            <img src="https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?w=400&q=80" alt="Vijay Priyan" />
            <h4>VIJAY PRIYAN</h4>
            <p>JUNIOR TRAINER</p>
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
    </div>
  )
}

export default App
