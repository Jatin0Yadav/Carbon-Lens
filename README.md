CarbonLens 🌱
Personal Carbon Intelligence Dashboard

CarbonLens is an AI-powered carbon footprint tracking platform that helps users log everyday activities, calculate their carbon impact, track weekly targets, identify emission patterns, and receive personalized sustainability recommendations.

Log → Understand → Track → Detect Patterns → Explain → Suggest

🚀 What CarbonLens Does

CarbonLens turns everyday activities into actionable carbon insights.

Log Activity
     ↓
Calculate Carbon Emission
     ↓
Store Activity
     ↓
Analyze Weekly Impact
     ↓
Detect Category Patterns
     ↓
Retrieve Relevant Knowledge
     ↓
AI Carbon Coach
     ↓
Personalized Action
✨ Features
📊 Carbon Footprint Tracking

Users can log:

🚗 Car travel
🚌 Bus travel
✈️ Flights
⚡ Electricity consumption
🥗 Vegetarian meals
🍗 Non-vegetarian meals

Every activity stores:

Activity type
Quantity
Unit
Carbon emission
Timestamp
Impact level
Activity insight
🧮 Deterministic Carbon Calculation

CarbonLens uses fixed emission factors for predictable and reproducible calculations.

Activity	Emission Factor	Unit
Car	0.20	kg CO₂ / km
Bus	0.08	kg CO₂ / km
Flight	0.25	kg CO₂ / km
Electricity	0.80	kg CO₂ / kWh
Vegetarian Meal	0.50	kg CO₂ / meal
Non-Vegetarian Meal	2.00	kg CO₂ / meal
Formula
Carbon Emission = Quantity × Emission Factor

The carbon calculation is handled entirely by the backend. AI does not calculate emissions.

🎯 Weekly Carbon Target

CarbonLens tracks emissions from:

Monday 00:00
        ↓
Sunday 23:59

The dashboard displays:

Total weekly emissions
Weekly target
Target percentage
Remaining / exceeded amount
Category breakdown

Default target:

35 kg CO₂ / week

Target validation:

Minimum → 1 kg
Maximum → 1000 kg
🧠 AI Carbon Coach

CarbonLens includes an AI-powered Carbon Coach designed specifically for sustainability decision support.

Instead of being a generic chatbot, the AI uses the user's carbon context and retrieved sustainability knowledge to generate practical recommendations.

Example:

Transportation is the largest contributor
                ↓
Relevant transportation query
                ↓
Vector similarity search
                ↓
Retrieve sustainability knowledge
                ↓
Send context to LLM
                ↓
Personalized AI recommendation

The AI is designed to:

Give practical recommendations
Keep suggestions concise
Avoid fabricated sustainability information
Avoid shaming users
Avoid extreme recommendations
Ground recommendations in retrieved knowledge
🔎 RAG Architecture

CarbonLens uses Retrieval-Augmented Generation (RAG).

             Sustainability Knowledge
                       │
                       ▼
                  Embeddings
                       │
                       ▼
             PostgreSQL + pgvector
                       ▲
                       │
                Similarity Search
                       │
                       ▼
               CarbonRagService
                       │
                       ▼
              Retrieved Context
                       │
                       ▼
                CarbonAiService
                       │
                       ▼
                    Ollama
                       │
                       ▼
                AI Carbon Coach
Embedding Model
nomic-embed-text
Embedding Dimension
768
Vector Index
HNSW
Distance Metric
COSINE_DISTANCE
Knowledge Base

The initial knowledge base contains guidance related to:

Public transportation
Carpooling
Walking and cycling
Electricity conservation
Efficient appliances
Plant-based meals
Air travel alternatives
Repeatable low-impact behavioral changes
🏗️ System Architecture
                         INTERNET
                            │
                            ▼
                    ┌──────────────┐
                    │    Nginx     │
                    │      :80     │
                    └──────┬───────┘
                           │
             ┌─────────────┴─────────────┐
             │                           │
             ▼                           ▼
      React Frontend               Spring Boot API
                                      :8080
                                         │
                         ┌───────────────┴──────────────┐
                         │                              │
                         ▼                              ▼
                PostgreSQL + pgvector                Ollama
                                                       :11434
