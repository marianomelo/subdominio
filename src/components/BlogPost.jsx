// Componente para mostrar artículos del blog
import { useState, useEffect } from 'react';

const BlogPost = ({ featured = false, limit = 6 }) => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');

  // Datos de ejemplo (reemplazar con llamada a Sanity)
  const mockPosts = [
    {
      _id: '1',
      title: 'Optimización de Performance en Sitios WordPress',
      slug: { current: 'optimizacion-performance-wordpress' },
      excerpt: 'Técnicas avanzadas para mejorar la velocidad de carga de sitios WordPress. Desde optimización de imágenes hasta implementación de cache.',
      publishedAt: '2025-01-15',
      readingTime: 5,
      categories: [{ title: 'Desarrollo Web', slug: { current: 'desarrollo-web' }, color: 'blue' }],
      mainImage: null,
      author: { name: 'Equipo Subdominio' }
    },
    {
      _id: '2',
      title: 'Cómo Optimizar Conversiones en WooCommerce',
      slug: { current: 'optimizar-conversiones-woocommerce' },
      excerpt: 'Estrategias probadas para aumentar las conversiones en tiendas WooCommerce. Desde UX hasta optimización del checkout.',
      publishedAt: '2025-01-12',
      readingTime: 7,
      categories: [{ title: 'E-commerce', slug: { current: 'ecommerce' }, color: 'orange' }],
      mainImage: null,
      author: { name: 'Equipo Subdominio' }
    },
    {
      _id: '3',
      title: 'Automatización con IA: El Futuro del E-commerce',
      slug: { current: 'automatizacion-ia-futuro-ecommerce' },
      excerpt: 'Cómo la inteligencia artificial está transformando las tiendas online. Casos prácticos y herramientas disponibles.',
      publishedAt: '2025-01-10',
      readingTime: 10,
      categories: [{ title: 'IA & Tecnología', slug: { current: 'ia-tecnologia' }, color: 'green' }],
      mainImage: null,
      author: { name: 'Equipo Subdominio' }
    }
  ];

  useEffect(() => {
    // Simular carga y usar datos estáticos
    setTimeout(() => {
      setPosts(mockPosts.slice(0, limit));
      setLoading(false);
    }, 500);
  }, [limit]);

  const getCategoryColor = (color) => {
    const colors = {
      blue: 'bg-blue-100 text-blue-700',
      orange: 'bg-orange-100 text-orange-700',
      green: 'bg-green-100 text-green-700',
      purple: 'bg-purple-100 text-purple-700',
      red: 'bg-red-100 text-red-700'
    };
    return colors[color] || 'bg-gray-100 text-gray-700';
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-lg overflow-hidden animate-pulse">
            <div className="aspect-video bg-gray-200"></div>
            <div className="p-6">
              <div className="flex items-center mb-3">
                <div className="w-20 h-6 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded ml-auto"></div>
              </div>
              <div className="w-full h-6 bg-gray-200 rounded mb-3"></div>
              <div className="w-full h-4 bg-gray-200 rounded mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-200 rounded mb-4"></div>
              <div className="flex items-center justify-between">
                <div className="w-20 h-4 bg-gray-200 rounded"></div>
                <div className="w-16 h-4 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {posts.map((post) => (
        <article 
          key={post._id} 
          className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-200"
        >
          <div className="aspect-video bg-gray-100 flex items-center justify-center">
            {post.mainImage && post.mainImage.fields ? (
              <img 
                src={`https:${post.mainImage.fields.file.url}?w=400&h=225&fit=fill&f=center`}
                alt={post.mainImage.fields.title || post.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-400">Imagen del artículo</span>
            )}
          </div>
          
          <div className="p-6">
            <div className="flex items-center mb-3">
              {post.categories && post.categories[0] && (
                <span className={`px-2 py-1 text-xs font-medium rounded ${getCategoryColor(post.categories[0].color)}`}>
                  {post.categories[0].title}
                </span>
              )}
              <span className="text-sm text-gray-500 ml-auto">
                {formatDate(post.publishedAt)}
              </span>
            </div>
            
            <h3 className="text-xl font-medium text-black mb-3">
              <a 
                href={`/blog/${post.slug.current}`} 
                className="hover:text-gray-600 transition-colors duration-200"
              >
                {post.title}
              </a>
            </h3>
            
            <p className="text-gray-600 text-sm leading-relaxed mb-4">
              {post.excerpt}
            </p>
            
            <div className="flex items-center justify-between">
              <span className="text-xs text-gray-500">
                {post.readingTime} min de lectura
              </span>
              <a 
                href={`/blog/${post.slug.current}`}
                className="text-sm font-medium text-black hover:text-gray-600 transition-colors duration-200"
              >
                Leer más →
              </a>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
};

export default BlogPost;