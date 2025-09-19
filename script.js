// Mobile Navigation Toggle
document.addEventListener("DOMContentLoaded", () => {
  const hamburger = document.querySelector(".hamburger")
  const navMenu = document.querySelector(".nav-menu")

  if (hamburger && navMenu) {
    hamburger.addEventListener("click", () => {
      hamburger.classList.toggle("active")
      navMenu.classList.toggle("active")
    })

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-link").forEach((link) => {
      link.addEventListener("click", () => {
        hamburger.classList.remove("active")
        navMenu.classList.remove("active")
      })
    })
  }

  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()
      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        })
      }
    })
  })

  // Fade in animation on scroll
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, observerOptions)

  // Add fade-in class to elements and observe them
  const elementsToAnimate = document.querySelectorAll(".feature-card, .ngo-card, .step, .benefit-card")
  elementsToAnimate.forEach((el) => {
    el.classList.add("fade-in")
    observer.observe(el)
  })

  // Contact form handling
  const contactForm = document.getElementById("contactForm")
  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const formObject = {}
      formData.forEach((value, key) => {
        formObject[key] = value
      })

      // Show loading state
      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...'
      submitBtn.disabled = true

      // Simulate form submission (since this is UI only)
      setTimeout(() => {
        // Show success message
        showNotification("Message sent successfully! We'll get back to you soon.", "success")

        // Reset form
        this.reset()

        // Reset button
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Donation form handling
  const donationForm = document.querySelector(".donation-form")
  if (donationForm) {
    donationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Processing...'
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification("Thank you for your donation! Your contribution will make a real difference.", "success")
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 3000)
    })

    // Amount button handling
    const amountButtons = document.querySelectorAll(".amount-btn")
    const customAmountDiv = document.querySelector(".custom-amount")
    const amountDisplay = document.querySelector(".amount-display")
    const totalAmount = document.querySelector(".total-amount")

    amountButtons.forEach((btn) => {
      btn.addEventListener("click", () => {
        amountButtons.forEach((b) => b.classList.remove("active"))
        btn.classList.add("active")

        const amount = btn.dataset.amount
        if (amount === "custom") {
          customAmountDiv.style.display = "block"
        } else {
          customAmountDiv.style.display = "none"
          updateAmountDisplay(amount)
        }
      })
    })

    // Custom amount input
    const customAmountInput = document.getElementById("customAmount")
    if (customAmountInput) {
      customAmountInput.addEventListener("input", (e) => {
        updateAmountDisplay(e.target.value)
      })
    }

    function updateAmountDisplay(amount) {
      const donationAmount = Number.parseFloat(amount) || 0
      const processingFee = donationAmount * 0.03
      const total = donationAmount + processingFee

      if (amountDisplay) amountDisplay.textContent = `$${donationAmount.toFixed(2)}`
      if (totalAmount) totalAmount.textContent = `$${total.toFixed(2)}`
    }

    // Payment method selection
    const paymentMethods = document.querySelectorAll(".payment-method")
    paymentMethods.forEach((method) => {
      method.addEventListener("click", () => {
        paymentMethods.forEach((m) => m.classList.remove("active"))
        method.classList.add("active")
      })
    })
  }

  // Registration form handling
  const registrationForm = document.querySelector(".registration-form")
  if (registrationForm) {
    let currentStep = 1
    const totalSteps = 4

    const nextBtn = document.getElementById("nextBtn")
    const prevBtn = document.getElementById("prevBtn")
    const submitBtn = document.getElementById("submitBtn")

    function showStep(step) {
      // Hide all steps
      document.querySelectorAll(".form-step").forEach((s) => s.classList.remove("active"))
      document.querySelectorAll(".progress-step").forEach((s) => s.classList.remove("active"))

      // Show current step
      document.querySelector(`[data-step="${step}"]`).classList.add("active")
      document.querySelector(`.progress-step[data-step="${step}"]`).classList.add("active")

      // Update navigation buttons
      prevBtn.style.display = step === 1 ? "none" : "inline-flex"
      nextBtn.style.display = step === totalSteps ? "none" : "inline-flex"
      submitBtn.style.display = step === totalSteps ? "inline-flex" : "none"
    }

    nextBtn.addEventListener("click", () => {
      if (currentStep < totalSteps) {
        currentStep++
        showStep(currentStep)

        if (currentStep === 4) {
          updateReviewSection()
        }
      }
    })

    prevBtn.addEventListener("click", () => {
      if (currentStep > 1) {
        currentStep--
        showStep(currentStep)
      }
    })

    function updateReviewSection() {
      const reviewContact = document.getElementById("reviewContact")
      const reviewOrg = document.getElementById("reviewOrg")
      const reviewDocs = document.getElementById("reviewDocs")

      if (reviewContact) {
        reviewContact.innerHTML = `
          <p><strong>Name:</strong> ${document.getElementById("contactFirstName")?.value} ${document.getElementById("contactLastName")?.value}</p>
          <p><strong>Email:</strong> ${document.getElementById("contactEmail")?.value}</p>
          <p><strong>Phone:</strong> ${document.getElementById("contactPhone")?.value}</p>
        `
      }

      if (reviewOrg) {
        reviewOrg.innerHTML = `
          <p><strong>Organization:</strong> ${document.getElementById("orgName")?.value}</p>
          <p><strong>Type:</strong> ${document.getElementById("orgType")?.value}</p>
          <p><strong>Cause:</strong> ${document.getElementById("cause")?.value}</p>
        `
      }

      if (reviewDocs) {
        const uploadedFiles = []
        document.querySelectorAll('input[type="file"]').forEach((input) => {
          if (input.files.length > 0) {
            uploadedFiles.push(input.files[0].name)
          }
        })
        reviewDocs.innerHTML =
          uploadedFiles.length > 0
            ? uploadedFiles.map((file) => `<p>✓ ${file}</p>`).join("")
            : "<p>No documents uploaded</p>"
      }
    }

    registrationForm.addEventListener("submit", (e) => {
      e.preventDefault()

      const submitBtn = document.getElementById("submitBtn")
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Submitting...'
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification(
          "Registration submitted successfully! We'll review your application and get back to you within 3-5 business days.",
          "success",
        )
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 3000)
    })
  }

  // Navbar background change on scroll
  window.addEventListener("scroll", () => {
    const navbar = document.querySelector(".navbar")
    if (window.scrollY > 50) {
      navbar.style.background = "rgba(255, 255, 255, 0.98)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.15)"
    } else {
      navbar.style.background = "rgba(255, 255, 255, 0.95)"
      navbar.style.boxShadow = "0 2px 20px rgba(0, 0, 0, 0.1)"
    }
  })

  // Collaboration page functionality
  const collaborationForm = document.getElementById("collaborationForm")
  if (collaborationForm) {
    collaborationForm.addEventListener("submit", function (e) {
      e.preventDefault()

      const submitBtn = this.querySelector('button[type="submit"]')
      const originalText = submitBtn.innerHTML
      submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Creating...'
      submitBtn.disabled = true

      setTimeout(() => {
        showNotification(
          "Collaboration project created successfully! Other NGOs can now view and join your initiative.",
          "success",
        )
        closeCollaborationForm()
        this.reset()
        submitBtn.innerHTML = originalText
        submitBtn.disabled = false
      }, 2000)
    })
  }

  // Close modal when clicking outside
  const modal = document.getElementById("collaborationModal")
  if (modal) {
    window.addEventListener("click", (event) => {
      if (event.target === modal) {
        closeCollaborationForm()
      }
    })
  }
})