🛠️ Tech Stack
Backend
Java 17
Spring Boot
Spring Web
Spring Data JPA
Spring Validation
Spring AI
PostgreSQL
pgvector
Ollama
Maven
Lombok
Frontend
React
Vite
JavaScript / JSX
Axios
CSS
SVG visualizations
AI
Spring AI
Ollama
codellama:latest
nomic-embed-text
RAG
Vector similarity search
PostgreSQL + pgvector
Deployment
Docker
Docker Compose
Docker Hub
AWS EC2
Nginx
📁 Project Structure
Carbon-Lens/
│
├── backend/
│   ├── Dockerfile
│   ├── pom.xml
│   └── src/
│       └── main/
│           ├── java/
│           │   └── org/example/carbonfootprinttracker/
│           │       ├── activity/
│           │       ├── carbon/
│           │       ├── dashboard/
│           │       ├── target/
│           │       └── ai/
│           │
│           └── resources/
│
├── frontend/
│   ├── Dockerfile
│   ├── package.json
│   ├── public/
│   └── src/
│       ├── Components/
│       ├── pages/
│       └── services/
│
├── docker-compose.yml
├── nginx.conf
├── README.md
└── DECISIONS.md
🔌 REST API
Activities
Create Activity
POST /api/activities

Example:

{
  "type": "CAR",
  "quantity": 15
}
Get Activities
GET /api/activities
Dashboard
GET /api/dashboard/weekly

Example response:

{
  "totalCarbonEmission": 18.5,
  "weeklyTarget": 35.0,
  "targetPercentage": 52.86,
  "remainingOrExceeded": 16.5,
  "categoryBreakdown": {
    "TRANSPORTATION": 12.5,
    "FOOD": 4.0,
    "ENERGY": 2.0
  }
}
Target
Get Current Target
GET /api/target
Update Target
PUT /api/target

Example:

{
  "target": 30
}
AI
Search Knowledge
GET /api/ai/search?query=public%20transportation
Carbon Coach
GET /api/ai/coach?query=How%20can%20I%20reduce%20my%20transportation%20emissions?
🗄️ Database

CarbonLens uses PostgreSQL for application data and pgvector for embeddings.

Required PostgreSQL extensions:

CREATE EXTENSION IF NOT EXISTS vector;
CREATE EXTENSION IF NOT EXISTS hstore;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

Main application tables:

activities
weekly_targets

Spring AI manages the vector-store layer used by the RAG pipeline.

🛡️ Validation & Product Decisions
DP1 — Weekly Target Nudge

When the user exceeds their weekly target:

Inform
  ↓
Encourage
  ↓
Suggest practical alternatives

The application:

Does not block the user
Does not shame the user
Does not prevent additional activity logging
DP2 — Absurd Input

Unrealistic activity quantities are rejected.

Quantity > 0
Quantity <= 5000

The application does not silently modify invalid input.

DP3 — Week Definition

All weekly calculations use:

Monday 00:00:00
        ↓
Sunday 23:59:59.999999999
🤖 AI Design Principle

The project deliberately separates deterministic application logic from generative AI.

                CARBONLENS
                    │
          ┌─────────┴─────────┐
          │                   │
          ▼                   ▼
   Deterministic Core      AI Layer
          │                   │
          ▼                   ▼
 Carbon Calculation       RAG Search
 Dashboard                + Ollama
 Validation                    │
 Target Logic                   ▼
                         Recommendations
Why?

Carbon calculations should be:

Predictable
Reproducible
Testable

AI is better suited for:

Explanation
Personalization
Contextual recommendations
Decision support
💻 Local Setup
Requirements

Install:

Java 17+
Maven
Node.js
npm
PostgreSQL
Ollama
Docker
Backend
cd backend

Build:

./mvnw clean package

Run:

./mvnw spring-boot:run

Backend:

http://localhost:8080
Frontend
cd frontend

Install:

npm install

Run:

npm run dev

Frontend:

http://localhost:5173
🌱 Ollama Setup

Pull the models:

ollama pull codellama:latest
ollama pull nomic-embed-text

Local Ollama endpoint:

http://localhost:11434

