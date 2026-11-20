import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/hipo/Short";
import { TOTAL, FPS } from "./videos/hipo/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Hipo" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
