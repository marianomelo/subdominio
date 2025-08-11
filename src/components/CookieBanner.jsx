import { useState, useEffect } from 'react';

export default function CookieBanner() {
	const [isVisible, setIsVisible] = useState(false);
	const [showPreferences, setShowPreferences] = useState(false);

	useEffect(() => {
		// Check if user has already made a choice
		const cookieConsent = localStorage.getItem('cookieConsent');
		
		// For development: show banner every time (remove this in production)
		if (import.meta.env.DEV) {
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
		
		if (!cookieConsent) {
			// Show banner after a short delay for better UX
			const timer = setTimeout(() => {
				setIsVisible(true);
			}, 1000);
			return () => clearTimeout(timer);
		}
	}, []);

	const acceptAll = () => {
		localStorage.setItem('cookieConsent', 'accepted');
		localStorage.setItem('analyticsConsent', 'true');
		setIsVisible(false);
		// Initialize analytics if needed
		if (window.gtag) {
			window.gtag('consent', 'update', {
				analytics_storage: 'granted'
			});
		}
	};

	const acceptNecessary = () => {
		localStorage.setItem('cookieConsent', 'necessary');
		localStorage.setItem('analyticsConsent', 'false');
		setIsVisible(false);
		// Deny analytics consent
		if (window.gtag) {
			window.gtag('consent', 'update', {
				analytics_storage: 'denied'
			});
		}
	};

	const togglePreferences = () => {
		setShowPreferences(!showPreferences);
	};

	if (!isVisible) return null;

	return (
		<div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800 shadow-lg z-50 animate-slide-up">
			<div className="container mx-auto px-6 py-4">
				<div className="max-w-6xl mx-auto">
					{!showPreferences ? (
						// Minimal banner
						<div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
							<div className="flex-1">
								<p className="text-gray-600 dark:text-gray-300 text-sm">
									Usamos cookies para mejorar tu experiencia.{' '}
									<a href="/cookies" className="text-black dark:text-white font-medium hover:underline">
										Más información
									</a>
								</p>
							</div>
							
							<div className="flex gap-3 w-full sm:w-auto">
								<button
									onClick={togglePreferences}
									className="px-3 py-2 text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white transition-colors duration-200 text-sm"
								>
									Configurar
								</button>
								<button
									onClick={acceptAll}
									className="px-4 py-2 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-colors duration-200 text-sm font-medium"
								>
									Aceptar
								</button>
							</div>
						</div>
					) : (
						// Preferences panel
						<div className="space-y-6">
							<div className="flex items-center justify-between">
								<h3 className="text-xl font-medium text-black dark:text-white">
									Gestionar preferencias de cookies
								</h3>
								<button
									onClick={togglePreferences}
									className="text-gray-500 hover:text-black dark:hover:text-white transition-colors duration-200"
								>
									<svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
										<path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
									</svg>
								</button>
							</div>

							<div className="grid md:grid-cols-2 gap-6">
								<div className="space-y-4">
									<div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
										<div className="flex items-center justify-between mb-3">
											<h4 className="font-medium text-black dark:text-white">Cookies Esenciales</h4>
											<div className="w-12 h-6 bg-green-500 rounded-full relative">
												<div className="w-5 h-5 bg-white rounded-full absolute right-0.5 top-0.5"></div>
											</div>
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Necesarias para el funcionamiento básico del sitio. No se pueden desactivar.
										</p>
									</div>

									<div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
										<div className="flex items-center justify-between mb-3">
											<h4 className="font-medium text-black dark:text-white">Cookies Analíticas</h4>
											<label className="relative inline-flex items-center cursor-pointer">
												<input
													type="checkbox"
													defaultChecked
													className="sr-only peer"
													id="analytics-toggle"
												/>
												<div className="w-11 h-6 bg-gray-200 peer-focus:outline-none rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
											</label>
										</div>
										<p className="text-sm text-gray-600 dark:text-gray-300">
											Nos ayudan a entender cómo utilizas el sitio para mejorarlo (Google Analytics).
										</p>
									</div>
								</div>

								<div className="space-y-4">
									<div className="text-sm text-gray-600 dark:text-gray-300 space-y-3">
										<p><strong>¿Qué son las cookies?</strong></p>
										<p>Las cookies son pequeños archivos que se almacenan en tu dispositivo para mejorar tu experiencia de navegación.</p>
										
										<p><strong>¿Por qué las utilizamos?</strong></p>
										<ul className="space-y-1 ml-4">
											<li>• Recordar tus preferencias</li>
											<li>• Mejorar el rendimiento del sitio</li>
											<li>• Entender cómo interactúas con nuestro contenido</li>
										</ul>

										<p className="pt-2">
											Consulta nuestra{' '}
											<a href="/cookies" className="text-black dark:text-white font-medium hover:underline">
												Política de Cookies completa
											</a>.
										</p>
									</div>
								</div>
							</div>

							<div className="flex flex-col sm:flex-row gap-3 pt-4 border-t border-gray-200 dark:border-gray-700">
								<button
									onClick={acceptNecessary}
									className="px-6 py-3 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:border-black dark:hover:border-white hover:text-black dark:hover:text-white transition-all duration-200 font-medium text-sm"
								>
									Solo esenciales
								</button>
								<button
									onClick={() => {
										const analyticsEnabled = document.getElementById('analytics-toggle').checked;
										localStorage.setItem('cookieConsent', 'custom');
										localStorage.setItem('analyticsConsent', analyticsEnabled.toString());
										if (window.gtag) {
											window.gtag('consent', 'update', {
												analytics_storage: analyticsEnabled ? 'granted' : 'denied'
											});
										}
										setIsVisible(false);
									}}
									className="px-6 py-3 bg-black dark:bg-white text-white dark:text-black hover:bg-gray-800 dark:hover:bg-gray-200 transition-all duration-200 font-medium text-sm hover:scale-105"
								>
									Guardar preferencias
								</button>
							</div>
						</div>
					)}
				</div>
			</div>

			<style jsx>{`
				.animate-slide-up {
					animation: slideUp 0.3s ease-out;
				}
				
				@keyframes slideUp {
					from {
						transform: translateY(100%);
					}
					to {
						transform: translateY(0);
					}
				}
			`}</style>
		</div>
	);
}