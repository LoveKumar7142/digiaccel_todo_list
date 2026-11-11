## 1. set up the frontend folders

- package.json -> React and Vite
- src/main.jsx -> load global styles and mount App
- src/App.jsx -> render TasksPage
- vite.config.js -> forward /api to the backend at http://localhost:5000
  - set BACKEND_URL in frontend/.env.local if the backend uses another port

## 2. build weekly cards and expand a week

- start reading src/features/tasks/pages/TasksPage.jsx
  - useWeeklyTasks.js -> fetch weekly counts and remember the opened card
  - taskApi.js -> GET /api/tasks/weekly-summary and GET /api/tasks with from and to
  - WeeklyCard.jsx -> render the week label and open/completed counts
  - TaskList.jsx -> render loading, errors, empty results, or TaskRow items
  - taskDates.js -> show dates in IST and display Sunday as the end of the week
- check -> opening a card fetches tasks within its date range

## 3. add, view, edit and update task status

- TaskFormDialog.jsx -> share the form for add and edit
- TaskDetailsDialog.jsx -> show the selected task details
- TaskDialog.jsx -> share native modal, close button and error display
- useTaskActions.js -> call taskApi.js and refresh counts and task lists after a save
- check -> add a task, edit its title and mark it completed

## 4. search and delete tasks

- TaskSearch.jsx -> input for searching by title or description
- useTaskSearch.js -> wait 250 ms before requesting results
- useRequest.js -> cancel old requests when the query changes
- TaskRow.jsx -> reveal Delete on swipe and keep a button for keyboard and mouse
- DeleteTaskDialog.jsx -> confirm before calling DELETE /api/tasks/:id
- check -> search for a task, delete it, and check the weekly count again

## 5. add styles and verify the frontend

- src/styles/globals.css -> base styles, colors and shared controls
- page and component CSS files -> styles for their own layouts
- checked JSX syntax, local imports, moved CSS rules, IST dates and mocked API requests
- Figma visual match still needs a check against the original frames
- run npm install in frontend, start the backend, then run npm run dev in frontend
- check the full flow at mobile and desktop widths, then run npm run build
- npm installation was blocked by registry DNS in the workspace and Vite was unavailable for the build
- production -> forward /api to the backend on the same origin or configure VITE_API_BASE_URL and allow the frontend origin on the backend

## 6. update Home to follow the Figma frame

- TaskHome.jsx -> search shortcut, selected day's task list and View All
- DateStrip.jsx -> show Monday to Sunday, move across weeks and pick a date
- calendar.js -> turn the selected IST day into API date boundaries
- WeekOverview.jsx -> use live completed/pending counts and weekly progress
- TasksPage.jsx -> open WeeklyTasksView from View All and add tasks using the floating plus button

## 7. update the Add Task form

- TaskFormDialog.jsx -> bottom sheet with separate date and time fields
- combine both fields into scheduledAt for the existing API
- keep priority from the assignment and use one scheduled time

## 8. add Search and Onboarding screens

- TaskSearchView.jsx -> dedicated search screen with a back button in TasksPage
- OnboardingPage.jsx -> blue welcome screen with Get Started
- App.jsx -> remember that Get Started was clicked in this browser

## 9. match typography with Figma Properties

- select text layers in Figma and read family, size, weight, line height and letter spacing
- index.html and globals.css -> load Poppins weights 300, 400, 500 and 600
- Home -> section headings 18px/600, task rows and View All 14px/500
- calendar -> weekday 10px/400, date 14px/500, both with 22px line height
- summary -> label 12px/400 with 28px line height, count 22px/600, caption 10px/400
- Onboarding -> title 24px/600, body 12px/400 and button 16px/500
- Add Task -> heading 18px/500, label 12px/500, input 14px/400 and button 16px/500
- search -> Home shortcut 12px/300 and dedicated input 12.11px/300

## 10. match the Add Task layout measurements

- reference frame -> 390 x 844, sheet -> 390 x 585, with 24px side padding
- title/date -> 342 x 40, time/priority columns -> 156 x 40 each with 30px gap
- description -> 342 x 100, Create task -> 342 x 48
- reuse the second time slot for priority because the assignment stores one scheduled time
- narrower viewports shrink the fields and short viewports scroll the sheet

## 11. apply the measured sizes to Home, Search and Onboarding

- Home -> search 339 x 47, summary cards 162 x 96, progress bar 342 x 24, add button 76 x 76
- Search -> 342 x 47.42 search box at 84px from the top of the frame
- Onboarding -> 24px side padding and 342 x 48 Get Started button with a 32px bottom inset
- keep week navigation and live task data because the reference shows a static example

## 12. check the frontend at mobile sizes

- keep the Add Task sheet at 585px tall on the 390 x 844 reference frame
- reduce form gaps on shorter viewports and let the sheet scroll when it needs more room
- browser checked -> 390 x 844, 390 x 667 and 320 x 568, with no horizontal overflow in the sheet
- use a shorter priority option so it fits the two-column time row
- put the search icon on the right and use compact edit/delete icons on task rows
- browser checked -> required title, weekly card expansion, search results, task details and empty search
- browser checked -> swipe reveals Delete and Cancel closes confirmation
- browser checked -> saved an edit and changed status on Task_Test_1, then restored its title and status
- Vite in-memory production build passed

## 13. match the Figma icon shapes

- TaskIcon.jsx -> shared vectors for edit, trash, search, status, plus, close and back
- use the named edit and trash-2 outlines from the reference and measured stroke sizes and colors
- keep button labels and hit targets for keyboard and touch

## 14. polish the weekly summary card

- WeeklyCard.jsx -> date header, open/completed totals and completion bar
- WeeklyCard.css -> blue calendar badge, two count tiles and expanded task divider
- reuse the existing week toggle and API counts
