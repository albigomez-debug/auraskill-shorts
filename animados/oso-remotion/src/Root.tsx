import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/oso/Short";
import { TOTAL, FPS } from "./videos/oso/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Oso" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
