const StatsSection = () => {
  const stats = [
    { value: "1,240+", label: "Активных тендеров" },
    { value: "5,320+", label: "Объявлений" },
    { value: "3,800+", label: "Пользователей" },
    { value: "95%", label: "Успешных сделок" },
  ];

  return (
    <section className="py-8 bg-white">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
          {stats.map((stat, index) => (
            <div key={index} className="p-4">
              <div className="text-2xl md:text-3xl font-bold text-primary">
                {stat.value}
              </div>
              <div className="text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
