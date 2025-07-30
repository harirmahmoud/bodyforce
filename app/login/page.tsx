"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Activity, Lock, User } from "lucide-react"
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import { login } from "./actions";

export default function LoginPage() {
   const [state, loginAction] = useActionState(login, undefined);
 

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-6">
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

      <Card className="w-full max-w-md bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600 shadow-2xl relative z-10">
        <CardHeader className="text-center pb-8">
          <div className="inline-flex items-center gap-3 mb-4 justify-center">
            <div className="p-3 bg-gradient-to-r from-orange-500 to-red-600 rounded-xl shadow-lg">
              <Activity className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-orange-400 to-red-500 bg-clip-text text-transparent">
              Body Force
            </h1>
          </div>
          <CardTitle className="text-2xl text-white mb-2">Connexion</CardTitle>
          <CardDescription className="text-slate-400">
            Connectez-vous pour accéder au système de gestion
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={loginAction} className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="username" className="text-slate-300 font-medium">
                Nom d'utilisateur
              </Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Entrez votre nom d'utilisateur"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20 pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password" className="text-slate-300 font-medium">
                Mot de passe
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
                <Input
                  id="password"
                  type="password"
                  name="password"
                  
                 
                  placeholder="Entrez votre mot de passe"
                  className="bg-slate-700 border-slate-600 text-white placeholder:text-slate-400 focus:border-orange-500 focus:ring-orange-500/20 pl-10"
                  required
                />
              </div>
            </div>

           <SubmitButton/>

           
          </form>
          {state?.errors?.username && (
        <p className="text-red-500">{state.errors.username}</p>
      )}
       {state?.errors?.password && (
        <p className="text-red-500">{state.errors.password}</p>
      )}

          
        </CardContent>
      </Card>
    </div>
  )
}
function SubmitButton() {
  const { pending } = useFormStatus();

  return (
    <button disabled={pending} type="submit"
     className="w-full bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 text-white font-semibold py-3 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105">
      Login
    </button>
  );
}
