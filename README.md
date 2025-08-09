# ✈️ Digido Airline Booking Form

A modern flight booking form built with **Next.js**, **TailwindCSS**, and **React Hook Form**.  
Features real-time validation, route + date selection, synced URL query params, and UI state management via context.

Includes unit tests (Jest, RTL) and E2E tests (Playwright).

I recommend reading the full documentation for more in-depth details about the features before diving into the code:
**[Confluence](https://likakharatishvili01.atlassian.net/wiki/external/Mzg2YzFiNGNiMzU2NGMwNmFiYjAxNGU1ODNmMjkzNzI)**

Deployed on **[Vercel](https://airline-booking-revera-ywoq.vercel.app/)**

Original **[Design](https://www.figma.com/file/oFdDYD6Ca1v3Iz6oxEoej0/Untitled?type=design&node-id=0%3A1&mode=design&t=knYsW49Xi9rnV5rg-1)** (I've changed a bit since paddings were very inconstant)

---

## 🧠 Features

- **Fully typed** with TypeScript (I prefer typing everything strictly)
- **Dynamic form** with validation
- **Date picker calendar**
- **ShadCN UI components**
- **Zod validation**
- **Storybook for isolated UI testing**
- **Playwright for E2E**
- **Jest, RTL for unit tests**

---

## 🏗️ Stack

- **Next.js 14+**
- **React**
- **TypeScript**
- **React Hook Form**
- **Zod**
- **ShadCN UI**
- **Jest / Testing Library**
- **Playwright**
- **Storybook**

---

## 🧪 File Naming

- `*.test.tsx` → Unit/Integration tests (Jest + RTL)
- `*.spec.tsx` → End-to-End tests (Playwright)
- `*.stories.tsx` → Storybook
- `*.utils.ts` → Utility functions
- `lib/` → Global logic
- `components/*/lib` → Component-scoped logic

---

## 🗂️ Folder Structure

```text
src/
├── app/                      # Next.js App Router entry & layout
│   ├── globals.css           # Global styles
│   ├── layout.tsx            # Root layout
│   └── page.tsx              # Home page
├── components/               # Feature-based components
│   ├── home/
│   │   └── AirlineForm/
│   │       ├── components/      # Subfields (Date, Route, Flight Type)
│   │       ├── context/         # Form context (FlightDateFieldContext)
│   │       ├── hooks/           # Syncing logic (URL, date fields)
│   │       ├── lib/             # Constants, utils, validation
│   │       ├── __mocks__/       # Storybook/testing mocks
│   │       ├── AirlineForm.tsx
│   │       ├── AirlineForm.test.tsx     # Unit/integration tests
│   │       ├── AirlineForm.spec.tsx     # Playwright E2E test
│   │       ├── AirlineForm.stories.tsx  # Storybook config
│   ├── shared/               # Shared UI (e.g. <Bounded />)
│   └── ui/                   # shadcn-generated UI primitives
├── hooks/                    # Global reusable hooks
├── lib/
│   ├── constants             # Common constants
│   └── utils/                # Common utilities (string, date, URL)
├── types/                    # Global types/interfaces (optional)
├── pages/                    # (If used for legacy routes)
```

---

## 📦 Requirements

- Node.js `>=18`
- Yarn `>=1.22`

---

## 🚀 Getting Started

```bash
# Install dependencies
yarn install

# Run the dev server
yarn dev
```

---

## 🧪 Testing

### Unit Tests (Jest)

- **Run all unit tests**  
  `yarn test`

- **Run a specific test file**  
  `yarn test:unit src/components/home/AirlineForm/AirlineForm.test.tsx`

---

### E2E Tests (Playwright)

- **Run all E2E tests**  
  `yarn test:e2e`

- **Run Playwright in UI mode**  
  `yarn test:e2e --ui`

- **Run a specific E2E test file**  
  `npx playwright test src/components/home/AirlineForm/AirlineForm.spec.tsx`

- **Run a specific E2E in UI mode**  
  `npx playwright test src/components/home/AirlineForm/AirlineForm.spec.tsx  --ui`

⚠️ Make sure the dev server is running (`yarn dev`) before launching E2E tests.

---

# App Requirements

- Open and work on AirlineForm.tsx.
- Populate the airline booking form using dummy data from Page.tsx.
- Create selection options for 'To' and 'From' destinations and 'One Way' or 'Round Trip'.
Implement the following functionalities:
- Disable dates in the calendar based on the selected city.
- Prompt the user to select a new date if an unavailable date is selected.
- Implement form validation.
- Style the component using TailwindCSS. Ensure it provides a user-friendly and responsive experience.
- Update the URL on input change, so we can navigate back to the page with selected inputs.
Example ?origin=LON&type=one-way&destination=NEW&departureDate=2023-10-04&returnDate=2023-11-01
Submit the form to https://airline-booking-nine.vercel.app/api/booking via POST request with data as application/json.

# 🧪 How to Test the Booking Form

## 1. Go to the App

- Visit the home page (`/`).
- You should see all form fields:
  - Origin
  - Destination
  - Flight Type
  - Departure Date
  - Return Date

✅ On large screens (laptops) (≥1024px):

- Calendar should **not** be visible by default.

✅ On small screens (mobile/tablet) (<1024px):

- Calendar should be **visible** by default.

## 2. Test Form Validation

- Click the **Book Flight** button without filling anything.

✅ You should see red borders and the following error messages:

- `"Origin city is required"`
- `"Destination city is required"`
- `"Departure date is required"`
- `"Return date is required"`

- Try selecting **Destination** without selecting **Origin**.  
  ✅ Destination select should show: **“No options available”**

- Now select **Origin**, then try Destination again.  
  ✅ Destination options should now be enabled.

## 3. Test Calendar Behavior

### 🖥️ Desktop (≥1024px)

- Click **Departure Date** or **Return Date**.  
  ✅ Calendar should appear.
- ✅ Calendar slides in without layout shift.
- ✅ Clicking the **X button** closes the calendar.
- ✅ Selecting a date fills the input **only if** Origin and Destination are selected.
- If not selected, calendar should show: **“Select origin and destination first”**

### 📱 Mobile / Tablet (<1024px)

- Calendar is **always visible** when the page loads.

- Click a date **before selecting origin and destination**.  
  ✅ Warning: **“Select origin and destination first”**

- Select **Origin** and **Destination**, then click a date again **without selecting a date field**.  
  ✅ Warning: **“Select a date field”**

- Now select **Departure Date** or **Return Date**, then choose a date.  
  ✅ The correct field is filled.

- Try selecting a **Return Date earlier than Departure Date**.  
  ✅ Return Date auto-corrects to match Departure Date.

## 4. Test URL Syncing

- Fill out the full form.

✅ URL should update with query params:  
 e.g. `?origin=Paris&destination=Rome&departureDate=2025-08-19&returnDate=2025-08-27&type=round-trip`

- Now change a value (e.g., pick a different date).
- Click the **Browser Back** button.  
  ✅ Form resets to previous values matching the URL.
- Click the **Browser Forward** button.  
  ✅ Form updates again to match the URL.
- Refresh the page.  
  ✅ Form stays filled with current values.

## 5. Test Reset Button

- Fill out the form completely.
- Click the **Reset** button.

✅ All fields are cleared.  
✅ URL query params are removed.  
✅ Refresh the page — form stays empty.

## 6. Test Submission & Toasts

- Fill all fields with valid values.
- Click **Book Flight**.

✅ Button becomes disabled during submission.  
✅ A toast appears confirming success.  
✅ Toast disappears automatically after 9 seconds.  
✅ Or, can be manually dismissed by clicking the **X**.

---

## 📚 Storybook

- **Launch Storybook**  
  `yarn storybook`  
  Opens at: [http://localhost:6006](http://localhost:6006)

---

## 🧼 Lint & Format

- **Lint the codebase**  
  `yarn lint`

- **Fix linter issues**  
  `yarn lint --fix`

---

## 🔧 VS Code Recommended Extensions

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Playwright Test for VS Code](https://marketplace.visualstudio.com/items?itemName=ms-playwright.playwright)

---

## ✍️ Author

Built with ❤️ by [@likax98](https://github.com/likax98)
