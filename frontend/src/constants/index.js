import {
  benefitIcon1,
  benefitIcon2,
  benefitIcon3,
  chromecast,
  disc02,
  discord,
  figma,
  file02,
  framer,
  homeSmile,
  instagram,
  notification2,
  notification3,
  notification4,
  notion,
  photoshop,
  plusSquare,
  protopie,
  raindrop,
  recording01,
  recording03,
  roadmap1,
  roadmap2,
  roadmap3,
  roadmap4,
  searchMd,
  slack,
  sliders04,
  telegram,
  twitter,
  yourlogo,
  youtube,
  linkdin,
  js,
  android,
  ts,
  java,
  react,
  nodejs,
  reddis,
  kotlin,
  benefitIcon4,
} from "../assets";

export const navigation = [
  {
    id: "0",
    title: "Features",
    url: "#features",
  },
  {
    id: "1",
    title: "Pricing",
    url: "#pricing",
  },
  {
    id: "2",
    title: "Support",
    url: "#support",
  },
  {
    id: "3",
    title: "Reviews",
    url: "#testimonals",
  },
  {
    id: "4",
    title: "Sign in",
    url: "/?authpage=open&auth=login",
    onlyMobile: true,
  },
  {
    id: "5",
    title: "Account",
    url: "/?account=open",
    onlyMobile: true,
  },
];

export const heroIcons = [homeSmile, file02, searchMd, plusSquare];

export const notificationImages = [notification4, notification3, notification2];

export const companyLogos = [yourlogo, yourlogo, yourlogo, yourlogo, yourlogo];

export const brainwaveServices = [
  "Automating tasks",
  "Reducing your time",
  "Seamless Integration",
];

export const brainwaveServicesIcons = [
  recording03,
  recording01,
  disc02,
  chromecast,
  sliders04,
];

export const roadmap = [
  {
    id: "0",
    title: "E-learning feature",
    text: "Offers AI-driven programming lessons, real-time coding challenges, and personalized learning paths. Learners can practice, debug, and build projects all in one place.",
    date: "March 2025",
    status: "progress",
    imageUrl: roadmap1,
    colorful: true,
  },
  {
    id: "1",
    title: "Gamification",
    text: "Add game-like elements, such as badges or leaderboards, to incentivize users to engage with the chatbot more frequently.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap2,
  },
  {
    id: "2",
    title: "Chatbot customization",
    text: "Allow users to customize the chatbot's appearance and behavior, making it more engaging and fun to interact with.",
    date: "May 2023",
    status: "done",
    imageUrl: roadmap3,
  },
  {
    id: "3",
    title: "Integration with APIs",
    text: "Allow the chatbot to access external data sources, such as weather APIs or news APIs, to provide more relevant recommendations.",
    date: "May 2023",
    status: "progress",
    imageUrl: roadmap4,
  },
];

export const collabText =
  "With smart automation and top-notch security, it's the perfect solution for developers looking to save their time.";

export const collabContent = [
  {
    id: "0",
    title: "Seamless Integration",
    text: collabText,
  },
  {
    id: "1",
    title: "Smart Automation",
  },
  {
    id: "2",
    title: "Saves Your TIme",
  },
];

export const collabApps = [
  {
    id: "0",
    title: "javascript",
    icon: js,
    width: 26,
    height: 36,
  },
  {
    id: "1",
    title: "android",
    icon: android,
    width: 34,
    height: 36,
  },
  {
    id: "2",
    title: "typescript",
    icon: ts,
    width: 36,
    height: 28,
  },
  {
    id: "3",
    title: "java",
    icon: java,
    width: 34,
    height: 35,
  },
  {
    id: "4",
    title: "react",
    icon: react,
    width: 34,
    height: 34,
  },
  {
    id: "5",
    title: "nodejs",
    icon: nodejs,
    width: 34,
    height: 34,
  },
  {
    id: "6",
    title: "reddis",
    icon: reddis,
    width: 26,
    height: 34,
  },
  {
    id: "7",
    title: "kotlin",
    icon: kotlin,
    width: 38,
    height: 32,
  },
];

export const pricing = [
  {
    id: 1,
    price: "0",
    originalPrice: "3",
    title: "Basic Plan",
    backgroundUrl: "./src/assets/benefits/card-1.svg",
    features: [
      "Explore all packages with free trial.",
      "Free Trial will be valid for 24hrs.",
      "Limited usage",
    ],
  },
  {
    id: 2,
    price: "3.5",
    originalPrice: "5",
    title: "Premium Plan",
    backgroundUrl: "./src/assets/benefits/card-3.svg",
    features: [
      "Valid for all packages",
      "You can use any package, anytime.",
      "Unlimited usage",
    ],
  },
  {
    id: 3,
    price: "2.5",
    originalPrice: "4",
    title: "Pro Plan",
    backgroundUrl: "./src/assets/benefits/card-2.svg",
    features: [
      "Valid for any 1 package",
      "You can use any 1 package",
      "Unlimited usage",
    ],
  },
];

