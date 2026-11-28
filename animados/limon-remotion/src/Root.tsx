import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/limon/Short";
import { TOTAL, FPS } from "./videos/limon/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Limon" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
