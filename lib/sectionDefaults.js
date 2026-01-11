export const heroDefaults = {
  videoUrl: "/img/general/tan%C4%B1t%C4%B1m.mp4",
  kicker: "Istanbul • Türkiye",
  titleLine1: "Dental Implants in Türkiye",
  titleLine2: "with BM TÜRKIEY",
  subtitle:
    "Advanced implantology, immediate-load options, and long-lasting restorations crafted in the heart of Istanbul.",
  whatsappCta: "WhatsApp Implant Plan →",
  form: {
    kicker: "Request an implant consultation",
    title: "Start your implant assessment",
    description:
      "Tell us about your missing teeth or implant needs. Our coordinators will call you shortly.",
    privacyNote: "Your details stay private.",
    submittingText: "SUBMITTING...",
    submitText: "SUBMIT REQUEST",
    fields: {
      fullNameLabel: "Full name",
      fullNamePlaceholder: "Name Surname",
      phoneLabel: "Phone",
      phonePlaceholder: "+44 ...",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Describe missing teeth, dentures, or implant goals."
    }
  }
};

export const dentalImplantDefaults = {
  headingLine1: "Implantology &",
  headingLine2: "Full-Arch Excellence",
  paragraphs: [
    "At BM TÜRKIEY, we rebuild confident smiles with guided implant surgery, immediate loading when suitable, and precision prosthetics tailored to each jaw.",
    "From single-tooth implants to All-on-4/All-on-6 rehabilitations, our surgeons and prosthodontists focus on long-term stability, chewing comfort, and natural aesthetics."
  ],
  buttonText: "Get Implant Quote →",
  mainImage: "/uploads/dental-implant/smile1.jpg",
  mainImageAlt: "Dental implant restoration result",
  detailImage: "/uploads/dental-implant/smile2.jpg",
  detailImageAlt: "Implant-supported restoration detail"
};

export const popularTreatmentsDefaults = {
  kicker: "Implant Solutions",
  title: "Most Requested Restorations",
  description:
    "Guided implant treatments designed for stability, fast healing, and natural-looking prosthetics.",
  ctaText: "Discuss My Implant Case →",
  ctaHref: "https://wa.me/+905465266449",
  items: [
    {
      title: "All-on-4 / All-on-6",
      description:
        "Fixed full-arch solutions with guided surgery, titanium implants, and immediate provisional bridges when clinically suitable.",
      image: "/uploads/dental-implant/sec-dental-implant.jpg",
      alt: "All-on-4 dental implants"
    },
    {
      title: "Single & Multiple Implants",
      description:
        "Replace one or several missing teeth with precise implant placement and custom-milled crowns that blend seamlessly.",
      image: "/uploads/dental-implant/smile3.jpg",
      alt: "Single tooth dental implant"
    },
    {
      title: "Implant-Supported Bridges",
      description:
        "Stable, hygienic bridges anchored on implants to restore chewing power and natural tooth shape.",
      image: "/uploads/dental-implant/zirkonyum-veneers.jpg",
      alt: "Implant-supported bridge"
    },
    {
      title: "Bone Grafting & Sinus Lift",
      description:
        "Vertical and lateral augmentation, sinus lift, and PRF-supported healing to create the ideal foundation for implants.",
      image: "/uploads/dental-implant/sec-veneers.jpg",
      alt: "Bone grafting for dental implants"
    }
  ]
};

export const bookAppointmentDefaults = {
  backgroundImage: "/uploads/clinic/clinic-1.jpeg",
  kicker: "Request an appointment",
  title: "Schedule your implant consultation",
  description:
    "Tell us about missing teeth, dentures, or implant goals. Our team will call you shortly.",
  privacyNote: "Your details stay private.",
  submittingText: "SUBMITTING...",
  submitText: "SUBMIT REQUEST",
  fields: {
    fullNameLabel: "Full name",
    fullNamePlaceholder: "Name Surname",
    phoneLabel: "Phone",
    phonePlaceholder: "+44 ...",
    emailLabel: "Email",
    emailPlaceholder: "you@example.com",
    messageLabel: "Message (optional)",
    messagePlaceholder: "Tell us briefly about your smile goals."
  }
};

export const beforeAfterDefaults = {
  titleLine1: "Implant Dentistry Center",
  titleLine2: "in Istanbul, Türkiye",
  bullets: [
    {
      prefix: "Over ",
      highlight: "12,000 Implants",
      suffix: " placed"
    },
    {
      prefix: "Over ",
      highlight: "4,500 Full-arch",
      suffix: " restorations"
    },
    {
      prefix: "Digital planning with ",
      highlight: "guided surgery",
      suffix: " protocols"
    },
    {
      prefix: "",
      highlight: "Weekend & evening appointments",
      suffix: " — available by request"
    }
  ],
  ctaText: "Implant Consultation →",
  cases: [
    {
      image: "/uploads/ba3.jpg",
      caption: "Full-arch implant bridge with immediate loading."
    },
    {
      image: "/uploads/ba2.jpg",
      caption: "Single implant crown matched to natural teeth."
    },
    {
      image: "/uploads/ba4.jpg",
      caption: "Upper and lower implant rehabilitation for function."
    },
    {
      image: "/uploads/ba13.jpg",
      caption: "Implant-supported bridge to replace multiple teeth."
    },
    {
      image: "/uploads/ba6.jpg",
      caption: "Before-after bite restoration with implants."
    }
  ]
};

export const fullWidthCampaignDefaults = {
  backgroundImage: "/uploads/air.jpg",
  backgroundAlt: "Dental Implant Travel Offer",
  overlayImage: "/uploads/dental-implant/smile3.jpg",
  overlayAlt: "Implant case highlight",
  badge: "Dental Implant",
  headingLine1: "Complimentary",
  headingLine2: "Flight for Full-Arch",
  description: "Round-trip tickets for qualifying All-on-4 / All-on-6 treatments."
};