export const benefits = [
  {
    id: "1",
    title: "mern-launcher",
    text: "mern-launcher automates setting up frontend and backend folders, installing dependencies, and initializing servers, making development faster and hassle-free.",
    iconUrl: benefitIcon1,
    snippet: "npm i mern-quickstart@1.0.8",
    redirect: "https://github.com/Hrithik450/mern-launcher",
    imageUrl:
      "https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png",
    url: "https://res.cloudinary.com/duozomapm/image/upload/v1742364360/mernImage_farhpq.jpg",
  },
  {
    id: "2",
    title: "ecom-launcher",
    text: "ecom-launcher automates setting up eCommerce structure, installing dependencies, and initializing servers, making development faster and hassle-free.",
    iconUrl: benefitIcon2,
    snippet: "npm i ecom-quickstart@1.0.3",
    redirect: "https://github.com/Hrithik450/mern-ecom",
    imageUrl:
      "https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png",
    url: "https://res.cloudinary.com/duozomapm/image/upload/v1742364527/Screenshot_2025-03-19_115115_vqmed6.png",
    light: true,
  },
  {
    id: "3",
    title: "auth-quickstart",
    text: "auth-quickstart provides a fully built-in authentication system for MERN applications, including user registration, login, JWT authentication, and role-based access, making secure authentication setup effortless. 🚀",
    iconUrl: benefitIcon4,
    snippet: "npm i auth-quickstart@1.0.0",
    redirect: "#",
    imageUrl:
      "https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png",
    url: "https://res.cloudinary.com/duozomapm/image/upload/v1743015789/authImage_rbe8em.jpg",
    upcoming: "coming",
  },
  {
    id: "4",
    title: "pay-quickstart",
    text: "pay-quickstart provides a built-in payment gateway integration for MERN applications, supporting Razorpay, Stripe, and cryptocurrency payments. Easily set up secure and seamless transactions with minimal effort. 🚀",
    iconUrl: benefitIcon1,
    snippet: "npm i pay-quickstart@1.0.0",
    redirect: "#",
    imageUrl:
      "https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png",
    url: "https://res.cloudinary.com/duozomapm/image/upload/v1740422740/Screenshot_2025-02-25_002520_rssieh.png",
    upcoming: "coming",
  },
  {
    id: "5",
    title: "Oauth-quickstart",
    text: "Oauth-quickstart provides built-in OAuth authentication for MERN applications, supporting Google, Facebook, LinkedIn, and more. Easily integrate social logins with pre-configured authentication functions. 🚀",
    iconUrl: benefitIcon2,
    snippet: "npm i oauth-quickstart@1.0.0",
    redirect: "#",
    imageUrl:
      "https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png",
    url: "https://res.cloudinary.com/duozomapm/image/upload/v1743015950/oAuthImage_kg8puz.webp",
    upcoming: "coming",
  },
  {
    id: "6",
    title: "notify-quickstart",
    text: "Notifly provides easy-to-use functions for sending notifications to users via email, SMS, or push notifications, streamlining communication in your applications",
    iconUrl: benefitIcon3,
    snippet: "npm i notify-quickstart@1.0.0",
    redirect: "#",
    imageUrl:
      "https://res.cloudinary.com/duozomapm/image/upload/v1741177645/codeEaseXLogo_j7ojvi.png",
    url: "https://res.cloudinary.com/duozomapm/image/upload/v1743089426/notifyImage_c9wwbt.png",
    upcoming: "coming",
  },
];

export const socials = [
  {
    id: "0",
    title: "Youtube",
    iconUrl: youtube,
    url: "https://youtube.com/@mhrithik450?si=kJEV-B8gYsvbA2_H",
  },
  {
    id: "1",
    title: "Twitter",
    iconUrl: twitter,
    url: "/",
  },
  {
    id: "2",
    title: "Instagram",
    iconUrl: instagram,
    url: "https://www.instagram.com/mhrithik_450?igsh=MXNkZDd4MDloNGg4ag==",
  },
  {
    id: "3",
    title: "Telegram",
    iconUrl: telegram,
    url: "/",
  },
  {
    id: "4",
    title: "Linkdin",
    iconUrl: linkdin,
    url: "https://www.linkedin.com/in/hruthik-m-3595a0329?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app",
  },
];

export const alertObject = {
  position: "bottom-right",
  autoClose: 4000,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
  draggable: true,
  progress: undefined,
};
