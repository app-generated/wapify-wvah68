import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { CheckSquare, Plus, Clock, TrendingUp, Star } from 'lucide-react'

interface Task {
  id: string
  title: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  dueDate?: string
}

function HomePage() {
  const [recentTasks] = useState<Task[]>([
    { id: '1', title: 'Terminer le rapport mensuel', completed: false, priority: 'high', dueDate: '2024-01-15' },
    { id: '2', title: 'Préparer la présentation client', completed: false, priority: 'medium', dueDate: '2024-01-18' },
    { id: '3', title: 'Réviser les contrats', completed: true, priority: 'low' },
    { id: '4', title: 'Organiser la réunion équipe', completed: false, priority: 'medium', dueDate: '2024-01-20' }
  ])

  const completedTasks = recentTasks.filter(task => task.completed).length
  const totalTasks = recentTasks.length
  const completionRate = Math.round((completedTasks / totalTasks) * 100)

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-100'
      case 'medium': return 'text-yellow-600 bg-yellow-100'
      case 'low': return 'text-green-600 bg-green-100'
      default: return 'text-gray-600 bg-gray-100'
    }
  }

  const getPriorityLabel = (priority: string) => {
    switch (priority) {
      case 'high': return 'Haute'
      case 'medium': return 'Moyenne'
      case 'low': return 'Basse'
      default: return 'Normal'
    }
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Hero Section */}
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          Bienvenue sur TaskFlow
        </h1>
        <p className="text-xl text-gray-600 mb-8">
          Gérez vos tâches efficacement et atteignez vos objectifs
        </p>
        <div className="flex justify-center space-x-4">
          <Link to="/tasks">
            <Button size="lg" className="flex items-center space-x-2">
              <Plus className="h-5 w-5" />
              <span>Nouvelle tâche</span>
            </Button>
          </Link>
          <Link to="/analytics">
            <Button variant="outline" size="lg" className="flex items-center space-x-2">
              <TrendingUp className="h-5 w-5" />
              <span>Voir les stats</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tâches complétées</p>
                <p className="text-2xl font-bold text-gray-900">{completedTasks}/{totalTasks}</p>
              </div>
              <CheckSquare className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                <p className="text-2xl font-bold text-gray-900">{completionRate}%</p>
              </div>
              <Star className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tâches en cours</p>
                <p className="text-2xl font-bold text-gray-900">{totalTasks - completedTasks}</p>
              </div>
              <Clock className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Tasks */}
      <Card>
        <CardContent className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Tâches récentes</h2>
            <Link to="/tasks">
              <Button variant="outline" size="sm">
                Voir tout
              </Button>
            </Link>
          </div>
          
          <div className="space-y-4">
            {recentTasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded border-2 flex items-center justify-center ${
                    task.completed ? 'bg-green-600 border-green-600' : 'border-gray-300'
                  }`}>
                    {task.completed && (
                      <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`font-medium ${
                      task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                    }`}>
                      {task.title}
                    </p>
                    {task.dueDate && (
                      <p className="text-sm text-gray-500">
                        Échéance: {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                      </p>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                    getPriorityColor(task.priority)
                  }`}>
                    {getPriorityLabel(task.priority)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default HomePage