export const stepFormDefaults = {
  image: "/uploads/dental-implant/step-form-image.jpg",
  imageAlt: "Dental implant planning",
  kicker: "Quick Case Check",
  title: "Free Implant Analysis",
  progressLabel: "Progress",
  stepLabel: "Step",
  totalSteps: 3,
  selectedLabel: "Selected:",
  steps: {
    step1Title: "Select Case Type",
    step1Description:
      "Tell us what you need restored so we can match the right implant approach.",
    step2Title: "Pick Preferred Solution",
    step2Description:
      "Choose the option that best fits your goal. Final planning is confirmed after diagnostics.",
    step3Title: "Share Details",
    step3Description:
      "Leave your details — our coordinators will review and call you shortly.",
    privacyNote: "Your details stay private."
  },
  genderOptions: [
    {
      value: "single",
      label: "Single / Few Teeth",
      helper: "Case Type",
      icon: "fa-tooth"
    },
    {
      value: "full-arch",
      label: "Full-Arch / All-on-X",
      helper: "Case Type",
      icon: "fa-teeth-open"
    },
    {
      value: "denture",
      label: "Loose Denture",
      helper: "Case Type",
      icon: "fa-face-smile"
    }
  ],
  toothOptions: [
    {
      key: "single-implant",
      label: "Single Implant",
      image: "/uploads/dental-implant/smile1.jpg"
    },
    {
      key: "implant-bridge",
      label: "Implant Bridge",
      image: "/uploads/dental-implant/zirkonyum-veneers.jpg"
    },
    {
      key: "all-on-4",
      label: "All-on-4",
      image: "/uploads/dental-implant/sec-dental-implant.jpg"
    },
    {
      key: "all-on-6",
      label: "All-on-6",
      image: "/uploads/dental-implant/smile3.jpg"
    },
    {
      key: "bone-graft",
      label: "Bone Graft / Sinus",
      image: "/uploads/dental-implant/sec-veneers.jpg"
    }
  ],
  fields: {
    fullNameLabel: "Full Name",
    fullNamePlaceholder: "John Smith",
    phoneLabel: "Phone",
    phonePlaceholder: "+90 5xx xxx xx xx"
  },
  prevLabel: "Prev",
  nextLabel: "Next",
  submitLabel: "Submit Request"
};

export const treatmentsDefaults = {
  kicker: "Implant Dentistry",
  titleLine1: "Dental Implant,",
  titleLine2: "Full-Arch & Single-Tooth",
  description:
    "Fixed implant solutions restoring chewing power and confident smiles using guided surgery and custom prosthetics.",
  highlights: [
    "Immediate or early loading when suitable",
    "3D guided planning",
    "Custom zirconia or porcelain bridges"
  ],
  noteLabel: "Quick Note",
  noteText: "Final suitability is confirmed after CBCT and clinical assessment.",
  galleryLabel: "View Restorations",
  galleryHref: "/dental-implant/en/gallery",
  ctaText: "Book Implant Evaluation →",
  mediaItems: [
    {
      type: "embed",
      provider: "youtube",
      id: "DWjaF4lDca8",
      poster: "/reels/DWjaF4lDca8.jpg",
      aspect: "9/16"
    },
    {
      type: "embed",
      provider: "youtube",
      id: "b285Dt47ipQ",
      poster: "/reels/b285Dt47ipQ.avif",
      aspect: "9/16"
    },
    {
      type: "embed",
      provider: "youtube",
      id: "Ht_YQEh9Gwo",
      poster: "/reels/Ht_YQEh9Gwo.avif",
      aspect: "9/16"
    },
    {
      type: "embed",
      provider: "youtube",
      id: "Ev7R2x0UCZo",
      poster: "/reels/Ev7R2x0UCZo.avif",
      aspect: "9/16"
    }
  ]
};

export const teamMembersDefaults = {
  kicker: "Team Members",
  title: "Meet the specialists behind every smile",
  description:
    "A multidisciplinary team of dentists and coordinators dedicated to crafting confident, natural-looking smiles.",
  items: [
    {
      name: "Dr. Selin A.",
      role: "Lead Aesthetic Dentist",
      description:
        "Over 12 years in cosmetic dentistry focusing on natural veneers, smile design, and minimally invasive treatments.",
      image: "/uploads/team/dr-selin.jpg",
      alt: "Dr. Selin"
    },
    {
      name: "Dr. Emir K.",
      role: "Implant & Prosthodontics",
      description:
        "Full-mouth rehabilitations, advanced implant planning, and functional bite restoration with digital workflows.",
      image: "/uploads/team/dr-emir.jpg",
      alt: "Dr. Emir"
    },
    {
      name: "Elif T.",
      role: "Patient Coordinator",
      description:
        "Guides international patients, schedules appointments, and keeps every step transparent from first call to aftercare.",
      image: "/uploads/team/elif.jpg",
      alt: "Elif"
    },
    {
      name: "Mert C.",
      role: "Clinical Assistant",
      description:
        "Supports chairside care, sterilization protocols, and ensures every visit runs smoothly and on time.",
      image: "/uploads/team/mert.jpg",
      alt: "Mert"
    }
  ]
};

export const bookAppointmentSecondaryDefaults = {
  ...bookAppointmentDefaults
};

export const internationalPatientsDefaults = {
  backgroundImage: "/uploads/general/istanbul.jpg",
  backgroundAlt: "Istanbul",
  kicker: "• Istanbul • Health Tourism •",
  titleLine1: "BM TÜRKIEY",
  titleLine2: "International Patients Program",
  description:
    "We provide a seamless, safe and personalised implant treatment experience for international patients. With expert clinicians, modern technologies and dedicated coordinators, BM TÜRKIEY ensures a smooth and comfortable journey throughout your stay in Istanbul.",
  buttonText: "Book Consultation >"
};

