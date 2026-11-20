import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/cubo/Short";
import { TOTAL, FPS } from "./videos/cubo/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Cubo" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
