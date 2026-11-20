import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/maraton/Short";
import { TOTAL, FPS } from "./videos/maraton/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Maraton" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
