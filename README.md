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
  `yarn playwright --ui`

- **Run a specific E2E test file**  
  `npx playwright test src/components/home/AirlineForm/AirlineForm.spec.tsx`

⚠️ Make sure the dev server is running (`yarn dev`) before launching E2E tests.

---

## 📚 Storybook

- **Launch Storybook**  
  `yarn storybook`  
  Opens at: [http://localhost:6006](http://localhost:6006)

---

## 🧼 Lint & Format

- **Lint the codebase**  
  `yarn lint`

- **Format all files**  
  `yarn format`

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

