import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin8/Short";
import { TOTAL, FPS } from "./videos/pimpin8/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin8" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
