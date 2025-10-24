import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Plus, Search, Filter, Edit, Trash, Check, X, Calendar } from 'lucide-react'

interface Task {
  id: string
  title: string
  description: string
  completed: boolean
  priority: 'low' | 'medium' | 'high'
  category: string
  dueDate?: string
  createdAt: string
}

function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Terminer le rapport mensuel',
      description: 'Compiler les données de vente et analyser les tendances',
      completed: false,
      priority: 'high',
      category: 'Travail',
      dueDate: '2024-01-15',
      createdAt: '2024-01-10'
    },
    {
      id: '2',
      title: 'Préparer la présentation client',
      description: 'Créer les slides et préparer la démonstration produit',
      completed: false,
      priority: 'medium',
      category: 'Travail',
      dueDate: '2024-01-18',
      createdAt: '2024-01-11'
    },
    {
      id: '3',
      title: 'Réviser les contrats',
      description: 'Vérifier les clauses et conditions des nouveaux contrats',
      completed: true,
      priority: 'low',
      category: 'Juridique',
      createdAt: '2024-01-08'
    },
    {
      id: '4',
      title: 'Organiser la réunion équipe',
      description: 'Planifier l\'agenda et réserver la salle de conférence',
      completed: false,
      priority: 'medium',
      category: 'Management',
      dueDate: '2024-01-20',
      createdAt: '2024-01-12'
    },
    {
      id: '5',
      title: 'Faire les courses',
      description: 'Acheter les ingrédients pour le dîner de demain',
      completed: false,
      priority: 'low',
      category: 'Personnel',
      createdAt: '2024-01-13'
    },
    {
      id: '6',
      title: 'Appeler le dentiste',
      description: 'Prendre rendez-vous pour le contrôle annuel',
      completed: false,
      priority: 'medium',
      category: 'Santé',
      dueDate: '2024-01-16',
      createdAt: '2024-01-09'
    },
    {
      id: '7',
      title: 'Mettre à jour le site web',
      description: 'Ajouter les nouvelles fonctionnalités et corriger les bugs',
      completed: true,
      priority: 'high',
      category: 'Développement',
      createdAt: '2024-01-07'
    },
    {
      id: '8',
      title: 'Planifier les vacances',
      description: 'Rechercher et réserver l\'hôtel pour les vacances d\'été',
      completed: false,
      priority: 'low',
      category: 'Personnel',
      dueDate: '2024-02-01',
      createdAt: '2024-01-14'
    }
  ])

  const [searchTerm, setSearchTerm] = useState('')
  const [filterPriority, setFilterPriority] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [showAddForm, setShowAddForm] = useState(false)
  const [editingTask, setEditingTask] = useState<string | null>(null)
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    category: '',
    dueDate: ''
  })

  const toggleTask = (taskId: string) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (taskId: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      setTasks(tasks.filter(task => task.id !== taskId))
    }
  }

  const addTask = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.title.trim()) return

    const task: Task = {
      id: Date.now().toString(),
      title: newTask.title,
      description: newTask.description,
      completed: false,
      priority: newTask.priority,
      category: newTask.category,
      dueDate: newTask.dueDate || undefined,
      createdAt: new Date().toISOString().split('T')[0]
    }

    setTasks([task, ...tasks])
    setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
    setShowAddForm(false)
  }

  const startEditing = (task: Task) => {
    setEditingTask(task.id)
    setNewTask({
      title: task.title,
      description: task.description,
      priority: task.priority,
      category: task.category,
      dueDate: task.dueDate || ''
    })
  }

  const saveEdit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newTask.title.trim() || !editingTask) return

    setTasks(tasks.map(task => 
      task.id === editingTask 
        ? {
            ...task,
            title: newTask.title,
            description: newTask.description,
            priority: newTask.priority,
            category: newTask.category,
            dueDate: newTask.dueDate || undefined
          }
        : task
    ))
    setEditingTask(null)
    setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
  }

  const cancelEdit = () => {
    setEditingTask(null)
    setNewTask({ title: '', description: '', priority: 'medium', category: '', dueDate: '' })
  }

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesPriority = filterPriority === 'all' || task.priority === filterPriority
    const matchesStatus = filterStatus === 'all' || 
                         (filterStatus === 'completed' && task.completed) ||
                         (filterStatus === 'pending' && !task.completed)
    return matchesSearch && matchesPriority && matchesStatus
  })

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
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Mes Tâches</h1>
        <Button 
          onClick={() => setShowAddForm(true)}
          className="flex items-center space-x-2"
        >
          <Plus className="h-4 w-4" />
          <span>Nouvelle tâche</span>
        </Button>
      </div>

      {/* Filters */}
      <Card className="mb-6">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder="Rechercher une tâche..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <select 
                value={filterPriority} 
                onChange={(e) => setFilterPriority(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Toutes priorités</option>
                <option value="high">Haute</option>
                <option value="medium">Moyenne</option>
                <option value="low">Basse</option>
              </select>
              <select 
                value={filterStatus} 
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md text-sm"
              >
                <option value="all">Tous statuts</option>
                <option value="pending">En cours</option>
                <option value="completed">Terminées</option>
              </select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Add Task Form */}
      {showAddForm && (
        <Card className="mb-6">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold mb-4">Ajouter une nouvelle tâche</h3>
            <form onSubmit={addTask} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                  <Input
                    value={newTask.title}
                    onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                    placeholder="Titre de la tâche"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                  <Input
                    value={newTask.category}
                    onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                    placeholder="Catégorie"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  value={newTask.description}
                  onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                  placeholder="Description de la tâche"
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                  <select
                    value={newTask.priority}
                    onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="low">Basse</option>
                    <option value="medium">Moyenne</option>
                    <option value="high">Haute</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Date d\'échéance</label>
                  <Input
                    type="date"
                    value={newTask.dueDate}
                    onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                  />
                </div>
              </div>
              <div className="flex space-x-2">
                <Button type="submit">Ajouter</Button>
                <Button type="button" variant="outline" onClick={() => setShowAddForm(false)}>Annuler</Button>
              </div>
            </form>
          </CardContent>
        </Card>
      )}

      {/* Tasks List */}
      <div className="space-y-4">
        {filteredTasks.map((task) => (
          <Card key={task.id}>
            <CardContent className="p-6">
              {editingTask === task.id ? (
                <form onSubmit={saveEdit} className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Titre</label>
                      <Input
                        value={newTask.title}
                        onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Catégorie</label>
                      <Input
                        value={newTask.category}
                        onChange={(e) => setNewTask({ ...newTask, category: e.target.value })}
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      value={newTask.description}
                      onChange={(e) => setNewTask({ ...newTask, description: e.target.value })}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priorité</label>
                      <select
                        value={newTask.priority}
                        onChange={(e) => setNewTask({ ...newTask, priority: e.target.value as 'low' | 'medium' | 'high' })}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date d\'échéance</label>
                      <Input
                        type="date"
                        value={newTask.dueDate}
                        onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
                      />
                    </div>
                  </div>
                  <div className="flex space-x-2">
                    <Button type="submit" size="sm">
                      <Check className="h-4 w-4 mr-1" />
                      Sauvegarder
                    </Button>
                    <Button type="button" variant="outline" size="sm" onClick={cancelEdit}>
                      <X className="h-4 w-4 mr-1" />
                      Annuler
                    </Button>
                  </div>
                </form>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3 flex-1">
                    <button
                      onClick={() => toggleTask(task.id)}
                      className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                        task.completed 
                          ? 'bg-green-600 border-green-600' 
                          : 'border-gray-300 hover:border-green-400'
                      }`}
                    >
                      {task.completed && (
                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                    
                    <div className="flex-1">
                      <h3 className={`font-semibold text-lg ${
                        task.completed ? 'text-gray-500 line-through' : 'text-gray-900'
                      }`}>
                        {task.title}
                      </h3>
                      <p className={`text-gray-600 mt-1 ${
                        task.completed ? 'line-through' : ''
                      }`}>
                        {task.description}
                      </p>
                      
                      <div className="flex items-center space-x-4 mt-3">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full ${
                          getPriorityColor(task.priority)
                        }`}>
                          {getPriorityLabel(task.priority)}
                        </span>
                        
                        {task.category && (
                          <span className="px-2 py-1 text-xs font-medium bg-blue-100 text-blue-800 rounded-full">
                            {task.category}
                          </span>
                        )}
                        
                        {task.dueDate && (
                          <span className="flex items-center text-sm text-gray-500">
                            <Calendar className="h-4 w-4 mr-1" />
                            {new Date(task.dueDate).toLocaleDateString('fr-FR')}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex space-x-2 ml-4">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      onClick={() => startEditing(task)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button 
                      variant="destructive" 
                      size="sm" 
                      onClick={() => deleteTask(task.id)}
                    >
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredTasks.length === 0 && (
        <Card>
          <CardContent className="p-12 text-center">
            <p className="text-gray-500 text-lg">Aucune tâche trouvée</p>
            <p className="text-gray-400 mt-2">Essayez de modifier vos filtres ou ajoutez une nouvelle tâche</p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}

export default TasksPage