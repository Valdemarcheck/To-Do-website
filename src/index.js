import "./unique-button-manager";
import "./form-manager";
import "./listManagement/list-bundle";
import { PubSub } from "./PubSub";

import "./taskManagement/task-creator";

PubSub.emit("CreateDefaultList");
