import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/alcalde/Short";
import { TOTAL, FPS } from "./videos/alcalde/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Alcalde" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
