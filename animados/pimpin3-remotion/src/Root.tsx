import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pimpin3/Short";
import { TOTAL, FPS } from "./videos/pimpin3/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pimpin3" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
