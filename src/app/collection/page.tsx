"use client";
import { api } from "../../../convex/_generated/api";
import { useQuery } from "convex/react";
import Image from "next/image";
import { ImageSkeleton } from "@/components/ui/imageSkeleton";

export default function Home() {
  const sketches = useQuery(api.sketches.getSketches);

  const sortedSketches = (sketches ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  const emptyState = !sketches
    ? "loading Sketches..."
    : "No recent sketches :(";

    const sketchesLength = sortedSketches?.length;
    console.log({ sketchesLength });

  return (
    <main className="flex min-h-screen flex-col items-center  mt-6">
      <div className="flex items-center mb-6 w-3/4">
        <div className="h-[2px] flex-1 bg-[#EEDC82]"></div>
        <div className=" mx-4 font-bold">All Collections</div>
        <div className="h-[2px] flex-1 bg-[#EEDC82]"></div>
      </div>
      {sketchesLength > 0 ? (
        <div className="grid grid-cols-4 gap-4 mx-4">
          {sortedSketches.map((sketch) =>
            sketch.result ? (
              <Image
                src={sketch.result}
                width="256"
                height="256"
                alt={sketch.result}
                key={sketch._id}
              />
            ) : (
              <ImageSkeleton key={sketch._id} />
            )
          )}
        </div>
      ) : (
        <span className="w-full text-center font-medium">{emptyState}</span>
      )}
      {sketchesLength > 0 && <span className="mt-6 pt-8 text-sm text-yellow-600">{`Collection count: ${sketchesLength}`}</span>}
    </main>
  );
}
