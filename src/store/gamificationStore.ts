import { create } from 'zustand';
import { Badge } from '../types';
import supabase from '../config/supabase';
import useAuthStore from './authStore';

interface GamificationState {
  badges: Badge[];
  earnedBadges: string[];
  loading: boolean;
  error: string | null;
  fetchBadges: () => Promise<void>;
  fetchEarnedBadges: (userId: string) => Promise<void>;
  awardBadge: (badgeId: string) => Promise<void>;
  addExperience: (amount: number) => Promise<void>;
  calculateLevel: (experience: number) => number;
}

const useGamificationStore = create<GamificationState>((set, get) => ({
  badges: [],
  earnedBadges: [],
  loading: false,
  error: null,

  fetchBadges: async () => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase.from('badges').select('*');
      
      if (error) {
        throw error;
      }

      set({ badges: data as Badge[], loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchEarnedBadges: async (userId: string) => {
    try {
      set({ loading: true, error: null });
      const { data, error } = await supabase
        .from('user_badges')
        .select('badgeId')
        .eq('userId', userId);
      
      if (error) {
        throw error;
      }

      set({ 
        earnedBadges: data.map((item: any) => item.badgeId), 
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  awardBadge: async (badgeId: string) => {
    const { earnedBadges } = get();
    const user = useAuthStore.getState().user;
    
    if (!user || earnedBadges.includes(badgeId)) return;

    try {
      set({ loading: true, error: null });
      
      // Add badge to user_badges table
      const { error } = await supabase
        .from('user_badges')
        .insert([{ userId: user.id, badgeId }]);
      
      if (error) {
        throw error;
      }

      // Update user badges array
      const updatedBadges = [...user.badges, badgeId];
      await useAuthStore.getState().updateUser({ badges: updatedBadges });

      set({ 
        earnedBadges: [...earnedBadges, badgeId], 
        loading: false 
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  addExperience: async (amount: number) => {
    const user = useAuthStore.getState().user;
    if (!user) return;

    try {
      set({ loading: true, error: null });
      
      const newExperience = user.experience + amount;
      const currentLevel = get().calculateLevel(user.experience);
      const newLevel = get().calculateLevel(newExperience);
      
      // Update user experience and level
      await useAuthStore.getState().updateUser({ 
        experience: newExperience,
        level: newLevel 
      });

      // If level up, award a level badge
      if (newLevel > currentLevel) {
        // Check for level-specific badges
        const levelBadges = ['level-5', 'level-10', 'level-20'];
        for (const levelBadge of levelBadges) {
          const requiredLevel = parseInt(levelBadge.split('-')[1]);
          if (newLevel >= requiredLevel) {
            const { data, error } = await supabase
              .from('badges')
              .select('id')
              .eq('id', levelBadge)
              .maybeSingle();
            
            if (!error && data) {
              await get().awardBadge(data.id);
            }
          }
        }
      }

      set({ loading: false });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  calculateLevel: (experience: number) => {
    // Improved level calculation: level = sqrt(experience/100) + 1
    // This ensures consistent XP requirements across the app
    return Math.floor(Math.sqrt(experience / 100)) + 1;
  },
}));

export default useGamificationStore;