import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

const App = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const [scrollY, setScrollY] = useState(0);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isLoaded, setIsLoaded] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    if (!canvasRef.current) return;

    console.log('Initializing Three.js scene...');
    
    // Scene setup
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 10;

    const renderer = new THREE.WebGLRenderer({
      canvas: canvasRef.current,
      alpha: true,
      antialias: true,
    });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 1);

    // Create glowing geometric shapes
    const shapes: THREE.Mesh[] = [];
    
    // Shape 1 - Icosahedron (blue)
    const ico = new THREE.IcosahedronGeometry(2, 0);
    const icoMat = new THREE.MeshPhongMaterial({
      color: 0x3A8DFF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0x3A8DFF,
      emissiveIntensity: 0.5
    });
    const icoMesh = new THREE.Mesh(ico, icoMat);
    icoMesh.position.set(-5, 3, -5);
    shapes.push(icoMesh);
    scene.add(icoMesh);

    // Shape 2 - Octahedron (purple)
    const oct = new THREE.OctahedronGeometry(1.8, 0);
    const octMat = new THREE.MeshPhongMaterial({
      color: 0xA450FF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0xA450FF,
      emissiveIntensity: 0.5
    });
    const octMesh = new THREE.Mesh(oct, octMat);
    octMesh.position.set(5, -2, -6);
    shapes.push(octMesh);
    scene.add(octMesh);

    // Shape 3 - Torus (cyan)
    const tor = new THREE.TorusGeometry(1.5, 0.5, 16, 100);
    const torMat = new THREE.MeshPhongMaterial({
      color: 0x00D9FF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0x00D9FF,
      emissiveIntensity: 0.5
    });
    const torMesh = new THREE.Mesh(tor, torMat);
    torMesh.position.set(-3, -3, -4);
    shapes.push(torMesh);
    scene.add(torMesh);

    // Shape 4 - Tetrahedron (pink)
    const tet = new THREE.TetrahedronGeometry(1.5, 0);
    const tetMat = new THREE.MeshPhongMaterial({
      color: 0xFF4D94,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0xFF4D94,
      emissiveIntensity: 0.5
    });
    const tetMesh = new THREE.Mesh(tet, tetMat);
    tetMesh.position.set(4, 3, -7);
    shapes.push(tetMesh);
    scene.add(tetMesh);

    // Shape 5 - Dodecahedron (violet)
    const dod = new THREE.DodecahedronGeometry(1.3, 0);
    const dodMat = new THREE.MeshPhongMaterial({
      color: 0x7C6CFF,
      wireframe: true,
      transparent: true,
      opacity: 0.4,
      emissive: 0x7C6CFF,
      emissiveIntensity: 0.5
    });
    const dodMesh = new THREE.Mesh(dod, dodMat);
    dodMesh.position.set(-6, -1, -8);
    shapes.push(dodMesh);
    scene.add(dodMesh);

    // Particle system
    const particleCount = 2000;
    const particlesGeo = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);

    for (let i = 0; i < particleCount; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 40;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 40;
    }

    particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));

    const particlesMat = new THREE.PointsMaterial({
      size: 0.08,
      color: 0xffffff,
      transparent: true,
      opacity: 0.6,
      blending: THREE.AdditiveBlending,
    });

    const particles = new THREE.Points(particlesGeo, particlesMat);
    scene.add(particles);

    // Lights
    const dirLight1 = new THREE.DirectionalLight(0x3A8DFF, 2);
    dirLight1.position.set(5, 5, 5);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0xA450FF, 2);
    dirLight2.position.set(-5, -5, 5);
    scene.add(dirLight2);

    const pointLight = new THREE.PointLight(0x00D9FF, 3, 30);
    pointLight.position.set(0, 0, 5);
    scene.add(pointLight);

    const ambLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambLight);

    setIsLoaded(true);
    console.log('Scene loaded with', shapes.length, 'shapes');

    // Animation loop
    let animationId: number;
    let time = 0;

    const animate = () => {
      animationId = requestAnimationFrame(animate);
      time += 0.01;

      // Rotate and animate shapes
      shapes.forEach((shape, i) => {
        const speed = 0.5 + i * 0.2;
        shape.rotation.x += 0.01 * speed;
        shape.rotation.y += 0.005 * speed;
        shape.rotation.z = Math.sin(time + i) * 0.3;
        
        // Float animation
        shape.position.y += Math.sin(time * 2 + i) * 0.005;
      });

      // Rotate particles
      particles.rotation.y += 0.001;
      particles.rotation.x = Math.sin(time * 0.3) * 0.1;

      // Animate point light
      pointLight.position.x = Math.sin(time) * 8;
      pointLight.position.z = Math.cos(time) * 8 + 5;
      pointLight.intensity = 3 + Math.sin(time * 3) * 1;

      // Camera parallax
      camera.position.x += (mousePos.x * 3 - camera.position.x) * 0.05;
      camera.position.y += (mousePos.y * 3 - camera.position.y) * 0.05;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    animate();

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
      renderer.dispose();
    };
  }, [mousePos]);

  // Update mouse position and scroll
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({
        x: (e.clientX / window.innerWidth) * 2 - 1,
        y: -(e.clientY / window.innerHeight) * 2 + 1,
      });
    };

    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-black text-white overflow-x-hidden">
      {/* 3D Canvas */}
      <canvas
        ref={canvasRef}
        className="fixed top-0 left-0 w-full h-full z-0 bg-black"
        style={{ opacity: isLoaded ? 0.8 : 0 }}
      />

      {/* Content */}
      <div className="relative z-20">
        {/* Navbar */}
        <nav className="fixed top-0 w-full z-50 px-4 sm:px-6 lg:px-8 py-4 sm:py-6">
          <div className="max-w-7xl mx-auto flex justify-between items-center backdrop-blur-xl bg-black/30 rounded-2xl px-4 sm:px-6 lg:px-8 py-3 sm:py-4 border border-white/20 shadow-2xl shadow-blue-500/20">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
              A+
            </h1>
            
            {/* Desktop Menu */}
            <ul className="hidden md:flex space-x-6 lg:space-x-10 text-gray-300 font-medium">
              {['About', 'Features', 'Download'].map((item) => (
                <li key={item} className="relative group cursor-pointer">
                  <span className="hover:text-white transition-colors duration-300">
                    {item}
                  </span>
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-400 group-hover:w-full transition-all duration-300" />
                </li>
              ))}
            </ul>

            {/* Mobile Menu Button */}
            <button
              className="md:hidden text-white p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                {mobileMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>

          {/* Mobile Menu Dropdown */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 mx-4 backdrop-blur-xl bg-black/30 rounded-2xl border border-white/20 shadow-2xl shadow-blue-500/20 overflow-hidden">
              <ul className="py-4">
                {['About', 'Features', 'Download'].map((item) => (
                  <li
                    key={item}
                    className="px-6 py-3 text-gray-300 font-medium hover:text-white hover:bg-white/10 transition-colors cursor-pointer"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </nav>

        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 pt-24 pb-16">
          <div
            className="text-center max-w-6xl w-full"
            style={{ transform: `translateY(${scrollY * 0.15}px)` }}
          >
            <div className="mb-6 sm:mb-8 inline-block">
              <span className="px-4 sm:px-6 py-2 sm:py-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30 rounded-full text-xs sm:text-sm font-semibold backdrop-blur-xl shadow-lg shadow-blue-500/30 animate-pulse">
                ✨ Next-Gen Learning Platform
              </span>
            </div>

            <h2 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-9xl font-black leading-none mb-6 sm:mb-8 lg:mb-10 tracking-tight px-2">
              <span className="block bg-gradient-to-r from-blue-400 via-purple-400 to-blue-400 bg-clip-text text-transparent mb-2 sm:mb-4">
                AI-Powered
              </span>
              <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent">
                Learning
              </span>
            </h2>

            <p className="text-base sm:text-xl md:text-2xl lg:text-3xl text-gray-300 max-w-4xl mx-auto mb-10 sm:mb-14 leading-relaxed font-light px-4">
              Personalized tests, smart feedback, and golden notes — all in one app.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center px-4 max-w-2xl mx-auto">
              <button className="w-full sm:w-auto group px-6 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-base sm:text-lg lg:text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/60 relative overflow-hidden">
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Get the App
                  <svg
                    className="w-5 h-5 sm:w-6 sm:h-6 transform group-hover:translate-x-2 transition-transform"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </span>
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </button>

              <button className="w-full sm:w-auto px-6 sm:px-10 lg:px-12 py-4 sm:py-5 rounded-2xl border-2 border-white/40 text-white font-bold text-base sm:text-lg lg:text-xl hover:bg-white/10 hover:border-white/60 transition-all duration-300 backdrop-blur-xl">
                Watch Demo
              </button>
            </div>
          </div>

          <div className="absolute bottom-8 sm:bottom-16 animate-bounce">
            <div className="w-6 h-10 sm:w-8 sm:h-12 border-2 border-white/40 rounded-full flex justify-center p-2">
              <div className="w-1.5 h-2 sm:w-2 sm:h-3 bg-white/70 rounded-full animate-pulse" />
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 sm:mb-16 lg:mb-24">
              <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black mb-4 sm:mb-6 bg-gradient-to-r from-white to-gray-400 bg-clip-text text-transparent">
                Core Features
              </h3>
              <p className="text-base sm:text-lg lg:text-2xl text-gray-300 px-4">
                Experience next-generation learning with AI
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 max-w-7xl mx-auto">
              {[
                {
                  title: 'Test Plus',
                  desc: 'AI-powered testing engine with adaptive difficulty that evolves with your learning pace.',
                  icon: '🎯',
                  color: 'from-blue-500/30 to-cyan-500/30',
                  border: 'border-blue-400/50',
                },
                {
                  title: 'Pulse',
                  desc: 'Smart feedback system that tracks weaknesses and creates personalized revision plans.',
                  icon: '⚡',
                  color: 'from-purple-500/30 to-pink-500/30',
                  border: 'border-purple-400/50',
                },
                {
                  title: 'Golden Notes',
                  desc: 'AI-generated summaries of chapters for quick revision, saving hours of study time.',
                  icon: '✨',
                  color: 'from-violet-500/30 to-fuchsia-500/30',
                  border: 'border-violet-400/50',
                },
              ].map((feature, idx) => (
                <div
                  key={idx}
                  className={`group relative p-6 sm:p-8 lg:p-10 rounded-3xl bg-gradient-to-br ${feature.color} border-2 ${feature.border} hover:scale-105 transition-all duration-500 backdrop-blur-xl hover:shadow-2xl`}
                  style={{
                    opacity: scrollY > 300 ? 1 : 0,
                    transform:
                      scrollY > 300
                        ? 'translateY(0)'
                        : 'translateY(50px)',
                    transition: `all 0.8s ease ${idx * 0.2}s`,
                  }}
                >
                  <div className="text-4xl sm:text-5xl lg:text-7xl mb-4 sm:mb-6">{feature.icon}</div>
                  <h4 className="text-xl sm:text-2xl lg:text-3xl font-bold mb-3 sm:mb-4 text-white">
                    {feature.title}
                  </h4>
                  <p className="text-gray-300 text-sm sm:text-base lg:text-lg leading-relaxed">
                    {feature.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-12 sm:gap-8 lg:gap-16 text-center">
              {[
                { value: '50K+', label: 'Active Students' },
                { value: '1M+', label: 'Tests Completed' },
                { value: '98%', label: 'Success Rate' },
              ].map((stat, idx) => (
                <div key={idx} className="group">
                  <div className="text-5xl sm:text-6xl lg:text-8xl font-black mb-3 sm:mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent group-hover:scale-110 transition-transform duration-300">
                    {stat.value}
                  </div>
                  <div className="text-base sm:text-lg lg:text-xl text-gray-300 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 sm:py-32 lg:py-40 px-4 sm:px-6">
          <div className="max-w-5xl mx-auto text-center">
            <h3 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black mb-6 sm:mb-8 leading-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent px-4">
              Ready to Transform
              <br />
              Your Learning?
            </h3>

            <p className="text-base sm:text-xl lg:text-2xl text-gray-300 mb-10 sm:mb-14 px-4 max-w-2xl mx-auto">
              Join thousands of students achieving their goals with A+
            </p>

            <button className="w-full sm:w-auto px-10 sm:px-14 lg:px-16 py-4 sm:py-5 lg:py-6 rounded-2xl bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white font-bold text-lg sm:text-xl lg:text-2xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/70 max-w-md mx-auto block sm:inline-block">
              Download Now
            </button>
          </div>
        </section>

        {/* Footer */}
        <footer className="py-10 sm:py-12 lg:py-16 px-4 sm:px-6 border-t border-white/10">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 bg-clip-text text-transparent mb-3 sm:mb-4">
                A+
              </h1>
              <p className="text-gray-400 text-xs sm:text-sm lg:text-base">
                © A+ Inc. 2025 | www.getaplus.co
              </p>
            </div>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6 lg:gap-10 text-gray-400">
              {['Privacy', 'Terms', 'Contact', 'Careers'].map((link) => (
                <a
                  key={link}
                  href="#"
                  className="hover:text-white transition-colors text-sm sm:text-base lg:text-lg"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;