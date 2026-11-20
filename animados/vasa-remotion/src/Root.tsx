import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/vasa/Short";
import { TOTAL, FPS } from "./videos/vasa/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Vasa" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
