import HorizonBeam from "@/shared/ui/HorizonBeam";

const DashboardEmpty = () => {
  return (
    <div className="relative overflow-hidden py-24">
      <HorizonBeam />

      <div className="relative z-10 text-center">
        <p className="text-lg text-slate-400">You don&apos;t have any projects yet</p>
        <p className="mt-2 text-slate-400">Create your first Mock API</p>
      </div>
    </div>
  );
};

export default DashboardEmpty;