export const clinicDefaults = {
  images: [
    {
      src: "/uploads/clinic/clinic-1.jpeg",
      alt: "Clinic moment 1"
    },
    {
      src: "/uploads/clinic/clinic-2.jpeg",
      alt: "Clinic moment 2"
    },
    {
      src: "/uploads/clinic/clinic-3.jpeg",
      alt: "Clinic moment 3"
    },
    {
      src: "/uploads/clinic/clinic-4.jpeg",
      alt: "Clinic moment 4"
    },
    {
      src: "/uploads/clinic/clinic-6.jpeg",
      alt: "Clinic moment 5"
    },
    {
      src: "/uploads/clinic/clinic-7.jpeg",
      alt: "Clinic moment 6"
    }
  ],
  kicker: "Istanbul • Türkiye",
  titleLine1: "Ödüllü",
  titleLine2: "Gülüşlerin Adresi",
  paragraphs: [
    "Uzun yıllardır ekibimiz, Türkiye'den, Avrupa'dan ve dünyanın dört bir yanından gelen hastalar için doğal ve uzun ömürlü gülüşler tasarlamaya odaklanmaktadır. Her tedavi planı; minimal invaziv teknikler ile ileri dijital planlamanın birleşimiyle, tamamen kişiye özel olarak hazırlanır.",
    "Kişiselleştirilmiş yaklaşımımız, detaylara gösterdiğimiz titizlik ve sizi yansıtan, daha özgüvenli hissettiren sonuçlara olan bağlılığımızla gurur duyuyoruz."
  ],
  ctaText: "WhatsApp Consultation →"
};

export const healthTourismDefaults = {
  kicker: "4 easy steps",
  title: "To Restore Your Bite",
  description:
    "From first message to final check-up, our team guides you through a seamless implant journey at Atom Clinic.",
  steps: [
    {
      icon: "fa-comments",
      label: "STEP 1",
      title: "Tell us your implant case",
      description:
        "Share missing teeth, denture issues, photos, and X-rays (if available). Our coordinators review your needs carefully."
    },
    {
      icon: "fa-clipboard-list",
      label: "STEP 2",
      title: "Plan & transparent quote",
      description:
        "Within 24 hours our doctors outline a tailored implant plan, healing timeline, and clear pricing."
    },
    {
      icon: "fa-plane-departure",
      label: "STEP 3",
      title: "Travel & implant surgery",
      description:
        "Once dates are set, we arrange airport pick-up, hotel options, and clinical appointments at BM TÜRKIEY."
    },
    {
      icon: "fa-check-circle",
      label: "STEP 4",
      title: "Last check-up & maintenance",
      description:
        "Before you return home, we complete final checks, provide hygiene guidance, and plan remote follow-ups."
    }
  ]
};

export const luckySpinDefaults = {
  backgroundImage: "/uploads/spin-bg-bottom.png",
  backgroundAlt: "",
  kicker: "Lucky Spin",
  tagline: "Flip to Win",
  title: "Try Your Luck",
  description: "Try your luck to get a discount coupon.",
  spinLabel: "Spin Now",
  spinLoadingLabel: "Spinning...",
  resultLabel: "You get",
  resultPlaceholder: "Spin to reveal your prize.",
  prizes: [
    "20% Discount",
    "$75 Discount",
    "10% Discount",
    "50% Flight Ticket",
    "$50 Discount",
    "$100 Discount",
    "15% Discount",
    "$150 Discount"
  ],
  form: {
    title: "Get your prize",
    description: "Enter your details to claim your offer.",
    fields: {
      fullNameLabel: "Full Name",
      fullNamePlaceholder: "Name Surname",
      phoneLabel: "Phone",
      phonePlaceholder: "+44 ..."
    },
    submitText: "Submit Request",
    privacyNote: "Your details stay private."
  }
};

export const localAttractionsDefaults = {
  kicker: "Local Attractions",
  title: "Around the clinic, in a few minutes",
  description:
    "Shopping and city highlights near BM TÜRKIEY — easy to reach between appointments.",
  swipeHint: "Swipe to explore →",
  ctaText: "WhatsApp Consultation →",
  items: [
    {
      title: "Fisekhane",
      category: "Lifestyle",
      description:
        "A stylish cultural and social complex featuring restaurants, cafés and event spaces. Blending historic architecture with modern city life, it's ideal for relaxed evenings.",
      minutes: "17",
      distance: "6.2 km",
      image: "/uploads/attractions/fisekhane.jpg",
      alt: "Fisekhane"
    },
    {
      title: "A Plus AVM",
      category: "Shopping Mall",
      description:
        "A modern shopping destination with international brands, cafés and lifestyle stores. Ideal for a quick break, dining or shopping before or after your appointment.",
      minutes: "12",
      distance: "3.9 km",
      image: "/uploads/attractions/aplus-avm.jpg",
      alt: "A Plus AVM"
    },
    {
      title: "Metroport AVM",
      category: "Shopping Mall",
      description:
        "A centrally located mall offering convenient shopping and everyday essentials. Perfect for short visits, quick meals and easy access from nearby transport links.",
      minutes: "5",
      distance: "1.3 km",
      image: "/uploads/attractions/metroport-avm.jpg",
      alt: "Metroport AVM"
    },
    {
      title: "Atatürk Airport",
      category: "Airport",
      description:
        "One of Istanbul's most accessible airport zones, now transformed into a major urban area. Surrounded by wide green spaces and city connections, offering easy transportation access.",
      minutes: "16",
      distance: "7 km",
      image: "/uploads/attractions/ataturk-airport.jpg",
      alt: "Atatürk Airport"
    }
  ]
};

export const googleReviewsDefaults = {
  kicker: "Google Reviews",
  title: "Real Patient Stories, Real Reviews",
  description:
    "A glimpse of what international patients say about their experience at BM TÜRKIEY.",
  rating: "4.9",
  ratingCountLabel: "380+ Reviews",
  ctaText: "Free Consultation →",
  items: [
    {
      initials: "MM",
      name: "Matthew",
      text: "The entire implant process was seamless from the first WhatsApp message to the final check-up. The team explained every step clearly, helped with timing, and made me feel genuinely cared for. My new implant bridge looks incredibly natural — even months later, chewing feels stable and comfortable.",
      count: "57 Reviews"
    },
    {
      initials: "SS",
      name: "Sophie",
      text: "Super professional team and a beautiful clinic. I felt safe, informed, and the results exceeded my expectations.",
      count: "12 Reviews"
    },
    {
      initials: "HH",
      name: "Helen",
      text: "Loved the planning and communication. Everything ran on time, and the aftercare instructions were very clear.",
      count: "4 Reviews"
    },
    {
      initials: "DD",
      name: "Daniel",
      text: "The process was very transparent. I knew exactly what would be done and how long it would take. The result looks natural and feels great.",
      count: "23 Reviews"
    },
    {
      initials: "EE",
      name: "Emily",
      text: "Natural-looking teeth were my priority, and they nailed it. The shade and shape of my implant crowns fit my face perfectly.",
      count: "9 Reviews"
    },
    {
      initials: "OO",
      name: "Oliver",
      text: "The clinic was spotless and the team was very attentive. Aftercare support was excellent and they replied quickly whenever I had a question.",
      count: "31 Reviews"
    }
  ]
};

