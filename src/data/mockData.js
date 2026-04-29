// src/data/mockData.js

/* =========================
   DASHBOARD DATA
========================= */
export const kpiData = {
  totalUsers: 1280,
  revenue: 84520,
  activeProjects: 38,
};

export const chartData = [
  { name: "Jan", users: 120 },
  { name: "Feb", users: 210 },
  { name: "Mar", users: 320 },
  { name: "Apr", users: 410 },
  { name: "May", users: 580 },
  { name: "Jun", users: 720 },
];

export const projectDistributionData = [
  { name: "Web Apps", projects: 12 },
  { name: "Mobile Apps", projects: 8 },
  { name: "UI/UX", projects: 10 },
  { name: "Internal Tools", projects: 8 },
];

export const userRoleData = [
  { name: "Admin", value: 12 },
  { name: "Manager", value: 28 },
  { name: "Developer", value: 85 },
  { name: "Designer", value: 25 },
];

/* =========================
   USER MANAGEMENT DATA
========================= */
export const usersData = [
  {
    id: 1,
    name: "Aarav Sharma",
    email: "aarav@example.com",
    role: "Admin",
    status: "Active",
    createdDate: "2026-01-12",
  },
  {
    id: 2,
    name: "Priya Verma",
    email: "priya@example.com",
    role: "Manager",
    status: "Inactive",
    createdDate: "2026-02-05",
  },
  {
    id: 3,
    name: "Rohan Mehta",
    email: "rohan@example.com",
    role: "Developer",
    status: "Active",
    createdDate: "2026-02-18",
  },
  {
    id: 4,
    name: "Sneha Kapoor",
    email: "sneha@example.com",
    role: "Designer",
    status: "Pending",
    createdDate: "2026-03-01",
  },
  {
    id: 5,
    name: "Kabir Singh",
    email: "kabir@example.com",
    role: "Developer",
    status: "Active",
    createdDate: "2026-03-10",
  },
  {
    id: 6,
    name: "Ananya Joshi",
    email: "ananya@example.com",
    role: "Manager",
    status: "Active",
    createdDate: "2026-03-22",
  },
  {
    id: 7,
    name: "Dev Malhotra",
    email: "dev@example.com",
    role: "Developer",
    status: "Inactive",
    createdDate: "2026-04-02",
  },
  {
    id: 8,
    name: "Isha Arora",
    email: "isha@example.com",
    role: "Designer",
    status: "Active",
    createdDate: "2026-04-11",
  },
];

/* =========================
   PROJECTS MODULE DATA
========================= */
export const projectsData = [
  {
    id: 1,
    projectName: "Admin Portal Revamp",
    owner: "Aarav Sharma",
    status: "In Progress",
    startDate: "2026-01-15",
    description:
      "Complete redesign and modernization of internal admin dashboard.",
    relatedUsers: [
      "Aarav Sharma",
      "Priya Verma",
      "Rohan Mehta",
    ],
    timeline: [
      "Project Initiated",
      "UI/UX Approved",
      "Frontend Development",
      "Testing Phase",
    ],
  },
  {
    id: 2,
    projectName: "Mobile Banking UI",
    owner: "Sneha Kapoor",
    status: "Completed",
    startDate: "2026-02-10",
    description:
      "Designed and deployed secure banking mobile application interface.",
    relatedUsers: [
      "Sneha Kapoor",
      "Kabir Singh",
    ],
    timeline: [
      "Research",
      "Wireframes",
      "Design System",
      "Deployment",
    ],
  },
  {
    id: 3,
    projectName: "HR Automation Suite",
    owner: "Ananya Joshi",
    status: "Pending",
    startDate: "2026-03-05",
    description:
      "Internal HR management and automation software for employee lifecycle.",
    relatedUsers: [
      "Ananya Joshi",
      "Dev Malhotra",
      "Isha Arora",
    ],
    timeline: [
      "Planning",
      "Requirement Gathering",
      "Architecture",
    ],
  },
];

/* =========================
   WIZARD CONFIG DATA
   (Assessment Requirement:
   4 steps + ~15 fields)
========================= */
export const TOTAL_STEPS = 4;

export const wizardStepTitles = [
  "Personal Info",
  "Address Details",
  "Professional Info",
  "Review & Submit",
];

export const initialWizardData = {
  /* Personal Info */
  firstName: "",
  lastName: "",
  email: "",
  phone: "",

  /* Address */
  address: "",
  city: "",
  state: "",
  zipCode: "",

  /* Professional */
  company: "",
  jobTitle: "",
  experience: "",
  department: "",

  /* Additional */
  linkedIn: "",
  portfolio: "",
  notes: "",
};