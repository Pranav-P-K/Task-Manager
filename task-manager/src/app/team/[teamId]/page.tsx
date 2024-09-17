'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { Plus, CheckCircle, Clock, XCircle } from 'lucide-react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

// Type definitions
interface Comment {
  id: number;
  text: string;
}

interface Task {
  id: number;
  title: string;
  priority: string;
  status: string;
  comments: Comment[];
}

interface Team {
  id: string;
  name: string;
  role: string;
}

// Constants
const TaskStatus = {
  TODO: 'To Do',
  IN_PROGRESS: 'In Progress',
  DONE: 'Done',
};

const TaskPriority = {
  LOW: 'Low',
  MEDIUM: 'Medium',
  HIGH: 'High',
};

export default function TeamPage() {
  const { teamId }: { teamId: string} = useParams();
  const router = useRouter();
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentTeam, setCurrentTeam] = useState<Team | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTask, setNewTask] = useState<{ title: string; priority: string }>({
    title: '',
    priority: TaskPriority.MEDIUM,
  });
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [comment, setComment] = useState('');

  useEffect(() => {
    // Fetch and set teams data here (you could replace with API calls)
    const fetchedTeams: Team[] = [
      { id: '1', name: 'Alpha Team', role: 'Team Leader' },
      { id: '2', name: 'Beta Squad', role: 'Team Member' },
      ];
      setTeams(fetchedTeams);
      setCurrentTeam({ id: teamId, name: "random team name", role: "Team Leader"});
      /*

    if (teamId && fetchedTeams) {
      const team = fetchedTeams.find((t) => t.id === teamId);
      if (team) {
        setCurrentTeam(team);
      } else {
        router.push('/dashboard');
      }
    }*/
  }, [teamId, router]);

  // Handle adding a new task
  const handleAddTask = () => {
    if (newTask.title) {
      setTasks([...tasks, { ...newTask, id: Date.now(), status: TaskStatus.TODO, comments: [] }]);
      setNewTask({ title: '', priority: TaskPriority.MEDIUM });
    }
  };

  // Handle updating task status
  const handleUpdateTaskStatus = (taskId: number, newStatus: string) => {
    setTasks(
      tasks.map((task) => (task.id === taskId ? { ...task, status: newStatus } : task))
    );
  };

  // Handle adding a comment
  const handleAddComment = () => {
    if (comment && selectedTask) {
      setTasks(
        tasks.map((task) =>
          task.id === selectedTask.id
            ? { ...task, comments: [...task.comments, { id: Date.now(), text: comment }] }
            : task
        )
      );
      setComment('');
    }
  };

  // Generate random data for completed tasks
  const completedTasksData = [
    { name: 'Team Member 1', completedTasks: Math.floor(Math.random() * 10) },
    { name: 'Team Member 2', completedTasks: Math.floor(Math.random() * 10) },
    { name: 'Team Member 3', completedTasks: Math.floor(Math.random() * 10) },
  ];

  // Generate random names for other teams
  const otherTeams = ['Gamma Group', 'Delta Force', 'Epsilon Crew'];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100 p-6 flex">
      <div className="w-1/4 pr-4">
        <h2 className="text-xl font-bold mb-4">Your Teams</h2>
        {teams.map((team) => (
          <Link key={team.id} href={`/team/${team.id}`} className="block mb-2 p-2 bg-gray-800 rounded hover:bg-gray-700">
            {team.name}
          </Link>
        ))}
        <h3 className="text-lg font-bold mt-6 mb-2">Other Teams</h3>
        {otherTeams.map((team, index) => (
          <div key={index} className="mb-2 p-2 bg-gray-800 rounded">{team}</div>
        ))}
      </div>
      <div className="w-3/4">
        <Link href="/dashboard" className="btn btn-ghost mb-4">
          &larr; Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold mb-4">{currentTeam?.name}</h1>
        <p className="text-xl mb-4">Team ID: {currentTeam?.id}</p>

        {currentTeam?.role === 'Team Leader' && (
          <div className="mb-4">
            <h2 className="text-2xl font-bold mb-2">Add New Task</h2>
            <input
              type="text"
              value={newTask.title}
              onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
              className="input input-bordered mr-2"
              placeholder="Task title"
            />
            <select
              value={newTask.priority}
              onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              className="select select-bordered mr-2"
            >
              {Object.values(TaskPriority).map((priority) => (
                <option key={priority} value={priority}>
                  {priority}
                </option>
              ))}
            </select>
            <button onClick={handleAddTask} className="btn btn-primary">
              <Plus className="mr-2" /> Add Task
            </button>
          </div>
        )}

        <div className="mb-4">
          <h2 className="text-2xl font-bold mb-2">Tasks</h2>
          {tasks.map((task) => (
            <div key={task.id} className="mb-2 p-2 bg-gray-800 rounded">
              <div className="flex justify-between items-center">
                <span>
                  {task.title} - Priority: {task.priority}
                </span>
                {currentTeam?.role === 'Team Member' && (
                  <div>
                    <button
                      onClick={() => handleUpdateTaskStatus(task.id, TaskStatus.TODO)}
                      className="btn btn-ghost btn-sm mr-1"
                    >
                      <XCircle className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleUpdateTaskStatus(task.id, TaskStatus.IN_PROGRESS)}
                      className="btn btn-ghost btn-sm mr-1"
                    >
                      <Clock className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => handleUpdateTaskStatus(task.id, TaskStatus.DONE)}
                      className="btn btn-ghost btn-sm"
                    >
                      <CheckCircle className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
              <button onClick={() => setSelectedTask(task)} className="btn btn-ghost btn-sm mt-2">
                View Comments
              </button>
              {selectedTask?.id === task.id && (
                <div className="mt-2">
                  <h3 className="font-bold">Comments:</h3>
                  {task.comments.map((comment) => (
                    <p key={comment.id} className="text-sm">
                      {comment.text}
                    </p>
                  ))}
                  <input
                    type="text"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="input input-bordered input-sm mr-2 mt-2"
                    placeholder="Add a comment"
                  />
                  <button onClick={handleAddComment} className="btn btn-primary btn-sm">
                    Add Comment
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>

        {currentTeam?.role === 'Team Leader' && (
          <div>
            <h2 className="text-2xl font-bold mb-2">Completed Tasks by Team Members</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={completedTasksData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="completedTasks" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        )}
      </div>
    </div>
  );
}