export const faqsDefaults = {
  kicker: "Help Center",
  title: "Dental Implant FAQ",
  description: "Quick answers for international implant patients.",
  responseTimeLabel: "Average response time:",
  responseTimeValue: "30 minutes",
  footerNote:
    "For medical accuracy, a final plan is confirmed after clinical assessment.",
  form: {
    kicker: "Request an appointment",
    title: "Schedule your implant consultation",
    description:
      "Share a few details and our team will contact you shortly.",
    submittingText: "SUBMITTING...",
    submitText: "SUBMIT REQUEST",
    privacyNote: "Your details stay private.",
    fields: {
      fullNameLabel: "Full name",
      fullNamePlaceholder: "Name Surname",
      phoneLabel: "Phone",
      phonePlaceholder: "+44 ...",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Message (optional)",
      messagePlaceholder: "Tell us briefly about your smile goals."
    }
  },
  items: [
    {
      icon: "fa-circle-question",
      title: "How long should I plan to stay for implants?",
      subtitle:
        "Full-arch cases typically need 5-7 days; staged healing is scheduled in advance.",
      body:
        "For All-on-4/All-on-6, expect diagnostics, surgery, and provisional fitting within the week. If bone grafting is required, we plan staged visits with clear timelines."
    },
    {
      icon: "fa-tooth",
      title: "Do dental implants hurt?",
      subtitle:
        "Modern anesthesia and guided techniques minimise discomfort.",
      body:
        "Most patients describe pressure rather than pain during placement. Mild post-op soreness is managed with medication and detailed aftercare instructions."
    },
    {
      icon: "fa-shield-heart",
      title: "Is there a warranty / aftercare plan?",
      subtitle:
        "Clear aftercare guidance and follow-up support after you return home.",
      body:
        "You'll receive written aftercare instructions, remote follow-ups, and manufacturer warranty details for the implants used. Prosthetic warranty terms are explained during consultation."
    },
    {
      icon: "fa-credit-card",
      title: "Can I get a transparent quote before travelling?",
      subtitle:
        "Yes — we provide a clear plan and cost estimate after your evaluation.",
      body:
        "Share your details, photos, and any scans; our team prepares a preliminary plan and estimate. Final pricing depends on clinical examination and confirmed scope."
    }
  ]
};

export const implantMatrixDefaults = {
  kicker: "Treatment Matrix",
  title: "Implant Options at a Glance",
  description:
    "Compare our most requested implant solutions, ideal indications, timelines in Türkiye, and expected results. Your final plan is confirmed after diagnostics.",
  columns: [
    "Technique",
    "Type",
    "Ideal Candidates",
    "Advantages",
    "Disadvantages",
    "Time in Türkiye",
    "Results"
  ],
  rows: [
    {
      technique: "Single Implant",
      type: "Titanium post + crown",
      candidates: "1–3 missing teeth",
      advantages: "Natural feel, independent support",
      disadvantages: "Minor surgery, healing time",
      timeInTurkey: "5–7 days + healing",
      results: "Lifelong with proper care",
      values: [
        "Single Implant",
        "Titanium post + crown",
        "1–3 missing teeth",
        "Natural feel, independent support",
        "Minor surgery, healing time",
        "5–7 days + healing",
        "Lifelong with proper care"
      ]
    },
    {
      technique: "All-on-4 / All-on-6",
      type: "Full-arch prosthesis on implants",
      candidates: "Fully edentulous or failing dentition",
      advantages: "Fixed, stable, full set of teeth",
      disadvantages: "Requires healing period",
      timeInTurkey: "7–10 days",
      results: "Full-arch smile with high stability",
      values: [
        "All-on-4 / All-on-6",
        "Full-arch prosthesis on implants",
        "Fully edentulous or failing dentition",
        "Fixed, stable, full set of teeth",
        "Requires healing period",
        "7–10 days",
        "Full-arch smile with high stability"
      ]
    },
    {
      technique: "Zirconium Implant Crowns",
      type: "Ceramic crown on implant",
      candidates: "Aesthetic zones, cosmetic focus",
      advantages: "Highly aesthetic, metal-free",
      disadvantages: "Higher cost",
      timeInTurkey: "5–7 days",
      results: "Natural look, strong bite",
      values: [
        "Zirconium Implant Crowns",
        "Ceramic crown on implant",
        "Aesthetic zones, cosmetic focus",
        "Highly aesthetic, metal-free",
        "Higher cost",
        "5–7 days",
        "Natural look, strong bite"
      ]
    },
    {
      technique: "Bone Grafting",
      type: "Graft material + healing",
      candidates: "Patients with jawbone loss",
      advantages: "Enables implants in difficult cases",
      disadvantages: "Healing time required",
      timeInTurkey: "1–2 days (plus healing)",
      results: "Strong foundation for implants",
      values: [
        "Bone Grafting",
        "Graft material + healing",
        "Patients with jawbone loss",
        "Enables implants in difficult cases",
        "Healing time required",
        "1–2 days (plus healing)",
        "Strong foundation for implants"
      ]
    },
    {
      technique: "Immediate Implants",
      type: "Extraction + implant + temp tooth",
      candidates: "Select patients with healthy bone",
      advantages: "No waiting period, instant teeth",
      disadvantages: "Not suitable for everyone",
      timeInTurkey: "1–2 days",
      results: "Instant smile, long-term solution",
      values: [
        "Immediate Implants",
        "Extraction + implant + temp tooth",
        "Select patients with healthy bone",
        "No waiting period, instant teeth",
        "Not suitable for everyone",
        "1–2 days",
        "Instant smile, long-term solution"
      ]
    },
    {
      technique: "Digital Implant Planning",
      type: "3D imaging + guided surgery",
      candidates: "All implant patients",
      advantages: "Safe, accurate, less invasive",
      disadvantages: "Adds planning step",
      timeInTurkey: "Same day (planning)",
      results: "Precise implant placement",
      values: [
        "Digital Implant Planning",
        "3D imaging + guided surgery",
        "All implant patients",
        "Safe, accurate, less invasive",
        "Adds planning step",
        "Same day (planning)",
        "Precise implant placement"
      ]
    }
  ]
};

