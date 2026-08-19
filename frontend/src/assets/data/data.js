// --- REACT ICONS IMPORTS ---
import { 
  FaBolt, FaHammer, FaPaintRoller, FaFireBurner, FaTrowelBricks, 
  FaLayerGroup, FaBorderAll, FaChessKnight, FaTableCellsLarge, FaBarsStaggered, 
  FaDropletSlash, FaHouseChimneyCrack, FaCouch, FaKitchenSet, FaChair, 
  FaDoorClosed, FaBorderNone, FaPersonShelter, FaScroll, FaSnowflake, 
  FaTv, FaBroom, FaStethoscope, FaGraduationCap, FaCar, FaTriangleExclamation, 
  FaFaucetDrip, FaWrench, FaLaptop, FaShieldHalved, 
  FaPlug, FaBook, FaGasPump, FaUserTie
} from "react-icons/fa6"; //[cite: 3]
import { MdBlender, MdAcUnit, MdMedicalServices, MdCleaningServices, MdOtherHouses } from "react-icons/md"; //[cite: 3]
import heroImage from '../images/hero_image.avif';
// 1. Hero Data
export const heroData = {
  bgImage: heroImage,
  title: "Your All-in-One Home Helper",
  subtitle: " at Your Doorstep",
  description: "Trained, background-verified professionals ready to solve all your home and daily lifestyle problems with 100% precision."
}; //[cite: 3]

// 2. Experience / Stats Data
export const statsData = [
  { id: 1, value: "11+", label: "Years of experience" },
  { id: 2, value: "50+", label: "Trained professionals" },
  { id: 3, value: "95K", label: "Happy customers" },
  { id: 4, value: "100%", label: "Quality assured" }
]; //[cite: 6]

