import React, { useEffect, useState } from 'react';
import { Trophy, Crown, Medal, TrendingUp, Users } from 'lucide-react';
import useAuthStore from '../../store/authStore';

interface LeaderboardUser {
  id: string;
  name: string;
  avatar?: string;
  weeklyXP: number;
  rank: number;
}

const WeeklyLeaderboard: React.FC = () => {
  const { user } = useAuthStore();
  const [leaderboard, setLeaderboard] = useState<LeaderboardUser[]>([]);
  const [userRank, setUserRank] = useState<number>(4);
  const [userWeeklyXP, setUserWeeklyXP] = useState<number>(0);

  useEffect(() => {
    // Mock data pentru top 3 + user
    const mockLeaderboard: LeaderboardUser[] = [
      {
        id: '1',
        name: 'Alexandra M.',
        avatar: 'https://images.pexels.com/photos/3777943/pexels-photo-3777943.jpeg?auto=compress&cs=tinysrgb&w=150',
        weeklyXP: 4000,
        rank: 1
      },
      {
        id: '2', 
        name: 'Mihai R.',
        avatar: 'https://images.pexels.com/photos/1858175/pexels-photo-1858175.jpeg?auto=compress&cs=tinysrgb&w=150',
        weeklyXP: 3800,
        rank: 2
      },
      {
        id: '3',
        name: 'Elena P.',
        avatar: 'https://images.pexels.com/photos/5326953/pexels-photo-5326953.jpeg?auto=compress&cs=tinysrgb&w=150',
        weeklyXP: 3500,
        rank: 3
      }
    ];

    // Folosește XP-ul real al utilizatorului (nu un procent)
    // Pentru liga săptămânală, considerăm că utilizatorul a câștigat acest XP în săptămâna curentă
    const currentUserWeeklyXP = user?.experience || 0;
    
    // Determină poziția utilizatorului
    let rank = 4;
    const updatedLeaderboard = [...mockLeaderboard];
    
    // Verifică dacă utilizatorul depășește pe cineva din top 3
    for (let i = mockLeaderboard.length - 1; i >= 0; i--) {
      if (currentUserWeeklyXP > mockLeaderboard[i].weeklyXP) {
        rank = i + 1;
        // Inserează utilizatorul în poziția corectă
        updatedLeaderboard.splice(i, 0, {
          id: user?.id || 'current-user',
          name: user?.name || 'Tu',
          avatar: user?.avatar,
          weeklyXP: currentUserWeeklyXP,
          rank: rank
        });
        // Actualizează rangurile celorlalți
        for (let j = i + 1; j < updatedLeaderboard.length; j++) {
          updatedLeaderboard[j].rank = j + 1;
        }
        break;
      }
    }

    setLeaderboard(updatedLeaderboard.slice(0, 4)); // Păstrează doar top 4
    setUserRank(rank);
    setUserWeeklyXP(currentUserWeeklyXP);
  }, [user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1:
        return <Crown className="h-5 w-5 text-yellow-500" />;
      case 2:
        return <Medal className="h-5 w-5 text-gray-400" />;
      case 3:
        return <Medal className="h-5 w-5 text-amber-600" />;
      default:
        return <span className="text-sm font-bold text-gray-600">#{rank}</span>;
    }
  };

  const getRankColor = (rank: number, isCurrentUser: boolean = false) => {
    if (isCurrentUser) {
      return 'bg-indigo-50 border-indigo-200';
    }
    switch (rank) {
      case 1:
        return 'bg-gradient-to-r from-yellow-50 to-amber-50 border-yellow-200';
      case 2:
        return 'bg-gradient-to-r from-gray-50 to-slate-50 border-gray-200';
      case 3:
        return 'bg-gradient-to-r from-amber-50 to-orange-50 border-amber-200';
      default:
        return 'bg-white border-gray-200';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <div className="p-2 bg-purple-100 rounded-lg mr-3">
              <Trophy className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h3 className="text-lg font-medium text-gray-900">Scorul tău</h3>
            </div>
          </div>
          <div className="flex items-center text-sm text-gray-500">
            <Users className="h-4 w-4 mr-1" />
            <span>Liga Săptămânală</span>
          </div>
        </div>

        <div className="space-y-3">
          {leaderboard.map((leaderUser, index) => {
            const isCurrentUser = leaderUser.id === user?.id;
            return (
              <div
                key={leaderUser.id}
                className={`flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200 ${getRankColor(
                  leaderUser.rank,
                  isCurrentUser
                )} ${isCurrentUser ? 'transform scale-105 shadow-md' : 'hover:shadow-sm'}`}
              >
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3">
                    {getRankIcon(leaderUser.rank)}
                  </div>
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm mr-3">
                    {leaderUser.avatar ? (
                      <img
                        src={leaderUser.avatar}
                        alt={leaderUser.name}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">
                          {leaderUser.name.charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className={`font-medium ${isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                      {isCurrentUser ? 'Tu' : leaderUser.name}
                    </p>
                    {isCurrentUser && (
                      <p className="text-xs text-indigo-600">Poziția ta</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="text-right mr-2">
                    <p className={`font-bold ${isCurrentUser ? 'text-indigo-700' : 'text-gray-900'}`}>
                      {leaderUser.weeklyXP.toLocaleString()} XP
                    </p>
                    {leaderUser.rank <= 3 && !isCurrentUser && (
                      <p className="text-xs text-gray-500">
                        +{Math.floor(Math.random() * 200 + 100)} azi
                      </p>
                    )}
                  </div>
                  {isCurrentUser && (
                    <TrendingUp className="h-4 w-4 text-indigo-600" />
                  )}
                </div>
              </div>
            );
          })}

          {/* Afișează utilizatorul dacă nu este în top 3 */}
          {userRank > 3 && (
            <div className="border-t pt-3 mt-3">
              <div className={`flex items-center justify-between p-3 rounded-lg border-2 ${getRankColor(userRank, true)} transform scale-105 shadow-md`}>
                <div className="flex items-center">
                  <div className="flex items-center justify-center w-8 h-8 mr-3">
                    <span className="text-sm font-bold text-indigo-600">#{userRank}</span>
                  </div>
                  
                  <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-white shadow-sm mr-3">
                    {user?.avatar ? (
                      <img
                        src={user.avatar}
                        alt={user.name || 'Tu'}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <div className="w-full h-full bg-indigo-100 flex items-center justify-center">
                        <span className="text-indigo-600 font-medium text-sm">
                          {(user?.name || 'Tu').charAt(0)}
                        </span>
                      </div>
                    )}
                  </div>
                  
                  <div>
                    <p className="font-medium text-indigo-700">Tu</p>
                    <p className="text-xs text-indigo-600">Poziția ta</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <div className="text-right mr-2">
                    <p className="font-bold text-indigo-700">
                      {userWeeklyXP.toLocaleString()} XP
                    </p>
                  </div>
                  <TrendingUp className="h-4 w-4 text-indigo-600" />
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="mt-4 p-3 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg border border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-purple-700">
                {userRank <= 3 ? 'Felicitări! Ești în top 3!' : `Încă ${leaderboard[2]?.weeklyXP - userWeeklyXP + 1} XP până în top 3`}
              </p>
              <p className="text-xs text-purple-600">
                {userRank <= 3 ? 'Continuă să înveți pentru a-ți menține poziția!' : 'Parcurge mai multe lecții pentru a urca în clasament!'}
              </p>
            </div>
            <Trophy className="h-6 w-6 text-purple-600" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default WeeklyLeaderboard;