Inside Docker:

http://ollama:11434
🐳 Docker Deployment

CarbonLens uses Docker images for both frontend and backend.

Backend
chief070/carbonlens-backend:latest

Build:

docker build --platform linux/amd64 \
  -t chief070/carbonlens-backend:latest ./backend

Push:

docker push chief070/carbonlens-backend:latest
Frontend
chief070/carbonlens-frontend:latest

Build:

docker build --platform linux/amd64 \
  -t chief070/carbonlens-frontend:latest ./frontend

Push:

docker push chief070/carbonlens-frontend:latest
🚀 Production Deployment

The application is deployed on AWS EC2 using Docker Compose.

Services:

frontend
backend
postgres
ollama

Persistent volumes:

postgres_data
ollama_data

Start the application:

docker compose pull
docker compose up -d

Check:

docker compose ps

Logs:

docker compose logs backend
docker compose logs frontend
🌐 Nginx Routing

Nginx provides the public entry point.

/
    ↓
React Frontend

/api/
    ↓
Spring Boot Backend

Production frontend configuration:

VITE_API_URL=/api

This allows the frontend and API to use the same public host.

🔐 Environment Variables
Local frontend
VITE_API_URL=http://localhost:8080/api
Production frontend
VITE_API_URL=/api
Docker backend
SPRING_DATASOURCE_URL=jdbc:postgresql://postgres:5432/carbon_tracker
SPRING_DATASOURCE_USERNAME=postgres
SPRING_DATASOURCE_PASSWORD=postgres
SPRING_AI_OLLAMA_BASE_URL=http://ollama:11434

For a real production deployment, database credentials should be supplied through secure environment configuration rather than committed to source control.

🔄 Deployment Workflow
Developer Machine
       │
       ├── Spring Boot Build
       │
       ├── Docker Backend Image
       │
       └── Docker Hub
              │
              ▼
             EC2
              │
       ┌──────┴──────┐
       │             │
       ▼             ▼
   Backend       Frontend
       │             │
       ▼             ▼
 PostgreSQL       Nginx
       │             │
       └──────┬──────┘
              │
            Ollama
              │
              ▼
        Public CarbonLens
📈 Dashboard Categories

Activities are grouped into:

Transportation
CAR
BUS
FLIGHT
Energy
ELECTRICITY
Food
VEG_MEAL
NON_VEG_MEAL

AI Insights use these categories to identify patterns and provide relevant recommendations.

🎨 Frontend

The frontend contains:

Dashboard
Log Activity
AI Insights
Settings

The dashboard provides visual feedback on weekly emissions and category contribution.

AI Insights uses category-based line visualizations to show activity/emission trends across the Monday–Sunday period.

📦 Backend Components
Activity

Responsible for:

Activity creation
Activity retrieval
Validation
Persistence
Carbon

Responsible for:

Emission factors
Carbon calculations
Impact classification
Activity insights
Dashboard

Responsible for:

Weekly aggregation
Target comparison
Category breakdown
Target

Responsible for:

Weekly target creation
Target retrieval
Target updates
AI

Responsible for:

Knowledge-base initialization
Vector retrieval
RAG
AI Coach generation
🧪 Verification Checklist

After deployment, verify:

[ ] Application loads
[ ] Dashboard loads
[ ] Activity can be logged
[ ] Carbon emission is calculated
[ ] Activity is persisted
[ ] Weekly total updates
[ ] Category breakdown updates
[ ] Weekly target can be changed
[ ] Target exceedance produces a nudge
[ ] Unrealistic input is rejected
[ ] AI Insights loads
[ ] RAG retrieval works
[ ] AI Coach responds
[ ] React routes work after refresh
🔮 Future Improvements

Potential extensions:

More detailed emission-factor datasets
Monthly and yearly analytics
Long-term personal trends
Advanced anomaly detection
Larger sustainability knowledge base
More granular transportation categories
More detailed energy models
Automated weekly recommendations
Weather-aware travel suggestions
Carbon offset information
Additional AI-powered insights
📜 License

This project was created as a hackathon project.

AZIS-R4G3RS
CarbonLens

Log → Understand → Track → Detect Patterns → Explain → Suggest
