# Student Project Tracker - Setup smoke test

Workshop learning checkpoint. Local demo; no login or multi-user isolation.

## Run
Use Node.js 22.23.3 (tested baseline) and a PowerShell terminal in this folder.

```powershell
npm.cmd install
npm.cmd start
```

Open http://localhost:3000. Keep the server terminal running. Stop with Ctrl+C.
The pinned versions and lockfile are supplied in the released kit. After the first install, use `npm.cmd ci` when restoring dependencies.

## Files
`public/index.html`: structure; `public/style.css`: presentation; `public/script.js`: browser behaviour.
`server.js`: local startup. When present, `app.js`: HTTP API; `database.js`: persistence.

## How It Works

The browser displays the project form and list. When a user adds, edits, or deletes a project, `public/script.js` sends an HTTP request to the Express API. The server validates the request and uses `database.js` to read or modify the SQLite database. The API returns a JSON response, and the browser updates the visible list.

**Data flow:** Browser → `fetch()` → Express API → SQLite → JSON response → updated webpage.

## API Endpoints

| Method | Endpoint | Purpose |
|---|---|---|
| GET | `/api/health` | Check server health |
| GET | `/api/projects` | Retrieve projects |
| POST | `/api/projects` | Create a project |
| PUT | `/api/projects/:id` | Update a project |
| DELETE | `/api/projects/:id` | Delete a project |

## Verification Results

Record the results after running each test. Do not mark a test as passed unless you have verified it.

- CRUD operations: [Not tested / Passed / Failed]
- Data after browser refresh: [Not tested / Passed / Failed]
- Data after server restart: [Not tested / Passed / Failed]
- Stopped-server error and recovery: [Not tested / Passed / Failed]
- Slow-save duplicate-request check: [Not tested / Passed / Failed]
- Automated tests using `npm.cmd test`: [Not tested / Passed / Failed]



## Evidence
Explain the current storage location and what survives browser refresh and server restart.
For the final checkpoint, run `npm.cmd test` to verify CRUD, validation and persistence.
Local browser data is not automatically migrated to SQLite. Recreate test records after switching.

## Verification Results

Record the results after running each test. Do not mark a test as passed unless you have verified it.

- CRUD operations: [Not tested / Passed / Failed]
- Data after browser refresh: [Not tested / Passed / Failed]
- - Data after server restart: Passed — existing project records remained after restarting the server.
- Stopped-server error and recovery: [Not tested / Passed / Failed]
- Slow-save duplicate-request check: [Not tested / Passed / Failed]
- Automated tests using `npm.cmd test`: [Not tested / Passed / Failed]


## GitHub
Commit source code and package-lock.json. Exclude node_modules, data and credentials.
Describe your own project and add evidence of testing to this README before the final push.

