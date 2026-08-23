# AI prompts / conversation record

## User request

> Build a project according to the requirements mentioned in the attached document using the MERN stack. Connect MongoDB properly. The UI should be elegant and beautiful.

## Source requirements received

The attached `AI_Kata_Car_Dealership_Inventory_System_V2.docx` specified a REST API with JWT authentication, MongoDB persistence, protected vehicle CRUD/search/purchase/restock endpoints, React/Tailwind frontend, user/admin flows, tests, README documentation and transparent AI usage disclosure.

## AI-assisted implementation record

The implementation was generated collaboratively with OpenAI Codex. It set up the Express/Mongoose/JWT backend; React, Vite and Tailwind frontend; API tests; MongoDB environment instructions; and project documentation. The code should be reviewed, run, and committed by the repository owner.

## Follow-up requests

### User dashboard layout

> Align the car list properly in the user dashboard.

> I want 3 column grid in user dashboard for car list.

> Remove the space beside the car list and fill it with car list.

The vehicle cards were updated to use consistent full-height layouts with bottom-aligned purchase controls. The user inventory was changed to a responsive three-column grid on larger screens, and the inventory area was expanded to use the full dashboard width. The orders panel was moved below the inventory instead of occupying a permanent side column.

### Repository publishing

> Push the whole project to the git: https://github.com/23WH1A0511/Car_Dealership_Inventory_System.git

The project was initialized as a Git repository, committed, and pushed to the `main` branch. Remote changes were fetched and rebased before publishing the README update. The `.gitignore` excluded `.env`, `node_modules`, build output, coverage, and log files.

### README documentation

> Include a comprehensive README.md with a clear project explanation, detailed backend and frontend setup instructions, screenshots of the final application in action, and the mandatory "My AI Usage" section. Include only the image code and do not take screenshots.

The README was expanded with project features, technology stack, structure, prerequisites, environment configuration, MongoDB setup, backend and frontend commands, seed/admin instructions, API overview, testing, build instructions, screenshot Markdown placeholders, and the mandatory AI usage disclosure. No screenshots were created by the AI.
