"use client";

import { useQuery } from "../../../convex/_generated/react";
import Image from "next/image";

export default function Home() {
  const saveSketchMutation = useQuery("sketches:getSketches");

  const sortedSketches = (saveSketchMutation ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  return (
    <main className="flex min-h-screen flex-col items-center justify-between mt-6">
      <div className="flex items-center mb-6 w-3/4">
            <div className="h-[2px] flex-1 bg-[#EEDC82]"></div>
            <div className=" mx-4 font-bold">All Collections</div>
            <div className="h-[2px] flex-1 bg-[#EEDC82]"></div>
          </div>
      <div className="grid grid-cols-4 gap-4">
        {sortedSketches.map((sketch) => (
          <Image
            src={sketch.result}
            width="256"
            height="256"
            alt={sketch.result}
            key={sketch.id}
          />
        ))}
      </div>
    </main>
  );
}
