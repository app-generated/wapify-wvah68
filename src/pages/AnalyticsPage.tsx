import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { BarChart, TrendingUp, CheckSquare, Clock, Star, Calendar, Users, Target } from 'lucide-react'

interface TaskStats {
  total: number
  completed: number
  pending: number
  overdue: number
  byPriority: {
    high: number
    medium: number
    low: number
  }
  byCategory: { [key: string]: number }
  completionRate: number
  avgCompletionTime: number
}

function AnalyticsPage() {
  const [stats] = useState<TaskStats>({
    total: 47,
    completed: 32,
    pending: 15,
    overdue: 3,
    byPriority: {
      high: 8,
      medium: 23,
      low: 16
    },
    byCategory: {
      'Travail': 18,
      'Personnel': 12,
      'Développement': 8,
      'Management': 5,
      'Santé': 4
    },
    completionRate: 68,
    avgCompletionTime: 3.2
  })

  const [weeklyData] = useState([
    { day: 'Lun', completed: 5, created: 3 },
    { day: 'Mar', completed: 8, created: 6 },
    { day: 'Mer', completed: 6, created: 4 },
    { day: 'Jeu', completed: 9, created: 7 },
    { day: 'Ven', completed: 4, created: 8 },
    { day: 'Sam', completed: 2, created: 1 },
    { day: 'Dim', completed: 3, created: 2 }
  ])

  const [monthlyGoals] = useState({
    target: 50,
    current: 32,
    remaining: 18,
    daysLeft: 12
  })

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'bg-red-500'
      case 'medium': return 'bg-yellow-500'
      case 'low': return 'bg-green-500'
      default: return 'bg-gray-500'
    }
  }

  const getCategoryColor = (index: number) => {
    const colors = ['bg-blue-500', 'bg-purple-500', 'bg-pink-500', 'bg-indigo-500', 'bg-teal-500']
    return colors[index % colors.length]
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Statistiques & Analytics</h1>
        <div className="flex items-center space-x-2 text-sm text-gray-500">
          <Calendar className="h-4 w-4" />
          <span>Dernière mise à jour: {new Date().toLocaleDateString('fr-FR')}</span>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Total des tâches</p>
                <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
                <p className="text-xs text-gray-500 mt-1">Ce mois-ci</p>
              </div>
              <CheckSquare className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Tâches complétées</p>
                <p className="text-2xl font-bold text-green-600">{stats.completed}</p>
                <p className="text-xs text-gray-500 mt-1">+{Math.round((stats.completed / stats.total) * 100)}% du total</p>
              </div>
              <Star className="h-8 w-8 text-green-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">En cours</p>
                <p className="text-2xl font-bold text-yellow-600">{stats.pending}</p>
                <p className="text-xs text-gray-500 mt-1">{stats.overdue} en retard</p>
              </div>
              <Clock className="h-8 w-8 text-yellow-600" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">Taux de réussite</p>
                <p className="text-2xl font-bold text-blue-600">{stats.completionRate}%</p>
                <p className="text-xs text-gray-500 mt-1">Moyenne: {stats.avgCompletionTime}j</p>
              </div>
              <TrendingUp className="h-8 w-8 text-blue-600" />
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        {/* Weekly Activity Chart */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Activité hebdomadaire</h3>
              <BarChart className="h-5 w-5 text-gray-500" />
            </div>
            
            <div className="space-y-4">
              {weeklyData.map((day, index) => (
                <div key={day.day} className="flex items-center space-x-4">
                  <div className="w-8 text-sm font-medium text-gray-600">{day.day}</div>
                  <div className="flex-1 flex space-x-2">
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="text-xs text-gray-500 w-16">Complétées</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-green-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.completed / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-900 w-4">{day.completed}</div>
                    </div>
                    <div className="flex items-center space-x-2 flex-1">
                      <div className="text-xs text-gray-500 w-16">Créées</div>
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${(day.created / 10) * 100}%` }}
                        />
                      </div>
                      <div className="text-xs font-medium text-gray-900 w-4">{day.created}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Monthly Goals */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-lg font-semibold text-gray-900">Objectifs mensuels</h3>
              <Target className="h-5 w-5 text-gray-500" />
            </div>
            
            <div className="text-center mb-6">
              <div className="relative w-32 h-32 mx-auto">
                <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#e5e7eb"
                    strokeWidth="10"
                    fill="none"
                  />
                  <circle
                    cx="60"
                    cy="60"
                    r="50"
                    stroke="#3b82f6"
                    strokeWidth="10"
                    fill="none"
                    strokeDasharray={`${2 * Math.PI * 50}`}
                    strokeDashoffset={`${2 * Math.PI * 50 * (1 - monthlyGoals.current / monthlyGoals.target)}`}
                    className="transition-all duration-500"
                  />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{monthlyGoals.current}</div>
                    <div className="text-sm text-gray-500">/ {monthlyGoals.target}</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <p className="text-sm text-gray-600">Progression: {Math.round((monthlyGoals.current / monthlyGoals.target) * 100)}%</p>
                <p className="text-xs text-gray-500 mt-1">{monthlyGoals.remaining} tâches restantes • {monthlyGoals.daysLeft} jours</p>
              </div>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2">
                <TrendingUp className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">
                  {monthlyGoals.remaining <= monthlyGoals.daysLeft ? 'Objectif atteignable' : 'Accélération nécessaire'}
                </span>
              </div>
              <p className="text-xs text-blue-700 mt-1">
                Rythme suggéré: {Math.ceil(monthlyGoals.remaining / monthlyGoals.daysLeft)} tâches/jour
              </p>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Priority Distribution */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition par priorité</h3>
            
            <div className="space-y-4">
              {Object.entries(stats.byPriority).map(([priority, count]) => {
                const percentage = Math.round((count / stats.total) * 100)
                const priorityLabels = { high: 'Haute', medium: 'Moyenne', low: 'Basse' }
                
                return (
                  <div key={priority} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <div className={`w-3 h-3 rounded-full ${getPriorityColor(priority)}`} />
                      <span className="text-sm font-medium text-gray-900">
                        {priorityLabels[priority as keyof typeof priorityLabels]}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="w-24 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-300 ${getPriorityColor(priority)}`}
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                      <span className="text-xs text-gray-500 w-8">{percentage}%</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>

        {/* Category Distribution */}
        <Card>
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Répartition par catégorie</h3>
            
            <div className="space-y-4">
              {Object.entries(stats.byCategory)
                .sort(([,a], [,b]) => b - a)
                .map(([category, count], index) => {
                  const percentage = Math.round((count / stats.total) * 100)
                  
                  return (
                    <div key={category} className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-3 h-3 rounded-full ${getCategoryColor(index)}`} />
                        <span className="text-sm font-medium text-gray-900">{category}</span>
                      </div>
                      <div className="flex items-center space-x-3">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div 
                            className={`h-2 rounded-full transition-all duration-300 ${getCategoryColor(index)}`}
                            style={{ width: `${percentage}%` }}
                          />
                        </div>
                        <span className="text-sm font-medium text-gray-900 w-8">{count}</span>
                        <span className="text-xs text-gray-500 w-8">{percentage}%</span>
                      </div>
                    </div>
                  )
                })
              }
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Insights */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Insights & Recommandations</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Star className="h-4 w-4 text-green-600" />
                <span className="text-sm font-medium text-green-900">Points forts</span>
              </div>
              <p className="text-xs text-green-700">
                Excellent taux de completion ({stats.completionRate}%). Vous êtes très efficace sur les tâches de priorité moyenne.
              </p>
            </div>
            
            <div className="bg-yellow-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Clock className="h-4 w-4 text-yellow-600" />
                <span className="text-sm font-medium text-yellow-900">À améliorer</span>
              </div>
              <p className="text-xs text-yellow-700">
                {stats.overdue} tâches en retard. Considérez une meilleure planification des échéances.
              </p>
            </div>
            
            <div className="bg-blue-50 rounded-lg p-4">
              <div className="flex items-center space-x-2 mb-2">
                <Target className="h-4 w-4 text-blue-600" />
                <span className="text-sm font-medium text-blue-900">Suggestion</span>
              </div>
              <p className="text-xs text-blue-700">
                Concentrez-vous sur les tâches haute priorité en début de semaine pour optimiser votre productivité.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AnalyticsPage