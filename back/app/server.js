import express from "express";
import ApiProjectsRoute from '../api/routes/projects.api.routes.js'
import ApiUsersRoute from '../api/routes/users.api.routes.js'
import ApiProjectsTeamsRoute from '../api/routes/projects_teams.api.routes.js'
import ApiProjectsRequestsRoute from '../api/routes/projects_requests.api.routes.js'
import ApiAuthRoute from '../api/routes/accounts.api.routes.js'
import ApiSkillsRoute from '../api/routes/skills.api.route.js'
import ApiProjectsShortcutsRoute from '../api/routes/projects_shortcuts.api.routes.js'

import cors from 'cors'

const app = express();
app.listen(3333);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors())

app.use("/uploads", express.static("uploads"));
app.use("/", express.static("public"));

app.use('/api', ApiProjectsRoute);
app.use('/api', ApiProjectsTeamsRoute);
app.use('/api', ApiProjectsRequestsRoute);
app.use('/api', ApiAuthRoute);
app.use('/api', ApiUsersRoute);
app.use('/api', ApiSkillsRoute);
app.use('/api', ApiProjectsShortcutsRoute);