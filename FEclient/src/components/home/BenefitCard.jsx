const BenefitCard = ({ benefit }) => (
  <div className="max-w-sm p-6 bg-white rounded-2xl border shadow-lg text-center">
    <h3 className="text-xl font-semibold text-black mb-4">{benefit.title}</h3>
    <p className="text-gray-600">{benefit.description}</p>
  </div>
);
export default BenefitCard;