# Roamio

**Team:** Lim Shin Yin, Chuah Rui En, Tan Shin Yue, Yap Sheng Lih
**Problem Statement:** Travel Planner
**Video Presentation:** [Unlisted YouTube Link](link)
**UI Prototype:** [Vercel Deployment Link]

---

# 1. Project Overview

## The Problem

Travel planning can be time-consuming and fragmented, especially for travellers who have different needs within the same group.

Most existing travel platforms sit at one of two extremes:

- **Booking platforms** such as Trip.com and Klook:
  - Provide extensive flights, hotels, attractions and activities.
  - However, users still need to manually search, compare and decide whether each option suits their group.
  - They do not deeply consider factors such as physical limitations, dietary needs or preferred travel pace.

- **Generic AI assistants** such as ChatGPT and Gemini:
  - Can provide personalised travel advice through conversation.
  - However, recommendations often remain as text in a chat.
  - There is no direct bridge from an AI suggestion to a structured, actionable and bookable itinerary.

This creates a fragmented planning experience where travellers may need to use multiple platforms for:

- Destination discovery
- Itinerary planning
- Hotel and activity selection
- Weather information
- Maps and places
- Booking
- Expense tracking
- Travel assistance

### Stakeholders

- **Travellers**
  - Especially those travelling with children, elderly companions or physical limitations.
  - Need convenient and personalised trip planning.

- **Travel companions / families**
  - Need to coordinate activities and make sure the itinerary suits everyone.

- **Local guides**
  - Need a way to reach travellers looking for authentic local experiences.

- **Hotels and accommodation providers**
  - Provide accommodation options that can be integrated into the planning process.

- **Tour and activity providers**
  - Provide attractions, tours and local experiences.

- **Cultural festivals and local communities**
  - Can gain greater visibility among travellers interested in cultural tourism.

---

## Similar Applications & Market Gap

| Existing Solution | What They Do Well | Where They Fall Short |
|---|---|---|
| **Trip.com / Klook** | Large selection of flights, hotels, attractions and activities; strong search and booking capabilities | Users still need to manually filter and judge whether options fit their group, physical needs, dietary requirements or preferred pace |
| **Wanderlog** | AI planning, itineraries, maps, route planning, budgeting, collaboration and reservations | Strong trip organisation, but our concept places greater emphasis on traveller-specific constraints and proactive user profiling |
| **TripIt** | Organises existing flight, hotel and reservation information; provides travel information and alerts | Primarily focuses on managing an already-booked trip rather than helping users discover and build a personalised trip from scratch |
| **Generic AI Assistants** | Flexible conversational advice and personalisation | Advice often remains inside the conversation instead of becoming a structured, actionable itinerary |

### Market Gap

Existing applications provide many powerful travel tools, but they often focus on individual stages of the travel journey.

Our opportunity is to connect:

**Discover → Personalise → Generate → Customise → Book → Assist**

into one continuous experience.

---

# Our Solution

[Project Name] is an **AI-powered travel concierge** designed to make travel planning more personalised and actionable.

Instead of starting with a blank search bar or chat box, the app proactively collects information about the traveller's group, preferences, physical limitations, dietary needs, pace and budget. The AI then uses this profile to generate a structured day-by-day itinerary presented as interactive cards rather than walls of text.

Users can customise their itinerary, select hotels and proceed through a booking flow. During the trip, the AI Travel Concierge remains available to answer questions using the user's trip context together with live information such as weather and nearby places.

### Core User Journey

**Discover → Personalise → AI Generate → Customise → Book → Travel → AI Assist**

---

## Core Feature Set

- **Multi-dimensional Traveller Profiling**
  - Physical capability
  - Dietary restrictions
  - Preferred travel pace
  - Budget
  - Group composition
  - Children / adults / elderly

- **AI-generated Structured Itinerary**
  - Day-by-day activities
  - Hotel recommendations
  - Estimated costs
  - Physical-difficulty information

- **Interactive Itinerary Cards**
  - View activities as cards rather than plain text.
  - Regenerate individual days.
  - Add recommendations directly to the trip.

- **Physical-Difficulty Warnings**
  - Highlights potentially demanding activities based on the user's stated limitations.

- **Real-time AI Travel Concierge**
  - Answers travel-related questions.
  - Uses the user's trip context.
  - Can use weather and nearby-place information.
  - Can suggest alternative activities.

