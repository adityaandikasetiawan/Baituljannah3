import React from 'react';
import { Trophy, Award, Medal } from 'lucide-react';
import { ImageWithFallback } from '../../../components/figma/ImageWithFallback';

interface AchievementCardProps {
  studentName: string;
  studentImage: string;
  achievement: string;
  competition: string;
  rank: string;
  category: string;
  accentColor: string;
}

export const AchievementCard: React.FC<AchievementCardProps> = ({
  studentName,
  studentImage,
  achievement,
  competition,
  rank,
  category,
  accentColor
}) => {
  const getRankIcon = () => {
    if (rank.includes('1')) return <Trophy className="w-6 h-6" />;
    if (rank.includes('2')) return <Award className="w-6 h-6" />;
    return <Medal className="w-6 h-6" />;
  };

  const getRankColor = () => {
    if (rank.includes('1')) return 'from-yellow-500 to-amber-600';
    if (rank.includes('2')) return 'from-gray-400 to-gray-600';
    return 'from-orange-600 to-amber-700';
  };

  return (
    <div className="group bg-white rounded-3xl overflow-hidden shadow-strong hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2">
      {/* Header with Islamic Pattern */}
      <div 
        className="relative h-32 flex items-center justify-center overflow-hidden"
        style={{ background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}dd 100%)` }}
      >
        {/* Islamic Pattern Background */}
        <div className="absolute inset-0 islamic-pattern opacity-20"></div>
        
        {/* School Logo Area */}
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
              <span className="text-xs">🏫</span>
            </div>
            <span className="text-white text-xs px-2 py-1 bg-white/20 backdrop-blur-sm rounded-full">
              Baituljannah
            </span>
          </div>
        </div>
      </div>

      {/* Student Photo Section */}
      <div className="relative -mt-16 px-8">
        <div className="relative w-32 h-32 mx-auto">
          {/* Photo Frame */}
          <div 
            className="absolute inset-0 rounded-2xl"
            style={{ 
              background: `linear-gradient(135deg, ${accentColor} 0%, ${accentColor}aa 100%)`,
              padding: '4px'
            }}
          >
            <div className="w-full h-full rounded-2xl overflow-hidden bg-white">
              <ImageWithFallback
                src={studentImage}
                alt={studentName}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          
          {/* Rank Badge */}
          <div className={`absolute -bottom-2 -right-2 bg-gradient-to-br ${getRankColor()} text-white p-2 rounded-xl shadow-lg`}>
            {getRankIcon()}
          </div>
        </div>
      </div>

      {/* Achievement Info */}
      <div className="px-8 pb-8 pt-6 text-center">
        {/* Congratulations Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-full text-sm mb-4 shadow-md">
          <Trophy className="w-4 h-4" />
          <span>CONGRATULATIONS</span>
        </div>

        {/* Student Name */}
        <h3 className="text-xl mb-2" style={{ color: accentColor }}>
          {studentName}
        </h3>

        {/* Achievement Title */}
        <div 
          className="inline-block px-6 py-3 rounded-xl mb-4 shadow-md"
          style={{ backgroundColor: `${accentColor}22`, color: accentColor }}
        >
          <p className="text-2xl">{rank}</p>
          <p className="text-sm opacity-80">{category}</p>
        </div>

        {/* Competition Details */}
        <div className="space-y-2 text-sm text-gray-600">
          <p className="leading-relaxed">{achievement}</p>
          <p className="font-semibold text-gray-800">{competition}</p>
        </div>

        {/* Decorative Line */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex items-center justify-center gap-2 text-xs text-gray-500">
            <span>🏆</span>
            <span>Prestasi Gemilang</span>
            <span>🏆</span>
          </div>
        </div>
      </div>
    </div>
  );
};
