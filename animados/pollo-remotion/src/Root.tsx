import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/pollo/Short";
import { TOTAL, FPS } from "./videos/pollo/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Pollo" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
