import React, { useState } from 'react'
import { Card, CardContent } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { Settings, User, Bell, Shield, Database, Palette, Globe, Save, Trash } from 'lucide-react'

interface UserSettings {
  name: string
  email: string
  avatar: string
  theme: 'light' | 'dark' | 'auto'
  language: string
  timezone: string
  notifications: {
    email: boolean
    push: boolean
    deadlines: boolean
    dailyDigest: boolean
  }
  privacy: {
    profileVisible: boolean
    shareStats: boolean
    allowAnalytics: boolean
  }
  taskDefaults: {
    defaultPriority: 'low' | 'medium' | 'high'
    defaultCategory: string
    autoArchive: boolean
    archiveDays: number
  }
}

function SettingsPage() {
  const [settings, setSettings] = useState<UserSettings>({
    name: 'Jean Dupont',
    email: 'jean.dupont@email.com',
    avatar: '',
    theme: 'light',
    language: 'fr',
    timezone: 'Europe/Paris',
    notifications: {
      email: true,
      push: false,
      deadlines: true,
      dailyDigest: false
    },
    privacy: {
      profileVisible: true,
      shareStats: false,
      allowAnalytics: true
    },
    taskDefaults: {
      defaultPriority: 'medium',
      defaultCategory: 'Personnel',
      autoArchive: true,
      archiveDays: 30
    }
  })

  const [activeTab, setActiveTab] = useState('profile')
  const [hasChanges, setHasChanges] = useState(false)

  const updateSettings = (section: keyof UserSettings, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: typeof prev[section] === 'object' 
        ? { ...prev[section], [field]: value }
        : value
    }))
    setHasChanges(true)
  }

  const updateNestedSettings = (section: keyof UserSettings, subsection: string, field: string, value: any) => {
    setSettings(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [subsection]: {
          ...prev[section][subsection],
          [field]: value
        }
      }
    }))
    setHasChanges(true)
  }

  const saveSettings = () => {
    // Simulate API call
    console.log('Saving settings:', settings)
    setHasChanges(false)
    // Show success message
  }

  const resetSettings = () => {
    if (confirm('Êtes-vous sûr de vouloir réinitialiser tous les paramètres ?')) {
      // Reset to defaults
      setHasChanges(true)
    }
  }

  const exportData = () => {
    const dataStr = JSON.stringify(settings, null, 2)
    const dataBlob = new Blob([dataStr], { type: 'application/json' })
    const url = URL.createObjectURL(dataBlob)
    const link = document.createElement('a')
    link.href = url
    link.download = 'taskflow-settings.json'
    link.click()
  }

  const tabs = [
    { id: 'profile', label: 'Profil', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'privacy', label: 'Confidentialité', icon: Shield },
    { id: 'tasks', label: 'Tâches', icon: Settings },
    { id: 'appearance', label: 'Apparence', icon: Palette },
    { id: 'data', label: 'Données', icon: Database }
  ]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Paramètres</h1>
        {hasChanges && (
          <div className="flex space-x-2">
            <Button onClick={saveSettings} className="flex items-center space-x-2">
              <Save className="h-4 w-4" />
              <span>Sauvegarder</span>
            </Button>
            <Button variant="outline" onClick={() => setHasChanges(false)}>
              Annuler
            </Button>
          </div>
        )}
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <div className="w-full lg:w-64">
          <Card>
            <CardContent className="p-4">
              <nav className="space-y-1">
                {tabs.map((tab) => {
                  const Icon = tab.icon
                  return (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        activeTab === tab.id
                          ? 'bg-blue-100 text-blue-700'
                          : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                      }`}
                    >
                      <Icon className="h-4 w-4" />
                      <span>{tab.label}</span>
                    </button>
                  )
                })}
              </nav>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Informations du profil</h2>
                
                <div className="space-y-6">
                  <div className="flex items-center space-x-6">
                    <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center">
                      <User className="h-8 w-8 text-gray-400" />
                    </div>
                    <div>
                      <Button variant="outline" size="sm">Changer la photo</Button>
                      <p className="text-xs text-gray-500 mt-1">JPG, PNG ou GIF. Max 2MB.</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nom complet</label>
                      <Input
                        value={settings.name}
                        onChange={(e) => updateSettings('name', '', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                      <Input
                        type="email"
                        value={settings.email}
                        onChange={(e) => updateSettings('email', '', e.target.value)}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Langue</label>
                      <select
                        value={settings.language}
                        onChange={(e) => updateSettings('language', '', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="fr">Français</option>
                        <option value="en">English</option>
                        <option value="es">Español</option>
                        <option value="de">Deutsch</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Fuseau horaire</label>
                      <select
                        value={settings.timezone}
                        onChange={(e) => updateSettings('timezone', '', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="Europe/Paris">Europe/Paris (GMT+1)</option>
                        <option value="Europe/London">Europe/London (GMT+0)</option>
                        <option value="America/New_York">America/New_York (GMT-5)</option>
                        <option value="Asia/Tokyo">Asia/Tokyo (GMT+9)</option>
                      </select>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'notifications' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Notifications</h2>
                
                <div className="space-y-6">
                  {Object.entries(settings.notifications).map(([key, value]) => {
                    const labels = {
                      email: 'Notifications par email',
                      push: 'Notifications push',
                      deadlines: 'Rappels d\'échéance',
                      dailyDigest: 'Résumé quotidien'
                    }
                    
                    const descriptions = {
                      email: 'Recevoir des emails pour les mises à jour importantes',
                      push: 'Recevoir des notifications dans le navigateur',
                      deadlines: 'Être alerté avant les dates d\'échéance',
                      dailyDigest: 'Recevoir un résumé quotidien de vos tâches'
                    }
                    
                    return (
                      <div key={key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {labels[key as keyof typeof labels]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {descriptions[key as keyof typeof descriptions]}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => updateNestedSettings('notifications', '', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'privacy' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Confidentialité</h2>
                
                <div className="space-y-6">
                  {Object.entries(settings.privacy).map(([key, value]) => {
                    const labels = {
                      profileVisible: 'Profil visible publiquement',
                      shareStats: 'Partager les statistiques',
                      allowAnalytics: 'Autoriser les analyses'
                    }
                    
                    const descriptions = {
                      profileVisible: 'Permettre aux autres utilisateurs de voir votre profil',
                      shareStats: 'Partager vos statistiques de productivité de façon anonyme',
                      allowAnalytics: 'Nous aider à améliorer l\'app en collectant des données d\'usage'
                    }
                    
                    return (
                      <div key={key} className="flex items-center justify-between py-4 border-b border-gray-200 last:border-b-0">
                        <div>
                          <h3 className="text-sm font-medium text-gray-900">
                            {labels[key as keyof typeof labels]}
                          </h3>
                          <p className="text-sm text-gray-500">
                            {descriptions[key as keyof typeof descriptions]}
                          </p>
                        </div>
                        <label className="relative inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            checked={value}
                            onChange={(e) => updateNestedSettings('privacy', '', key, e.target.checked)}
                            className="sr-only peer"
                          />
                          <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                        </label>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'tasks' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Paramètres des tâches</h2>
                
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Priorité par défaut</label>
                      <select
                        value={settings.taskDefaults.defaultPriority}
                        onChange={(e) => updateNestedSettings('taskDefaults', '', 'defaultPriority', e.target.value)}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="low">Basse</option>
                        <option value="medium">Moyenne</option>
                        <option value="high">Haute</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Catégorie par défaut</label>
                      <Input
                        value={settings.taskDefaults.defaultCategory}
                        onChange={(e) => updateNestedSettings('taskDefaults', '', 'defaultCategory', e.target.value)}
                        placeholder="Ex: Personnel, Travail..."
                      />
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between py-4 border-b border-gray-200">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Archivage automatique</h3>
                      <p className="text-sm text-gray-500">Archiver automatiquement les tâches complétées</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={settings.taskDefaults.autoArchive}
                        onChange={(e) => updateNestedSettings('taskDefaults', '', 'autoArchive', e.target.checked)}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                  
                  {settings.taskDefaults.autoArchive && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Délai d\'archivage (jours)</label>
                      <Input
                        type="number"
                        value={settings.taskDefaults.archiveDays}
                        onChange={(e) => updateNestedSettings('taskDefaults', '', 'archiveDays', parseInt(e.target.value))}
                        min="1"
                        max="365"
                        className="w-32"
                      />
                      <p className="text-xs text-gray-500 mt-1">Les tâches complétées seront archivées après ce délai</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'appearance' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Apparence</h2>
                
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-4">Thème</label>
                    <div className="grid grid-cols-3 gap-4">
                      {['light', 'dark', 'auto'].map((theme) => {
                        const themeLabels = { light: 'Clair', dark: 'Sombre', auto: 'Automatique' }
                        return (
                          <label key={theme} className="cursor-pointer">
                            <input
                              type="radio"
                              name="theme"
                              value={theme}
                              checked={settings.theme === theme}
                              onChange={(e) => updateSettings('theme', '', e.target.value)}
                              className="sr-only peer"
                            />
                            <div className="border-2 border-gray-200 rounded-lg p-4 peer-checked:border-blue-500 peer-checked:bg-blue-50 transition-all">
                              <div className="text-center">
                                <div className={`w-12 h-8 mx-auto mb-2 rounded ${
                                  theme === 'light' ? 'bg-white border' :
                                  theme === 'dark' ? 'bg-gray-800' :
                                  'bg-gradient-to-r from-white to-gray-800'
                                }`} />
                                <span className="text-sm font-medium">
                                  {themeLabels[theme as keyof typeof themeLabels]}
                                </span>
                              </div>
                            </div>
                          </label>
                        )
                      })}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === 'data' && (
            <Card>
              <CardContent className="p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Gestion des données</h2>
                
                <div className="space-y-6">
                  <div className="bg-blue-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Database className="h-5 w-5 text-blue-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-blue-900">Export des données</h3>
                        <p className="text-sm text-blue-700 mt-1">
                          Téléchargez une copie de toutes vos données au format JSON.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={exportData}
                        >
                          Exporter mes données
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-yellow-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Settings className="h-5 w-5 text-yellow-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-yellow-900">Réinitialisation</h3>
                        <p className="text-sm text-yellow-700 mt-1">
                          Remettre tous les paramètres à leurs valeurs par défaut.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="mt-3"
                          onClick={resetSettings}
                        >
                          Réinitialiser les paramètres
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-red-50 rounded-lg p-4">
                    <div className="flex items-start space-x-3">
                      <Trash className="h-5 w-5 text-red-600 mt-0.5" />
                      <div>
                        <h3 className="text-sm font-medium text-red-900">Suppression du compte</h3>
                        <p className="text-sm text-red-700 mt-1">
                          Supprimer définitivement votre compte et toutes vos données. Cette action est irréversible.
                        </p>
                        <Button 
                          variant="destructive" 
                          size="sm" 
                          className="mt-3"
                          onClick={() => confirm('Êtes-vous vraiment sûr de vouloir supprimer votre compte ?')}
                        >
                          Supprimer le compte
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}

export default SettingsPage