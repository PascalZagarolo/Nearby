import Image from 'next/image';
import { FiStar } from 'react-icons/fi';

const testimonials = [
  {
    id: 1,
    name: 'Jessica Müller',
    role: 'Hausbesitzerin',
    content: 'Nearby war ein echter Glücksfall für mich. Ich habe einen hervorragenden Elektriker in meiner Nähe gefunden, der meine Vorstellungen perfekt umgesetzt hat. Der lokale Kontakt hat die Kommunikation so viel einfacher gemacht.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    rating: 5,
  },
  {
    id: 2,
    name: 'Michael Becker',
    role: 'Gastronom',
    content: 'Ich brauchte dringend einen Sanitärinstallateur und Nearby hat mich mit einem talentierten Fachmann nur wenige Kilometer entfernt verbunden. Wir konnten uns persönlich treffen, um das Projekt zu besprechen, was alles viel effizienter machte.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1887&q=80',
    rating: 5,
  },
  {
    id: 3,
    name: 'Tanja Schmidt',
    role: 'Jungunternehmerin',
    content: 'Als freiberufliche Gartenbaumeisterin hat mir Nearby geholfen, mich mit lokalen Kunden zu vernetzen, die Gartenpflege-Services benötigen. Die Plattform ist einfach zu bedienen und die standortbasierte Suche macht es für Kunden leicht, mich zu finden.',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1961&q=80',
    rating: 4,
  },
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Das sagen unsere Nutzer
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Erfahrungen von Menschen, die lokale Handwerker und Dienstleister über Nearby gefunden haben
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div 
              key={testimonial.id}
              className="bg-white p-6 rounded-lg shadow-md relative"
            >
              <div className="absolute -top-6 left-1/2 transform -translate-x-1/2">
                <div className="h-12 w-12 rounded-full overflow-hidden border-4 border-white shadow-sm relative">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              
              <div className="pt-6 text-center">
                <div className="flex items-center justify-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <FiStar 
                      key={i}
                      className={`h-5 w-5 ${
                        i < testimonial.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <p className="text-gray-600 italic mb-4">
                  &ldquo;{testimonial.content}&rdquo;
                </p>
                
                <div className="border-t border-gray-100 pt-4">
                  <h4 className="font-bold text-gray-900">{testimonial.name}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="/bewertungen"
            className="text-rose-600 font-medium hover:text-rose-700"
          >
            Mehr Bewertungen lesen →
          </a>
        </div>
      </div>
    </section>
  );
};

export default Testimonials; 