- **Apply AI Suggestions to Itinerary**
  - Users can apply AI-generated changes directly to their trip plan.

- **Mock Booking Flow**
  - Hotel selection
  - Booking summary
  - Confirmation

- **Expense Tracking**
  - Allows travellers to record actual spending during their trip.

- **Maps & Places Integration**
  - Helps users discover nearby attractions and useful places.

- **Travel Discovery Feed**
  - Seasonal destinations
  - Cultural festivals
  - Travel packages
  - Deals and promotions

---

# 2. Novel Features

## 1. Traveller-Aware AI Planning

The AI considers **who is travelling**, rather than only asking where the user wants to go.

It takes into account:

- Group composition
- Physical capability
- Dietary needs
- Budget
- Travel pace
- Personal preferences

**Novel twist:**  
Personalisation begins with the traveller's needs instead of being based only on the destination.

---

## 2. Physical-Constraint-Aware Group Planning

Users can specify physical limitations such as:

- Injured foot
- Difficulty walking long distances
- Unable to climb steep areas
- Elderly travellers
- Young children

The AI can then take these constraints into account when selecting activities.

**Novel twist:**  
The system considers the needs of the **whole travelling group**, rather than treating every traveller as physically identical.

---

## 3. Social-style Travel Discovery Feed

Instead of opening the app to an empty itinerary, users can first browse:

- Seasonal trips
- Cultural festivals
- Travel packages
- Popular destinations
- Promotions

Users can then move directly from discovery into planning.

**Novel twist:**

**Discover → Personalise → Plan**

rather than requiring users to already know what they want before planning their trip.

---

## 4. Structured & Actionable AI Output

The AI does not simply return a paragraph of travel recommendations.

Instead, it generates structured itinerary data that becomes:

- Activity cards
- Hotel cards
- Cost information
- Physical-difficulty warnings
- Actions such as regeneration and adding to the trip

**Novel twist:**  
AI recommendations are transformed into **actions inside the travel planner**, rather than remaining as conversational advice.

---

## 5. Closed-Loop AI Concierge

The AI concierge can:

1. Understand the user's trip context.
2. Check relevant information such as weather or nearby places.
3. Recommend a change.
4. Let the user apply the recommendation.
5. Update the itinerary.

Example:

**Rain tomorrow → AI suggests indoor alternatives → User taps "Apply to itinerary" → Trip plan is updated.**

**Novel twist:**  
The AI closes the loop between:

**Ask → Recommend → Apply → Updated Trip**

---

# 3. Future Development

The current prototype focuses on demonstrating the core AI travel-planning experience. Future versions could expand the platform with more advanced travel automation.

## Smart Time Management

- Estimate travel time between hotels and destinations.
- Consider different transportation methods.
- Account for traffic conditions.
- Detect scheduling conflicts.
- Warn users when an itinerary is too tightly packed.
- Provide automatic departure reminders.
- Provide flight departure and boarding reminders.

## Dynamic Itinerary Adjustment

Future versions could automatically adjust the itinerary when:

- Weather conditions change.
- Flights are delayed.
- Attractions become unavailable.
- Travel times change.
- Activities conflict with each other.

---

## One-Tap Travel Bundle

Future versions could allow users to purchase a complete travel bundle directly from their generated itinerary, including:

- Hotel
- Flights
- Transportation
- Activities
- Local guide

### Current Limitation

Real one-tap bundling would require integration with external hotel, flight and activity booking APIs.

Some commercial APIs require paid access, partnerships or additional infrastructure. Therefore, the current prototype demonstrates the booking flow using mock data rather than processing real transactions.

---

## Local Guide Marketplace

Future versions could allow local guides to register on the platform and offer their services directly to travellers.

### Guide Registration

Guides could create profiles containing:

- Languages
- Location
- Areas of expertise
- Tour types
- Availability
- Pricing
- Verification status

### AI Guide Matching

The system could match travellers with suitable local guides based on:

- Destination
- Interests
- Language
- Group size
- Budget
- Preferred activities
- Traveller requirements

### Trust & Safety

Potential future features include:

- KYC / identity verification
- Verified-guide badges
- Ratings and reviews
- Reporting and dispute mechanisms

### Concept

**Traveller Profile + Trip Plan → Matching System → Suitable Local Guides → Request / Booking → Review**

---

## Other Future Improvements