// Notification system
function showNotification(message, type = "info") {
  // Remove existing notifications
  const existingNotifications = document.querySelectorAll(".notification")
  existingNotifications.forEach((notification) => notification.remove())

  // Create notification element
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
        <div class="notification-content">
            <i class="fas ${getNotificationIcon(type)}"></i>
            <span>${message}</span>
            <button class="notification-close">
                <i class="fas fa-times"></i>
            </button>
        </div>
    `

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 90px;
        right: 20px;
        background: ${getNotificationColor(type)};
        color: white;
        padding: 1rem 1.5rem;
        border-radius: 10px;
        box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
        z-index: 10000;
        transform: translateX(400px);
        transition: all 0.3s ease;
        max-width: 400px;
        font-family: 'Inter', sans-serif;
    `

  notification.querySelector(".notification-content").style.cssText = `
        display: flex;
        align-items: center;
        gap: 0.75rem;
    `

  notification.querySelector(".notification-close").style.cssText = `
        background: none;
        border: none;
        color: white;
        cursor: pointer;
        padding: 0;
        margin-left: auto;
        opacity: 0.8;
        transition: opacity 0.2s ease;
    `

  // Add to page
  document.body.appendChild(notification)

  // Animate in
  setTimeout(() => {
    notification.style.transform = "translateX(0)"
  }, 100)

  // Close button functionality
  notification.querySelector(".notification-close").addEventListener("click", () => {
    closeNotification(notification)
  })

  // Auto close after 5 seconds
  setTimeout(() => {
    if (document.body.contains(notification)) {
      closeNotification(notification)
    }
  }, 5000)
}

