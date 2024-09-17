import Team from '@/server/models/team';
import Task from '@/server/models/task';
import mongoose from 'mongoose';

export const createTeam = async ({ name, members }: { name: string; members: { userId: string; role: string } }) => {
  try {

    const newTeam = new Team({
      name,
      members,
    });

    await newTeam.save();
    return newTeam;
  } catch (error) {
    return { error: 'Error creating team' };
  }
};


export const addTaskToTeam = async ({ title, priority, teamId }: { title: string; priority: string; teamId: mongoose.Schema.Types.ObjectId }) => {
  try {

    const team = await Team.findById(teamId);
    if (!team) {
      return { error: 'Team not found' };
    }

    const newTask = new Task({
      title,
      priority,
      teamId,
    });

    await newTask.save();
    return newTask;
  } catch (error) {
    return { error: 'Error adding task' };
  }
};
