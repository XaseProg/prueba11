import React from 'react';
import { Medal, CircleDot, Users } from 'lucide-react';
import type { Team } from '../types';

interface TeamCardProps {
  team: Team;
  onDelete: (id: string) => void;
}

export function TeamCard({ team, onDelete }: TeamCardProps) {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
      <div className="flex justify-between items-start mb-4">
        <div className="flex items-center gap-3">
          <img 
            src={team.logo} 
            alt={`${team.name} logo`} 
            className="w-12 h-12 rounded-full object-cover border-2 border-sky-100"
            onError={(e) => {
              const img = e.target as HTMLImageElement;
              img.src = 'https://images.unsplash.com/photo-1614632537197-38a17061c2bd?w=100&h=100&fit=crop&q=80';
            }}
          />
          <h3 className="text-xl font-bold text-sky-900">{team.name}</h3>
        </div>
        <button
          onClick={() => onDelete(team.id)}
          className="text-red-500 hover:text-red-700"
        >
          ×
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Medal size={20} className="text-yellow-500" />
          <span className="font-semibold">{team.points} pts</span>
        </div>
        <div className="flex items-center gap-2">
          <Users size={20} className="text-sky-500" />
          <span>{team.gamesPlayed} jugados</span>
        </div>
        <div className="flex items-center gap-2">
          <CircleDot size={20} className="text-green-500" />
          <span>{team.goalsFor} - {team.goalsAgainst}</span>
        </div>
        <div className="text-sm">
          {team.wins}G {team.draws}E {team.losses}P
        </div>
      </div>
    </div>
  );
}