import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { CheckSquare, Home, BarChart, Settings } from 'lucide-react'

function Header() {
  const location = useLocation()

  const isActive = (path: string) => location.pathname === path

  return (
    <header className="bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2">
            <CheckSquare className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-gray-900">TaskFlow</span>
          </Link>
          
          <nav className="flex space-x-8">
            <Link
              to="/"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Home className="h-4 w-4" />
              <span>Accueil</span>
            </Link>
            
            <Link
              to="/tasks"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/tasks') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <CheckSquare className="h-4 w-4" />
              <span>Tâches</span>
            </Link>
            
            <Link
              to="/analytics"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/analytics') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <BarChart className="h-4 w-4" />
              <span>Statistiques</span>
            </Link>
            
            <Link
              to="/settings"
              className={`flex items-center space-x-1 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                isActive('/settings') 
                  ? 'bg-blue-100 text-blue-700' 
                  : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Settings className="h-4 w-4" />
              <span>Paramètres</span>
            </Link>
          </nav>
        </div>
      </div>
    </header>
  )
}

export default Header