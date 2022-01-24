import mongoose from 'mongoose'
import { AccountSchema, ProfileSchema } from '../models/Account'
import { ValueSchema } from '../models/Value'
import { ProjectSchema } from '../models/Project'
import { SprintSchema } from '../models/Sprint';
import { TaskSchema } from '../models/Task';
import { NoteSchema } from '../models/Note';

class DbContext {
  Values = mongoose.model('Value', ValueSchema);
  Account = mongoose.model('Account', AccountSchema);
  Profiles = mongoose.model('Profile', ProfileSchema, 'accounts');

  Projects = mongoose.model('Project', ProjectSchema);

  Sprints = mongoose.model('Sprint', SprintSchema);

  Tasks = mongoose.model('Task', TaskSchema);

  Notes = mongoose.model('Note', NoteSchema);

}

export const dbContext = new DbContext()