export const techniquesUsedDefaults = {
  kicker: "Techniques Used",
  title: "Advanced implant methods we use",
  description:
    "From immediate implants to guided surgery, here are the core techniques our team applies to deliver stable, natural results.",
  slides: [
    {
      title: "Immediate Implants",
      body:
        "For suitable cases, extraction and implant placement happen in the same visit, followed by a temporary crown. This reduces treatment time and avoids removable solutions during healing.",
      image: "/uploads/dental-implant/smile2.jpg"
    },
    {
      title: "All-on-4 / All-on-6",
      body:
        "Full-arch rehabilitation on 4–6 implants with guided planning and immediate provisional bridges when clinically appropriate, restoring confidence and function fast.",
      image: "/uploads/dental-implant/smile3.jpg"
    },
    {
      title: "Guided Surgery",
      body:
        "3D imaging, surgical guides, and precise planning to optimise implant positioning, safety, and long-term stability for both single implants and full-arch cases.",
      image: "/uploads/dental-implant/sec-dental-implant.jpg"
    }
  ]
};

export const SECTION_DEFAULTS = {
  hero: heroDefaults,
  dentalImplant: dentalImplantDefaults,
  popularTreatments: popularTreatmentsDefaults,
  bookAppointmentPrimary: bookAppointmentDefaults,
  beforeAfter: beforeAfterDefaults,
  fullWidthCampaign: fullWidthCampaignDefaults,
  stepForm: stepFormDefaults,
  treatments: treatmentsDefaults,
  bookAppointmentSecondary: bookAppointmentSecondaryDefaults,
  internationalPatients: internationalPatientsDefaults,
  teamMembers: teamMembersDefaults,
  clinic: clinicDefaults,
  healthTourism: healthTourismDefaults,
  luckySpin: luckySpinDefaults,
  localAttractions: localAttractionsDefaults,
  implantMatrix: implantMatrixDefaults,
  techniquesUsed: techniquesUsedDefaults,
  googleReviews: googleReviewsDefaults,
  faqs: faqsDefaults
};

