// Autopilot Dashboard Component
// Real-time monitoring and control of automated optimizations

import React, { useState, useEffect } from 'react';
import { 
  Play, 
  Pause, 
  Settings, 
  Activity, 
  Zap, 
  Target, 
  TrendingUp, 
  CheckCircle,
  AlertTriangle,
  BarChart3,
  RefreshCw,
  Power
} from 'lucide-react';

interface AutopilotStatus {
  isRunning: boolean;
  metrics: {
    current?: {
      loadTime: number;
      memoryUsage: number;
      domSize: number;
    };
  };
  config: {
    enableSemanticOptimization: boolean;
    enablePerformanceOptimization: boolean;
    enableContentEnhancement: boolean;
    enableEntityOptimization: boolean;
    enableRankingOptimization: boolean;
    autoApplyOptimizations: boolean;
    continuousMonitoring: boolean;
    autoGenerateContent: boolean;
    autoOptimizeStructure: boolean;
    autoEnhanceSEO: boolean;
  };
}

interface OptimizationLog {
  id: string;
  timestamp: Date;
  type: 'semantic' | 'performance' | 'content' | 'entity' | 'ranking';
  status: 'success' | 'warning' | 'error';
  message: string;
  duration: number;
}

export const AutopilotDashboard: React.FC = () => {
  const [status, setStatus] = useState<AutopilotStatus | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [logs, setLogs] = useState<OptimizationLog[]>([]);
  const [isRefreshing, setIsRefreshing] = useState(false);

  useEffect(() => {
    // Initialize autopilot status
    updateStatus();
    
    // Set up periodic updates
    const interval = setInterval(updateStatus, 5000);
    
    return () => clearInterval(interval);
  }, []);

  const updateStatus = async () => {
    try {
      // Get status from autopilot optimizer
      if (typeof window !== 'undefined' && (window as any).autopilotOptimizer) {
        const currentStatus = (window as any).autopilotOptimizer.getOptimizationStatus();
        setStatus(currentStatus);
      }
    } catch (error) {
      console.error('Failed to update autopilot status:', error);
    }
  };

  const toggleAutopilot = () => {
    if (typeof window !== 'undefined' && (window as any).autopilotOptimizer) {
      if (status?.isRunning) {
        (window as any).autopilotOptimizer.stopAutopilot();
        addLog('autopilot', 'warning', 'Autopilot stopped', 0);
      } else {
        (window as any).autopilotOptimizer.startAutopilot();
        addLog('autopilot', 'success', 'Autopilot started', 0);
      }
      updateStatus();
    }
  };

  const addLog = (type: string, status: 'success' | 'warning' | 'error', message: string, duration: number) => {
    const log: OptimizationLog = {
      id: Date.now().toString(),
      timestamp: new Date(),
      type: type as any,
      status,
      message,
      duration
    };
    
    setLogs(prev => [log, ...prev.slice(0, 49)]); // Keep last 50 logs
  };

  const refreshStatus = async () => {
    setIsRefreshing(true);
    await updateStatus();
    setIsRefreshing(false);
  };

  const getStatusIcon = (isRunning: boolean) => {
    return isRunning ? (
      <CheckCircle className="w-5 h-5 text-green-500" />
    ) : (
      <AlertTriangle className="w-5 h-5 text-yellow-500" />
    );
  };

  const getLogIcon = (type: string) => {
    switch (type) {
      case 'semantic':
        return <Target className="w-4 h-4 text-blue-500" />;
      case 'performance':
        return <Zap className="w-4 h-4 text-yellow-500" />;
      case 'content':
        return <Activity className="w-4 h-4 text-green-500" />;
      case 'entity':
        return <Target className="w-4 h-4 text-purple-500" />;
      case 'ranking':
        return <TrendingUp className="w-4 h-4 text-red-500" />;
      default:
        return <Activity className="w-4 h-4 text-gray-500" />;
    }
  };

  const getLogStatusColor = (status: string) => {
    switch (status) {
      case 'success':
        return 'text-green-600 bg-green-100';
      case 'warning':
        return 'text-yellow-600 bg-yellow-100';
      case 'error':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const formatTime = (ms: number): string => {
    return `${ms.toFixed(2)}ms`;
  };

  if (!isVisible) {
    return (
      <button
        onClick={() => setIsVisible(true)}
        className="fixed bottom-4 left-4 bg-purple-600 text-white p-3 rounded-full shadow-lg hover:bg-purple-700 transition-colors z-50"
        title="Open Autopilot Dashboard"
      >
        <Power className="w-6 h-6" />
      </button>
    );
  }

  return (
    <div className="fixed bottom-4 left-4 bg-white rounded-lg shadow-xl border max-w-md w-full max-h-96 overflow-hidden z-50">
      <div className="flex items-center justify-between p-4 border-b bg-gray-50">
        <h3 className="text-lg font-semibold flex items-center">
          <Power className="w-5 h-5 mr-2" />
          Autopilot Dashboard
        </h3>
        <div className="flex items-center space-x-2">
          <button
            onClick={refreshStatus}
            disabled={isRefreshing}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Refresh Status"
          >
            <RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={() => setIsVisible(false)}
            className="p-1 hover:bg-gray-200 rounded transition-colors"
            title="Close"
          >
            ×
          </button>
        </div>
      </div>

      <div className="p-4 max-h-80 overflow-y-auto">
        {status ? (
          <div className="space-y-4">
            {/* Status Overview */}
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex items-center space-x-2">
                {getStatusIcon(status.isRunning)}
                <span className="font-medium">
                  {status.isRunning ? 'Running' : 'Stopped'}
                </span>
              </div>
              <button
                onClick={toggleAutopilot}
                className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
                  status.isRunning
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {status.isRunning ? (
                  <>
                    <Pause className="w-4 h-4 mr-1" />
                    Stop
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4 mr-1" />
                    Start
                  </>
                )}
              </button>
            </div>

            {/* Performance Metrics */}
            {status.metrics.current && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900 flex items-center">
                  <BarChart3 className="w-4 h-4 mr-2" />
                  Performance Metrics
                </h4>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="bg-blue-50 p-2 rounded">
                    <div className="text-blue-600 font-medium">Load Time</div>
                    <div className="text-blue-800">{formatTime(status.metrics.current.loadTime)}</div>
                  </div>
                  <div className="bg-green-50 p-2 rounded">
                    <div className="text-green-600 font-medium">Memory</div>
                    <div className="text-green-800">{formatBytes(status.metrics.current.memoryUsage)}</div>
                  </div>
                  <div className="bg-purple-50 p-2 rounded">
                    <div className="text-purple-600 font-medium">DOM Size</div>
                    <div className="text-purple-800">{formatBytes(status.metrics.current.domSize)}</div>
                  </div>
                  <div className="bg-orange-50 p-2 rounded">
                    <div className="text-orange-600 font-medium">Status</div>
                    <div className="text-orange-800">
                      {status.metrics.current.domSize > 1000000 ? 'Large' : 'Optimal'}
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Optimization Modules */}
            <div className="space-y-2">
              <h4 className="font-medium text-gray-900">Active Modules</h4>
              <div className="space-y-1">
                {Object.entries(status.config).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between text-sm">
                    <span className="text-gray-600 capitalize">
                      {key.replace(/([A-Z])/g, ' $1').trim()}
                    </span>
                    <span className={`px-2 py-1 rounded text-xs ${
                      value ? 'text-green-600 bg-green-100' : 'text-gray-600 bg-gray-100'
                    }`}>
                      {value ? 'ON' : 'OFF'}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Logs */}
            {logs.length > 0 && (
              <div className="space-y-2">
                <h4 className="font-medium text-gray-900">Recent Activity</h4>
                <div className="space-y-1 max-h-32 overflow-y-auto">
                  {logs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center space-x-2 text-xs p-2 bg-gray-50 rounded">
                      {getLogIcon(log.type)}
                      <span className="text-gray-600">
                        {log.timestamp.toLocaleTimeString()}
                      </span>
                      <span className={`px-1 py-0.5 rounded ${getLogStatusColor(log.status)}`}>
                        {log.status}
                      </span>
                      <span className="text-gray-800 truncate">{log.message}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            <Power className="w-8 h-8 mx-auto mb-2 opacity-50" />
            <p>Autopilot not initialized</p>
            <button
              onClick={refreshStatus}
              className="mt-2 text-purple-600 hover:text-purple-700 text-sm"
            >
              Initialize Autopilot
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AutopilotDashboard;