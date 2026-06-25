import { ExperienceFlow } from "@/components/flow/ExperienceFlow";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col items-center px-3 sm:px-6 py-10 md:py-14">
      <div className="w-full max-w-[1480px]">
        <ExperienceFlow />
      </div>
    </main>
  );
}
