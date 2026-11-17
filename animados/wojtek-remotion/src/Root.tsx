import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/wojtek/Short";
import { TOTAL, FPS } from "./videos/wojtek/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Wojtek" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