// 3. Master Categories Data
export const categories = [
  { id: 1, slug: "home-repair", name: "Home Repair Services", subtitle: "Expert repairs at your doorstep", bgColor: "bg-[#d6ecd7]", image: "src/assets/images/i1.png", status: "active" },
  { id: 2, slug: "home-appliance", name: "Home Appliance Services", subtitle: "AC, Fridge & Washing Machine Repair", bgColor: "bg-[#82b4bc]", image: "src/assets/images/i2.jpg", status: "active" },
  { id: 3, slug: "electronics", name: "Electronics Services", subtitle: "TV, Laptop & CCTV Installation", bgColor: "bg-[#eef4fb]", image: "src/assets/images/i3.png", status: "active" },
  { id: 4, slug: "cleaning", name: "Cleaning Services", subtitle: "Deep cleaning for a spotless home", bgColor: "bg-[#fbeeed]", image: "src/assets/images/i4.png", status: "active" },
  { id: 5, slug: "medical-healthcare", name: "Medical & Healthcare", subtitle: "Doctors & Nurses at home", bgColor: "bg-[#e0e7ff]", image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=500&q=80", status: "active" },
  { id: 6, slug: "education", name: "Education Services", subtitle: "Home Tutors & Online Classes", bgColor: "bg-[#fef3c7]", image: "https://images.unsplash.com/photo-1524178232363-1fb2b075b655?auto=format&fit=crop&w=500&q=80", status: "active" },
  { id: 7, slug: "vehicle", name: "Vehicle Services", subtitle: "Doorstep Car & Bike Repair", bgColor: "bg-[#ffedd5]", image: "src/assets/images/i7.svg", status: "active" },
  { id: 8, slug: "emergency", name: "Emergency Services", subtitle: "24/7 Ambulance & Rapid Response", bgColor: "bg-[#ffe4e6]", image: "https://images.unsplash.com/photo-1516549655169-df83a0774514?auto=format&fit=crop&w=500&q=80", status: "active" },
  { id: 9, slug: "utility", name: "Utility Services", subtitle: "Water, Gas & Internet Setup", bgColor: "bg-[#dcfce7]", image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=500&q=80", status: "active" },
  { id: 10, slug: "other", name: "Other Services", subtitle: "Cooks, Maids & Drivers", bgColor: "bg-[#f3f4f6]", image: "https://images.unsplash.com/photo-1521791136064-7986c2920216?auto=format&fit=crop&w=500&q=80", status: "active" }
]; //[cite: 3]

// 4. Complete Sub-Services Data
export const services = [
  // --- 1. HOME REPAIR SERVICES ---
  { id: 101, categoryId: 1, categorySlug: "home-repair", title: "Electrician", icon: FaBolt, startingPrice: 199, rating: 4.8, status: "active" },
  { id: 102, categoryId: 1, categorySlug: "home-repair", title: "Plumber", icon: FaFaucetDrip, startingPrice: 199, rating: 4.9, status: "active" },
  { id: 103, categoryId: 1, categorySlug: "home-repair", title: "Carpenter", icon: FaHammer, startingPrice: 249, rating: 4.7, status: "active" },
  { id: 104, categoryId: 1, categorySlug: "home-repair", title: "Painter", icon: FaPaintRoller, startingPrice: 499, rating: 4.9, status: "active" },
  { id: 105, categoryId: 1, categorySlug: "home-repair", title: "Welder", icon: FaFireBurner, startingPrice: 299, rating: 4.6, status: "active" },
  { id: 106, categoryId: 1, categorySlug: "home-repair", title: "POP Work", icon: FaTrowelBricks, startingPrice: 399, rating: 4.7, status: "active" },
  { id: 107, categoryId: 1, categorySlug: "home-repair", title: "False Ceiling", icon: FaLayerGroup, startingPrice: 599, rating: 4.8, status: "active" },
  { id: 108, categoryId: 1, categorySlug: "home-repair", title: "Tiles Work", icon: FaBorderAll, startingPrice: 349, rating: 4.8, status: "active" },
  { id: 109, categoryId: 1, categorySlug: "home-repair", title: "Marble Work", icon: FaChessKnight, startingPrice: 499, rating: 4.9, status: "active" },
  { id: 110, categoryId: 1, categorySlug: "home-repair", title: "Glass Work", icon: FaTableCellsLarge, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 111, categoryId: 1, categorySlug: "home-repair", title: "Aluminum Work", icon: FaBarsStaggered, startingPrice: 349, rating: 4.6, status: "active" },
  { id: 112, categoryId: 1, categorySlug: "home-repair", title: "Waterproofing", icon: FaDropletSlash, startingPrice: 999, rating: 4.9, status: "active" },
  { id: 113, categoryId: 1, categorySlug: "home-repair", title: "Home Renovation", icon: FaHouseChimneyCrack, startingPrice: 2999, rating: 5.0, status: "active" },
  { id: 114, categoryId: 1, categorySlug: "home-repair", title: "Interior Design", icon: FaCouch, startingPrice: 1499, rating: 4.9, status: "active" },
  { id: 115, categoryId: 1, categorySlug: "home-repair", title: "Modular Kitchen", icon: FaKitchenSet, startingPrice: 1999, rating: 4.8, status: "active" },
  { id: 116, categoryId: 1, categorySlug: "home-repair", title: "Furniture Repair", icon: FaChair, startingPrice: 249, rating: 4.7, status: "active" },
  { id: 117, categoryId: 1, categorySlug: "home-repair", title: "Door Repair", icon: FaDoorClosed, startingPrice: 199, rating: 4.8, status: "active" },
  { id: 118, categoryId: 1, categorySlug: "home-repair", title: "Window Repair", icon: FaBorderNone, startingPrice: 199, rating: 4.7, status: "active" },
  { id: 119, categoryId: 1, categorySlug: "home-repair", title: "Curtain Installation", icon: FaPersonShelter, startingPrice: 149, rating: 4.9, status: "active" },
  { id: 120, categoryId: 1, categorySlug: "home-repair", title: "Wallpaper Installation", icon: FaScroll, startingPrice: 299, rating: 4.8, status: "active" },

  // --- 2. HOME APPLIANCE SERVICES ---
  { id: 201, categoryId: 2, categorySlug: "home-appliance", title: "AC Repair & AC Installation", icon: FaSnowflake, startingPrice: 399, rating: 4.9, status: "active" },
  { id: 202, categoryId: 2, categorySlug: "home-appliance", title: "AC Gas Filling", icon: MdAcUnit, startingPrice: 999, rating: 4.8, status: "active" },
  { id: 203, categoryId: 2, categorySlug: "home-appliance", title: "Refrigerator Repair", icon: FaWrench, startingPrice: 299, rating: 4.8, status: "active" },
  { id: 204, categoryId: 2, categorySlug: "home-appliance", title: "Washing Machine Repair", icon: FaWrench, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 205, categoryId: 2, categorySlug: "home-appliance", title: "Microwave Repair", icon: MdBlender, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 206, categoryId: 2, categorySlug: "home-appliance", title: "Geyser Repair", icon: FaWrench, startingPrice: 299, rating: 4.8, status: "active" },
  { id: 207, categoryId: 2, categorySlug: "home-appliance", title: "RO Water Purifier Repair", icon: FaDropletSlash, startingPrice: 249, rating: 4.8, status: "active" },
  { id: 208, categoryId: 2, categorySlug: "home-appliance", title: "Water Cooler Repair", icon: FaSnowflake, startingPrice: 349, rating: 4.6, status: "active" },
  { id: 209, categoryId: 2, categorySlug: "home-appliance", title: "Chimney Repair", icon: FaKitchenSet, startingPrice: 399, rating: 4.7, status: "active" },
  { id: 210, categoryId: 2, categorySlug: "home-appliance", title: "Induction Repair", icon: FaPlug, startingPrice: 199, rating: 4.6, status: "active" },
  { id: 211, categoryId: 2, categorySlug: "home-appliance", title: "Mixer Grinder Repair", icon: MdBlender, startingPrice: 199, rating: 4.7, status: "active" },
  { id: 212, categoryId: 2, categorySlug: "home-appliance", title: "Fan / Inverter / Generator Repair", icon: FaBolt, startingPrice: 249, rating: 4.8, status: "active" },

  // --- 3. ELECTRONICS SERVICES ---
  { id: 301, categoryId: 3, categorySlug: "electronics", title: "TV/LED TV Repair", icon: FaTv, startingPrice: 399, rating: 4.8, status: "active" },
  { id: 302, categoryId: 3, categorySlug: "electronics", title: "Smart TV Installation", icon: FaTv, startingPrice: 299, rating: 4.9, status: "active" },
  { id: 303, categoryId: 3, categorySlug: "electronics", title: "CCTV Installation", icon: FaHouseChimneyCrack, startingPrice: 499, rating: 5.0, status: "active" },
  { id: 304, categoryId: 3, categorySlug: "electronics", title: "CCTV Repair", icon: FaShieldHalved, startingPrice: 349, rating: 4.8, status: "active" },
  { id: 305, categoryId: 3, categorySlug: "electronics", title: "Internet Setup", icon: FaPlug, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 306, categoryId: 3, categorySlug: "electronics", title: "Wi-Fi Installation", icon: FaPlug, startingPrice: 249, rating: 4.8, status: "active" },
  { id: 307, categoryId: 3, categorySlug: "electronics", title: "DTH / Dish TV Installation", icon: FaTv, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 308, categoryId: 3, categorySlug: "electronics", title: "Mobile Repair", icon: FaLaptop, startingPrice: 199, rating: 4.8, status: "active" },
  { id: 309, categoryId: 3, categorySlug: "electronics", title: "Laptop Repair", icon: FaLaptop, startingPrice: 299, rating: 4.9, status: "active" },
  { id: 310, categoryId: 3, categorySlug: "electronics", title: "Computer Repair", icon: FaLaptop, startingPrice: 299, rating: 4.8, status: "active" },
  { id: 311, categoryId: 3, categorySlug: "electronics", title: "Printer Repair", icon: FaWrench, startingPrice: 349, rating: 4.6, status: "active" },
  { id: 312, categoryId: 3, categorySlug: "electronics", title: "Software Installation", icon: FaLaptop, startingPrice: 299, rating: 4.9, status: "active" },
  { id: 313, categoryId: 3, categorySlug: "electronics", title: "Windows Installation", icon: FaLaptop, startingPrice: 399, rating: 4.9, status: "active" },
  { id: 314, categoryId: 3, categorySlug: "electronics", title: "Data Recovery", icon: FaLaptop, startingPrice: 599, rating: 4.8, status: "active" },
  { id: 315, categoryId: 3, categorySlug: "electronics", title: "Virus Removal", icon: FaShieldHalved, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 316, categoryId: 3, categorySlug: "electronics", title: "Networking Services", icon: FaPlug, startingPrice: 499, rating: 4.8, status: "active" },

  // --- 4. CLEANING SERVICES ---
  { id: 401, categoryId: 4, categorySlug: "cleaning", title: "Home Cleaning", icon: FaBroom, startingPrice: 999, rating: 4.9, status: "active" },
  { id: 402, categoryId: 4, categorySlug: "cleaning", title: "Kitchen Cleaning", icon: FaKitchenSet, startingPrice: 499, rating: 4.8, status: "active" },
  { id: 403, categoryId: 4, categorySlug: "cleaning", title: "Bathroom Cleaning", icon: MdCleaningServices, startingPrice: 349, rating: 4.9, status: "active" },
  { id: 404, categoryId: 4, categorySlug: "cleaning", title: "Sofa Cleaning", icon: FaCouch, startingPrice: 599, rating: 4.8, status: "active" },
  { id: 405, categoryId: 4, categorySlug: "cleaning", title: "Carpet Cleaning", icon: FaScroll, startingPrice: 499, rating: 4.7, status: "active" },
  { id: 406, categoryId: 4, categorySlug: "cleaning", title: "Mattress Cleaning", icon: FaCouch, startingPrice: 499, rating: 4.7, status: "active" },
  { id: 407, categoryId: 4, categorySlug: "cleaning", title: "Water Tank Cleaning", icon: FaDropletSlash, startingPrice: 699, rating: 4.8, status: "active" },
  { id: 408, categoryId: 4, categorySlug: "cleaning", title: "Office Cleaning", icon: FaBroom, startingPrice: 1999, rating: 4.9, status: "active" },
  { id: 409, categoryId: 4, categorySlug: "cleaning", title: "Deep Cleaning", icon: FaBroom, startingPrice: 1499, rating: 4.9, status: "active" },
  { id: 410, categoryId: 4, categorySlug: "cleaning", title: "Pest Control & Sanitization", icon: FaShieldHalved, startingPrice: 799, rating: 4.8, status: "active" },

  // --- 5. MEDICAL & HEALTHCARE ---
  { id: 501, categoryId: 5, categorySlug: "medical-healthcare", title: "Doctor Consultation", icon: FaStethoscope, startingPrice: 499, rating: 5.0, status: "active" },
  { id: 502, categoryId: 5, categorySlug: "medical-healthcare", title: "Home Nurse", icon: MdMedicalServices, startingPrice: 799, rating: 4.9, status: "active" },
  { id: 503, categoryId: 5, categorySlug: "medical-healthcare", title: "Ambulance Service", icon: FaTriangleExclamation, startingPrice: 999, rating: 5.0, status: "active" },
  { id: 504, categoryId: 5, categorySlug: "medical-healthcare", title: "Physiotherapist", icon: FaStethoscope, startingPrice: 699, rating: 4.9, status: "active" },
  { id: 505, categoryId: 5, categorySlug: "medical-healthcare", title: "Lab Test at Home", icon: MdMedicalServices, startingPrice: 399, rating: 4.8, status: "active" },
  { id: 506, categoryId: 5, categorySlug: "medical-healthcare", title: "Medical Store / Medicine Delivery", icon: MdMedicalServices, startingPrice: 149, rating: 4.8, status: "active" },
  { id: 507, categoryId: 5, categorySlug: "medical-healthcare", title: "Home Care Attendant", icon: MdMedicalServices, startingPrice: 599, rating: 4.7, status: "active" },
  { id: 508, categoryId: 5, categorySlug: "medical-healthcare", title: "Vaccination Service & Blood Collection", icon: MdMedicalServices, startingPrice: 299, rating: 4.9, status: "active" },

  // --- 6. EDUCATION SERVICES ---
  { id: 601, categoryId: 6, categorySlug: "education", title: "Home Tutor", icon: FaGraduationCap, startingPrice: 999, rating: 4.9, status: "active" },
  { id: 602, categoryId: 6, categorySlug: "education", title: "Online Tutor", icon: FaGraduationCap, startingPrice: 799, rating: 4.8, status: "active" },
  { id: 603, categoryId: 6, categorySlug: "education", title: "School Tuition", icon: FaBook, startingPrice: 899, rating: 4.8, status: "active" },
  { id: 604, categoryId: 6, categorySlug: "education", title: "College Tuition", icon: FaBook, startingPrice: 1199, rating: 4.9, status: "active" },
  { id: 605, categoryId: 6, categorySlug: "education", title: "Computer Classes", icon: FaLaptop, startingPrice: 999, rating: 4.9, status: "active" },
  { id: 606, categoryId: 6, categorySlug: "education", title: "Spoken English", icon: FaGraduationCap, startingPrice: 799, rating: 4.7, status: "active" },

  // --- 7. VEHICLE SERVICES ---
  { id: 701, categoryId: 7, categorySlug: "vehicle", title: "Car Repair", icon: FaCar, startingPrice: 699, rating: 4.7, status: "active" },
  { id: 702, categoryId: 7, categorySlug: "vehicle", title: "Bike Repair", icon: FaCar, startingPrice: 349, rating: 4.8, status: "active" },
  { id: 703, categoryId: 7, categorySlug: "vehicle", title: "Puncture Repair", icon: FaWrench, startingPrice: 199, rating: 4.6, status: "active" },
  { id: 704, categoryId: 7, categorySlug: "vehicle", title: "Towing Service", icon: FaCar, startingPrice: 999, rating: 4.9, status: "active" },

  // --- 8. EMERGENCY SERVICES ---
  { id: 801, categoryId: 8, categorySlug: "emergency", title: "Ambulance Service (24/7)", icon: FaTriangleExclamation, startingPrice: 999, rating: 5.0, status: "active" },
  { id: 802, categoryId: 8, categorySlug: "emergency", title: "Fire Service", icon: FaTriangleExclamation, startingPrice: 1499, rating: 5.0, status: "active" },
  { id: 803, categoryId: 8, categorySlug: "emergency", title: "Rapid Response Medical Help", icon: FaStethoscope, startingPrice: 799, rating: 4.9, status: "active" },
  { id: 804, categoryId: 8, categorySlug: "emergency", title: "On-Call Emergency Plumber/Electrician", icon: FaWrench, startingPrice: 399, rating: 4.8, status: "active" },

  // --- 9. UTILITY SERVICES ---
  { id: 901, categoryId: 9, categorySlug: "utility", title: "Water Supply", icon: FaDropletSlash, startingPrice: 299, rating: 4.7, status: "active" },
  { id: 902, categoryId: 9, categorySlug: "utility", title: "Gas Connection", icon: FaGasPump, startingPrice: 399, rating: 4.8, status: "active" },
  { id: 903, categoryId: 9, categorySlug: "utility", title: "Electricity Connection", icon: FaBolt, startingPrice: 499, rating: 4.8, status: "active" },
  { id: 904, categoryId: 9, categorySlug: "utility", title: "Internet Provider Setup", icon: FaPlug, startingPrice: 349, rating: 4.7, status: "active" },
  { id: 905, categoryId: 9, categorySlug: "utility", title: "Cable TV Provider Setup", icon: FaTv, startingPrice: 299, rating: 4.6, status: "active" },

  // --- 10. OTHER SERVICES ---
  { id: 1001, categoryId: 10, categorySlug: "other", title: "Cook & Maid", icon: MdOtherHouses, startingPrice: 499, rating: 4.8, status: "active" },
  { id: 1002, categoryId: 10, categorySlug: "other", title: "Driver Services", icon: FaUserTie, startingPrice: 599, rating: 4.9, status: "active" },
  { id: 1003, categoryId: 10, categorySlug: "other", title: "Caretaker", icon: FaPersonShelter, startingPrice: 799, rating: 4.8, status: "active" },
  { id: 1004, categoryId: 10, categorySlug: "other", title: "Laundry & Dry Cleaning", icon: FaWrench, startingPrice: 199, rating: 4.7, status: "active" },
  { id: 1005, categoryId: 10, categorySlug: "other", title: "Tailor", icon: FaScroll, startingPrice: 249, rating: 4.7, status: "active" }
]; //[cite: 3]

// 5. Providers Data
export const providers = [
  {
    id: "ramesh_101",
    serviceId: 104,
    name: "Ramesh Kumar",
    role: "Painter & Decorator",
    rating: "4.9",
    reviews: 124,
    reviewsText: "124 Reviews",
    experience: "8 Yrs Exp.",
    jobs: "350+",
    charge: "199",
    image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&w=200&q=80",
    about: "Hi, I am Ramesh. I have been providing professional painting services for over 8 years. I specialize in interior painting, exterior painting, texture painting, and wall putty work. I ensure high-quality finishing and leave the premises clean after completing the job.",
    location: "Indiranagar, Karauli",
    timing: "Mon - Sat (9:00 AM - 7:00 PM)",
    languages: "Hindi, English, Kannada",
    verified: true
  },
  {
    id: "suresh_102",
    serviceId: 104,
    name: "Suresh Singh",
    role: "Expert Painter",
    rating: "4.8",
    reviews: 89,
    reviewsText: "89 Reviews",
    experience: "6 Yrs Exp.",
    jobs: "210+",
    charge: "149",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    about: "Hello! I am Suresh, an expert painter specializing in residential painting and waterproofing. My team works fast and ensures your furniture stays safe and clean during the process.",
    location: "Whitefield, Karauli",
    timing: "Mon - Sun (8:00 AM - 8:00 PM)",
    languages: "Hindi, English",
    verified: true
  },
  {
    id: "amit_103",
    serviceId: 104,
    name: "Amit Patel",
    role: "Texture Painting Specialist",
    rating: "5.0",
    reviews: 210,
    reviewsText: "210 Reviews",
    experience: "10 Yrs Exp.",
    jobs: "450+",
    charge: "299",
    image: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=200&q=80",
    about: "Specialist in modern texture painting and premium finishes.",
    location: "Koramangala, Karauli",
    timing: "Mon - Sat (9:00 AM - 6:00 PM)",
    languages: "English, Kannada",
    verified: true
  },
  {
    id: "dinesh_104",
    serviceId: 101,
    name: "Dinesh Sharma",
    role: "Master Electrician",
    rating: "4.7",
    reviews: 56,
    reviewsText: "56 Reviews",
    experience: "4 Yrs Exp.",
    jobs: "120+",
    charge: "199",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80",
    about: "Expert in home wiring, appliance installation, and fault finding.",
    location: "HSR Layout, Karauli",
    timing: "24x7 Available",
    languages: "Hindi, English",
    verified: true
  }
]; //[cite: 3]

// 6. Reviews Data
export const reviews = [
  {
    id: 1,
    name: "Manasa Rayaji",
    time: "2 weeks ago",
    image: "src/assets/images/user_image.jpg",
    review: "Very hard working and polite people. They have done a very thorough and clean job of cleaning the house. I'm very happy with the...",
  },
  {
    id: 2,
    name: "Saraswathi M",
    time: "2 weeks ago",
    image: "src/assets/images/user_image.jpg",
    initial: "S",
    review: "Extraordinary work they did very very happy with the service",
  },
  {
    id: 3,
    name: "Chiranjiv Paritosh",
    time: "2 weeks ago",
    image: "src/assets/images/user_image.jpg",
    review: "Excellent home cleaning service by Suvajit and team.",
  },
]; //[cite: 3, 5]

// 7. FAQ Data
export const faqData = [
  {
    question: "How do I find and book a service on HomeCare?",
    answer: "Booking is very simple! Browse our service categories, select a professional that fits your needs, and check their profile. You can directly call or email them using the contact details provided on their page."
  },
  {
    question: "Do I need to create an account to view worker details?",
    answer: "Yes, to ensure privacy and security, you need to log in to our platform to view detailed profiles, contact numbers, and work galleries of our professionals."
  },
  {
    question: "How much does a service or home visit cost?",
    answer: "Every professional has their own 'Visiting Charge' which is clearly displayed on their profile. The final cost of the repair or service can be discussed directly with the professional before hiring."
  },
  {
    question: "Are the professionals on this platform trusted?",
    answer: "Yes, every professional partner's registration request is manually reviewed and approved by our admin team before their profile becomes visible to the public."
  },
  {
    question: "How can I register myself as a professional/partner?",
    answer: "Click on 'Become a Partner' in the top menu. Fill out your details, select your service category, upload your previous work photos, and submit. Once approved by our team, you will start getting clients!"
  },
  {
    question: "Can I edit my professional profile or update my gallery later?",
    answer: "Absolutely! Once you are an approved partner, simply log in with your email. You will see an 'Edit Profile' button in the menu where you can update your bio, visiting charges, and portfolio images anytime."
  }
];


// 8. Admin Dashboard Stats
export const dashboardStats = [
  { id: 1, title: "Total Users", value: "8,234", bg: "#dbeafe", color: "#3b82f6", border: "#3b82f6", icon: FaUserTie },
  { id: 2, title: "Total Providers", value: "1,452", bg: "#d1fae5", color: "#10b981", border: "#10b981", icon: FaHammer },
  { id: 3, title: "Total Bookings", value: "12,450", bg: "#fef3c7", color: "#f59e0b", border: "#f59e0b", icon: FaScroll },
  { id: 4, title: "Total Revenue", value: "₹4.2M", bg: "#fee2e2", color: "#ef4444", border: "#ef4444", icon: FaGasPump },
];

// 9. Contact Messages (Admin)
export const messages = [
  { id: 1, name: "Rahul Verma", email: "rahul@test.com", phone: "9876543210", subject: "Payment Issue", message: "My payment failed but money was deducted.", date: "2026-07-28", status: "Unread" },
  { id: 2, name: "Priya Singh", email: "priya@test.com", phone: "9876543211", subject: "Service Not Done", message: "The plumber didn't arrive on time.", date: "2026-07-27", status: "Read" }
];

// 10. Partner Requests (Admin)
export const partnerRequests = [
  { id: 1, fullName: "Vikas Sharma", email: "vikas@test.com", category: "Electrician", city: "Karauli", experience: "5 Years", status: "Pending", image: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100" },
  { id: 2, fullName: "Anjali Gupta", email: "anjali@test.com", category: "Cleaning", city: "Mumbai", experience: "2 Years", status: "Approved", image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=100" }
];