import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/baile/Short";
import { TOTAL, FPS } from "./videos/baile/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Baile" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
