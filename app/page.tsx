'use client'

import { useState, useEffect } from 'react'
import {
  Lightbulb,
  Thermometer,
  Droplets,
  Wind,
  Lock,
  Tv,
  Camera,
  Zap,
  Home,
  Power
} from 'lucide-react'

interface Device {
  id: string
  name: string
  type: string
  status: boolean
  value?: number
  unit?: string
  icon: any
}

export default function Dashboard() {
  const [devices, setDevices] = useState<Device[]>([
    { id: '1', name: 'Luz Sala', type: 'light', status: false, icon: Lightbulb },
    { id: '2', name: 'Luz Cocina', type: 'light', status: true, icon: Lightbulb },
    { id: '3', name: 'Luz Habitación', type: 'light', status: false, icon: Lightbulb },
    { id: '4', name: 'Temperatura', type: 'sensor', status: true, value: 22, unit: '°C', icon: Thermometer },
    { id: '5', name: 'Humedad', type: 'sensor', status: true, value: 65, unit: '%', icon: Droplets },
    { id: '6', name: 'Aire Acondicionado', type: 'climate', status: false, value: 24, unit: '°C', icon: Wind },
    { id: '7', name: 'Cerradura Puerta', type: 'lock', status: true, icon: Lock },
    { id: '8', name: 'TV Sala', type: 'entertainment', status: false, icon: Tv },
    { id: '9', name: 'Cámara Entrada', type: 'security', status: true, icon: Camera },
    { id: '10', name: 'Consumo Eléctrico', type: 'sensor', status: true, value: 3.2, unit: 'kW', icon: Zap },
  ])

  useEffect(() => {
    const interval = setInterval(() => {
      setDevices(prev => prev.map(device => {
        if (device.type === 'sensor') {
          let newValue = device.value || 0
          if (device.name === 'Temperatura') {
            newValue = 18 + Math.random() * 8
          } else if (device.name === 'Humedad') {
            newValue = 50 + Math.random() * 30
          } else if (device.name === 'Consumo Eléctrico') {
            newValue = 2 + Math.random() * 4
          }
          return { ...device, value: Math.round(newValue * 10) / 10 }
        }
        return device
      }))
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  const toggleDevice = (id: string) => {
    setDevices(prev => prev.map(device =>
      device.id === id ? { ...device, status: !device.status } : device
    ))
  }

  const getDeviceColor = (device: Device) => {
    if (device.type === 'sensor') return 'bg-blue-500'
    if (device.type === 'security') return device.status ? 'bg-green-500' : 'bg-red-500'
    if (device.type === 'lock') return device.status ? 'bg-green-500' : 'bg-red-500'
    return device.status ? 'bg-yellow-500' : 'bg-gray-600'
  }

  const activeDevices = devices.filter(d => d.status).length
  const temperature = devices.find(d => d.name === 'Temperatura')?.value || 0
  const humidity = devices.find(d => d.name === 'Humedad')?.value || 0
  const power = devices.find(d => d.name === 'Consumo Eléctrico')?.value || 0

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-8">
          <Home className="w-10 h-10 text-white" />
          <h1 className="text-4xl font-bold text-white">Dashboard IoT Casa</h1>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Power className="w-6 h-6 text-green-400" />
              <p className="text-gray-300 text-sm">Dispositivos Activos</p>
            </div>
            <p className="text-4xl font-bold text-white">{activeDevices}</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Thermometer className="w-6 h-6 text-orange-400" />
              <p className="text-gray-300 text-sm">Temperatura</p>
            </div>
            <p className="text-4xl font-bold text-white">{temperature}°C</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Droplets className="w-6 h-6 text-blue-400" />
              <p className="text-gray-300 text-sm">Humedad</p>
            </div>
            <p className="text-4xl font-bold text-white">{humidity}%</p>
          </div>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
            <div className="flex items-center gap-3 mb-2">
              <Zap className="w-6 h-6 text-yellow-400" />
              <p className="text-gray-300 text-sm">Consumo</p>
            </div>
            <p className="text-4xl font-bold text-white">{power} kW</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {devices.map(device => {
            const Icon = device.icon
            return (
              <div
                key={device.id}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`p-3 rounded-xl ${getDeviceColor(device)}`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  {device.type !== 'sensor' && (
                    <button
                      onClick={() => toggleDevice(device.id)}
                      className={`px-3 py-1 rounded-full text-xs font-semibold transition-colors ${
                        device.status
                          ? 'bg-green-500 text-white'
                          : 'bg-gray-600 text-gray-300'
                      }`}
                    >
                      {device.status ? 'ON' : 'OFF'}
                    </button>
                  )}
                </div>

                <h3 className="text-white font-semibold mb-2">{device.name}</h3>

                {device.value !== undefined && (
                  <p className="text-3xl font-bold text-white">
                    {device.value} <span className="text-lg text-gray-300">{device.unit}</span>
                  </p>
                )}

                <p className="text-gray-400 text-xs mt-2 capitalize">{device.type}</p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-white/10 backdrop-blur-lg rounded-2xl p-6 border border-white/20">
          <h2 className="text-2xl font-bold text-white mb-4">Estado del Sistema</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-gray-300">Conexión estable</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <p className="text-gray-300">Todos los sensores activos</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <p className="text-gray-300">Actualizaciones en tiempo real</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