- Travel checklist
- Currency exchange alerts
- Flight price tracking
- Real-time travel disruption notifications
- Voucher and referral system
- Reward points
- More advanced booking integrations
- More comprehensive guide marketplace

---

# 4. Ideation & Process

## 4.1 Ideas We Considered

| Idea | Decision | Reason |
|---|---|---|
| Conversational onboarding + card-based UI | 🟢 **Chosen** | Differentiates the experience from static booking platforms and traditional forms |
| AI-generated structured itinerary | 🟢 **Chosen** | Allows AI output to become an actionable itinerary instead of plain text |
| Physical-difficulty warnings | 🟢 **Chosen** | Directly addresses traveller-specific physical constraints |
| Real-time AI Concierge | 🟢 **Chosen** | Keeps AI useful during the trip rather than only during initial planning |
| Weather / nearby places integration | 🟢 **Chosen** | Allows the AI to respond using real travel context |
| Swipe-to-regenerate itinerary | 🟢 **Chosen** | Gives users an easy way to customise unwanted itinerary days |
| Voucher / referral / reward points | 🟡 **Future** | Useful commercially but not essential to the core prototype |
| Local guide marketplace | 🟡 **Future** | Strong extension of personalised travel, but requires guide onboarding and marketplace infrastructure |
| KYC / guide verification | 🟡 **Future** | Important for trust and safety but outside the current prototype scope |
| One-tap travel bundle | 🟡 **Future** | Requires external commercial booking APIs and additional integrations |
| Real-time travel time estimation | 🟡 **Future** | Requires additional routing / transportation APIs |
| Flight and departure reminders | 🟡 **Future** | Requires flight data and notification infrastructure |
| Real-time flight price tracking | 🔴 **Dropped / Deferred** | Requires additional external APIs and scheduled background jobs |
| Full P2P guide marketplace | 🔴 **Deferred** | Requires user/provider accounts, matching, verification, availability and booking infrastructure |

---

## 4.2 Ideation Boards

### Board 1 — Problem & Opportunity

![Problem Ideation](assets/ideation-1.png)

*Early brainstorming around fragmented travel planning, personalisation and the needs of different traveller groups.*

---

### Board 2 — Feature Ideation

![Feature Ideation](assets/ideation-2.png)

*Exploration of AI planning, concierge assistance, booking, local guide matching and future travel automation.*

---

### Board 3 — Feature Prioritisation

![Feature Prioritisation](assets/ideation-3.png)

*Features were prioritised according to user value and implementation difficulty, allowing the team to focus on the core AI experience within the prototype timeline.*

---

# 5. User Flow

![User Flow](assets/user-flow.png)

### Main Flow

**Discover**

↓  

**Personalised Survey**

↓  

**AI Itinerary Generation**

↓  

**Interactive Itinerary**

↓  

**Customise / Regenerate**

↓  

**Select Hotel / Guide**

↓  

**Booking Summary**

↓  

**Confirmation**

↓  

**During Trip**

↓  

**AI Travel Concierge**

↓  

**Weather / Places / Replanning**

↓  

**Apply Changes to Trip**

---

# 6. Design & Prototype

**UI Prototype:** [Vercel Deployment Link]

The prototype demonstrates the core journey from traveller profiling to AI itinerary generation, itinerary interaction, booking and real-time AI assistance.

---

## Key Screens

### 01 — Home Feed

![Home Feed](assets/screens/home.png)

*Discover seasonal festivals, travel packages and destinations before starting a trip.*

---

### 02 — Personalised Survey

![Personalised Survey](assets/screens/survey.png)

*Collects traveller group, physical limitations, dietary requirements, preferences and other information used for personalised planning.*

---

### 03 — AI Itinerary Generation

![Generating Screen](assets/screens/generating.png)

*The AI generates a structured itinerary based on the traveller's profile.*

---

### 04 — Interactive Itinerary Cards

![Itinerary Cards](assets/screens/itinerary.png)

*Day-by-day recommendations are displayed as interactive cards with activities, costs, hotels and physical-difficulty information.*

---

### 05 — Booking Summary

![Booking Summary](assets/screens/booking-summary.png)

*Consolidates the selected hotel, guide and trip cost before confirmation.*

---

### 06 — AI Travel Concierge

![AI Concierge](assets/screens/ai-concierge.png)

*Provides contextual travel assistance and can apply AI-generated changes directly to the user's itinerary.*

---

