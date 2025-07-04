import { useState } from 'react';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Logo from './Logo';


const API_URL = 'https://growthprob-1.onrender.com';

function App() {
  const [form, setForm] = useState({ name: '', location: '' });
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    if (!form.name.trim() || !form.location.trim()) {
      setError('Please fill out both fields.');
      return;
    }
    setError('');
    setLoading(true);
    try {
      const res = await axios.post(`${API_URL}/business-data`, form);
      setData(res.data);
      toast.success('Business data analyzed successfully!');
    } catch (err) {
      toast.error('Failed to analyze business data.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const regenerateHeadline = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_URL}/regenerate-headline?name=${form.name}&location=${form.location}`);
      setData(prev => ({ ...prev, headline: res.data.headline }));
      toast.success('SEO headline regenerated!');
    } catch (err) {
      toast.error('Failed to regenerate headline.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-tr from-purple-800 via-indigo-700 to-pink-700 flex flex-col items-center justify-center p-6 text-white font-sans overflow-hidden">
      {/* Moving Gradient Background Animation */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/3 left-0 w-full h-96 bg-gradient-to-r from-pink-400 via-purple-500 to-indigo-500 opacity-30 blur-3xl animate-background-slide"></div>
      </div>

      <style>
        {`
          @keyframes background-slide {
            0% { transform: translateX(-100%); }
            50% { transform: translateX(0%); }
            100% { transform: translateX(-100%); }
          }
          .animate-background-slide {
            animation: background-slide 30s linear infinite;
          }
        `}
      </style>

      <ToastContainer position="top-right" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover theme="colored" />
      <div className="absolute top-10 flex flex-col items-center space-y-3">
        <Logo />
        <h1 className="text-4xl font-bold text-white">
          Business<span className="bg-gradient-to-r from-yellow-400 via-pink-500 to-red-500 bg-clip-text text-transparent">Intel</span>
        </h1>
        <p className="text-white/80 text-sm">Discover insights and generate powerful SEO headlines for your business</p>
      </div>
      <div className="w-full max-w-6xl grid gap-8 grid-cols-1 md:grid-cols-2 transform transition-transform duration-700">
        <form onSubmit={handleSubmit} className="bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 hover:shadow-purple-500/30 transform hover:-translate-y-1 hover:scale-[1.03]">
          <h2 className="text-3xl font-bold mb-6 text-white drop-shadow-xl">Enter Business Info</h2>
          <input name="name" placeholder="Business Name" onChange={handleChange} value={form.name} className="w-full mb-4 p-4 rounded-xl text-black placeholder-white shadow-inner focus:outline-none focus:ring-2 focus:ring-pink-400 bg-white/30" required />
          <input name="location" placeholder="Location" onChange={handleChange} value={form.location} className="w-full mb-4 p-4 rounded-xl text-black placeholder-white shadow-inner focus:outline-none focus:ring-2 focus:ring-purple-400 bg-white/30" required />
          {error && <div className="text-red-300 text-sm mb-3 animate-pulse">{error}</div>}
          <button type="submit" className="bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white px-6 py-3 rounded-xl w-full font-semibold transition-all shadow-lg hover:shadow-xl">Submit</button>
        </form>

        <div className="bg-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-xl border border-white/20 hover:shadow-indigo-500/30 flex flex-col justify-center items-center transform hover:-translate-y-1 hover:scale-[1.03] min-h-[360px]">
          {loading && (
            <div className="flex flex-col items-center">
              <div className="w-16 h-16 border-4 border-white/30 rounded-full animate-spin border-t-white"></div>
              <p className="mt-4 text-lg text-white/80">Loading...</p>
            </div>
          )}

          {data && !loading && (
            <div className="text-center space-y-4 animate-fade-in">
              <div className="text-3xl font-bold drop-shadow-md">⭐ {data.rating}</div>
              <div className="text-lg text-white/80">{data.reviews} reviews</div>
              <div className="italic text-white/90 max-w-sm mx-auto">"{data.headline}"</div>
              <button onClick={regenerateHeadline} className="mt-4 bg-gradient-to-r from-teal-500 to-green-500 hover:from-teal-600 hover:to-green-600 text-white px-6 py-3 rounded-xl font-semibold transition-all shadow-lg hover:shadow-xl">Regenerate SEO Headline</button>
            </div>
          )}

          {!data && !loading && (
            <div className="text-center animate-fade-in">
              <p className="text-white/80 text-lg">Enter business details to get started</p>
              <div className="flex justify-center mt-4 space-x-2">
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-200"></div>
                <div className="w-2 h-2 bg-white/40 rounded-full animate-bounce delay-400"></div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
