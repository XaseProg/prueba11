import React from 'react';
import { Award, Zap, AlertCircle } from 'lucide-react';
import type { Player } from '../types';

interface PlayerStatsProps {
  players: Player[];
  onDelete: (id: string) => void;
}

export function PlayerStats({ players, onDelete }: PlayerStatsProps) {
  const sortedByGoals = [...players].sort((a, b) => b.goals - a.goals);
  const sortedByAssists = [...players].sort((a, b) => b.assists - a.assists);

  return (
    <div className="grid md:grid-cols-2 gap-6">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
          <Award className="text-yellow-500" />
          Goleadores
        </h3>
        <div className="space-y-3">
          {sortedByGoals.slice(0, 5).map((player) => (
            <div key={player.id} className="flex justify-between items-center">
              <span>{player.name}</span>
              <span className="font-semibold">{player.goals}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
          <Zap className="text-blue-500" />
          Asistencias
        </h3>
        <div className="space-y-3">
          {sortedByAssists.slice(0, 5).map((player) => (
            <div key={player.id} className="flex justify-between items-center">
              <span>{player.name}</span>
              <span className="font-semibold">{player.assists}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6 md:col-span-2">
        <h3 className="text-xl font-bold text-sky-900 mb-4 flex items-center gap-2">
          <AlertCircle className="text-red-500" />
          Tarjetas
        </h3>
        <div className="space-y-3">
          {players.filter(p => p.yellowCards > 0 || p.redCards > 0).map((player) => (
            <div key={player.id} className="flex justify-between items-center">
              <span>{player.name}</span>
              <div className="flex gap-3">
                <span className="bg-yellow-400 px-2 rounded">
                  {player.yellowCards}
                </span>
                <span className="bg-red-500 text-white px-2 rounded">
                  {player.redCards}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}