# 7. What Makes It Different

### Conversational Profiling Instead of Static Forms

Rather than asking users to complete a long traditional form, the app collects important travel constraints through a lightweight conversational flow.

---

### Structured, Executable Output Instead of Plain-text Advice

Generic AI assistants can provide travel suggestions, but our system converts AI output into structured itinerary cards that users can directly interact with.

---

### Personalisation That Persists Across the Trip

The user's profile is not only used during initial itinerary generation.

Physical limitations, dietary needs, budget and other preferences remain part of the user's travel context and can influence later AI Concierge interactions.

---

### Closed Loop Between Advice and Action

When the AI recommends a change, users can apply it directly to their itinerary instead of manually copying the recommendation.

**AI Advice → User Action → Updated Itinerary**

---

# 8. Technical Architecture & Feasibility

## Tech Stack

| Layer | Technology | Purpose | Why We Chose It | Known Limitation |
|---|---|---|---|---|
| **Frontend** | Next.js + React + TypeScript | User interface and interactions | Fast development, reusable components and suitable for a full-stack web application | Requires deployment/build configuration |
| **Backend** | Next.js API Routes | Handles AI, weather and places requests | Keeps frontend and backend in one codebase | Serverless/API execution limits |
| **Database** | Supabase | Stores user profiles, trip plans, bookings and future guide profiles | PostgreSQL database with authentication and easy web integration | Free-tier storage, database and request limits |
| **AI** | Gemini API | Generates itineraries and powers AI Travel Concierge | Supports structured JSON output, making it suitable for itinerary cards | Free-tier quota and occasional overloaded / 503 responses |
| **Weather** | Open-Meteo | Provides weather information | Free and does not require an API key | Less extensive than some commercial weather APIs |
| **Maps / Places** | Google Places API | Nearby places and location lookup | Reliable place and location data | API usage may require billing / quota |
| **Hosting** | Vercel | Hosts the web application | Easy GitHub integration and automatic deployment | Usage and serverless limits |
| **Version Control** | GitHub | Source control and deployment integration | Enables collaboration and version history | Requires proper branch and merge management |

---

## Supabase

Supabase is used as the application's persistent data layer.

Potential data includes:

- User accounts
- Traveller profiles
- Travel preferences
- Generated trip plans
- Bookings
- Expense records
- Local guide profiles
- Guide availability
- Reviews

Supabase Authentication can also support user registration and login.

### Limitation

The free tier has limits on database storage, requests and other resources. A production-scale version may require a paid plan or additional infrastructure.

---

## External API Constraints

### Gemini API

The Gemini free tier has daily request limits and can occasionally return `503` errors when the model is overloaded.

The prototype mitigates this through an automatic retry-with-backoff mechanism.

---

### Google Places API

Google Places provides useful location and nearby-place information.

However, real-world production usage may require:

- Billing setup
- API quota
- Usage monitoring

---

### One-Tap Travel Bundle

A real one-tap bundle would require external commercial APIs for:

- Flights
- Hotels
- Activities
- Transportation

These APIs may require paid access or commercial partnerships.

Therefore, the current prototype uses mock booking data to demonstrate the intended user experience.

---

# 9. Build Plan & Scope

For the prototype, we prioritised the core experience:

**User Profiling**

→ **AI-generated Structured Itinerary**

→ **Interactive Itinerary Cards**

→ **Regeneration / Hotel Selection**

→ **Mock Booking**

→ **AI Travel Concierge**

→ **Live Weather / Places Lookup**

→ **Apply AI Changes to Itinerary**

Commercial and infrastructure-heavy features such as real-time flight tracking, KYC, a full guide marketplace and one-tap commercial bundling were intentionally deferred.

This allowed the team to focus on demonstrating the core innovation:

> **Turning personalised AI travel advice into an actionable and continuously editable trip.**

---

# 10. Future Vision

Our long-term vision is to evolve the platform from an AI itinerary generator into a complete **AI Travel Concierge**.

The future platform could connect:

**Traveller Profile**

↓  

**AI Trip Planning**

↓  

**Hotels / Flights / Activities**

↓  

**Local Guide Matching**

↓  

**One-Tap Booking**

↓  

**Real-Time Travel Assistance**

↓  

**Dynamic Itinerary Adjustment**

↓  

**Complete Trip Management**

The goal is to make travel planning less fragmented, more personalised and easier to act on.
