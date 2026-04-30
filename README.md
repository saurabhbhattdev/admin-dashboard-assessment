Zenith Elite – Enterprise Admin Portal
A premium administrative dashboard built with a Glassmorphic design system. This portal provides real-time data visualization, advanced user directory management, and a strategic project lifecycle tracker.

🚀 Tech Stack
Framework: React.js (Vite)

Styling: Tailwind CSS v4 (Custom Utility Classes)

Icons: Lucide React

Charts: Recharts (Area, Bar, and Pie distributions)

Forms: React Hook Form (with per-step validation)

Notifications: Sonner (Toast notifications)

Navigation: React Router DOM

✨ Features Implemented
1. Command Center (Dashboard)
KPI Visualization: Real-time metrics for Total Users, Revenue, and Active Projects.

Growth Analytics: Interactive Area Chart with custom linear gradients.

System Health: Executive summary cards for server load and performance.

2. Platform Directory (User Management)
Advanced Table: Includes pagination, sorting, and real-time search filtering.

Provisioning: A sleek Add User Modal with full validation and dynamic state updates.

3. Onboarding Wizard (Multi-Step Form)
Guided Journey: 4-step professional profiling (Personal, Address, Professional, Review).

Component Decomposition: Modular sub-components for better maintainability.

4. Project Portfolio
Lifecycle Tracker: Card-based overview with ownership and commencement data.

Status Timeline: Vertical project journey tracker showing completion stages.

🤖 AI Usage & Collaboration Report
This project was developed using an AI-assisted workflow to optimize code modularity and styling consistency.

AI Tool Used: Gemini 3 Flash

Role: Senior React Mentor

Sample Prompts Used:
"Refactor this multi-step form into modular step components while maintaining subheading consistency."

"Create a glassmorphic modal for user creation with simulated network delay."

"Configure a Recharts AreaChart to use a specific theme-aligned gradient."

"Implement a dynamic state update to ensure newly created users appear at the top of the table without refresh."

Manual Refinement vs. AI:
AI Helped: Foundation logic for data sorting, chart configurations, and glassmorphic CSS boilerplate.

Manual Edits: I manually fine-tuned the Visual Hierarchy by adjusting font weights (800 to 700) to ensure readability and fixed subheadings that were lost during component separation.

🛠️ Setup & Installation
Clone the repository:

Bash
git clone https://github.com/your-username/zenith-elite-admin.git
Install dependencies:

Bash
npm install
Run development server:

Bash
npm run dev