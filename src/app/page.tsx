"use client";
import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "../../convex/_generated/react";
import { ReactSketchCanvas, ReactSketchCanvasRef } from "react-sketch-canvas";
import Image from "next/image";
import { useRef } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function Home() {
  const saveSketchMutation = useMutation("sketches:saveSketch");
  const sketchesQuery = useQuery("sketches:getSketches");
  const canvasRef = useRef<ReactSketchCanvasRef>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<{
    prompt: string;
  }>();

  const sortedSketches = (sketchesQuery ?? []).sort((a, b) => {
    return b._creationTime - a._creationTime;
  });

  const onSubmit = handleSubmit(async (formData) => {
    if (!canvasRef.current) return;
    const image = await canvasRef.current.exportImage("jpeg");
    await saveSketchMutation({ ...formData, image });
  });

  const emptyState = !sketchesQuery
    ? "loading Sketches..."
    : "No recent sketches";

  console.log(
    sketchesQuery !== "undefined",
    sketchesQuery,
    sketchesQuery !== undefined ? "s" : "m"
  );

  return (
    <main className="flex flex-col items-center justify-between pt-8">
      <div className="container mx-auto flex gap-4 flex-wrap justify-betweenp-0">
        <form className="flex flex-col gap-2" onSubmit={onSubmit}>
          <Label htmlFor="prompt" className="mb-1 mt-2">
            Prompt
          </Label>
          <Input
            id="prompt"
            {...register("prompt", { required: true })}
            placeholder="Please enter your prompt here"
          />
          {errors.prompt && <span>This field is required</span>}

          <Label className="mt-4 mb-1">Canvas (Draw something below)</Label>
          <ReactSketchCanvas
            ref={canvasRef}
            style={{
              width: 310,
              height: 306,
              border: "1px solid black",
              borderRadius: "8px",
              padding: "8px",
            }}
            strokeWidth={4}
            strokeColor="black"
          />
          <div className="flex gap-2 w-full mt-6">
            <Button
              type="button"
              variant="ghost"
              onClick={() => {
                canvasRef.current?.clearCanvas();
              }}
              className="w-full text-red-400 hover:text-red-500"
            >
              Clear
            </Button>
            <Button type="submit" className=" w-full">
              Submit
            </Button>
          </div>
        </form>

        <section className="flex flex-col w-3/4">
          <div className="flex items-center mb-6">
            <div className="h-[2px] flex-1 bg-[#EEDC82]"></div>
            <div className=" mx-4 font-semibold">Recent Sketches</div>
            <div className="h-[2px] flex-1 bg-[#EEDC82]"></div>
          </div>
          {sketchesQuery !== undefined && sketchesQuery?.length ? (
            <div
              className="grid grid-cols-4 gap-4 overflow-scroll"
              style={{ height: "70vh" }}
            >
              {sortedSketches.slice(0, 12).map((sketch) => {
                return sketch.result ? (
                  <Image
                    src={sketch.result}
                    width="256"
                    height="256"
                    alt={sketch.result}
                    key={sketch._id}
                    style={{ borderRadius: "4px" }}
                    placeholder="blur"
                    blurDataURL="./Assets/Blur.webp"
                  />
                ) : (
                  <Image
                    src="/Assets/Blur.webp"
                    width="300"
                    height="350"
                    alt="/Assets/Blur.webp"
                    key={sketch._id}
                    style={{ borderRadius: "4px" }}
                  />
                );
              })}
            </div>
          ) : (
            <span className="w-full  text-center font-medium">
              {emptyState}
            </span>
          )}
        </section>
      </div>
    </main>
  );
}