export const SECTION_DEFAULTS_RU = {
  footer: {
    about:
      "В BM TÜRKIEY мы восстанавливаем стабильные и естественные улыбки с помощью имплантологии и современного протезирования. Прозрачное планирование и опытная команда обеспечивают предсказуемый результат.",
    phoneLabel: "Телефон:",
    whatsappLabel: "WhatsApp:",
    emailLabel: "E-mail:",
    addressLabel: "Адрес:",
    treatments: "Услуги",
    popular: "Популярное",
    beforeAfter: "До и После",
    testimonials: "Отзывы",
    faqs: "FAQ",
    healthTourism: "Медицинский туризм",
    privacy: "Политика конфиденциальности",
    terms: "Условия"
  },
  hero: {
    ...heroDefaults,
    titleLine1: "Дентальные импланты в Турции",
    titleLine2: "с BM TÜRKIEY",
    subtitle:
      "Современная имплантация, протезирование и устойчивые результаты в сердце Стамбула.",
    kicker: "Стамбул • Турция",
    whatsappCta: "Консультация в WhatsApp →",
    form: {
      ...heroDefaults.form,
      kicker: "Записаться",
      title: "Назначить консультацию по имплантам",
      description: "Оставьте контакты — координатор свяжется в ближайшее время.",
      privacyNote: "Ваши данные конфиденциальны.",
      submittingText: "ОТПРАВКА...",
      submitText: "ОТПРАВИТЬ",
      fields: {
        ...heroDefaults.form.fields,
        fullNameLabel: "Полное имя",
        fullNamePlaceholder: "Имя Фамилия",
        phoneLabel: "Телефон",
        phonePlaceholder: "+7 ...",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        messageLabel: "Комментарий (опционально)",
        messagePlaceholder: "Опишите задачу: отсутствующие зубы, протезы, цель."
      }
    }
  },
  dentalImplant: {
    ...dentalImplantDefaults,
    headingLine1: "Имплантация и",
    headingLine2: "полноарочные решения",
    paragraphs: [
      "Мы восстанавливаем уверенность в улыбке с помощью направляемой имплантации, возможности немедленной нагрузки и точного протезирования под каждый челюстной сегмент.",
      "От одиночных имплантов до All-on-4/All-on-6 — хирург и ортопед работают на долговечность, комфорт жевания и естественную эстетику."
    ],
    buttonText: "Получить расчёт →",
    mainImageAlt: "Результат имплантации",
    detailImageAlt: "Деталь протеза"
  },
  popularTreatments: {
    ...popularTreatmentsDefaults,
    kicker: "Имплант-решения",
    title: "Популярные варианты",
    description:
      "Направляемая имплантация с опорой на стабильность, быстрое заживление и натуральный вид протезов.",
    ctaText: "Обсудить мой случай →",
    items: [
      {
        title: "All-on-4 / All-on-6",
        description:
          "Фиксированные полноарочные решения с направляемой хирургией и временным мостом при показаниях.",
        image: "/uploads/dental-implant/sec-dental-implant.jpg",
        alt: "All-on-4 импланты"
      },
      {
        title: "Одиночные и множественные импланты",
        description:
          "Замена одного или нескольких зубов с точной установкой имплантов и индивидуальными коронками.",
        image: "/uploads/dental-implant/smile3.jpg",
        alt: "Одиночный имплант"
      },
      {
        title: "Мосты на имплантах",
        description:
          "Стабильные и гигиеничные мосты на имплантах для восстановления жевания и формы зубов.",
        image: "/uploads/dental-implant/zirkonyum-veneers.jpg",
        alt: "Мост на имплантах"
      },
      {
        title: "Костная пластика и синус-лифт",
        description:
          "Вертикальное/латеральное наращивание, синус-лифт и поддержка PRF для подготовки к имплантам.",
        image: "/uploads/dental-implant/sec-veneers.jpg",
        alt: "Костная пластика"
      }
    ]
  },
  bookAppointmentPrimary: {
    ...bookAppointmentDefaults,
    kicker: "Записаться",
    title: "Запланировать консультацию",
    description:
      "Опишите отсутствующие зубы, протезы или цель лечения. Свяжемся и обсудим план.",
    privacyNote: "Ваши данные конфиденциальны.",
    submittingText: "ОТПРАВКА...",
    submitText: "ОТПРАВИТЬ",
    fields: {
      ...bookAppointmentDefaults.fields,
      fullNameLabel: "Полное имя",
      fullNamePlaceholder: "Имя Фамилия",
      phoneLabel: "Телефон",
      phonePlaceholder: "+7 ...",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Комментарий (опционально)",
      messagePlaceholder: "Опишите задачу/ожидания."
    }
  },
  bookAppointmentSecondary: {
    ...bookAppointmentDefaults,
    kicker: "Записаться",
    title: "Запланировать консультацию",
    description:
      "Опишите отсутствующие зубы, протезы или цель лечения. Свяжемся и обсудим план.",
    privacyNote: "Ваши данные конфиденциальны.",
    submittingText: "ОТПРАВКА...",
    submitText: "ОТПРАВИТЬ",
    fields: {
      ...bookAppointmentDefaults.fields,
      fullNameLabel: "Полное имя",
      fullNamePlaceholder: "Имя Фамилия",
      phoneLabel: "Телефон",
      phonePlaceholder: "+7 ...",
      emailLabel: "Email",
      emailPlaceholder: "you@example.com",
      messageLabel: "Комментарий (опционально)",
      messagePlaceholder: "Опишите задачу/ожидания."
    }
  },
  beforeAfter: {
    ...beforeAfterDefaults,
    titleLine1: "Центр имплантации",
    titleLine2: "в Стамбуле, Турция",
    bullets: [
      { prefix: "Более ", highlight: "12 000 имплантов", suffix: " установлено" },
      { prefix: "Более ", highlight: "4 500 полных дуг", suffix: " восстановлено" },
      {
        prefix: "Цифровое планирование и ",
        highlight: "направляемая хирургия",
        suffix: ""
      },
      {
        prefix: "",
        highlight: "Вечерние/выходные приём",
        suffix: " — по запросу"
      }
    ],
    ctaText: "Консультация по имплантам →",
    cases: beforeAfterDefaults.cases.map((c) => ({
      ...c,
      caption: "Реабилитация на имплантах"
    }))
  },
  fullWidthCampaign: {
    ...fullWidthCampaignDefaults,
    backgroundAlt: "Предложение для имплантации",
    overlayAlt: "Кейс имплантации",
    badge: "Импланты",
    headingLine1: "Билет",
    headingLine2: "в подарок (All-on-X)",
    description: "Авиабилет туда-обратно для подходящих полноарочных кейсов."
  },
  stepForm: {
    ...stepFormDefaults,
    kicker: "Быстрая проверка",
    title: "Бесплатный анализ имплантов",
    steps: {
      ...stepFormDefaults.steps,
      step1Title: "Выберите тип случая",
      step1Description:
        "Укажите, что нужно восстановить, чтобы подобрать подход к имплантации.",
      step2Title: "Предпочитаемое решение",
      step2Description:
        "Выберите оптимальный вариант. Итоговый план утверждается после диагностики.",
      step3Title: "Оставьте контакты",
      step3Description:
        "Наши координаторы изучат информацию и перезвонят.",
      privacyNote: "Ваши данные конфиденциальны."
    },
    genderOptions: [
      { value: "single", label: "1–3 зуба", helper: "Тип", icon: "fa-tooth" },
      { value: "full-arch", label: "Вся челюсть", helper: "Тип", icon: "fa-teeth-open" },
      { value: "denture", label: "Съёмный протез", helper: "Тип", icon: "fa-face-smile" }
    ],
    toothOptions: [
      { key: "single-implant", label: "Одиночный имплант", image: "/uploads/dental-implant/smile1.jpg" },
      { key: "implant-bridge", label: "Мост на имплантах", image: "/uploads/dental-implant/zirkonyum-veneers.jpg" },
      { key: "all-on-4", label: "All-on-4", image: "/uploads/dental-implant/sec-dental-implant.jpg" },
      { key: "all-on-6", label: "All-on-6", image: "/uploads/dental-implant/smile3.jpg" },
      { key: "bone-graft", label: "Костная пластика", image: "/uploads/dental-implant/sec-veneers.jpg" }
    ],
    fields: {
      fullNameLabel: "Полное имя",
      fullNamePlaceholder: "Имя Фамилия",
      phoneLabel: "Телефон",
      phonePlaceholder: "+7 ..."
    },
    prevLabel: "Назад",
    nextLabel: "Далее",
    submitLabel: "Отправить"
  },
  treatments: {
    ...treatmentsDefaults,
    kicker: "Имплантология",
    titleLine1: "Импланты",
    titleLine2: "полноарочные и одиночные",
    description:
      "Фиксированные имплант-решения, возвращающие жевание и уверенность. Направляемая хирургия, индивидуальные протезы.",
    highlights: [
      "Немедленная/ранняя нагрузка при показаниях",
      "3D-навигация",
      "Индивидуальные каркасы из циркония/керамики"
    ],
    noteLabel: "Важно",
    noteText: "Окончательная тактика подтверждается после КЛКТ и осмотра.",
    galleryLabel: "Все работы",
    galleryHref: "/dental-implant/ru/gallery",
    ctaText: "Записаться к врачу →"
  },
  teamMembers: {
    ...teamMembersDefaults,
    kicker: "Команда",
    title: "Специалисты, создающие улыбки",
    description:
      "Мультидисциплинарная команда стоматологов и координаторов для надёжных, естественных результатов.",
    items: [
      {
        name: "Д-р Селин А.",
        role: "Ведущий эстетист",
        description:
          "12+ лет в эстетической стоматологии: виниры, дизайн улыбки, минимальная инвазия.",
        image: "/uploads/team/dr-selin.jpg",
        alt: "Д-р Селин"
      },
      {
        name: "Д-р Эмир К.",
        role: "Имплантолог, ортопед",
        description:
          "Полноарочные реабилитации, планирование имплантов, восстановление прикуса.",
        image: "/uploads/team/dr-emir.jpg",
        alt: "Д-р Эмир"
      },
      {
        name: "Элиф Т.",
        role: "Координатор пациентов",
        description:
          "Сопровождение международных пациентов, расписание приёмов, прозрачные шаги.",
        image: "/uploads/team/elif.jpg",
        alt: "Элиф"
      },
      {
        name: "Мерт Ч.",
        role: "Ассистент",
        description:
          "Помощь у кресла, стерилизация, контроль тайминга приёмов.",
        image: "/uploads/team/mert.jpg",
        alt: "Мерт"
      }
    ]
  },
  internationalPatients: {
    ...internationalPatientsDefaults,
    kicker: "• Стамбул • Медицинский туризм •",
    titleLine1: "BM TÜRKIEY",
    titleLine2: "Программа для иностранных пациентов",
    description:
      "Персонализированное и безопасное лечение для международных пациентов: эксперты, современное оборудование и выделенные координаторы.",
    buttonText: "Записаться >"
  },
  clinic: {
    ...clinicDefaults,
    kicker: "Стамбул • Турция",
    titleLine1: "Награды",
    titleLine2: "и доверие пациентов",
    paragraphs: [
      "Многие годы мы создаём естественные и долговечные улыбки для пациентов из Турции и других стран. Планируем индивидуально, сочетая минимальную инвазивность и цифровые протоколы.",
      "Мы гордимся персонализированным подходом, вниманием к деталям и результатами, которые повышают уверенность."
    ],
    ctaText: "Консультация в WhatsApp →"
  },
  healthTourism: {
    ...healthTourismDefaults,
    kicker: "4 шага",
    title: "к идеальному прикусу",
    description:
      "От первого сообщения до финального чекапа — сопровождаем весь путь лечения в Atom Clinic.",
    steps: [
      {
        icon: "fa-comments",
        label: "ШАГ 1",
        title: "Опишите проблему",
        description:
          "Пришлите жалобы, фото, КТ (если есть) через WhatsApp/email. Координатор изучит случай."
      },
      {
        icon: "fa-clipboard-list",
        label: "ШАГ 2",
        title: "План и смета",
        description:
          "В течение 24 часов врачи подготовят индивидуальный план лечения, сроки и прозрачную стоимость."
      },
      {
        icon: "fa-plane-departure",
        label: "ШАГ 3",
        title: "Путешествие и лечение",
        description:
          "После выбора дат организуем трансфер из аэропорта, варианты отеля и визиты в клинику."
      },
      {
        icon: "fa-check-circle",
        label: "ШАГ 4",
        title: "Финальный контроль",
        description:
          "Перед отъездом проведём контроль, дадим рекомендации по уходу и дальнейшие шаги."
      }
    ]
  },
  luckySpin: {
    ...luckySpinDefaults,
    kicker: "Лаки-спин",
    tagline: "Испытайте удачу",
    title: "Крутите и выиграйте",
    description: "Розыгрыш скидок на лечение.",
    spinLabel: "Крутить",
    spinLoadingLabel: "Крутится...",
    resultLabel: "Ваш приз",
    resultPlaceholder: "Крутите, чтобы узнать.",
    prizes: luckySpinDefaults.prizes.map((p) => p.replace("Discount", "Скидка")),
    form: {
      ...luckySpinDefaults.form,
      title: "Получить приз",
      description: "Оставьте контакты, чтобы забрать приз.",
      fields: {
        ...luckySpinDefaults.form.fields,
        fullNameLabel: "Полное имя",
        fullNamePlaceholder: "Имя Фамилия",
        phoneLabel: "Телефон",
        phonePlaceholder: "+7 ..."
      },
      submitText: "Отправить",
      privacyNote: "Ваши данные конфиденциальны."
    }
  },
  localAttractions: {
    ...localAttractionsDefaults,
    kicker: "Рядом с клиникой",
    title: "Что посмотреть за несколько минут",
    description:
      "Шопинг и достопримечательности рядом с BM TÜRKIEY — удобно между приёмами.",
    swipeHint: "Листайте →",
    ctaText: "Консультация в WhatsApp →",
    items: localAttractionsDefaults.items.map((item) => ({
      ...item,
      title: item.title,
      description: item.description
    }))
  },
  implantMatrix: {
    ...implantMatrixDefaults,
    kicker: "Матрица методов",
    title: "Имплант-решения кратко",
    description:
      "Сравните основные методики, показания, сроки в Турции и результаты. План уточняется после диагностики.",
    columns: [
      "Техника",
      "Тип",
      "Кандидаты",
      "Преимущества",
      "Недостатки",
      "Сроки в Турции",
      "Результат"
    ],
    rows: implantMatrixDefaults.rows.map((row) => ({
      ...row,
      technique:
        row.technique === "Single Implant"
          ? "Одиночный имплант"
          : row.technique === "All-on-4 / All-on-6"
          ? "All-on-4 / All-on-6"
          : row.technique === "Zirconium Implant Crowns"
          ? "Циркониевые коронки на имплантах"
          : row.technique === "Bone Grafting"
          ? "Костная пластика"
          : row.technique === "Immediate Implants"
          ? "Немедленные импланты"
          : "Цифровое планирование",
      type: row.type,
      candidates:
        row.candidates === "1–3 missing teeth"
          ? "От 1 до 3 отсутствующих зубов"
          : row.candidates === "Fully edentulous or failing dentition"
          ? "Полное отсутствие или разрушенные зубы"
          : row.candidates === "Aesthetic zones, cosmetic focus"
          ? "Эстетическая зона, фокус на красоте"
          : row.candidates === "Patients with jawbone loss"
          ? "Дефицит кости"
          : row.candidates === "Select patients with healthy bone"
          ? "Только при хорошем объёме кости"
          : "Все пациенты с показаниями",
      advantages:
        row.advantages === "Natural feel, independent support"
          ? "Натуральное ощущение, отдельная опора"
          : row.advantages === "Fixed, stable, full set of teeth"
          ? "Фиксированный, стабильный полный ряд"
          : row.advantages === "Highly aesthetic, metal-free"
          ? "Высокая эстетика, без металла"
          : row.advantages === "Enables implants in difficult cases"
          ? "Позволяет имплантацию в сложных случаях"
          : row.advantages === "No waiting period, instant teeth"
          ? "Без ожидания, мгновенные зубы"
          : "Точность и безопасность",
      disadvantages:
        row.disadvantages === "Minor surgery, healing time"
          ? "Небольшая операция, время заживления"
          : row.disadvantages === "Requires healing period"
          ? "Нужен период заживления"
          : row.disadvantages === "Higher cost"
          ? "Более высокая стоимость"
          : row.disadvantages === "Healing time required"
          ? "Требуется заживление"
          : row.disadvantages === "Not suitable for everyone"
          ? "Подходит не всем"
          : "Дополнительный этап планирования",
      timeInTurkey:
        row.timeInTurkey === "5–7 days + healing"
          ? "5–7 дней + заживление"
          : row.timeInTurkey === "7–10 days"
          ? "7–10 дней"
          : row.timeInTurkey === "5–7 days"
          ? "5–7 дней"
          : row.timeInTurkey === "1–2 days (plus healing)"
          ? "1–2 дня (+ заживление)"
          : row.timeInTurkey === "1–2 days"
          ? "1–2 дня"
          : "В день планирования",
      results:
        row.results === "Lifelong with proper care"
          ? "Долговечно при правильном уходе"
          : row.results === "Full-arch smile with high stability"
          ? "Стабильная полноарочная улыбка"
          : row.results === "Natural look, strong bite"
          ? "Натуральный вид, крепкий прикус"
          : row.results === "Strong foundation for implants"
          ? "Надёжная база под импланты"
          : row.results === "Instant smile, long-term solution"
          ? "Мгновенная улыбка, долгосрочно"
          : "Точная установка имплантов",
      values: row.values
    }))
  },
  techniquesUsed: {
    ...techniquesUsedDefaults,
    kicker: "Используемые техники",
    title: "Ключевые имплант-методики",
    description:
      "От немедленной имплантации до направляемой хирургии — основные подходы нашей команды.",
    slides: techniquesUsedDefaults.slides.map((slide) => ({
      ...slide,
      title:
        slide.title === "Immediate Implants"
          ? "Немедленные импланты"
          : slide.title === "All-on-4 / All-on-6"
          ? "All-on-4 / All-on-6"
          : "Направляемая хирургия",
      body:
        slide.title === "Immediate Implants"
          ? "Подходящим пациентам удаление и установка импланта проводятся за один визит, с временной коронкой. Это снижает сроки лечения и избавляет от съёмных протезов на этапе заживления."
          : slide.title === "All-on-4 / All-on-6"
          ? "Полноарочная реабилитация на 4–6 имплантах с направляемым планированием и временными мостами при показаниях — быстрый возврат функции и уверенности."
          : "3D-визуализация, хирургические шаблоны и точное позиционирование для безопасности и долговечности как одиночных, так и полноарочных кейсов."
    }))
  },
  googleReviews: {
    ...googleReviewsDefaults,
    kicker: "Отзывы Google",
    title: "Реальные истории пациентов",
    description:
      "Что говорят международные пациенты об опыте в BM TÜRKIEY.",
    ratingCountLabel: "380+ отзывов",
    ctaText: "Бесплатная консультация →",
    items: googleReviewsDefaults.items.map((item) => ({
      ...item,
      text: item.text
    }))
  },
  faqs: {
    ...faqsDefaults,
    kicker: "Центр помощи",
    title: "Частые вопросы",
    description: "Краткие ответы для международных пациентов.",
    responseTimeLabel: "Среднее время ответа:",
    responseTimeValue: "30 минут",
    footerNote:
      "Окончательный план уточняется после клинической оценки.",
    form: {
      ...faqsDefaults.form,
      kicker: "Записаться",
      title: "Назначить консультацию",
      description: "Оставьте контакты — мы свяжемся в ближайшее время.",
      submittingText: "ОТПРАВКА...",
      submitText: "ОТПРАВИТЬ",
      privacyNote: "Ваши данные конфиденциальны.",
      fields: {
        ...faqsDefaults.form.fields,
        fullNameLabel: "Полное имя",
        fullNamePlaceholder: "Имя Фамилия",
        phoneLabel: "Телефон",
        phonePlaceholder: "+7 ...",
        emailLabel: "Email",
        emailPlaceholder: "you@example.com",
        messageLabel: "Комментарий",
        messagePlaceholder: "Расскажите о цели лечения."
      }
    },
    items: [
      {
        icon: "fa-circle-question",
        title: "Сколько времени нужно на пребывание?",
        subtitle: "Полноарочные кейсы обычно 5–7 дней; этапность обсуждаем заранее.",
        body:
          "При All-on-4/6: диагностика, операция и временный мост в течение недели. Если нужна костная пластика, планируем поэтапно с понятными сроками."
      },
      {
        icon: "fa-tooth",
        title: "Больно ли ставить импланты?",
        subtitle: "Современная анестезия и навигация минимизируют дискомфорт.",
        body:
          "Пациенты описывают давление, а не боль. Лёгкая болезненность после — купируется препаратами и чёткими рекомендациями."
      },
      {
        icon: "fa-shield-heart",
        title: "Есть ли гарантия и сопровождение?",
        subtitle: "Чёткие инструкции по уходу и дистанционная поддержка.",
        body:
          "Вы получите письменные рекомендации, дистанционные контрольные связи и информацию по гарантии производителя имплантов и протезов."
      },
      {
        icon: "fa-credit-card",
        title: "Можно ли получить смету заранее?",
        subtitle: "Да, после оценки фото/КТ предоставим предварительный план и стоимость.",
        body:
          "Поделитесь данными и визуализацией; подготовим план и ориентировочную смету. Итоговая цена зависит от клинической оценки и объёма."
      }
    ]
  }
};

export const getSectionDefaults = (key, locale = "en") => {
  if (locale === "ru") {
    return SECTION_DEFAULTS_RU[key] || SECTION_DEFAULTS[key] || null;
  }
  return SECTION_DEFAULTS[key] || null;
};
