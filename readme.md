# Trashformer

Our platform is a full-stack solution designed to revolutionize waste management and community engagement. It enables real-time tracking of waste collection vehicles, provides user notifications, and supports various community-oriented features such as scrap dealer contact, crowdfunding, and more. The platform also offers opportunities for users to engage in sustainability initiatives, donate items, and support charitable causes.

---

## Key Features:

- **Real-Time Vehicle Tracking**:  
  Track waste management vehicles on an interactive map, ensuring efficient route management and reducing delays. Users receive up-to-date information about when to dispose of their waste.

- **User Notifications**:  
  Send timely alerts to users when waste collection vehicles are nearby, encouraging prompt waste disposal, reducing missed collections, and enhancing neighborhood cleanliness.

- **Connect with Scrap Dealers**:  
  Easily contact scrap dealers through a user-friendly interface, making it easier for individuals to recycle and contribute to waste reduction.

- **Blogging and Tutorials**:  
  Users can post blogs and tutorials related to sustainability, recycling, and community-building, fostering knowledge sharing among participants.

- **Marketplace for Secondhand & Upcycled Products**:  
  A platform where users can buy and sell secondhand, upcycled, or repurposed products, promoting sustainability and reducing waste.

- **Donation Hub**:  
  Users can donate items such as books, toys, clothes, and other reusable goods, giving a second life to things others no longer need, all within the application.

- **Crowdfunding and Campaigns**:  
  Organize and participate in campaigns to raise funds for environmental causes or community projects, encouraging collaboration and support for meaningful causes.

- **Leaderboards & Quests**:  
  Boost engagement with weekly and monthly quests, and track user activity on leaderboards to recognize top sponsors and top volunteers, promoting friendly competition and community involvement.

### 🚀 Backend

- Built with **Node.js** and **TypeScript**.
- REST API created using **Express.js**.
- **Prisma** ORM for PostgreSQL database management.
- **Dockerized PostgreSQL** setup for easy database management and deployment.
- Real-time job processing and notification dispatch using **Bull.js** and **Redis**.
- Well-structured architecture:
  - `controllers/`: Handles incoming API requests.
  - `models/`: Manages database schemas.
  - `prisma/`: Database management files.
  - `services/`: Handles business logic.
  - `routes/`: API endpoint definitions.
  - `utils/`: Helper utilities.

### 🌐 Frontend

- Built with **React.js** and **TypeScript**.
- **TanStack Query** for efficient caching and data synchronization.
- Responsive design for seamless user experience across devices.
- Modern UI with clear visualizations, real-time data updates, and ease of navigation.

### 📦 Technologies Used

- **Backend**: Node.js, Express.js, Prisma, PostgreSQL, Bull.js, Redis
- **Frontend**: React.js, TanStack Query
- **Other**: TypeScript, Docker

---

## 🗂 Folder Structure

### Backend

```plaintext
backend/
├── controllers/        # Request handlers for endpoints
├── models/             # Database schemas and models
├── prisma/             # Database setup and migrations
├── services/           # Business logic implementations
├── routes/             # API endpoint routing
├── utils/              # Helper functions
├── docker-compose.yaml # Docker Compose configuration for setting up the PostgreSQL database. It defines the PostgreSQL service, maps the necessary ports, and configures persistent storage for database data.

├── package.json        # Backend dependencies
```

### Frontend

```plaintext
frontend/
├── src/
│   ├── components/      # Reusable UI components
│   ├── hooks/           # Custom React hooks
│   ├── pages/           # Application pages
│   ├── services/        # API request utilities
│   ├── styles/          # Application styles
├── public/              # Public assets (images, etc.)
├── package.json         # Frontend dependencies
```

---

## 🛠️ Setup

### Prerequisites

Ensure the following tools are installed on your machine:

- [Node.js](https://nodejs.org/)
- [Docker](https://www.docker.com/)
- [Redis](https://redis.io/)

### Backend Setup

1. Navigate to the `backend/` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the PostgreSQL container using Docker:
   ```bash
   docker-compose up -d
   ```
4. Apply database migrations:
   ```bash
   npx prisma migrate dev
   ```
5. Start the backend server:
   ```bash
   npm run dev
   ```

### Frontend Setup

1. Navigate to the `frontend/` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the frontend development server:
   ```bash
   npm run dev
   ```

### Start Redis Locally

Redis is required for handling job queues. You can start Redis locally with:

```bash
redis-server
```

---

## 🚧 How to Use

1. **Backend API**
   Access the backend API at:

   ```
   http://localhost:3000/api
   ```

   - Example endpoints:
     - `GET /api/blogs`: Fetch a list of all blogs.
     - `POST /api/notification/sendGarbageTruckNotification`: Create a notification.

2. **Frontend**
   - Access the frontend application at:
     ```
     http://localhost:5137
     ```
   - Features include:
     - **Real-time location tracking**: Displays the live location of waste management vehicles.
     - **Notifications**: Users are notified of vehicle arrivals in their area.

---

## 🤖 Tech Stack

### Backend

| **Technology** | **Purpose**                 |
| -------------- | --------------------------- |
| Node.js        | Server runtime              |
| Express.js     | REST API framework          |
| Prisma         | ORM for PostgreSQL          |
| Bull.js        | Job queue for notifications |
| Redis          | Storage for job queues      |

### Frontend

| **Technology** | **Purpose**                 |
| -------------- | --------------------------- |
| React.js       | Frontend library            |
| TanStack Query | Data-fetching and caching   |
| TypeScript     | Statically typed JavaScript |

---

## 📦 Docker Setup

This project uses Docker for managing PostgreSQL. Follow the steps below to start the database service.

1. Build the Docker image for PostgreSQL:
   ```bash
   docker-compose build
   ```
2. Start the PostgreSQL service:
   ```bash
   docker-compose up -d
   ```

---

## 👥 Team

- **[Jivan Kadel]**: [Frontend Developer]
- **[Arun Khatri]**: [Frontend Developer]
- **[Sumit Shrestha]**: [Backend Developer]
- **[Pranil Shrestha]**: [Backend Developer]

---

## Future Enhancements:

- **Carbon Footprint Tracker**:  
  Implement a feature that tracks users’ carbon footprint based on their recycling, donation, and waste management activities, helping users understand their environmental impact.

- **AI Integration for Item Identification**:  
  Integrate artificial intelligence to identify items, recommend proper recycling or reuse methods, and suggest sustainable practices, making it easier for users to contribute to sustainability efforts.

- **Marketplace for Gardening Tools, Pesticides, Vases, and Seeds**:  
  Expand the marketplace to include gardening supplies like tools, pesticides, vases, and seeds, supporting sustainable home gardening practices and reducing environmental impact.

- **Automated Tracking and Notifications**:  
  Enhance vehicle tracking and notification systems with more automation, including predictive notifications based on historical data and real-time vehicle location, ensuring more timely and efficient service.

- **Collaboration with NGOs, INGOs, and Government Bodies**:  
  Work closely with NGOs, international NGOs (INGOs), and government bodies to support large-scale environmental projects and initiatives, creating partnerships to further the mission of sustainability.

---

```

```
