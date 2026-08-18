const StatCard = ({ title, value, icon: Icon, border, text, bg }) => {
  return (
    <div className={`bg-white border-l-4 ${border} rounded-xl shadow p-6 flex justify-between items-center`}>
      <div>
        <p className="text-gray-500">{title}</p>
        <h2 className="text-3xl font-bold">{value}</h2>
      </div>

      <div className={`${bg} p-4 rounded-xl`}>
        <Icon className={`${text} text-3xl`} />
      </div>
    </div>
  );
};

export default StatCard;