# Next.js Airline Booking Form Assessment

## Introduction

This assessment evaluates your skills in React and Next.js by having you construct an airline booking form using the `AirlineForm.tsx` component and dummy data in `Page.tsx`.

## Requirements

- Node.js (>= 20.x)
- npm or yarn

## Getting Started

1. Fork this repository.

2. Clone your fork:

   ```shell
   git clone
   cd <cloned-repository>
   ```

3. Install dependencies:

   ```shell
   npm install
   # or
   yarn install
   ```

4. Run the development server:
   ```shell
   npm run dev
   # or
   yarn dev
   ```

## Design

Design file is available in https://www.figma.com/file/oFdDYD6Ca1v3Iz6oxEoej0/Untitled?type=design&node-id=0%3A1&mode=design&t=knYsW49Xi9rnV5rg-1

The resulting component should look relatively similar. We don't expect pixel perfect, the design is made by a developer. Take note of the comments, that describe that the calendar should appear with an animation when date pickers are pressed.

## Assignment Task

1. Open and work on `AirlineForm.tsx`.
2. Populate the airline booking form using dummy data from `Page.tsx`.
3. Create selection options for 'To' and 'From' destinations and 'One Way' or 'Round Trip'.
4. Implement the following functionalities:
   - Disable dates in the calendar based on the selected city.
   - Prompt the user to select a new date if an unavailable date is selected.
5. Implement form validation.
6. Style the component using [TailwindCSS](https://tailwindcss.com/). Ensure it provides a user-friendly and responsive experience.
7. Update the URL on input change, so we can navigate back to the page with selected inputs.
   - Example ?origin=LON&type=one-way&destination=NEW&departureDate=2023-10-04&returnDate=2023-11-01 
9. Submit the form to https://airline-booking-nine.vercel.app/api/booking via POST request with data as application/json.
12. The endpoint will respond with a status, timestamp and bookingId. Display those in the form as you see fit.
13. Deploy the project to Vercel.

## Expectations

- Clean and maintainable code
- Proper handling of component state and props
- Adequate documentation and comments
- Usage of unstyled components for out of the box functionality and accessibility (e.g RadixUI, HeadlessUI, ShadCDN)

## Submission

1. Fork this repository to your GitHub account.
2. Complete the assignment.
3. Push your code to your fork.
4. Invite @thordisj to your fork for review.

## Evaluation Criteria

- Functionality
- Code Quality
- User Experience
- Responsiveness
- Documentation

## Support

For any questions, reach out to your assessment coordinator.

## License

This project is licensed under the MIT License.
