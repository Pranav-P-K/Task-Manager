'use client';
import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { CheckCircle, Plus, Users, Trash2 } from "lucide-react";

export default function Dashboard() {
  const [teams, setTeams] = useState([]);
  const [teamName, setTeamName] = useState("");
  const [joinTeamName, setJoinTeamName] = useState("");
  const [joinTeamId, setJoinTeamId] = useState("");
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isJoinTeamOpen, setIsJoinTeamOpen] = useState(false);
  const router = useRouter();

  // Default user information
  const user = {
    name: 'Random User',
    avatar: 'https://via.placeholder.com/40',
  };

  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  const handleCreateTeam = (e) => {
    e.preventDefault();
    if (teamName) {
      const newTeam = {
        id: generateUniqueId(),
        name: teamName,
        role: "Team Leader",
      };
      setTeams([...teams, newTeam]);
      setTeamName("");
      setIsCreateTeamOpen(false);
    }
  };

  const handleJoinTeam = (e) => {
    e.preventDefault();
    if (joinTeamName && joinTeamId) {
      const newTeam = {
        id: joinTeamId,
        name: joinTeamName,
        role: "Team Member",
      };
      setTeams([...teams, newTeam]);
      setJoinTeamName("");
      setJoinTeamId("");
      setIsJoinTeamOpen(false);
    }
  };

  const handleDeleteTeam = (teamId) => {
    setTeams(teams.filter(team => team.id !== teamId));
  };

  const handleTeamClick = (teamId) => {
    router.push(`/team/${teamId}`);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100">
      <header className="my-4 px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <div className="flex items-center">
          <img 
            src={user.avatar} 
            alt={`${user.name}'s avatar`}
            className="w-10 h-10 rounded-full object-cover mr-2"
          />
          <span className="font-bold text-white text-lg">{user.name}</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <button
            onClick={() => setIsCreateTeamOpen(true)}
            className="btn btn-outline text-white border-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <Plus className="mr-2 h-4 w-4" /> Create Team
          </button>
          <button
            onClick={() => setIsJoinTeamOpen(true)}
            className="btn btn-outline text-white border-blue-400 hover:bg-blue-600 hover:text-white"
          >
            <Users className="mr-2 h-4 w-4" /> Join Team
          </button>
        </nav>
      </header>

      <main className="flex-1 p-6">
        {teams.length > 0 ? (
          <div className="max-w-4xl mx-auto mt-8 space-y-6">
            {teams.map((team) => (
              <div key={team.id} className="p-6 bg-gray-800 rounded-lg shadow-lg flex justify-between items-center cursor-pointer hover:bg-gray-700 transition-colors duration-200" onClick={() => handleTeamClick(team.id)}>
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 rounded-full p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <p className="text-xl font-semibold">{team.name}</p>
                    <p className="text-sm text-gray-400">Your Role: {team.role}</p>
                    <p className="text-sm text-gray-400">Team ID: {team.id}</p>
                  </div>
                </div>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDeleteTeam(team.id);
                  }}
                  className="btn btn-ghost text-red-500 hover:bg-red-500 hover:text-white"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="max-w-4xl mx-auto mt-8 p-6 bg-gray-800 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Welcome to TaskMaster</h2>
            <p className="text-gray-300 mb-6">Create or join a team to get started with managing your tasks.</p>
            <div className="flex justify-center space-x-4">
              <button
                onClick={() => setIsCreateTeamOpen(true)}
                className="btn btn-primary text-white"
              >
                <Plus className="mr-2 h-4 w-4" /> Create Team
              </button>
              <button
                onClick={() => setIsJoinTeamOpen(true)}
                className="btn btn-outline text-white border-blue-400 hover:bg-blue-600 hover:text-white"
              >
                <Users className="mr-2 h-4 w-4" /> Join Team
              </button>
            </div>
          </div>
        )}
      </main>

      {/* Create Team Modal */}
      {isCreateTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Create Team</h2>
            <p className="text-gray-300 mb-6">Enter your team name to create a new team. You will be assigned as the team leader.</p>
            <form onSubmit={handleCreateTeam}>
              <div className="mb-4">
                <label htmlFor="team-name" className="block text-gray-400 mb-2">Team Name</label>
                <input
                  id="team-name"
                  type="text"
                  value={teamName}
                  onChange={(e) => setTeamName(e.target.value)}
                  className="input input-bordered w-full bg-gray-700 text-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setIsCreateTeamOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Create Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Join Team Modal */}
      {isJoinTeamOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Join Team</h2>
            <p className="text-gray-300 mb-6">Enter the team name and ID to join an existing team.</p>
            <form onSubmit={handleJoinTeam}>
              <div className="mb-4">
                <label htmlFor="join-team-name" className="block text-gray-400 mb-2">Team Name</label>
                <input
                  id="join-team-name"
                  type="text"
                  value={joinTeamName}
                  onChange={(e) => setJoinTeamName(e.target.value)}
                  className="input input-bordered w-full bg-gray-700 text-white"
                />
              </div>
              <div className="mb-4">
                <label htmlFor="join-team-id" className="block text-gray-400 mb-2">Team ID</label>
                <input
                  id="join-team-id"
                  type="text"
                  value={joinTeamId}
                  onChange={(e) => setJoinTeamId(e.target.value)}
                  className="input input-bordered w-full bg-gray-700 text-white"
                />
              </div>
              <div className="flex justify-end space-x-4">
                <button type="button" onClick={() => setIsJoinTeamOpen(false)} className="btn btn-outline">
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  Join Team
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}