function closeNotification(notification) {
  notification.style.transform = "translateX(400px)"
  setTimeout(() => {
    if (document.body.contains(notification)) {
      notification.remove()
    }
  }, 300)
}

function getNotificationIcon(type) {
  switch (type) {
    case "success":
      return "fa-check-circle"
    case "error":
      return "fa-exclamation-circle"
    case "warning":
      return "fa-exclamation-triangle"
    default:
      return "fa-info-circle"
  }
}

function getNotificationColor(type) {
  switch (type) {
    case "success":
      return "linear-gradient(135deg, #10b981, #059669)"
    case "error":
      return "linear-gradient(135deg, #ef4444, #dc2626)"
    case "warning":
      return "linear-gradient(135deg, #f59e0b, #d97706)"
    default:
      return "linear-gradient(135deg, #2563eb, #1d4ed8)"
  }
}

// Add some interactive hover effects
document.addEventListener("DOMContentLoaded", () => {
  // Add parallax effect to hero image
  const heroImage = document.querySelector(".hero-image img")
  if (heroImage) {
    window.addEventListener("scroll", () => {
      const scrolled = window.pageYOffset
      const rate = scrolled * -0.5
      heroImage.style.transform = `translateY(${rate}px)`
    })
  }

  // Add tilt effect to cards
  const cards = document.querySelectorAll(".feature-card, .ngo-card, .benefit-card")
  cards.forEach((card) => {
    card.addEventListener("mouseenter", function (e) {
      this.style.transform = "translateY(-10px) rotateX(5deg)"
    })

    card.addEventListener("mouseleave", function (e) {
      this.style.transform = "translateY(0) rotateX(0)"
    })
  })

  // Add typing effect to hero title (optional enhancement)
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle && window.innerWidth > 768) {
    const text = heroTitle.textContent
    heroTitle.textContent = ""
    heroTitle.style.borderRight = "2px solid #2563eb"

    let i = 0
    const typeWriter = () => {
      if (i < text.length) {
        heroTitle.textContent += text.charAt(i)
        i++
        setTimeout(typeWriter, 50)
      } else {
        setTimeout(() => {
          heroTitle.style.borderRight = "none"
        }, 1000)
      }
    }

    // Start typing effect after a short delay
    setTimeout(typeWriter, 1000)
  }
})

// Collaboration functions
function showCollaborationForm() {
  const modal = document.getElementById("collaborationModal")
  if (modal) {
    modal.style.display = "block"
  }
}

function closeCollaborationForm() {
  const modal = document.getElementById("collaborationModal")
  if (modal) {
    modal.style.display = "none"
  }
}

function scrollToProjects() {
  const projectsSection = document.querySelector(".active-collaborations")
  if (projectsSection) {
    projectsSection.scrollIntoView({ behavior: "smooth" })
  }
}

function searchPartners() {
  const causeFilter = document.getElementById("causeFilter")?.value
  const locationFilter = document.getElementById("locationFilter")?.value
  const sizeFilter = document.getElementById("sizeFilter")?.value

  // Show loading state
  showNotification("Searching for collaboration partners...", "info")

  // Simulate search (in real app, this would make API call)
  setTimeout(() => {
    showNotification("Found 3 potential collaboration partners!", "success")
  }, 1500)
}

function sendCollaborationRequest(ngoId) {
  showNotification("Collaboration request sent successfully! The NGO will be notified.", "success")
}

// Performance optimization: Lazy loading for images
document.addEventListener("DOMContentLoaded", () => {
  const images = document.querySelectorAll("img")
  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const img = entry.target
        img.classList.add("fade-in")
        observer.unobserve(img)
      }
    })
  })

  images.forEach((img) => {
    imageObserver.observe(img)
  })
})
