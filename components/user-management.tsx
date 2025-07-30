"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Trash2, UserPlus, Users, Shield } from "lucide-react"

interface UserManagementUser {
  id: string
  username: string
  password: string
  role: "admin" | "user"
  createdAt: string
}

export default function UserManagement() {
  const [users, setUsers] = useState<UserManagementUser[]>([])
  const [showAddForm, setShowAddForm] = useState(false)
  const [currentUser, setCurrentUser] = useState<UserManagementUser | null>(null)
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    role: "user" as "admin" | "user",
  })

  useEffect(() => {
    // Load users from localStorage
    const savedUsers = localStorage.getItem("bodyForceUsers")
    if (savedUsers) {
      setUsers(JSON.parse(savedUsers))
    } else {
      // Create default admin user if no users exist
      const defaultUsers = [
        {
          id: "1",
          username: "admin",
          password: "admin123",
          role: "admin" as const,
          createdAt: new Date().toISOString(),
        },
      ]
      setUsers(defaultUsers)
      localStorage.setItem("bodyForceUsers", JSON.stringify(defaultUsers))
    }

    // Get current user
    const currentUserData = localStorage.getItem("bodyForceCurrentUser")
    if (currentUserData) {
      setCurrentUser(JSON.parse(currentUserData))
    }
  }, [])

  useEffect(() => {
    // Save users to localStorage whenever users change
    if (users.length > 0) {
      localStorage.setItem("bodyForceUsers", JSON.stringify(users))
    }
  }, [users])

  const addUser = () => {
    if (!formData.username || !formData.password) {
      alert("Veuillez remplir tous les champs")
      return
    }

    // Check if username already exists
    if (users.some((user) => user.username === formData.username)) {
      alert("Ce nom d'utilisateur existe déjà")
      return
    }

    const newUser: UserManagementUser = {
      id: Date.now().toString(),
      username: formData.username,
      password: formData.password,
      role: formData.role,
      createdAt: new Date().toISOString(),
    }

    setUsers([...users, newUser])
    setFormData({ username: "", password: "", role: "user" })
    setShowAddForm(false)
  }

  const deleteUser = (id: string) => {
    if (currentUser?.id === id) {
      alert("Vous ne pouvez pas supprimer votre propre compte")
      return
    }

    if (confirm("Êtes-vous sûr de vouloir supprimer cet utilisateur ?")) {
      setUsers(users.filter((user) => user.id !== id))
    }
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("fr-FR")
  }

  // Only admins can manage users
  if (currentUser?.role !== "admin") {
    return (
      <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-xl">
        <CardContent className="text-center py-8">
          <Shield className="h-16 w-16 text-slate-400 mx-auto mb-4" />
          <h3 className="text-xl font-bold text-white mb-2">Accès Restreint</h3>
          <p className="text-slate-400">Seuls les administrateurs peuvent gérer les utilisateurs</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Gestion des Utilisateurs</h2>
          <p className="text-slate-400">Gérez les comptes utilisateurs du système</p>
        </div>
        <Dialog open={showAddForm} onOpenChange={setShowAddForm}>
          <DialogTrigger asChild>
            <Button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white font-semibold px-6 py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
              <UserPlus className="h-5 w-5 mr-2" />
              Ajouter Utilisateur
            </Button>
          </DialogTrigger>
          <DialogContent className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 text-white">
            <DialogHeader>
              <DialogTitle className="text-xl">Nouvel Utilisateur</DialogTitle>
              <DialogDescription className="text-slate-400">
                Créez un nouveau compte utilisateur pour le système
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4 mt-4">
              <div className="space-y-2">
                <Label htmlFor="new-username" className="text-slate-300 font-medium">
                  Nom d'utilisateur
                </Label>
                <Input
                  id="new-username"
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  placeholder="Nom d'utilisateur"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="new-password" className="text-slate-300 font-medium">
                  Mot de passe
                </Label>
                <Input
                  id="new-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="Mot de passe"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-blue-500 focus:ring-blue-500/20"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role" className="text-slate-300 font-medium">
                  Rôle
                </Label>
                <select
                  id="role"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value as "admin" | "user" })}
                  className="w-full bg-slate-700 border border-slate-600 text-white rounded-md px-3 py-2 focus:border-blue-500 focus:ring-blue-500/20"
                >
                  <option value="user">Utilisateur</option>
                  <option value="admin">Administrateur</option>
                </select>
              </div>
              <div className="flex gap-3 pt-4">
                <Button
                  onClick={addUser}
                  className="bg-gradient-to-r from-emerald-500 to-emerald-600 hover:from-emerald-600 hover:to-emerald-700 text-white font-semibold px-6 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  Créer Utilisateur
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setShowAddForm(false)}
                  className="border-slate-600 text-slate-300 hover:bg-slate-700 hover:text-white transition-all duration-300"
                >
                  Annuler
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Users Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {users.map((user) => (
          <Card
            key={user.id}
            className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 group"
          >
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-slate-600/50 rounded-lg">
                    <Shield className="h-5 w-5 text-slate-300" />
                  </div>
                  <div>
                    <CardTitle className="text-white text-lg mb-1 group-hover:text-blue-400 transition-colors">
                      {user.username}
                    </CardTitle>
                    <Badge
                      className={`font-semibold px-2 py-1 rounded-full text-xs ${
                        user.role === "admin"
                          ? "bg-gradient-to-r from-purple-500 to-purple-600 text-white"
                          : "bg-gradient-to-r from-blue-500 to-blue-600 text-white"
                      }`}
                    >
                      {user.role === "admin" ? "Administrateur" : "Utilisateur"}
                    </Badge>
                  </div>
                </div>
                {currentUser?.id !== user.id && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteUser(user.id)}
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/20 transition-all duration-300 rounded-lg"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-sm text-slate-400">Créé le:</span>
                <span className="text-sm text-slate-200 font-medium">{formatDate(user.createdAt)}</span>
              </div>
              {currentUser?.id === user.id && (
                <div className="p-2 bg-emerald-500/20 border border-emerald-500/30 rounded-lg">
                  <p className="text-emerald-300 text-xs text-center font-medium">Compte actuel</p>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>

      {users.length === 0 && (
        <Card className="text-center py-16 bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl">
          <CardContent>
            <div className="p-4 bg-slate-600/30 rounded-full w-fit mx-auto mb-6">
              <Users className="h-16 w-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">Aucun utilisateur</h3>
            <p className="text-slate-400 mb-6 max-w-md mx-auto">
              Commencez par créer le premier utilisateur du système
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
