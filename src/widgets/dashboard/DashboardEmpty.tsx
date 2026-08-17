import HorizonBeam from "@/shared/ui/HorizonBeam";

const DashboardEmpty = () => {
  return (
    <div className="relative overflow-hidden py-24">
      <HorizonBeam />

      <div className="relative z-10 text-center">
        <p className="text-lg text-slate-400">У вас пока нет проектов</p>
        <p className="mt-2 text-slate-400">Создайте свой первый Mock API</p>
      </div>
    </div>
  );
};

export default DashboardEmpty;
