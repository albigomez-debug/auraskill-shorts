import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/eiffel/Short";
import { TOTAL, FPS } from "./videos/eiffel/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Eiffel" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
