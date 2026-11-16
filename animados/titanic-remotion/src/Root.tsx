import React from "react";
import { Composition } from "remotion";
import { Short } from "./videos/titanic/Short";
import { TOTAL, FPS } from "./videos/titanic/story";
export const Root: React.FC = () => (
  <>
    <Composition id="Titanic" component={Short} durationInFrames={TOTAL} fps={FPS} width={1080} height={1920} />
  </>
);
