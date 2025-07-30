'use client';

import { useState, useRef, useEffect } from 'react';
import { useUser } from '@/contexts/UserContext';
import { 
  UserCircleIcon, 
  Cog6ToothIcon, 
  ArrowRightOnRectangleIcon,
  ChevronDownIcon 
} from '@heroicons/react/24/outline';

export function UserMenu() {
  const { user, logout } = useUser();
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) {
    return null;
  }

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 bg-black/40 backdrop-blur-sm border border-blue-500/30 rounded-lg px-3 py-2 shadow-lg hover:bg-blue-500/20 transition-colors duration-200"
      >
        <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
          <span className="text-white text-sm font-medium">
            {(user as any).firstName?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase() || user.email.charAt(0).toUpperCase()}
          </span>
        </div>
        <div className="hidden sm:block text-left">
          <div className="text-sm font-medium text-white">
            {(user as any).firstName || user.name || 'User'}
          </div>
          <div className="text-xs text-blue-300">{user.email}</div>
        </div>
        <ChevronDownIcon className={`w-4 h-4 text-blue-300 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''} hidden sm:block`} />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-56 bg-black/90 backdrop-blur-sm border border-blue-500/30 rounded-lg shadow-2xl py-1 z-50">
          <div className="px-4 py-3 border-b border-blue-500/30 sm:hidden">
            <div className="text-sm font-medium text-white">
              {(user as any).firstName || user.name || 'User'}
            </div>
            <div className="text-sm text-blue-300">{user.email}</div>
          </div>
          <div className="hidden sm:block px-4 py-3 border-b border-blue-500/30">
            <div className="text-sm font-medium text-white">
              {(user as any).firstName || user.name || 'User'}
            </div>
            <div className="text-sm text-blue-300">{user.email}</div>
            <div className="text-xs text-green-400 mt-1">● Online</div>
          </div>
          
          <button
            onClick={() => {
              setIsOpen(false);
              window.location.href = '/profile';
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-blue-200 hover:bg-blue-500/20 transition-colors duration-200"
          >
            <UserCircleIcon className="w-4 h-4 mr-3 text-blue-400" />
            Profile Settings
          </button>
          
          <button
            onClick={() => {
              setIsOpen(false);
              window.location.href = '/settings';
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-blue-200 hover:bg-blue-500/20 transition-colors duration-200"
          >
            <Cog6ToothIcon className="w-4 h-4 mr-3 text-blue-400" />
            Account Settings
          </button>
          
          <hr className="my-1 border-blue-500/30" />
          
          <button
            onClick={() => {
              setIsOpen(false);
              logout();
            }}
            className="flex items-center w-full px-4 py-2 text-sm text-red-400 hover:bg-red-500/20 transition-colors duration-200"
          >
            <ArrowRightOnRectangleIcon className="w-4 h-4 mr-3 text-red-400" />
            Sign Out
          </button>
        </div>
      )}
    </div>
  );
}
