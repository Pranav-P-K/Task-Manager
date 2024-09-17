'use client';
import React, { useState } from "react";
import { Plus, Users, Trash } from "lucide-react";
import Image from 'next/image';
import Link from 'next/link';

type Team = {
  id: string;
  name: string;
  role: "Team Leader" | "Team Member";
};

export default function Dashboard() {
  const [teams, setTeams] = useState<Team[]>([]); // Manage state locally
  const [teamName, setTeamName] = useState("");
  const [joinTeamName, setJoinTeamName] = useState("");
  const [joinTeamId, setJoinTeamId] = useState("");
  const [isCreateTeamOpen, setIsCreateTeamOpen] = useState(false);
  const [isJoinTeamOpen, setIsJoinTeamOpen] = useState(false);
  const [teamToDelete, setTeamToDelete] = useState<string | null>(null);

  // Generate a random ID for new teams
  const generateUniqueId = () => {
    return Math.random().toString(36).substr(2, 9);
  };

  // Handle team creation
  const handleCreateTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (teamName) {
      const newTeam: Team = {
        id: generateUniqueId(),
        name: teamName,
        role: "Team Leader",
      };
      setTeams([...teams, newTeam]);  // Update teams state directly
      setTeamName("");
      setIsCreateTeamOpen(false);
    }
  };

  // Handle joining a team
  const handleJoinTeam = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (joinTeamName && joinTeamId) {
      const newTeam: Team = {
        id: joinTeamId,
        name: joinTeamName,
        role: "Team Member",
      };
      setTeams([...teams, newTeam]);  // Update teams state directly
      setJoinTeamName("");
      setJoinTeamId("");
      setIsJoinTeamOpen(false);
    }
  };

  // Handle deleting a team
  const handleDeleteTeam = (teamId: string) => {
    setTeams(teams.filter(team => team.id !== teamId));  // Update teams state
    setTeamToDelete(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-gray-900 text-gray-100">
      <header className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-800">
        <div className="flex items-center space-x-3">
          <Image
            src="/default-avatar.jpg"
            alt="User Avatar"
            width={40}
            height={40}
            className="rounded-full"
          />
          <span className="text-white font-medium">RandomUser123</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-6 items-center">
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
              <div key={team.id} className="p-6 bg-gray-800 rounded-lg shadow-lg">
                <div className="flex items-center space-x-4">
                  <div className="bg-blue-500 rounded-full p-3">
                    <Users className="h-6 w-6 text-white" />
                  </div>
                  <div className="flex-1">
                    <Link href={`/team/${team.id}`} className="text-xl font-semibold hover:underline">
                      {team.name}
                    </Link>
                    <p className="text-sm text-gray-400">Your Role: {team.role}</p>
                    <p className="text-sm text-gray-400">Team ID: {team.id}</p>
                  </div>
                  <button
                    onClick={() => setTeamToDelete(team.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash className="h-6 w-6" />
                  </button>
                </div>
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

      {/* Delete Team Modal */}
      {teamToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-lg">
            <h2 className="text-2xl font-bold mb-4">Delete Team</h2>
            <p className="text-gray-300 mb-6">Are you sure you want to delete this team?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setTeamToDelete(null)}
                className="btn btn-outline"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteTeam(teamToDelete)}
                className="btn btn-danger"
              >
                Delete Team
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
