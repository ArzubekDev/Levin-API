const HorizonBeam = () => {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-x-0 top-1/2 h-24 -translate-y-1/2"
    >
      <div className="absolute inset-x-0 top-1/2 mx-auto h-5 w-full max-w-5xl -translate-y-1/2 bg-[radial-gradient(ellipse_at_center,rgba(59,130,246,0.5)_0%,rgba(99,102,241,0.22)_35%,transparent_70%)] blur-2xl" />
      <div className="absolute inset-x-0 top-1/2 mx-auto h-1.5 w-full max-w-4xl -translate-y-1/2 bg-linear-to-r from-transparent via-blue-400/75 to-transparent blur-md" />
    </div>
  );
};

export default HorizonBeam;
