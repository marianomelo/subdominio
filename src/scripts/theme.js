// Este script se ejecuta antes de que se renderice la página para evitar el flash
// Forzar tema light por defecto - solo dark si el usuario lo eligió explícitamente
const theme = (() => {
  if (typeof localStorage !== 'undefined' && localStorage.getItem('theme') === 'dark') {
    return 'dark';
  }
  // Forzar light theme por defecto, incluso si no hay nada en localStorage
  if (typeof localStorage !== 'undefined') {
    localStorage.setItem('theme', 'light');
  }
  return 'light';
})();

// Siempre empezar con light theme
document.documentElement.classList.remove('dark');

if (theme === 'dark') {
  document.documentElement.classList.add('dark');
}