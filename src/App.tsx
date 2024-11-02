import React, { useState } from 'react';
import Joyride, { CallBackProps, STATUS, Step } from 'react-joyride';
import { motion } from 'framer-motion';
import { 
  Rocket, 
  Heart, 
  Star, 
  Coffee, 
  Music, 
  Camera, 
  Palette,
  Sparkles,
  Globe,
  MessageCircle
} from 'lucide-react';

function App() {
  const [runTour, setRunTour] = useState(true);
  const [likes, setLikes] = useState(0);
  const [activeSection, setActiveSection] = useState('dashboard');

  const steps: Step[] = [
    {
      target: '.welcome-section',
      content: 'Welcome to our magical journey! 🚀 Get ready for an amazing tour of our creative space.',
      placement: 'center',
      disableBeacon: true,
      styles: {
        options: {
          backgroundColor: '#4F46E5',
        }
      }
    },
    {
      target: '.nav-section',
      content: 'Your gateway to endless possibilities! Navigate through different worlds of creativity.',
      placement: 'bottom',
    },
    {
      target: '.interactive-section',
      content: 'Try clicking the heart! Go ahead, we\'ll wait... 💝',
      placement: 'left',
      spotlightClicks: true,
    },
    {
      target: '.gallery-section',
      content: 'Feast your eyes on these stunning images from around the world!',
      placement: 'top',
    },
    {
      target: '.features-section',
      content: 'Discover powerful features that will boost your creativity!',
      placement: 'right',
    },
    {
      target: '.social-section',
      content: 'Connect with fellow creators and share your inspiration!',
      placement: 'left',
    },
    {
      target: '.footer-section',
      content: 'Thanks for joining our tour! Remember, creativity has no limits! ✨',
      placement: 'top',
    }
  ];

  const handleJoyrideCallback = (data: CallBackProps) => {
    const { status } = data;
    if ([STATUS.FINISHED, STATUS.SKIPPED].includes(status)) {
      setRunTour(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100">
      <Joyride
        steps={steps}
        run={runTour}
        continuous
        showProgress
        showSkipButton
        callback={handleJoyrideCallback}
        styles={{
          options: {
            primaryColor: '#4F46E5',
            zIndex: 1000,
          },
          tooltip: {
            backgroundColor: '#4F46E5',
            borderRadius: '8px',
            color: '#fff',
          },
          buttonNext: {
            backgroundColor: '#EC4899',
          },
          buttonBack: {
            color: '#EC4899',
          },
        }}
      />

      <nav className="nav-section bg-white shadow-lg p-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-8">
            <Rocket className="h-8 w-8 text-indigo-600" />
            <div className="hidden md:flex space-x-6">
              {['Dashboard', 'Gallery', 'Features', 'Connect'].map((item) => (
                <button
                  key={item}
                  className="text-gray-600 hover:text-indigo-600 transition-colors"
                  onClick={() => setActiveSection(item.toLowerCase())}
                >
                  {item}
                </button>
              ))}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 py-12">
        <section className="welcome-section text-center mb-16">
          <motion.h1 
            className="text-5xl font-bold text-indigo-600 mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Welcome to Creative Space
          </motion.h1>
          <p className="text-xl text-gray-600">Where imagination meets innovation</p>
        </section>

        <section className="interactive-section bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-center space-x-4">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="flex items-center space-x-2 bg-pink-50 px-6 py-3 rounded-full"
              onClick={() => setLikes(prev => prev + 1)}
            >
              <Heart className={`h-6 w-6 ${likes > 0 ? 'text-pink-500 fill-pink-500' : 'text-pink-400'}`} />
              <span className="text-pink-600 font-medium">{likes} Likes</span>
            </motion.button>
          </div>
        </section>

        <section className="gallery-section grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {[
            'https://images.unsplash.com/photo-1682687220742-aba13b6e50ba',
            'https://images.unsplash.com/photo-1682687221038-404670f09439',
            'https://images.unsplash.com/photo-1682687220063-4742bd7fd538'
          ].map((url, index) => (
            <motion.div
              key={index}
              className="relative overflow-hidden rounded-lg shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={`${url}?auto=format&fit=crop&w=400&q=80`}
                alt={`Gallery item ${index + 1}`}
                className="w-full h-64 object-cover"
              />
            </motion.div>
          ))}
        </section>

        <section className="features-section grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          {[
            { icon: Star, title: 'Premium Features' },
            { icon: Coffee, title: 'Creative Tools' },
            { icon: Music, title: 'Audio Suite' },
            { icon: Camera, title: 'Photo Editor' }
          ].map(({ icon: Icon, title }, index) => (
            <motion.div
              key={index}
              className="bg-white p-6 rounded-xl shadow-md"
              whileHover={{ y: -5 }}
            >
              <Icon className="h-8 w-8 text-indigo-600 mb-4" />
              <h3 className="font-semibold text-gray-800">{title}</h3>
            </motion.div>
          ))}
        </section>

        <section className="social-section bg-white rounded-xl shadow-xl p-8 mb-12">
          <div className="flex items-center justify-around">
            {[
              { icon: Globe, count: '50K+', label: 'Global Users' },
              { icon: Palette, count: '100K+', label: 'Artworks Created' },
              { icon: MessageCircle, count: '25K+', label: 'Community Posts' },
              { icon: Sparkles, count: '1M+', label: 'Inspirations Shared' }
            ].map(({ icon: Icon, count, label }, index) => (
              <motion.div
                key={index}
                className="text-center"
                whileHover={{ scale: 1.1 }}
              >
                <Icon className="h-8 w-8 text-indigo-600 mx-auto mb-2" />
                <div className="text-2xl font-bold text-gray-800">{count}</div>
                <div className="text-sm text-gray-600">{label}</div>
              </motion.div>
            ))}
          </div>
        </section>

        <footer className="footer-section text-center py-8">
          <p className="text-gray-600">Made with ❤️ for creative souls</p>
        </footer>
      </main>
    </div>
  );
}

export default App;