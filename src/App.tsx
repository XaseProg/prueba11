import React, { useState } from 'react';
import { CircleDot, Plus } from 'lucide-react';
import type { Team, Player } from './types';
import { TeamCard } from './components/TeamCard';
import { PlayerStats } from './components/PlayerStats';

function App() {
  const [teams, setTeams] = useState<Team[]>([]);
  const [players, setPlayers] = useState<Player[]>([]);
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTeam, setNewTeam] = useState({ name: '', logo: '' });
  const [newPlayer, setNewPlayer] = useState({ name: '', teamId: '' });

  const addTeam = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTeam.name.trim()) return;

    const team: Team = {
      id: Date.now().toString(),
      name: newTeam.name,
      logo: newTeam.logo || 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=100&h=100&fit=crop&q=80', // Default logo
      points: 0,
      gamesPlayed: 0,
      wins: 0,
      draws: 0,
      losses: 0,
      goalsFor: 0,
      goalsAgainst: 0
    };

    setTeams([...teams, team]);
    setNewTeam({ name: '', logo: '' });
  };

  const addPlayer = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlayer.name.trim() || !newPlayer.teamId) return;

    const player: Player = {
      id: Date.now().toString(),
      name: newPlayer.name,
      teamId: newPlayer.teamId,
      goals: 0,
      assists: 0,
      yellowCards: 0,
      redCards: 0
    };

    setPlayers([...players, player]);
    setNewPlayer({ name: '', teamId: '' });
  };

  const deleteTeam = (id: string) => {
    setTeams(teams.filter(team => team.id !== id));
    setPlayers(players.filter(player => player.teamId !== id));
  };

  const deletePlayer = (id: string) => {
    setPlayers(players.filter(player => player.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white">
      <header className="bg-sky-500 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <CircleDot size={32} />
              <h1 className="text-2xl font-bold">Torneo de Fútbol</h1>
            </div>
            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="flex items-center gap-2 bg-white text-sky-500 px-4 py-2 rounded-lg hover:bg-sky-50 transition-colors"
            >
              <Plus size={20} />
              Agregar
            </button>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        {showAddForm && (
          <div className="bg-white rounded-lg shadow-md p-6 mb-8">
            <div className="grid md:grid-cols-2 gap-6">
              <form onSubmit={addTeam} className="space-y-4">
                <h3 className="text-xl font-bold text-sky-900">Agregar Equipo</h3>
                <input
                  type="text"
                  value={newTeam.name}
                  onChange={(e) => setNewTeam({ ...newTeam, name: e.target.value })}
                  placeholder="Nombre del equipo"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <input
                  type="url"
                  value={newTeam.logo}
                  onChange={(e) => setNewTeam({ ...newTeam, logo: e.target.value })}
                  placeholder="URL del escudo (opcional)"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Agregar Equipo
                </button>
              </form>

              <form onSubmit={addPlayer} className="space-y-4">
                <h3 className="text-xl font-bold text-sky-900">Agregar Jugador</h3>
                <input
                  type="text"
                  value={newPlayer.name}
                  onChange={(e) => setNewPlayer({ ...newPlayer, name: e.target.value })}
                  placeholder="Nombre del jugador"
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                />
                <select
                  value={newPlayer.teamId}
                  onChange={(e) => setNewPlayer({ ...newPlayer, teamId: e.target.value })}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-sky-500 focus:border-transparent"
                >
                  <option value="">Seleccionar equipo</option>
                  {teams.map(team => (
                    <option key={team.id} value={team.id}>{team.name}</option>
                  ))}
                </select>
                <button
                  type="submit"
                  className="w-full bg-sky-500 text-white px-4 py-2 rounded-lg hover:bg-sky-600 transition-colors"
                >
                  Agregar Jugador
                </button>
              </form>
            </div>
          </div>
        )}

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {teams.map(team => (
            <TeamCard key={team.id} team={team} onDelete={deleteTeam} />
          ))}
        </div>

        <PlayerStats players={players} onDelete={deletePlayer} />
      </main>
    </div>
  );
}

export default App;