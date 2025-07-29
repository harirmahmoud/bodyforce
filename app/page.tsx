"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Trash2, Users, Calendar, Plus, Activity, TrendingUp } from "lucide-react"
import { Client as AppwriteClient, Databases, ID } from 'appwrite'

// Initialize Appwrite client (you should do this once, outside the component)
const appwrite = new AppwriteClient()
  .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!) // Endpoint
  .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT!)   // Project ID

const databases = new Databases(appwrite)

const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID!
const collectionId = process.env.NEXT_PUBLIC_APPWRITE_COLLECTION_ID!


interface Client {
  id: string
  name: string
  age: number
  phone: number
  subscriptionStart: string
  subscriptionEnd: string
  isActive: boolean
}

export default function GymManagement() {
  const [clients, setClients] = useState<Client[]>([])

  useEffect(() => {
    console.log({
      databaseId,
      collectionId
    })
    const fetchClients = async () => {
      try {
        const response = await databases.listDocuments(databaseId, collectionId)
        
        const clientList: Client[] = response.documents.map((doc: any) => ({
          id: doc.$id,
          name: doc.name,
          age: doc.age,
          phone: doc.phone,
          subscriptionStart: doc.subscriptionStart,
          subscriptionEnd: doc.subscriptionEnd,
          isActive: doc.isActive,
        }))
        
        setClients(clientList)
      } catch (error) {
        console.error('Erreur lors de la récupération des clients:', error)
      }
    }

    fetchClients()
  }, [])
  const [showAddForm, setShowAddForm] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    phone: "",
  })

  // Load clients from localStorage on component mount
  useEffect(() => {
    const savedClients = localStorage.getItem("bodyForceClients")
    if (savedClients) {
      const parsedClients = JSON.parse(savedClients)
      // Update subscription status
      const updatedClients = parsedClients.map((client: Client) => ({
        ...client,
        isActive: new Date() <= new Date(client.subscriptionEnd),
      }))
      setClients(updatedClients)
    }
  }, [])

  // Save clients to localStorage whenever clients change
  useEffect(() => {
    localStorage.setItem("bodyForceClients", JSON.stringify(clients))
  }, [clients])

  const addClient =async () => {
    if (!formData.name || !formData.age || !formData.phone ) {
      alert("Veuillez remplir tous les champs")
      return
    }

    const subscriptionStart = new Date()
    const subscriptionEnd = new Date()
    subscriptionEnd.setMonth(subscriptionEnd.getMonth() + 1)

    const newClient: Client = {
      id: Date.now().toString(),
      name: formData.name,
      age: Number.parseInt(formData.age),
      phone: Number.parseInt(formData.phone),
      subscriptionStart: subscriptionStart.toISOString(),
      subscriptionEnd: subscriptionEnd.toISOString(),
      isActive: true,
    }
  try {
    // Save to Appwrite database
    await databases.createDocument(
      databaseId,
      collectionId,
      ID.unique(), // Let Appwrite assign a unique ID
      {
        name: newClient.name,
        age: newClient.age,
        phone: newClient.phone,
        subscriptionStart: newClient.subscriptionStart,
        subscriptionEnd: newClient.subscriptionEnd,
        isActive: newClient.isActive,
      }
    )

    // Update local state
    setClients([...clients, newClient])
    setFormData({ name: "", age: "", phone: "+213" })
    setShowAddForm(false)

  } catch (error) {
    console.error("Erreur lors de l'ajout à Appwrite:", error)
    alert("Erreur lors de l'enregistrement du client dans la base de données.")
  }
  }

  const deleteClient = async (id: string) => {
  if (confirm("Êtes-vous sûr de vouloir supprimer ce client ?")) {
    try {
      // Delete from Appwrite
      await databases.deleteDocument(databaseId, collectionId, id)

      // Then update local state
      setClients(clients.filter((client) => client.id !== id))
    } catch (error) {
      console.error("Erreur lors de la suppression du client:", error)
      alert("Erreur : Impossible de supprimer ce client depuis Appwrite.")
    }
  }
}

  const activeClients = clients.filter((client) => client.isActive).length
  const expiredClients = clients.filter((client) => !client.isActive).length
  const totalRevenue = activeClients * 1500

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  const getDaysRemaining = (endDate: string) => {
    const today = new Date()
    const end = new Date(endDate)
    const diffTime = end.getTime() - today.getTime()
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))
    return diffDays
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/50 to-slate-800/50"></div>
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fillRule='evenodd'%3E%3Cg fill='%23ffffff' fillOpacity='0.02'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        ></div>
      </div>

      <div className="relative z-10 p-6">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-3 mb-4">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
                <Activity className="h-8 w-8 text-white" />
              </div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
                Body Force
              </h1>
            </div>
            <p className="text-slate-400 text-lg">Système de gestion des clients professionnel</p>
          </div>

          {/* Dashboard Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-10">
            <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-slate-300">Total Clients</CardTitle>
                <div className="p-2 bg-blue-500/20 rounded-lg">
                  <Users className="h-5 w-5 text-blue-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{clients.length}</div>
                <p className="text-xs text-slate-400">Clients enregistrés</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-emerald-800 to-emerald-700 border-emerald-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-emerald-100">Abonnements Actifs</CardTitle>
                <div className="p-2 bg-emerald-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-emerald-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{activeClients}</div>
                <p className="text-xs text-emerald-200">Membres actifs</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-red-800 to-red-700 border-red-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-red-100">Abonnements Expirés</CardTitle>
                <div className="p-2 bg-red-500/20 rounded-lg">
                  <Calendar className="h-5 w-5 text-red-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{expiredClients}</div>
                <p className="text-xs text-red-200">À renouveler</p>
              </CardContent>
            </Card>

            <Card className="bg-gradient-to-br from-amber-800 to-orange-700 border-amber-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium text-amber-100">Revenus Mensuels</CardTitle>
                <div className="p-2 bg-amber-500/20 rounded-lg">
                  <TrendingUp className="h-5 w-5 text-amber-400" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-white mb-1">{totalRevenue.toLocaleString()}</div>
                <p className="text-xs text-amber-200">DA ce mois</p>
              </CardContent>
            </Card>
          </div>

          {/* Add Client Button */}
          <div className="mb-8">
            <Button
              onClick={() => setShowAddForm(!showAddForm)}
              className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <Plus className="h-5 w-5 mr-2" />
              Ajouter un Client
            </Button>
          </div>

          {/* Add Client Form */}
          {showAddForm && (
            <Card className="mb-8 bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
              <CardHeader className="bg-gradient-to-r from-orange-500/10 to-red-600/10 rounded-t-lg">
                <CardTitle className="text-white text-xl">Nouveau Client</CardTitle>
                <CardDescription className="text-slate-300">
                  Abonnement mensuel: <span className="font-semibold text-orange-400">1500 DA</span>
                </CardDescription>
              </CardHeader>
              <CardContent className="p-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="text-slate-300 font-medium">
                      Nom Complet
                    </Label>
                    <Input
                      id="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Nom du client"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="age" className="text-slate-300 font-medium">
                      Âge
                    </Label>
                    <Input
                      id="age"
                      type="number"
                      value={formData.age}
                      onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                      placeholder="25"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone" className="text-slate-300 font-medium">
                      Téléphone
                    </Label>
                    <Input
                      id="phone"
                      type="number"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+213 XXX XXX XXX"
                      className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20"
                    />
                  </div>
                </div>
                <div className="flex gap-3 mt-6">
                  <Button
                    onClick={addClient}
                    className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    Ajouter Client
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setShowAddForm(false)}
                    className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
                  >
                    Annuler
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Clients List */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {clients.map((client) => {
              const daysRemaining = getDaysRemaining(client.subscriptionEnd)
              return (
                <Card
                  key={client.id}
                  className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
                >
                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <CardTitle className="text-white text-lg mb-1 group-hover:text-orange-400 transition-colors">
                          {client.name}
                        </CardTitle>
                        <CardDescription className="text-slate-400">
                          {client.age} ans • {client.phone}
                        </CardDescription>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => deleteClient(client.id)}
                        className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-slate-400">Statut:</span>
                      <Badge
                        className={`font-semibold px-3 py-1 rounded-full ${
                          client.isActive
                            ? "bg-gradient-to-r from-emerald-500 to-emerald-600 text-white shadow-lg"
                            : "bg-gradient-to-br from-red-500 to-red-600 text-white shadow-lg"
                        }`}
                      >
                        {client.isActive ? "Actif" : "Expiré"}
                      </Badge>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Début:</span>
                        <span className="text-sm text-slate-200 font-medium">
                          {formatDate(client.subscriptionStart)}
                        </span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Fin:</span>
                        <span className="text-sm text-slate-200 font-medium">{formatDate(client.subscriptionEnd)}</span>
                      </div>

                      <div className="flex justify-between items-center">
                        <span className="text-sm text-slate-400">Prix:</span>
                        <span className="text-sm font-bold text-orange-400">1500 DA</span>
                      </div>

                      {client.isActive && (
                        <div className="flex justify-between items-center pt-2 border-t border-slate-600">
                          <span className="text-sm text-slate-400">Jours restants:</span>
                          <span
                            className={`text-sm font-bold px-2 py-1 rounded-md ${
                              daysRemaining <= 7 ? "text-red-300 bg-red-500/20" : "text-emerald-300 bg-emerald-500/20"
                            }`}
                          >
                            {daysRemaining} jours
                          </span>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          {clients.length === 0 && (
            <Card className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
              <CardContent>
                <div className="p-4 bg-slate-600/30 rounded-full w-fit mx-auto mb-6">
                  <Users className="h-16 w-16 text-slate-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Aucun client enregistré</h3>
                <p className="text-slate-400 mb-6 max-w-md mx-auto">
                  Commencez par ajouter votre premier client pour gérer les abonnements de votre salle de sport
                </p>
                <Button
                  onClick={() => setShowAddForm(true)}
                  className="bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold px-8 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
                >
                  <Plus className="h-5 w-5 mr-2" />
                  Ajouter votre premier client
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  )
}
