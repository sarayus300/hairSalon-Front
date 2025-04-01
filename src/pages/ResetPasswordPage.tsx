import React, { useState } from 'react';
import { 
  Mail, 
  Lock, 
  ArrowRight, 
  Eye, 
  EyeOff, 
  Scissors,
  AlertCircle
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface ApiError {
  message: string;
}

const ResetPasswordPage = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [code, setCode] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRequestCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/request-reset', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setStep(2);
    } catch (error) {
      setError((error as ApiError).message || 'Error al enviar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/verify-code', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      setStep(3);
    } catch (error) {
      setError((error as ApiError).message || 'Error al verificar el código');
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:5000/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code, password })
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.message);
      }

      navigate('/auth?reset=success');
    } catch (error) {
      setError((error as ApiError).message || 'Error al restablecer la contraseña');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen pt-16 bg-gradient-to-b from-black via-gray-900 to-black">
      <div className="relative py-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1585747860715-2ba37e788b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')] bg-cover bg-center">
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm"></div>
        </div>

        <div className="relative max-w-md mx-auto px-4">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-amber-600 mb-4">
              <Scissors className="h-8 w-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-white mb-2">
              Recuperar Contraseña
            </h1>
            <p className="text-gray-400">
              {step === 1 && 'Ingresa tu email para recibir el código de recuperación'}
              {step === 2 && 'Ingresa el código que enviamos a tu email'}
              {step === 3 && 'Establece tu nueva contraseña'}
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-lg p-6 border border-amber-600/20">
            {error && (
              <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-md flex items-center gap-2 text-red-500">
                <AlertCircle className="h-5 w-5" />
                <p className="text-sm">{error}</p>
              </div>
            )}

            {step === 1 && (
              <form onSubmit={handleRequestCode} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Mail className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Correo electrónico"
                    className="w-full pl-10 pr-4 py-2 bg-white/10 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Enviando...' : 'Enviar Código'}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}

            {step === 2 && (
              <form onSubmit={handleVerifyCode} className="space-y-4">
                <div className="relative">
                  <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    placeholder="Código de verificación"
                    className="w-full px-4 py-2 bg-white/10 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors text-center text-2xl tracking-wide"
                    required
                    maxLength={6}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Verificando...' : 'Verificar Código'}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}

            {step === 3 && (
              <form onSubmit={handleResetPassword} className="space-y-4">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Nueva contraseña"
                    className="w-full pl-10 pr-12 py-2 bg-white/10 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Confirmar contraseña"
                    className="w-full pl-10 pr-12 py-2 bg-white/10 border border-amber-600/20 rounded-md text-white placeholder-gray-400 focus:outline-none focus:border-amber-600 transition-colors"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-white"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full py-2 px-4 bg-amber-600 text-white rounded-md hover:bg-amber-700 transition-colors flex items-center justify-center gap-2"
                >
                  <span>{loading ? 'Actualizando...' : 'Actualizar Contraseña'}</span>
                  <ArrowRight className="h-5 w-5" />
                </button>
              </form>
            )}

            <button
              onClick={() => navigate('/auth')}
              className="mt-4 w-full text-center text-gray-400 hover:text-white transition-colors"
            >
              Volver al inicio de sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;