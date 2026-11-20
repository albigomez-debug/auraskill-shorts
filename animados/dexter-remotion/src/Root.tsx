import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/dexter/Short";
import { TOTAL, FPS } from "./videos/dexter/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Dexter" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
