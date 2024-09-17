// models/Team.js
import mongoose from 'mongoose';

const TeamSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  members: [
    {
      userId: {
        type: String,
        required: true,
      },
      role: {
        type: String,
        enum: ['Team Leader', 'Team Member'],
        default: 'Team Member',
      },
    },
  ],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Team = mongoose.model('Team', TeamSchema);

export default Team;
