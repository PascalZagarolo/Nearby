import { FiSearch, FiCheck, FiMessageSquare, FiStar } from 'react-icons/fi';

const steps = [
  {
    id: 1,
    title: 'Services durchsuchen',
    description: 'Entdecke lokale Dienstleister mit verifizierten Bewertungen basierend auf deinen Bedürfnissen.',
    icon: <FiSearch className="h-8 w-8 text-white" />,
  },
  {
    id: 2,
    title: 'Kontakt & Besprechung',
    description: 'Bespreche Projektdetails, Anforderungen und Preise mit Dienstleistern bevor du eine Entscheidung triffst.',
    icon: <FiMessageSquare className="h-8 w-8 text-white" />,
  },
  {
    id: 3,
    title: 'Buchen & sicher bezahlen',
    description: 'Buche Termine und bezahle sicher über unsere Plattform mit verschiedenen Zahlungsoptionen.',
    icon: <FiCheck className="h-8 w-8 text-white" />,
  },
  {
    id: 4,
    title: 'Bewerten',
    description: 'Nach Abschluss des Services hinterlasse Bewertungen, um anderen zu helfen, gute lokale Dienstleister zu finden.',
    icon: <FiStar className="h-8 w-8 text-white" />,
  },
];

const HowItWorks = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Wie <span className="bg-gradient-to-r mr-2 from-rose-600 to-rose-800 bg-clip-text text-transparent">
  Nearby
</span>
 funktioniert
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Finde und beauftrage lokale Fachleute in nur wenigen einfachen Schritten
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step) => (
            <div 
              key={step.id}
              className="bg-white p-6 rounded-lg border border-gray-200 shadow-sm transition-all duration-300 hover:shadow-md flex flex-col h-full"
            >
              <div className="flex items-center justify-center h-16 w-16 mx-auto mb-4 bg-gradient-to-r from-rose-600 to-rose-700 rounded-full">
                {step.icon}
              </div>
              <div className="text-center flex-grow">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              <div className="mt-4 text-center">
                <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-gradient-to-r from-rose-600 to-rose-700 text-white font-semibold">
                  {step.id}
                </span>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-12 text-center">
          <a
            href="/auth/signup"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-rose-600 to-rose-800 hover:from-rose-700 hover:to-rose-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-rose-500"
          >
            Jetzt Starten
          </a>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks; 