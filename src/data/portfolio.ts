export const portfolioData = {
  hero: {
    headline: "Zachary Trenary — Software Engineer",
    subheadline: "Software Engineer specializing in embedded software development, real-time control systems, and AI research applications.",
    location: "Orlando, FL",
    email: "zmichaeltrenary@gmail.com",
    github: "https://github.com/999Cosmic",
    linkedin: "https://www.linkedin.com/in/zachary-trenary-582a0a437/",
  },
  projects: [
    {
      id: "talking-with-tito",
      title: "Talking with Tito 3",
      description: "AI Language Tutor",
      tech: ["Python", "Flask", "React", "Next.js", "LLM Integration (Qwen 3.5)", "REST API"],
      highlights: [
        "Engineered major v3.0 platform upgrades for an AI language tutor application, enhancing legacy Python Flask and Next.js codebases to improve conversational accuracy and user experience.",
        "Upgraded backend LLM infrastructure to an optimized Qwen 3.5 model, significantly reducing response latency and expanding context windows for multilingual practice.",
        "Redesigned front-end UI/UX components in React, introducing real-time star-tracking, dynamic completion meters, multi-chat session management, and administrative console controls."
      ],
      githubUrl: "https://github.com/UCF-ELLE/ELLE-Website-API", // Replace with your exact Tito repo URL
      liveUrl: "https://chdr.cs.ucf.edu/elle/games/talkwithtito"             // Replace with your actual live demo URL
    },
    {
      id: "lamp-contact-manager",
      title: "LAMP Stack Contact Manager",
      description: "REST API & Database Architecture",
      tech: ["PHP", "MySQL", "Linux", "Apache", "REST API", "Postman"],
      highlights: [
        "Engineered a LAMP stack backend featuring a fully documented REST API for user login, registration, and contact management.",
        "Designed the database architecture, implementing a Users–Contacts schema with enforced foreign key constraints to maintain consistent one-to-many relationships.",
        "Executed end-to-end testing through Postman and SQL verification, confirming that API endpoints correctly modified the database and met system requirements."
      ],
      githubUrl: "https://github.com/soph919/LAMPGroup22", // Replace with your exact LAMP repo URL
      liveUrl: ""                                                    // Hides the "Live Demo" button
    },
    {
      id: "telegraph",
      title: "Analog & Digital Telegraph",
      description: "Embedded Hardware & Morse Encoder",
      tech: ["C++", "Arduino", "Hardware Engineering", "Excel Integration", "Serial Communication"],
      highlights: [
        "Led the construction of a physical telegraph system using everyday objects, enabling real-time Morse code communication with a microcontroller and Excel workbook.",
        "Developed Arduino C++ code to encode outgoing and decode incoming Morse code signals, managing serial communication for seamless data exchange between hardware and software."
      ],
      githubUrl: "", // Hides the "GitHub" button
      liveUrl: ""    // Hides the "Live Demo" button
    }
  ],
  skills: {
    languages: ["Python", "C", "C++", "TypeScript", "JavaScript", "PHP", "SQL/MySQL", "HTML/CSS"],
    frameworks: ["React", "Next.js", "Flask"],
    tools: ["Git", "Postman", "SwaggerHub", "Jira", "REST APIs", "spaCy", "OpenCode CLI", "Wireshark"],
    cloud: ["AWS (EC2)", "Linux (Ubuntu)", "Bash/Shell", "LAMP Stack", "Virtual Box", "Networking Fundamentals"]
  },
  experience: [
    {
      id: "senior-design",
      role: "Software Engineering Senior Design",
      company: "Computer Science Senior Design Group",
      date: "01/2026 – 08/2026"
    },
    {
      id: "epcot",
      role: "Operations & Guest Logistics",
      company: "WDWCP Epcot Parking CM",
      date: "01/2026 – 08/2026"
    }
  ],
  education: {
    university: "University of Central Florida: Fall 2023 – Summer 2026",
    degree: "B.S. in Computer Science (Cum Laude, 3.82 GPA)",
    coursework: [
      "Computer Science I & II",
      "Senior Design I & II",
      "Discrete Structures I & II",
      "Processes for Object-Oriented Software Development",
      "Systems Software",
      "Computer Logic and Organization",
      "Modeling and Simulation",
      "System Administration and Maintenance",
      "Matrix & Linear Algebra",
      "Statistical Methods I & II"
    ]
  }
};
