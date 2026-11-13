import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/gato/Short";
import { TOTAL, FPS } from "./videos/gato/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Gato" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
