import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/ciguena/Short";
import { TOTAL, FPS } from "./videos/ciguena/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Ciguena" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
